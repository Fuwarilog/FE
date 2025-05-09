import { DayPicker } from "react-day-picker";
//import "react-day-picker/dist/style.css";
import * as React from "react";

console.log("✅ calendar.jsx 가 렌더링됨");

export const Calendar = React.forwardRef(({ className, ...props }, ref) => {
 
  console.log("DayPicker props 확인 👉", props); // ✅ 여기 넣어!

  return (
    <div ref={ref} className={className}>
      <DayPicker
        {...props}
        classNames={{
          day: "w-10 h-10 flex items-center justify-center hover:bg-gray-100 rounded-full", // ✅ button에 들어감
          day_selected: "bg-gray-300 text-black font-bold rounded-full",
        }}

        styles={{
          day : undefined,
        }}
      />
    </div>
  );
});


Calendar.displayName = "Calendar";
