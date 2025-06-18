import { useState } from "react";
import { Heart } from "lucide-react";
import { editPostLikes } from "../../API/Community";

export default function MyLikedButton({
  postId,
  initialCount,
  initiallyLiked,
  onToggle,
}) {
  const [liked, setLiked] = useState(initiallyLiked);
  const [likeCount, setLikeCount] = useState(initialCount);
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    if (!postId) return;
    setIsLoading(true);

    try {
      await editPostLikes(postId); // ✅ 좋아요 토글 API 호출

      const newLiked = !liked;
      setLiked(newLiked);
      setLikeCount((prev) => prev + (newLiked ? 1 : -1));

      onToggle?.(newLiked);
    } catch (err) {
      console.error("좋아요 처리 실패:", err);
      alert("좋아요 처리 중 오류가 발생했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button onClick={handleClick} className="flex items-center space-x-1 text-[16px]">
      {liked ? (
        <Heart className="text-red-500 fill-red-500 w-4 h-4 translate-y-[-1px]" />
      ) : (
        <Heart className="text-red-500 w-4 h-4 translate-y-[-1px]" />
      )}
      <span>좋아요</span>

    </button>
  );
}

//      <span className="font-semibold">{likeCount.toLocaleString()}</span>