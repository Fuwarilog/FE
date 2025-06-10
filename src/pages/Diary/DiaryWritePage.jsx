import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { format, parseISO } from "date-fns";
import { Switch } from "../../components/ui/switch";
import { Label } from "../../components/ui/label";
import { Textarea } from "../../components/ui/textarea";
import { Button } from "../../components/ui/button";
import { fetchDiaryContent, editDiaryContent } from "../../API/Diary";

export default function DiaryWritePage() {
  const location = useLocation();
  const navigate = useNavigate();

  const {
    tripTitle,
    date,
    dayIndex,
    diaryListId,
    imageUrls: initImageUrls = [],
    tags: initTags = [],
  } = location.state || {};

  const [title, setTitle] = useState(tripTitle || "");
  const [isPublic, setIsPublic] = useState(true);
  // initTags가 객체 배열이면 name만 꺼내고, 문자열 배열이면 그대로
  const [tags, setTags] = useState(() =>
    initTags.map((t) => (typeof t === "string" ? t : t.name))
  );
  const [content, setContent] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(initImageUrls[0] || "");

  useEffect(() => {
    const loadDiary = async () => {
      if (!diaryListId) return;

      try {
        const res = await fetchDiaryContent(diaryListId);
        const data = res.data;

        if (data) {
          setTitle(data.title ?? tripTitle);
          setContent(data.content ?? "");
          setIsPublic(data.isPublic ?? true);
          // 서버에서 tags가 [{id,name},…] 형태로 오면 name만 꺼내기
          setTags((data.tags || []).map((t) => (typeof t === "string" ? t : t.name)));
          if (data.imageUrls && data.imageUrls.length > 0) {
            setPreviewUrl(data.imageUrls[0]);
          }
          return;
        }
      } catch (err) {
        console.warn("다이어리 없음 (초기 작성 상태)", err);
      }

      // 새로 작성하는 경우 초기화
      setTitle(tripTitle ?? "");
      setContent("");
      setIsPublic(true);
      setTags([]);
      setPreviewUrl("");
    };

    loadDiary();
  }, [diaryListId, tripTitle]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSave = async () => {
    try {
      // FormData로 묶어서 보내야 파일+텍스트 같이 전송 가능
      const form = new FormData();
      form.append("content", content);
      form.append("isPublic", isPublic);
      tags.forEach((tagName) => form.append("tags", tagName));
      if (imageFile) {
        form.append("image", imageFile);
      }

      await editDiaryContent(diaryListId, form);

      navigate("/diary/view", {
        state: { tripTitle: title, date, dayIndex, diaryListId },
      });
    } catch (error) {
      console.error("저장 실패", error);
      alert("다이어리 저장에 실패했습니다.");
    }
  };

  const handleCancel = () => navigate(-1);

  return (
    <div className="p-6 space-y-6">
      {/* 헤더 */}
      <div className="flex justify-between items-center">
        <div className="flex flex-col gap-1">
          <span className="text-2xl font-gangwon font-semibold">{dayIndex}일차 기록</span>
          <span className="text-base font-gangwon text-gray-600">
            {format(parseISO(date), "yyyy.MM.dd")}
          </span>
        </div>

        <div className="flex items-center gap-4">
          <label className="cursor-pointer bg-gray-100 px-3 py-1 rounded-md text-base font-gangwon text-gray-700">
            사진 추가
            <input type="file" accept="image/*" onChange={handleImageChange} hidden />
          </label>

          <div className="flex items-center gap-1">
            <Switch id="public-switch" checked={isPublic} onCheckedChange={setIsPublic} />
            <Label htmlFor="public-switch" className="text-base font-gangwon text-gray-600">
              {isPublic ? "공개" : "비공개"}
            </Label>
          </div>
        </div>
      </div>

      {/* 제목 입력 */}
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="여행 제목을 입력하세요"
        className="w-full px-4 py-2 border border-gray-300 rounded-xl text-lg font-gangwon shadow"
      />

      {/* 해시태그 영역 */}
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {tags.map((tag, idx) => (
            <span
              key={idx}
              className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-base font-gangwon shadow-sm"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}

      {/* 본문 */}
      <Textarea
        placeholder="여행의 순간을 기록해보세요..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="min-h-[300px] rounded-2xl border-gray-200 bg-white/60 backdrop-blur-sm shadow-inner px-5 py-4 text-xl font-gangwon placeholder:text-gray-400"
      />

      {/* 이미지 미리보기 */}
      {previewUrl && (
        <img src={previewUrl} alt="미리보기" className="w-20 h-20 rounded-md ml-2 mt-2" />
      )}

      {/* 저장/취소 */}
      <div className="flex justify-end gap-4">
        <Button
          onClick={handleSave}
          className="rounded-full px-6 py-1 bg-sky-200 hover:bg-sky-100 text-lg text-gray font-gangwon shadow-md"
        >
          저장
        </Button>
        <Button
          variant="outline"
          onClick={handleCancel}
          className="rounded-full px-6 py-1 bg-white hover:bg-gray-100 text-lg text-gray font-gangwon shadow-md"
        >
          취소
        </Button>
      </div>
    </div>
  );
}
