import React, { useEffect, useState } from "react";
import YearToggle from "../../components/Diary/YearToggle";
import { fetchAllDiaries } from "../../API/Diary";

function groupTripsByYear(trips) {
  return trips.reduce((acc, trip) => {
    const year = new Date(trip.startDate).getFullYear();
    if (!acc[year]) acc[year] = [];
    acc[year].push(trip);
    return acc;
  }, {});
}

export default function DiaryPage() {
  const [groupedTrips, setGroupedTrips] = useState({});

  useEffect(() => {
    const loadTrips = async () => {
      try {
        const res = await fetchAllDiaries();
        const grouped = groupTripsByYear(res.data);
        setGroupedTrips(grouped);
      } catch (err) {
        console.error("다이어리 목록 불러오기 실패:", err);
      }
    };
    loadTrips();
  }, []);

  return (
    <div className="p-12">
      <h1 className="text-2xl font-bold font-gangwon mb-6">다이어리</h1>

      {Object.entries(groupedTrips)
        .sort((a, b) => b[0] - a[0])
        .map(([year, trips]) => (
          <YearToggle key={year} year={year} trips={trips} />
        ))}
    </div>
  );
}
