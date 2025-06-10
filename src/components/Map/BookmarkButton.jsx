import React, { useState } from "react";
import { Button } from "../ui/button";
import { addBookmark, deleteBookmark } from "../../API/Map";

export default function BookmarkButton({ diaryId, tripDate, placeData, locationId }) {
  const [bookmarked, setBookmarked] = useState(false);

  const handleClick = async () => {
    try {
      if (bookmarked) {
        await deleteBookmark(locationId);
        alert("북마크가 삭제되었습니다.");
        setBookmarked(false);
      } else {
        await addBookmark(diaryId, tripDate, placeData);
        alert("북마크가 추가되었습니다.");
        setBookmarked(true);
      }
    } catch (err) {
      console.error("북마크 처리 실패:", err);
      alert("북마크 처리 중 오류가 발생했습니다.");
    }
  };

  return (
    <Button
      onClick={handleClick}
      className={`mt-2 px-4 py-2 text-sm font-semibold ${
        bookmarked ? "bg-gray-400" : "bg-yellow-400 hover:bg-yellow-500"
      } text-black`}
    >
      {bookmarked ? "북마크 취소" : "장소 북마크"}
    </Button>
  );
}