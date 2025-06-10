import { Train, Footprints, Clock } from "lucide-react";

export default function RouteSummaryCard({ directions }) {
  const leg = directions.routes[0].legs[0];
  const duration = leg.duration.text;
  const departure = leg.departure_time?.text;
  const arrival = leg.arrival_time?.text;

  return (
    <div className="absolute bottom-4 left-4 z-50 bg-white shadow-md rounded-md p-4 w-[340px]">
      <div className="text-sm mb-2 text-gray-500">
        ⏰ {departure} ~ {arrival} | 총 {duration}
      </div>

      <div className="flex items-center gap-2 text-blue-700 font-medium text-sm">
        {leg.steps.map((step, idx) => {
          if (step.travel_mode === "WALKING") {
            return <Footprints key={idx} size={16} />;
          } else if (step.travel_mode === "TRANSIT") {
            const line = step.transit?.line?.short_name;
            return (
              <div key={idx} className="flex items-center gap-1 px-2 py-1 bg-blue-100 rounded">
                <Train size={14} />
                <span>{line}</span>
              </div>
            );
          } else {
            return null;
          }
        })}
      </div>
    </div>
  );
}
