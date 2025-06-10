import {
    Accordion,
    AccordionItem,
    AccordionTrigger,
    AccordionContent,
} from "../ui/accordion";
import DayCard from "../Cards/DayCard";
import { format, parseISO } from "date-fns";
import { useEffect, useState } from "react";
import { fetchDiaryList } from "../../API/Diary";

export default function TripToggle({ trip }) {
    const [diaryLists, setDiaryLists] = useState([]);
    const diaryListId = trip.diaryListId || trip.diaries?.[0]?.id;

    const start = format(parseISO(trip.startDate), "yyyy.MM.dd");
    const end = format(parseISO(trip.endDate), "yyyy.MM.dd");

    useEffect(() => {
        const loadDiaryList = async () => {
            if (!diaryListId) return;
            try {
                const res = await fetchDiaryList(diaryListId); // ✅ 날짜별 다이어리 리스트 불러오기
                setDiaryLists(res.data); // 배열: [{ id: diaryListId, date: ..., isPublic: ... }]
            } catch (err) {
                console.error("DiaryList 불러오기 실패:", err);
            }
        };
        loadDiaryList();
    }, [diaryListId]);

    return (
        <Accordion type="single" collapsible>
            <AccordionItem value={trip.title}>
                <AccordionTrigger className="pl-3 text-left font-gangwon">
                    <div className="flex items-center gap-3">
                        {/* ● 점 */}
                        <div className="w-2 h-2 bg-indigo-400 rounded-full" />

                        {/* 제목 + 날짜 묶음 */}
                        <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
                            <span className="text-[21px] font-semibold text-gray-800"> {trip.title}</span>
                            <span className="text-sm  text-gray-500">
                                {start} ~ {end}
                            </span>
                        </div>
                    </div>
                </AccordionTrigger>

                <AccordionContent className="mt-0">
                    <DayCard trip={trip} diaryLists={diaryLists} />
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    );
}
