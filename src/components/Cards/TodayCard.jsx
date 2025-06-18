import { useNavigate } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardDescription } from "../ui/card";
import { Button } from "../ui/button";
import { format, parseISO, isValid } from "date-fns";


export default function TodayCard({ todaySchedules = [] }) {
  const navigate = useNavigate();

  const formatDateRange = (startStr, endStr) => {
    const start = parseISO(startStr);
    const end = parseISO(endStr);

    if (isValid(start) && isValid(end)) {
      return `${format(start, "yyyy.MM.dd")} ~ ${format(end, "yyyy.MM.dd")}`;
    } else {
      return "날짜 정보 없음";
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold tracking-tight">📌 오늘의 일정</h2>

      {todaySchedules.length === 0 ? (
        <p className="text-muted-foreground">오늘 예정된 일정이 없습니다.</p>
      ) : (
        todaySchedules.map((schedule) => (
          <Card
            key={schedule.id || schedule.diaryListId}
            className="hover:shadow-md transition"
          >
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-lg">
                  {schedule.title || schedule.tripTitle}
                </CardTitle>
                <CardDescription>
                  {formatDateRange(schedule.startDate, schedule.endDate)}
                </CardDescription>
              </div>
              <Button
                size="sm"
                onClick={() =>
                  navigate("/calendar") // 또는 `/diary/view` 페이지로 이동 가능
                }
              >
                보기
              </Button>
            </CardHeader>
          </Card>
        ))
      )}
    </div>
  );
}