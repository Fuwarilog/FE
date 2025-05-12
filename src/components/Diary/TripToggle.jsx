import {
    Accordion,
    AccordionItem,
    AccordionTrigger,
    AccordionContent,
} from "../ui/accordion";
import DayCard from "../Cards/DayCard";
import { format, parseISO } from "date-fns";

export default function TripToggle({ trip }) {
    const start = format(parseISO(trip.startDate), "yyyy.MM.dd");
    const end = format(parseISO(trip.endDate), "yyyy.MM.dd");

    return (
        <Accordion type="single" collapsible>
            <AccordionItem value={trip.title}>
                <AccordionTrigger className="pl-3 text-left font-pretendard">
                    <div className="flex items-center gap-3">
                        {/* ● 점 */}
                        <div className="w-2 h-2 bg-indigo-400 rounded-full" />

                        {/* 제목 + 날짜 묶음 */}
                        <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
                            <span className="text-base font-semibold text-gray-800"> {trip.title}</span>
                            <span className="text-xs  text-gray-500">{start} ~ {end}</span>
                        </div>
                    </div>
                </AccordionTrigger>

                <AccordionContent className="mt-0">
                    <DayCard trip={trip} />
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    );
}
