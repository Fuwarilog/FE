import { useState, useMemo, useEffect } from "react";
//fullcalendar
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import "@fullcalendar/common/main.css";
import "@fullcalendar/daygrid/main.css";
//일정추가
import DayAddCard from "../components/Cards/DayAddCard";
//날짜변환
import { isToday, isWithinInterval, parseISO, addDays } from "date-fns";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../components/ui/dialog"
import { fetchCalendarEvents } from "../API/Calendar"; // ✅ API 연결

export default function CalendarPage({user}) {

    const [selectedEvent, setSelectedEvent] = useState(null);
    const [open, setOpen] = useState(false);

    const [events, setEvents] = useState([]);

    useEffect(() => {
        if (!user || !user.sub) {
            console.error("❌ 사용자 정보 없음 또는 ID 없음");
            return;
        }
        console.log("🎯 user.sub:", user.sub);
        fetchCalendarEvents(user.sub)
            .then((res) => {
                console.log("📦 받아온 원본 데이터:", res.data);
                setEvents(res.data);
            })
            .catch((err) => {
                console.error("❌ 일정 로딩 실패:", err);
            });
    }, [user]);

    const handleEventClick = (info) => {
        setSelectedEvent(info.event);
        setOpen(true);
        console.log("이벤트 클릭됨");

    };

    const today = useMemo(() => new Date(), []);
    const todayEvents = useMemo(
        () =>
            events.filter((e) =>
                isToday(parseISO(e.start))
            ),
        [events]
    );

    const upcomingEvents = useMemo(
        () =>
            events.filter((e) =>
                isWithinInterval(parseISO(e.start), {
                    start: today,
                    end: addDays(today, 7),
                })
            ),
        [events, today]
    );

    return (
        <div className="flex flex-col md:flex-row gap-8 p-6 justify-center">
            {/* 달력 */}
            <div className="calendar-wrapper font-gangwon bg-white p-4 rounded-xl shadow w-[600px]">
                <FullCalendar
                    plugins={[dayGridPlugin]}
                    initialView="dayGridMonth"
                    events={events}
                    height="auto"
                    aspectRatio={1}
                    eventClick={handleEventClick}
                />
            </div>
            {/*이벤트 클릭시 확인하기*/}
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle className="font-gangwon text-[22px] text-gray-800">{selectedEvent?.title}</DialogTitle>
                    </DialogHeader>
                    <p className="font-gangwon text-lg text-gray-600">
                        시작: {selectedEvent?.start?.toLocaleDateString()} <br />
                        종료: {selectedEvent?.end?.toLocaleDateString() || selectedEvent?.start?.toLocaleDateString()}
                    </p>
                </DialogContent>
            </Dialog>

            {/* 오른쪽 정보 */}
            <div className="w-full max-w-xs space-y-6">
                {/* 오늘 일정 */}
                <div>
                    <h2 className="text-2xl font-gangwon font-semibold mb-2">📌 오늘의 일정</h2>
                    {todayEvents.length === 0 ? (
                        <p className="text-xl font-gangwon text-muted-foreground">오늘은 일정이 없어요.</p>
                    ) : (
                        <ul className="space-y-2">
                            {todayEvents.map((e) => (
                                <li key={e.id} className="p-3 bg-blue-50 rounded-lg shadow-sm">
                                    <p className="font-medium font-gangwon">{e.title}</p>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                {/* 다가오는 일정 */}
                <div>
                    <h2 className="text-2xl font-semibold font-gangwon mb-2">⏳ 다가오는 일정</h2>
                    {upcomingEvents.length === 0 ? (
                        <p className="text-xl font-gangwon text-muted-foreground">다가오는 일정이 없어요.</p>
                    ) : (
                        <ul className="space-y-2">
                            {upcomingEvents.map((e) => (
                                <li key={e.id} className="p-3 bg-green-50 rounded-lg shadow-sm">
                                    <p className="text-xl font-medium font-gangwon">{e.title}</p>
                                    <p className="text-lg font-gangwon text-gray-500">{e.start} ~ {e.end}</p>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                <div className="flex justify-between items-center mb-4">
                    <DayAddCard onAdd={(newEvent) => console.log(newEvent)} />
                </div>
            </div>
        </div>
    );
}
