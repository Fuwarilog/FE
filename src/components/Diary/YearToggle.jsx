import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "../ui/accordion";
import TripToggle from "./TripToggle";

export default function YearToggle({ year, trips }) {
  const sortedTrips = [...trips].sort(
    (a, b) => new Date(a.startDate) - new Date(b.startDate)
  );

  return (
    <Accordion type="single" collapsible className="w-full mb-4">
      <AccordionItem value={`year-${year}`}>
        <AccordionTrigger className="text-2xl font-semibold font-gangwon text-gray-800">
          {year}년
        </AccordionTrigger>
        <AccordionContent className="space-y-4 pl-2">
          {sortedTrips.map((trip) => (
            <TripToggle key={trip.title + trip.startDate} trip={trip} />
          ))}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

