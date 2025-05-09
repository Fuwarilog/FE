"use client"

import { format } from "date-fns";
import { Calendar } from "../ui/calendar";
import { Popover, PopoverTrigger, PopoverContent } from "./popover";
import * as React from "react";
import { CalendarIcon } from "lucide-react";


export default function DatePicker({ date, setDate }) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          className="w-full justify-between text-left font-normal border rounded-md p-2 flex items-center"
        >
          <span>{date ? format(date, "yyyy-MM-dd") : "날짜 선택"}</span>
          <CalendarIcon className="w-4 h-4 opacity-50 ml-2" />
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          className="rounded-md border shadow"
        />
      </PopoverContent>
    </Popover>
  );
}
