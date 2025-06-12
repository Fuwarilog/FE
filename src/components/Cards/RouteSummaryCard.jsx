import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { Train, Footprints } from "lucide-react";

export default function RouteSummaryCard({ route, onClick, isSelected }) {
  const leg = route.legs[0];
  const duration = leg.duration.text;
  const departure = leg.departure_time?.text;
  const arrival = leg.arrival_time?.text;

  return (
    <Card
      onClick={onClick}
      className={`mb-3 cursor-pointer transition border font-gangwon ${
        isSelected ? "border-blue-500 bg-blue-50" : "hover:bg-muted"
      }`}
    >
      <CardContent className="pt-4 space-y-2">
        {/* 상단 요약 */}
        <div className="text-lg text-muted-foreground font-gangwon ">
          {departure} ~ {arrival} | 총 {duration}
        </div>

        {/* 요약 아이콘 표시 */}
        <div className="flex flex-wrap items-center gap-2 text-sm text-blue-700 font-gangwon">
          {leg.steps.map((step, idx) => {
            if (step.travel_mode === "WALKING") return <Footprints key={idx} size={16} />;
            if (step.travel_mode === "TRANSIT") {
              return (
                <Badge
                  key={idx}
                  variant="outline"
                  className="text-sm px-2 py-0.5 font-gangwon"
                >
                  🚌 {step.transit?.line?.short_name}
                </Badge>
              );
            }
            return null;
          })}
        </div>

        {/* 선택 시 상세 경로 표시 */}
        {isSelected && (
          <div className="pt-2 space-y-2 text-[16px] text-gray-800 font-gangwon">
            {leg.steps.map((step, idx) => {
              const durationText = step.duration?.text ?? "";

              if (step.travel_mode === "WALKING") {
                return (
                  <div key={idx} className="flex items-center gap-1">
                    <Footprints size={14} className="text-muted-foreground" />
                    <span>도보 {durationText}</span>
                  </div>
                );
              }

              if (step.travel_mode === "TRANSIT") {
                const line = step.transit?.line?.short_name ?? "노선";
                const departure = step.transit?.departure_stop?.name ?? "출발지";
                const arrival = step.transit?.arrival_stop?.name ?? "도착지";
                return (
                  <div key={idx} className="space-y-0.5">
                    <div className="flex items-center gap-1">
                      <Train size={14} className="text-blue-600" />
                      <span className="font-medium">{line} 탑승 {durationText}</span>
                    </div>
                    <div className="ml-5 text-muted-foreground ">
                      {departure} → {arrival}
                    </div>
                  </div>
                );
              }

              return null;
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
