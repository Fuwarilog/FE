import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { addBookmark } from "../../API/Map";

export default function BookmarkModal({ place, onClose, onBookmark }) {
  const handleAdd = async () => {
    if (!place) {
      alert("장소 정보가 없습니다.");
      return;
    }

    const placeId = place.placeId ?? place.place_id ?? place.id;
    const { lat, lng } = place;
    const address = place.address ?? place.formatted_address ?? "";
    const url = place.url ?? "";

    if (!place.name || lat == null || lng == null) {
      alert("장소 이름 또는 좌표 정보가 부족합니다.");
      return;
    }


    const dto = {
      placeId,
      name: place.name,
      url,
      address,
      latitude: lat,
      longitude: lng,
    };

    try {
      await addBookmark(dto); // today 기준 diaryListId는 서버에서 처리
      alert("✅ 북마크가 저장되었습니다.");
      onBookmark?.(); // 상위 상태 갱신
      onClose();
    } catch (err) {
      console.error("북마크 저장 실패:", err.response?.data || err.message);
      alert(`저장 중 오류 발생:\n${err.response?.data?.message || err.message}`);
    }
  };

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>📌 북마크 추가</DialogTitle>
        </DialogHeader>
        <p className="text-sm text-muted-foreground mb-4">
          <strong>{place.name}</strong> 장소를 오늘의 여행 일차에 북마크할까요?
        </p>
        <div className="flex justify-end gap-2">
          <Button variant="ghost" onClick={onClose}>
            취소
          </Button>
          <Button onClick={handleAdd}>저장</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
