import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { format, parseISO } from "date-fns";
import { Button } from "../../components/ui/button";
import { fetchDiaryContent } from "../../API/Diary";

export default function DiaryViewPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { tripTitle, date, dayIndex, diaryListId } = location.state || {};

  const [content, setContent] = useState("");

  useEffect(() => {
    const loadContent = async () => {
      if (!diaryListId) return;

      try {
        const res = await fetchDiaryContent(diaryListId, date);
        if (res?.content) {
          setContent(res.content);
        } else {
          setContent("(내용 없음)");
        }
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
      },
    });
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold font-gangwon mb-2">{tripTitle}</h2>

      <div className="flex items-center gap-4 mb-4">
        <span className="text-lg font-gangwon font-semibold">{dayIndex}일차 기록</span>
        <span className="text-xs font-gangwon text-gray-600">
          {format(parseISO(date), "yyyy.MM.dd")}
        </span>
      </div>

      <div className="mt-4 p-4 border font-gangwon border-gray-200 rounded-md bg-gray-50 min-h-[200px] whitespace-pre-wrap">
        {content || "✍️ 저장된 다이어리 내용을 여기에 출력합니다"}
      </div>

      <div className="flex justify-end gap-4 mt-6 px-4">
        <Button
          onClick={handleEdit}
          className="rounded-full px-6 py-1.0 bg-slate-800 text-white font-gangwon text-lg shadow-md"
        >
          수정
        </Button>
      </div>
    </div>
  );
}
