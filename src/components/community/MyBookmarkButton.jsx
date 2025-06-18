import { useState } from "react";
import { Bookmark } from "lucide-react";
import { editPostBookmark } from "../../API/Community";

export default function MyBookmarkButton({ postId, initialState, onToggle }) {
  const [bookmarked, setBookmarked] = useState(initialState);
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    if (!postId) return;
    setIsLoading(true);

    try {
      await editPostBookmark(postId); // ✅ 북마크 등록/취소 API 호출
      const newState = !bookmarked;
      setBookmarked(newState);
      onToggle?.(newState); // 외부에도 알림
    } catch (error) {
      console.error("북마크 처리 실패:", error);
      alert("북마크 처리 중 문제가 발생했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

   return (
    <button
      onClick={handleClick}
      className="flex items-center gap-[2px] text-[16px] leading-none"
    >
      <Bookmark
        className={`w-[15px] h-[15px] translate-y-[-1px] ${
          bookmarked ? "text-yellow-500 fill-yellow-500" : "text-yellow-500"
        }`}
      />
      <span className="ml-[2px]">북마크</span>
    </button>
  );
}
