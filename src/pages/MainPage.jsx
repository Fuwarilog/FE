import { useEffect, useState } from "react";
import { parseISO, isToday, isAfter } from "date-fns";
import { fetchTripsByMonth } from "../API/Calendar";
import ExchangeRateCard from "../components/Cards/ExchangeRateCard";
import TodayCard from "../components/Cards/TodayCard";
import UpComingCard from "../components/Cards/UpcomingCard";
import { Button } from "../components/ui/button";
import { useNavigate } from "react-router-dom";

export default function MainPage() {
  const [todaySchedules, setTodaySchedules] = useState([]);
  const [upcomingSchedules, setUpcomingSchedules] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const loadSchedules = async () => {
      try {
        const all = [];
        const year = new Date().getFullYear();

        for (let month = 1; month <= 12; month++) {
          const res = await fetchTripsByMonth(year, month);
          const parsed = res.data.map((trip) => ({
            id: trip.tripId,
            title: trip.title,
            startDate: trip.startDate,
            endDate: trip.endDate,
          }));
          all.push(...parsed);
        }

        const today = [];
        const upcoming = [];

        all.forEach((trip) => {
          const start = parseISO(trip.startDate);
          const data = {
            tripTitle: trip.title,
            startDate: trip.startDate,
            endDate: trip.endDate,
          };

          if (isToday(start)) {
            today.push(data);
          } else if (isAfter(start, new Date())) {
            upcoming.push(data);
          }
        });

        setTodaySchedules(today);
        setUpcomingSchedules(upcoming.slice(0, 3));
      } catch (err) {
        console.error("📛 일정 불러오기 실패:", err);
      }
    };

    loadSchedules();
  }, []);

  return (
    <main className="p-6">
      {/* ✅ 2열 grid로 환율카드 + 일정카드 자연스럽게 배치 */}
      <div className="grid grid-cols-[1fr_280px] gap-10 items-start">
        {/* 왼쪽: 환율 카드 */}
        {/*<ExchangeRateCard /> */}

        {/* 오른쪽: 일정 카드들 + 버튼 */}
        <div className="space-y-4">
          <TodayCard schedules={todaySchedules} />
          <UpComingCard schedules={upcomingSchedules} />
          <div className="pt-2 text-center">
            <Button
              variant="outline"
              onClick={() => navigate("/calendar")}
              className="w-full"
            >
              + 새로운 여행 추가하러 가기
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}
