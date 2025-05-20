import { useLocation, useNavigate } from "react-router-dom";
import { format, parseISO } from "date-fns";
import { Button } from "../components/ui/button";

export default function DiaryViewPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const { tripTitle, date, dayIndex } = location.state || {};

    const handleEdit = () => {
        navigate("/diary/write", {
            state: {
                tripTitle,
                date,
                dayIndex,
            },
        });
    };
    return (
        <div className="p-6">
            {/* 여행 제목 */}
            <h2 className="text-xl font-bold font-gangwon mb-2">{tripTitle}</h2>

            {/* 일차 + 날짜 */}
            <div className="flex items-center gap-4 mb-4">
                <span className="text-lg font-gangwon font-semibold">{dayIndex}일차 기록</span>
                <span className="text-xs font-gangwon text-gray-600">
                    {format(parseISO(date), "yyyy.MM.dd")}
                </span>
            </div>

            {/* 실제 다이어리 내용 */}
            <div className="mt-4 p-4 border font-gangwon border-gray-200 rounded-md bg-gray-50 min-h-[200px]">
                ✍️ 저장된 다이어리 내용을 여기에 출력합니다 (DB 연동 예정)
            </div>

            <div className="flex justify-end gap-4 mt-6 px-4">
                <Button onClick={handleEdit} className="rounded-full px-6 py-2 bg-sky-200 hover:bg-sky-100 text-gray font-pretendard shadow-md">
                    수정
                </Button>
            </div>
        </div>
    );
}