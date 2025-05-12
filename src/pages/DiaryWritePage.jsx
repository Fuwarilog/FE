import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { format, parseISO } from "date-fns";
import { Switch } from "../components/ui/switch";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea"
import { Button } from "../components/ui/button";

import { mockMapTags, getDiaryContent, saveDiaryContent } from "../data/sample";

export default function DiaryWritePage() {
    const location = useLocation();
    const navigate = useNavigate();
    const { date, dayIndex } = location.state || {};

    const [isPublic, setIsPublic] = useState(true);
    const [tags, setTags] = useState(mockMapTags);
    const [content, setContent] = useState("");

    const handleSave = () => {
        saveDiaryContent(date, {
            content,
            isPublic,
            tags,
        });
        navigate("/diary");
    };


    const handleCancel = () => {
        navigate(-1);
    };

    useEffect(() => {
        if (date) {
            const existing = getDiaryContent(date);
            setContent(existing.content || "");
            setIsPublic(existing.isPublic ?? true);

            // ✅ 기존 태그가 없으면 mockMapTags로 설정
            if (existing.tags && existing.tags.length > 0) {
                setTags(existing.tags);
            } else {
                setTags(mockMapTags);
            }
        }
    }, [date]);

    return (
        <div className="p-6">
            {/* 헤더 */}
            <div className="flex justify-between items-center mb-4">
                {/* 왼쪽: 일차 + 날짜 */}
                <div className="flex items-center gap-2">
                    <span className="text-xl font-pretendard font-semibold">{dayIndex}일차 기록</span>
                    <span className="text-sm font-pretendard text-gray-600">
                        {format(parseISO(date), "yyyy.MM.dd")}
                    </span>
                </div>

                {/* 오른쪽: 공개/비공개 토글 */}
                <div className="flex items-center gap-1">
                    <Switch
                        id="공개설정"
                        checked={isPublic}
                        onCheckedChange={setIsPublic}
                    />
                    <Label htmlFor="공개설정" className="text-sm font-pretendard text-gray-600">
                        {isPublic ? "공개" : "비공개"}
                    </Label>
                </div>
            </div>

            {/* 지도맵 태그 (Mock) */}
            <div className="flex gap-2 mb-4">
                {tags.map((tag) => (
                    <span
                        key={tag.placeId}
                        className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-pretendard shadow-sm"
                    >
                        #{tag.name}
                    </span>

                ))}
            </div>

            {/* 다이어리 입력 */}
            <Textarea
                placeholder="여행의 순간을 기록해보세요..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="min-h-[300px] rounded-2xl border-gray-200 bg-white/60 backdrop-blur-sm shadow-inner px-5 py-4 text-base font-pretendard placeholder:text-gray-400"
            />


            {/* 하단 버튼 */}
            <div className="flex justify-end gap-4 mt-6 px-4">
                <Button onClick={handleSave} className="rounded-full px-6 py-2 bg-sky-200 hover:bg-sky-100 text-gray font-pretendard shadow-md">
                    저장
                </Button>
                <Button variant="outline" onClick={handleCancel} className="rounded-full px-6 py-2 bg-white-100 hover:bg-white-500 text-white font-pretendard shadow-md">
                    취소
                </Button>
            </div>

        </div>
    );
}
