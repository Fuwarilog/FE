import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { format, parseISO } from "date-fns";
import { Button } from "../../components/ui/button";
import { fetchDiaryContent } from "../../API/Diary";

export default function DiaryViewPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { tripTitle, date, dayIndex, diaryListId } = location.state || {};

  const [title, setTitle] = useState("");
  const [isPublic, setIsPublic] = useState(true);
  const [tags, setTags] = useState([]);
  const [content, setContent] = useState("");
  const [imageUrls, setImageUrls] = useState([]);

  useEffect(() => {
    const loadContent = async () => {
      if (!diaryListId) return;

      try {
        const res = await fetchDiaryContent(diaryListId);
        console.log("📥 다이어리 응답 데이터:", res);

        const data = res.data;

        setTitle(data.title ?? "");
        setContent(data.content ?? "(내용 없음)");
        setIsPublic(data.isPublic ?? true);
        setTags(data.tags ?? []);        // ← tags 세팅
        setImageUrls(data.imageUrls ?? []);
      } catch (err) {
        console.error("다이어리 내용 불러오기 실패:", err);
        setContent("(불러오기 실패)");
      }
    };

    loadContent();
  }, [diaryListId, date]);

  const handleEdit = () => {
    navigate("/diary/write", {
      state: {
        tripTitle,
        date,
        dayIndex,
        diaryListId,
        title,
        content,
        isPublic,
        tags,
        imageUrls,
      },
    });
  };

  return (
    <div className="p-6">
      {/* 타이틀 */}
      <h2 className="text-xl font-bold font-gangwon mb-2">{tripTitle}</h2>

      {/* 날짜 & 일차 */}
      <div className="flex items-center gap-4 mb-4">
        <span className="text-lg font-gangwon font-semibold">
          {dayIndex}일차 기록
        </span>
        <span className="text-xs font-gangwon text-gray-600">
          {format(parseISO(date), "yyyy.MM.dd")}
        </span>
      </div>

      {/* 해시태그 영역 */}
      {tags.map((tag, index) => (
        <span
          key={index}
          className="inline-block bg-sky-100 px-2 py-1 rounded-full text-[16px] font-gangwon"
        >
          {typeof tag === "string" ? tag : tag.tagText}
        </span>
      ))}


      {/* 이미지 갤러리 */}
      {imageUrls.map((url, idx) => (
        <img
          key={idx}
          src={url}
          alt={`diary-img-${idx}`}
          className="w-48 h-auto rounded shadow"
        />
      ))}


      {/* 본문 */}
      <div className="mt-4 p-4 border font-gangwon border-gray-200 rounded-md bg-gray-50 min-h-[200px] whitespace-pre-wrap">
        {content || "✍️ 저장된 다이어리 내용을 여기에 출력합니다"}
      </div>

      {/* 수정 버튼 */}
      <div className="flex justify-end gap-4 mt-6 px-4">
        <Button
          onClick={handleEdit}
          className="rounded-full px-6 py-1 bg-slate-800 text-white font-gangwon text-lg shadow-md"
        >
          수정
        </Button>
      </div>
    </div>
  );
}