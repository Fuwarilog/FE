import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { format, parseISO } from "date-fns";
import { Switch } from "../../components/ui/switch";
import { Label } from "../../components/ui/label";
import { Textarea } from "../../components/ui/textarea";
import { Button } from "../../components/ui/button";
import {
  fetchDiaryContent,
  createDiaryContent,
  updateDiaryContent,
} from "../../API/Diary";

export default function DiaryWritePage() {
  const location = useLocation();
  const navigate = useNavigate();

  const { tripTitle, date, dayIndex, diaryListId } = location.state || {};
  const [title, setTitle] = useState(tripTitle || "");
  const [isPublic, setIsPublic] = useState(true);
  const [tags, setTags] = useState([]);
  const [content, setContent] = useState("");
  const [isExisting, setIsExisting] = useState(false); // 이미 존재 여부

  useEffect(() => {
    console.log("📌 diaryListId:", diaryListId);
    const loadDiary = async () => {
      if (!diaryListId || !date) return;
      try {
        const res = await fetchDiaryContent(diaryListId, date);
        if (res && res.content !== undefined) {
          setIsExisting(true);
          setTitle(res.title || tripTitle);
          setContent(res.content || "");
          setIsPublic(res.isPublic ?? true);
          setTags(res.tags || []);
        }
      } catch (err) {
        console.warn("다이어리 없음 (초기 작성)", err);
        setIsExisting(false);
      }
    };
    loadDiary();
  }, [diaryListId, date, tripTitle]);

  const handleSave = async () => {
    const data = {
      date,
      dayIndex,
      title,
      content,
      isPublic,
      tags,
    };

    try {
      if (isExisting) {
        await updateDiaryContent(diaryListId, data);
      } else {
        await createDiaryContent(diaryListId, data);
      }
      navigate("/diary/view", {
        state: { tripTitle: title, date, dayIndex, diaryListId },
      });
    } catch (error) {
      console.error("저장 실패:", error);
      alert("다이어리 저장에 실패했습니다.");
    }
  };

  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <div className="p-6">
      {/* 날짜/공개 여부 */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <span className="text-2xl font-gangwon font-semibold">{dayIndex}일차 기록</span>
          <span className="text-base font-gangwon text-gray-600">
            {format(parseISO(date), "yyyy.MM.dd")}
          </span>
        </div>
        <div className="flex items-center gap-1">
          <Switch id="공개설정" checked={isPublic} onCheckedChange={setIsPublic} />
          <Label htmlFor="공개설정" className="text-base font-gangwon text-gray-600">
            {isPublic ? "공개" : "비공개"}
          </Label>
        </div>
      </div>

      {/* 제목 */}
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="여행 제목을 입력하세요"
        className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-xl text-lg font-gangwon shadow"
      />

      {/* 태그 */}
      <div className="flex gap-2 mb-4">
        {tags.map((tag, index) => (
          <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-base font-gangwon shadow-sm">
            #{tag}
          </span>
        ))}
      </div>

      {/* 본문 */}
      <Textarea
        placeholder="여행의 순간을 기록해보세요..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="min-h-[300px] rounded-2xl border-gray-200 bg-white/60 backdrop-blur-sm shadow-inner px-5 py-4 !text-xl font-gangwon placeholder:text-gray-400"
      />

      {/* 버튼 */}
      <div className="flex justify-end gap-4 mt-6 px-4">
        <Button onClick={handleSave} className="rounded-full px-6 !py-1 bg-sky-200 hover:bg-sky-100 !text-lg text-gray font-gangwon shadow-md">
          저장
        </Button>
        <Button variant="outline" onClick={handleCancel} className="rounded-full px-6 !py-1 bg-white hover:bg-gray-100 !text-lg text-gray font-gangwon shadow-md">
          취소
        </Button>
      </div>
    </div>
  );
}
