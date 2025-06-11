import React, { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Button } from "../ui/button";
import { addBookmark } from "../../API/Map";
import { fetchAllDiaries } from "../../API/Diary";
import {
  differenceInCalendarDays,
  addDays,
  parseISO,
  format
} from "date-fns";

export default function BookmarkModal({ place, onClose, onBookmark }) {
  const [dayList, setDayList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const load = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const raw = await fetchAllDiaries();
        const trips = Array.isArray(raw.data) ? raw.data : Array.isArray(raw) ? raw : [];

        const flatDayList = trips.flatMap(trip => {
          const start = parseISO(trip.startDate);
          const end = parseISO(trip.endDate);
          const total = differenceInCalendarDays(end, start) + 1;

          return Array.from({ length: total }, (_, idx) => {
            const dayDate = format(addDays(start, idx), "yyyy-MM-dd");
            const found = trip.diaries?.find(d => d.startDate === dayDate);
            return {
              tripId: trip.tripId,               // API에 전달할 trip 식별자
              diaryListId: found?.id ?? null,    // 기존 다이어리가 있으면 id, 없으면 null
              tripTitle: trip.title,
              date: dayDate,
              dayIndex: idx + 1,
            };
          });
        });

        setDayList(flatDayList);
      } catch (err) {
        console.error(err);
        setError("일정을 불러오는 중 오류가 발생했습니다.");
      } finally {
        setIsLoading(false);
      }
    };

    load();
  }, []);

  const handleAdd = async () => {
    console.log("📍 place:", place);

    if (!place) {
      return alert("북마크할 장소 정보가 없습니다.");
    }

    const placeId = place.placeId ?? place.place_id ?? place.id;
    if (!placeId) {
      return alert("유효한 placeId가 없습니다.");
    }

    const { lat, lng } = place;
    if (lat == null || lng == null) {
      return alert("유효한 위치 정보가 없습니다.");
    }

    const address = place.address ?? place.formatted_address ?? "";
    const url = place.url ?? "";

    const dto = {
      placeId,
      name: place.name,
      url,
      address,
      latitude: lat,
      longitude: lng,
    };

    try {
      await addBookmark(dto);
      alert("✅ 오늘 다이어리에 북마크가 저장되었습니다.");
      onBookmark();
      onClose();
    } catch (err) {
      console.error("북마크 저장 실패:", err.response?.data || err.message);
      alert(`저장 중 오류가 발생했습니다:\n${err.response?.data?.message || err.message}`);
    }
  };

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>북마크 추가</DialogTitle>
        </DialogHeader>
        <p className="text-sm text-muted-foreground mb-4">
          선택한 장소가 <strong>오늘의 여행 일지</strong>에 자동으로 북마크됩니다.
        </p>

        <div className="flex justify-end gap-2">
          <Button variant="ghost" onClick={onClose}>
            취소
          </Button>
          <Button onClick={handleAdd} disabled={isLoading}>
            저장
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
