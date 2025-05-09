import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { format, parseISO, differenceInCalendarDays, addDays } from "date-fns";
import { useNavigate } from "react-router-dom";

export default function DayCard({ trip }) {
  const navigate = useNavigate();
  if (!trip) return null;

  const start = parseISO(trip.startDate);
  const end = parseISO(trip.endDate);
  const days = differenceInCalendarDays(end, start) + 1;

  return (
    <Card className="p-5 rounded-2xl bg-white/80 shadow-md border border-blue-100">
      <CardHeader className="pb-3">
        <CardTitle className="text-base font-bold font-pretendard text-indigo-500 flex items-center gap-2">
          📓 {trip.title}
        </CardTitle>
      </CardHeader>

      <CardContent className="p-0">
        <ul className="space-y-4">
          {Array.from({ length: days }).map((_, i) => {
            const currentDate = format(addDays(start, i), "yyyy-MM-dd");
            const diary = trip.diaries.find((d) => d.date === currentDate);
            const writtenMap = JSON.parse(localStorage.getItem("writtenDiaries") || "{}");
            const isWritten = diary?.written || writtenMap[currentDate] === true;

            return (
              <li key={i} className="flex items-center gap-3">
                {/* ● 점 */}
                <div className="w-4 flex flex-col items-center pt-1">
                  <div className="w-2 h-2 bg-indigo-400 rounded-full shadow-sm" />
                </div>

                {/* 기록 박스 */}
                <div
                  onClick={() =>
                    isWritten &&
                    navigate("/diary/view", {
                      state: { tripTitle: trip.title, date: currentDate, dayIndex: i + 1 },
                    })
                  }
                  className={`flex justify-between items-center rounded-xl px-5 py-3 flex-1 transition shadow-sm ${
                    isWritten
                      ? "bg-sky-50 hover:bg-sky-100 cursor-pointer"
                      : "bg-gray-100"
                  }`}
                >
                  <span className="font-medium font-pretendard text-gray-800">{i + 1}일차 기록</span>
                  <span className="text-sm font-pretendard text-gray-500">
                    {format(addDays(start, i), "yyyy.MM.dd")}
                  </span>
                </div>

                {/* 작성 버튼 */}
                {!isWritten && (
                  <button
                    onClick={() =>
                      navigate("/diary/write", {
                        state: { tripTitle: trip.title, date: currentDate, dayIndex: i + 1 },
                      })
                    }
                    className="ml-1 px-3 py-1 text-xs font-pretendard rounded-full bg-indigo-300 text-white hover:bg-purple-400 shadow-sm"
                  >
                    작성하기
                  </button>
                )}
              </li>
            );
          })}
        </ul>
      </CardContent>
    </Card>
  );
}

