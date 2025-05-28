import { useEffect, useState } from "react";
import { format, parseISO, addDays, isToday, isWithinInterval } from "date-fns";
import { fetchTripsByMonth, addCalendarEvent } from "../API/Calendar";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../components/ui/dialog";
import DayAddCard from "../components/Cards/DayAddCard";

export default function CalendarPage() {
    const [events, setEvents] = useState([]);
    const [open, setOpen] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [todayEvents, setTodayEvents] = useState([]);
    const [upcomingEvents, setUpcomingEvents] = useState([]);

    // ✅ 월별 일정 전체 조회
    const loadMonthlyEvents = async () => {
        const now = new Date();
        const year = now.getFullYear();
        const month = now.getMonth() + 1;

        try {
            const res = await fetchTripsByMonth(year, month);
            const formatted = res.data.map(trip => ({
                id: trip.tripId,
                title: trip.title,
                start: parseISO(trip.startDate),
                end: parseISO(trip.endDate),
            }));
            setEvents(formatted);
            console.log("📅 월별 일정 조회 성공:", formatted);
        } catch (err) {
            console.error("❌ 월별 일정 조회 실패:", err);
        }
    };

    // ✅ 처음 진입 시 일정 불러오기
    useEffect(() => {
        loadMonthlyEvents();
    }, []);

    // ✅ 오늘 및 다가오는 일정 필터링
    useEffect(() => {
        const today = new Date();
        const upcomingLimit = addDays(today, 7);

        setTodayEvents(events.filter((e) => isToday(e.start)));

        setUpcomingEvents(
            events.filter((e) =>
                !isToday(e.start) &&
                isWithinInterval(e.start, {
                    start: today,
                    end: upcomingLimit,
                })
            )
        );
    }, [events]);

    // ✅ 이벤트 클릭 시 모달 열기
    const handleEventClick = (info) => {
        const eventId = info.event.id;
        const event = events.find((e) => e.id.toString() === eventId);
        setSelectedEvent(event);
        setOpen(true);
    };

    return (
        <div className="flex flex-col md:flex-row gap-8 p-6 justify-center">
            {/* 📅 캘린더 */}
            <div className="calendar-wrapper font-gangwon bg-white p-4 rounded-xl shadow w-[600px]">
                <FullCalendar
                    plugins={[dayGridPlugin]}
                    initialView="dayGridMonth"
                    events={events}
                    height="auto"
                    aspectRatio={1}
                    eventClick={handleEventClick}
                    datesSet={(arg) => {
                        const year = arg.start.getFullYear();
                        const month = arg.start.getMonth() + 1;
                        fetchTripsByMonth(year, month)
                            .then((res) => {
                                const formatted = res.data.map((trip) => ({
                                    id: trip.tripId,
                                    title: trip.title,
                                    start: parseISO(trip.startDate),
                                    end: parseISO(trip.endDate),
                                }));
                                setEvents(formatted);
                                console.log("📅 달 변경 → 일정 다시 불러옴", formatted);
                            })
                            .catch((err) => console.error("❌ 달 변경 일정 로드 실패:", err));
                    }}
                />

            </div>

            {/* 📌 이벤트 상세 모달 */}
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle className="font-gangwon text-[22px] text-gray-800">
                            {selectedEvent?.title}
                        </DialogTitle>
                    </DialogHeader>
                    <p className="font-gangwon text-lg text-gray-600">
                        시작: {selectedEvent?.start?.toLocaleDateString()} <br />
                        종료: {selectedEvent?.end?.toLocaleDateString() || selectedEvent?.start?.toLocaleDateString()}
                    </p>
                </DialogContent>
            </Dialog>

            {/* 🗓 오른쪽 일정 카드 영역 */}
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
                                    <p className="text-lg font-gangwon text-gray-500">
                                        {e.start.toLocaleDateString()} ~ {e.end?.toLocaleDateString()}
                                    </p>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                {/* ➕ 일정 추가 */}
                <div className="flex justify-between items-center mb-4">
                    <DayAddCard
                        onAdd={async (newEvent) => {
                            try {
                                const eventToSend = {
                                    title: newEvent.title,
                                    description: newEvent.description || "",
                                    country: newEvent.title,
                                    startDate: format(newEvent.start, "yyyy-MM-dd"),
                                    endDate: format(newEvent.end, "yyyy-MM-dd"),
                                };

                                await addCalendarEvent(eventToSend);
                                await loadMonthlyEvents(); // ✅ 추가 후 재조회
                                console.log("✅ 일정 추가 후 월별 재조회 완료");
                            } catch (err) {
                                console.error("❌ 일정 추가 실패:", err);
                            }
                        }}
                    />
                </div>
            </div>
        </div>
    );
}
