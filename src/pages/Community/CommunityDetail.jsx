import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import { fetchPosts } from "../../API/Community";
import { setDiaryPublic, fetchDiaryContent as fetchPostDetail } from "../../API/Diary";

import { Button } from "../../components/ui/button";
import { format, parseISO } from "date-fns";
import { ko } from "date-fns/locale";
import { Card } from "../../components/ui/card";

import MyLikedButton from "../../components/community/MyLikedButton";
import MyBookmarkButton from "../../components/community/MyBookmarkButton";
import { getUserInfo } from "../../API/Auth";

export default function CommunityDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [postMeta, setPostMeta] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    // 사용자 정보 불러오기
    const loadUser = async () => {
      try {
        const user = await getUserInfo();
        setCurrentUser(user);
      } catch (err) {
        console.warn("로그인 안 됨 / JWT 없음");
        setCurrentUser(null);
      }
    };
    loadUser();
  }, []);

  // 메타 데이터
  useEffect(() => {
    const loadMeta = async () => {
      try {
        const res = await fetchPosts(); // 전체 게시글 불러오기
        const matched = res.data.find((item) => String(item.id) === id); // id는 useParams에서 받은 postId
        setPostMeta(matched);
      } catch (err) {
        console.error("게시글 메타정보 불러오기 실패", err);
      }
    };

    loadMeta();
  }, [id]);
  // 수정
  const handleEdit = () => {
    const isoDate = post.tripDate.replace(/\./g, "-");

    navigate("/diary/write", {
      state: {
        tripTitle: post.tripTitle,
        date: isoDate,
        dayIndex: post.dayIndex,
        diaryListId: post.diaryListId,
      },
    });
  };

  // 삭제 -> 비공개전환
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
    <div className="w-full max-w-4xl pl-8 pr-8 space-y-6 mt-8 font-gangwon">
      {/* 제목 + 메타 */}
      <div className="space-y-1">
        <h1 className="text-2xl font-bold border-b border-gray-300 pb-2">
          {postMeta?.title}
        </h1>

        <div className="text-[15px] text-muted-foreground flex flex-wrap gap-x-4 -mt-1 text-neutral-500">
          <span>작성자: {postMeta?.userName ?? "알 수 없음"}</span>
          <span>조회수: {postMeta?.watchCount ?? 0}</span>
          <span>
            작성일: {postMeta?.createdDate
              ? format(parseISO(postMeta.createdDate), "yyyy년 M월 d일", { locale: ko })
              : "날짜 없음"}
          </span>
        </div>
      </div>

      {/* 태그 */}
      {post.tags?.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-4">
          {post.tags.map((tag, idx) => (
            <span key={idx} className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
              {tag.tagText}
            </span>
          ))}
        </div>
      )}

      {/* 내용 */}
      <Card className="p-4 whitespace-pre-wrap">{post.content}</Card>

      {/* 이미지 */}
      {post.imageUrls?.length > 0 && (
        <div className="grid grid-cols-2 gap-4">
          {post.imageUrls.map((url, idx) => (
            <img key={idx} src={url} alt={`첨부 이미지 ${idx + 1}`} className="rounded shadow" />
          ))}
        </div>
      )}



      {/* 좋아요 / 북마크 버튼 */}
      <div className="flex gap-4 mt-6">
        <MyLikedButton
          postId={post.id}
          initialCount={post.likeCount}
          initiallyLiked={post.isLiked}
          onToggle={(liked) => {
            console.log("좋아요 상태:", liked);
          }}
        />
        <MyBookmarkButton
          postId={post.id}
          initialState={post.isBookmarked}
          onToggle={(bookmarked) => {
            console.log("북마크 상태:", bookmarked);
          }}
        />
      </div>

      {/* 작성자 본인만 수정/삭제 가능 */}
      {post && currentUser?.id === post.userId && (
        <div className="flex justify-end gap-3 mt-6">
          <Button onClick={handleEdit} className="bg-slate-50 text-neutral-700 hover:bg-slate-100">
            수정
          </Button>
          <Button variant="destructive" onClick={handleDelete} className="bg-slate-50 text-neutral-700  hover:bg-slate-100" >
            비공개 전환</Button>
        </div>
      )}

    </div>
  );
}
