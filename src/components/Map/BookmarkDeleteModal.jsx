import React from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { deleteBookmark } from "../../API/Map";

export default function BookmarkDeleteModal({
    place,
    diaryListId,
    open,
    onClose,
    onDeleted,
}) {
    const handleDelete = async () => {
        try {
            await deleteBookmark({
                name: place.name,
                latitude: place.lat,
                longitude: place.lng,
                diaryListId,
            });
            alert("북마크가 취소되었습니다.");
            onDeleted?.(); // 상위 상태 갱신
            onClose();
        } catch (err) {
            console.error("북마크 취소 실패:", err.response?.data || err.message);
            alert(`취소 중 오류 발생:\n${err.response?.data?.message || err.message}`);
        }
    };

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="max-w-md">
                <DialogHeader>
                    <DialogTitle>📍 북마크 취소</DialogTitle>
                </DialogHeader>
                <p className="text-sm text-muted-foreground mb-4">
                    <strong>{place.name}</strong> 의 북마크를 <br />
                    현재 선택된 여행 일차에서 삭제하시겠습니까?
                </p>
                <div className="flex justify-end gap-2">
                    <Button variant="ghost" onClick={onClose}>
                        취소
                    </Button>
                    <Button variant="destructive" onClick={handleDelete}>
                        북마크 취소
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}
