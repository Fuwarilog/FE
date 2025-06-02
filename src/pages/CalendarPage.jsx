import { useEffect, useState, useMemo } from "react";
import { format, parseISO, isToday, isValid, isAfter, addDays } from "date-fns";
import { fetchTripsByMonth, addCalendarEvent } from "../API/Calendar";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../components/ui/dialog";
import DayAddCard from "../components/Cards/DayAddCard";
import { addEventToGoogleCalendar } from "../API/GoogleCalendar";

export default function CalendarPage() {
  const [events, setEvents] = useState([]);
  const [allEvents, setAllEvents] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [todayEvents, setTodayEvents] = useState([]);
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth() + 1);
  const [loadedMonths, setLoadedMonths] = useState(new Set());

  const loadMonthlyEvents = async (year, month) => {
    const key = `${year}-${month}`;
    if (loadedMonths.has(key)) return;

    try {
      const res = await fetchTripsByMonth(year, month);
      const formatted = res.data.map(trip => ({
        id: trip.tripId,
        title: trip.title,
        start: parseISO(trip.startDate),
        end: parseISO(trip.endDate),
        allDay: true
      }));

      setEvents(prevEvents => {
        const prevKeys = new Set(prevEvents.map(e =>
          `${e.id}-${format(e.start, "yyyy-MM-dd")}-${format(e.end, "yyyy-MM-dd")}`
        ));

        const uniqueNew = formatted.filter(e => {
          const key = `${e.id}-${format(e.start, "yyyy-MM-dd")}-${format(e.end, "yyyy-MM-dd")}`;
          return !prevKeys.has(key);
        });

        return [...prevEvents, ...uniqueNew];
      });



      setLoadedMonths(prev => new Set(prev).add(key));
      console.log(`📅 ${key} 일정 로드 완료`, formatted);
    } catch (err) {
      console.error("❌ 월별 일정 조회 실패:", err);
    }
  };

  const loadAllEvents = async () => {
    const currentYear = new Date().getFullYear();
    const all = [];

    for (let month = 1; month <= 12; month++) {
      try {
        const res = await fetchTripsByMonth(currentYear, month);
        const parsed = res.data.map(trip => ({
          id: trip.tripId,
          title: trip.title,
          start: parseISO(trip.startDate),
          end: parseISO(trip.endDate),
          allDay: true
        }));
        all.push(...parsed);
      } catch (err) {
        console.error(`❌ ${currentYear}-${month} 일정 조회 실패`, err);
      }
    }

    const makeKey = (e) => `${e.id}-${format(e.start, "yyyy-MM-dd")}-${format(e.end, "yyyy-MM-dd")}`;
    const seen = new Set();
    const deduplicated = [];

    for (const e of all) {
      const key = makeKey(e);
      if (!seen.has(key)) {
        seen.add(key);
        deduplicated.push(e);
      }
    }

    setAllEvents(deduplicated);
    setEvents(deduplicated);
  };

  useEffect(() => {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    setCurrentYear(year);
    setCurrentMonth(month);
    loadMonthlyEvents(year, month);
    loadAllEvents();
  }, []);

  useEffect(() => {
    const today = new Date();
    setTodayEvents(allEvents.filter(e => isToday(e.start)));
  }, [allEvents]);

  const upcomingEvents = useMemo(() => {
    const today = new Date();
    return events
      .filter(event => isAfter(new Date(event.start), today))
      .sort((a, b) => new Date(a.start) - new Date(b.start))
      .slice(0, 3);
  }, [events]);

  const handleEventClick = (info) => {
    const eventId = info.event.id;
    const event = events.find(e => e.id.toString() === eventId);
    setSelectedEvent(event);
    setOpen(true);
  };

  return (
    <div className="flex flex-col md:flex-row gap-8 p-6 justify-center">
      <div className="calendar-wrapper font-gangwon bg-white p-4 rounded-xl shadow w-[600px]">
        <FullCalendar
          plugins={[dayGridPlugin]}
          initialView="dayGridMonth"
          events={events}
          height="auto"
          aspectRatio={1}
          eventClick={handleEventClick}
          dayMaxEventRows={2}
          datesSet={(arg) => {
            if (!arg?.start) return;

            const viewDate = arg.view.currentStart;
            const year = viewDate.getFullYear();
            const month = viewDate.getMonth() + 1;

            setCurrentYear(year);
            setCurrentMonth(month);
            loadMonthlyEvents(year, month);
          }}
        />
      </div>

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

      <div className="w-full max-w-xs space-y-6">
        <div>
          <h2 className="text-2xl font-gangwon font-semibold mb-2">
            오늘의 일정
          </h2>
          {todayEvents.length === 0 ? (
            <p className="text-xl font-gangwon text-muted-foreground">오늘은 일정이 없어요.</p>
          ) : (
            <ul className="space-y-2">
              {todayEvents.map(e => (
                <li key={e.id} className="p-3 bg-blue-50 rounded-lg shadow-sm">
                  <p className="font-medium font-gangwon">{e.title}</p>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="mt-6">
          <h2 className="text-2xl font-gangwon font-semibold mb-2">
            다가오는 일정
          </h2>
          {upcomingEvents.length === 0 ? (
            <p className="text-xl font-gangwon text-muted-foreground">다가오는 일정이 없어요.</p>
          ) : (
            <ul className="mt-2 space-y-1 text-sm">
              {upcomingEvents.map((event, idx) => (
                <li key={idx} className="text-xl font-gangwon text-muted-foreground text-neutral-800">
                  {event.title} - {format(new Date(event.start), "yyyy.MM.dd")} ~ {format(new Date(event.end), "yyyy.MM.dd")}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="flex justify-between items-center mb-4">
          <DayAddCard
            onAdd={async (newEvent) => {
              try {
                const start = parseISO(newEvent.startDate);
                const end = parseISO(newEvent.endDate);

                if (!isValid(start) || !isValid(end)) {
                  console.error("유효하지 않은 날짜:", newEvent.startDate, newEvent.endDate);
                  return;
                }

                const eventToSend = {
                  title: newEvent.title,
                  description: newEvent.description || "",
                  country: newEvent.country || newEvent.title,
                  startDate: format(start, "yyyy-MM-dd"),
                  endDate: format(addDays(end, 1), "yyyy-MM-dd"),
                };

                console.log("🛸 전송할 값:", eventToSend);

                await addCalendarEvent(eventToSend);

                const googleToken = localStorage.getItem("google-token");
                if (googleToken) {
                  try {
                    await addEventToGoogleCalendar(googleToken, eventToSend);
                    console.log("✅ 구글 캘린더 추가 완료");
                  } catch (err) {
                    console.error("❌ 구글 캘린더 추가 실패:", err);
                  }
                }

                setEvents(prev => [
                  ...prev,
                  {
                    id: "temp-id-" + Date.now(),
                    title: eventToSend.title,
                    start,
                    end,
                    allDay: true
                  },
                ]);

                await loadMonthlyEvents(currentYear, currentMonth);
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
