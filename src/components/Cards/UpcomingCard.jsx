import { useNavigate } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardDescription } from "../ui/card";
import { Button } from "../ui/button";
import { format, parseISO, isValid } from "date-fns";


export default function UpComingCard({ upcomingSchedules = [] }) {
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
            <h2 className="text-2xl font-semibold tracking-tight">🗓 다가오는 일정</h2>

            {upcomingSchedules.length === 0 ? (
                <p className="text-muted-foreground">예정된 일정이 없습니다.</p>
            ) : (
                upcomingSchedules.map((schedule) => (
                    <Card
                        key={`${schedule.tripTitle}-${schedule.startDate}`}
                        className="hover:bg-muted/30 transition border border-gray-200 rounded-xl"
                    >
                        <CardHeader className="flex items-center justify-between px-4 py-3">
                            <div>
                                <CardTitle className="text-base font-semibold text-primary">
                                    {schedule.tripTitle}
                                </CardTitle>
                                <CardDescription className="text-sm text-muted-foreground">
                                    {formatDateRange(schedule.startDate, schedule.endDate)}
                                </CardDescription>
                            </div>

                            <Button
                                size="sm"
                                variant="secondary"
                                className="text-xs px-3 py-1 rounded-full"
                                onClick={() => navigate("/calendar")}
                            >
                                이동
                            </Button>
                        </CardHeader>
                    </Card>


                ))
            )}
        </div>
    );
}