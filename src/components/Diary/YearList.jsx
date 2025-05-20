import React from "react";

export default function YearList({ years, onSelectYear }) {
  return (
    <div className="pl-12 pt-10">
      <ul className="space-y-4">
        {years.map((year) => (
          <li key={year}>
            <button
              onClick={() => onSelectYear(year)}
              className="text-xl font-semibold font-gangwon hover:text-blue-600"
            >
              {year}년
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
