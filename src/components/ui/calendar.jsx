import * as React from "react"
import { DayPicker } from "react-day-picker"
import "react-day-picker/dist/style.css" // day-picker 기본 스타일
import CustomCaption from "../Diary/Caption";
import { cn } from "../../lib/utils" // shadcn의 className 병합 함수

export function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}) {
  return (
    <DayPicker
      components={{
        Caption: CustomCaption
      }}
      showOutsideDays={showOutsideDays}
      className={cn("p-3 rounded-xl border shadow bg-white", className)}
      classNames={{
        months: "flex flex-col sm:flex-row gap-4",
        month: "space-y-4",
        caption: "flex justify-between items-center px-2 font-semibold",
        caption_label: "text-sm font-medium",
        nav: "flex items-center gap-2",
        nav_button: "h-7 w-7 bg-transparent p-0 text-gray-700 hover:text-black",
        table: "w-full border-collapse",
        head_row: "flex",
        head_cell: "text-gray-500 w-9 text-[0.75rem] font-medium",
        row: "flex w-full mt-1",
        cell: "w-9 h-9 text-sm text-center p-0 relative",
        day: "h-9 w-9 rounded-full hover:bg-gray-200",
        day_selected: "bg-black text-white hover:bg-black",
        day_today: "border border-sky-200",
        day_outside: "text-gray-300",
        ...classNames,
      }}
      {...props}
    />
  )
}
