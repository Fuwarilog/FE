import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { format, parseISO } from "date-fns";
import { Switch } from "../../components/ui/switch";
import { Label } from "../../components/ui/label";
import { Textarea } from "../../components/ui/textarea";
import { Button } from "../../components/ui/button";
import { fetchDiaryContent, editDiaryContent, setDiaryPublic } from "../../API/Diary";

export default function DiaryWritePage() {
  const location = useLocation();
  const navigate = useNavigate();

  const {
    tripTitle,
    date,
    dayIndex,
    diaryListId,
    tags: initialTags = [],
    imageUrls: initImageUrls = [],
  } = location.state || {};

  const [title, setTitle] = useState(tripTitle || "");
  const [isPublic, setIsPublic] = useState(true);
  const [tags, setTags] = useState([]);
  const [content, setContent] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(initImageUrls[0] || "");

  useEffect(() => {
    const loadDiary = async () => {
      if (!diaryListId) return;

      try {
        const res = await fetchDiaryContent(diaryListId);
        const data = res.data;

        console.log("다이어리 내용", data);
        if (data?.content !== null) {
          setTitle(data.title ?? tripTitle);
          setContent(data.content);
          setIsPublic(data.isPublic ?? true);
          setTags(
            Array.isArray(data.tags)
              ? data.tags.map((t) =>
                typeof t === "string"
                  ? t
                  : t.tagText || t.placeName || t.name || "이름없음"
              )
              : []
          );

          if (data.imageUrls && data.imageUrls.length > 0) {
            setPreviewUrl(data.imageUrls[0]);
          }
          return; 
        }
      } catch (err) {
        console.warn("다이어리 없음 (초기 작성 상태)", err);
      }

      // 초기 상태
      setTitle(tripTitle ?? "새 여행기");
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
      const diaryData = {
        content,
        imageFile,
      };

      await editDiaryContent(diaryListId, diaryData);

      await setDiaryPublic(diaryListId, isPublic);

      navigate("/diary/view", {
        state: {
          tripTitle: title,
          date,
          dayIndex,
          diaryListId,
        },
      });
    } catch (error) {
      console.error("저장 실패", error);
      alert("다이어리 저장에 실패했습니다.");
    }
  };

  const handleCancel = () => navigate(-1);

  return (
    <div className="p-6 space-y-4">
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
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              hidden
            />
          </label>

          <div className="flex items-center gap-1">
            <Switch id="공개설정" checked={isPublic} onCheckedChange={setIsPublic} />
            <Label htmlFor="공개설정" className="text-base font-gangwon text-gray-600">
              {isPublic ? "공개" : "비공개"}
            </Label>
          </div>
        </div>
      </div>

      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="여행 제목을 입력하세요"
        className="w-full px-4 py-2 border border-gray-300 rounded-xl text-lg font-gangwon shadow"
      />

      {/* 해시태그 영역 */}
      {tags.map((tag, index) => (
        <span
          key={index}
          className="inline-block bg-sky-100 px-2 py-1 rounded-full text-[16px] font-gangwon"
        >
          {typeof tag === "string" ? tag : tag.tagText}
        </span>
      ))}


      <Textarea
        placeholder="여행의 순간을 기록해보세요..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="min-h-[300px] rounded-2xl border-gray-200 bg-white/60 backdrop-blur-sm shadow-inner px-5 py-4 text-xl font-gangwon placeholder:text-gray-400"
      />

      {previewUrl && (
        <img
          src={previewUrl}
          alt="미리보기"
          className="w-20 h-20 rounded-md ml-2 mt-2"
        />
      )}

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