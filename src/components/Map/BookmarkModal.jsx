import React, { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Button } from "../ui/button";
import { ScrollArea } from "../ui/scroll-area";
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
  const [selectedDay, setSelectedDay] = useState(null);
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
    if (!place) {
      return alert("북마크할 장소 정보가 없습니다.");
    }
    if (!selectedDay) {
      return alert("일차를 선택해주세요.");
    }

    // payload: 기존 diaryListId 없으면 tripId+date 로 새 다이어리 생성하도록
    const payload = {
      ...place,
      diaryListId: selectedDay.diaryListId, // null 이더라도 API가 처리하도록
      tripId: selectedDay.tripId,
      date: selectedDay.date,
    };

    try {
      await addBookmark(payload);
      onBookmark();
      onClose();
    } catch (err) {
      console.error(err);
      alert("북마크 저장에 실패했습니다.");
    }
  };

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>북마크 추가</DialogTitle>
        </DialogHeader>
        <p className="text-sm text-muted-foreground mb-2">
          북마크할 일차를 선택하세요
        </p>
        <ScrollArea className="h-[200px] border rounded-md mb-4 p-2">
          {isLoading ? (
            <p className="text-center text-muted-foreground py-10">
              일정 불러오는 중...
            </p>
          ) : error ? (
            <p className="text-center text-red-500 py-10">{error}</p>
          ) : (
            dayList.map(item => (
              <div
                key={`${item.tripId}-${item.date}`}
                onClick={() => setSelectedDay(item)}
                className={`p-2 rounded-md cursor-pointer hover:bg-accent ${
                  selectedDay?.tripId === item.tripId &&
                  selectedDay?.date === item.date
                    ? "bg-blue-100 dark:bg-blue-800"
                    : ""
                }`}
              >
                <p className="text-sm font-medium">
                  {item.tripTitle} - {item.dayIndex}일차
                </p>
                <p className="text-xs text-muted-foreground">{item.date}</p>
              </div>
            ))
          )}
        </ScrollArea>
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
