import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { setDiaryPublic, fetchDiaryContent as fetchPostDetail } from "../../API/Diary";
import { Button } from "../../components/ui/button";

export default function CommunityDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);

  const handleEdit = () => {
    const isoDate = post.date.replace(/\./g, "-");

    navigate("/diary/write", {
      state: {
        tripTitle: post.tripTitle,
        date: isoDate,
        dayIndex: post.dayIndex,
        diaryListId: post.diaryListId, // 실제 ID 사용
      },
    });
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm("정말 비공개로 전환하시겠습니까?");
    if (!confirmDelete) return;

    try {
      await setDiaryPublic(post.diaryListId, false);
      alert("비공개로 전환되었습니다.");
      navigate("/community", { state: { forceReload: true } });
    } catch (err) {
      console.error("비공개 전환 실패", err);
      alert("⚠️ 처리에 실패했습니다.");
    }
  };

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetchPostDetail(id);
        setPost(res.data);
      } catch (err) {
        console.error("게시글 불러오기 실패", err);
      }
    };

    load();
  }, [id]);

  if (!post) {
    return (
      <div className="text-center py-10 text-gray-500">
        게시글을 찾을 수 없습니다.
      </div>
    );
  }

  return (
    <div className="flex flex-row gap-8 px-6 mt-8">
      {/* 왼쪽 본문 박스 */}
      <div className="flex-1 max-w-3xl bg-white shadow rounded-xl p-6 font-gangwon">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">{post.title}</h1>
        <div className="text-base text-gray-500 mb-4">
          글쓴이: {post.userName} · 작성일: {post.date} · 조회수: {post.views}
        </div>
        <div className="text-gray-700 text-2xl mb-6">
          {post.content || "본문 내용이 없습니다."}
        </div>

        <div className="flex gap-4 text-base text-gray-600 mb-6">
          <span>❤️ 좋아요 {post.likes}</span>
          <span>🔖 북마크 {post.bookmarks || 0}</span>
        </div>

        {post.isMine && (
          <div className="flex gap-2">
            <Button
              onClick={handleEdit}
              className="rounded-full px-6 !py-0.5 bg-sky-200 hover:bg-sky-100 text-gray-700 !text-base"
            >
              수정
            </Button>
            <Button
              onClick={handleDelete}
              className="rounded-full px-6 !py-0.5 !bg-slate-50 hover:bg-red-100 !text-slate-950 !text-base"
            >
              비공개
            </Button>
          </div>
        )}
      </div>

      {/* 오른쪽 사이드바 */}
      <div className="w-[260px]">
        <div className="bg-indigo-50 p-4 rounded-xl shadow text-gray-700 font-gangwon">
          <h3 className="text-lg font-bold mb-2">📈 인기 게시글</h3>
          <ul className="space-y-2 text-sm">
            <li className="hover:underline cursor-pointer">· 일본 도쿄 여행기</li>
            <li className="hover:underline cursor-pointer">· 파리 감성 카페 투어</li>
            <li className="hover:underline cursor-pointer">· 제주 올레길 후기</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
