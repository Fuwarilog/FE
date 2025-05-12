// API/Calendar.js
import axios from "axios";

// 사용자 일정 조회
export const fetchCalendarEvents = async () => {
  return await axios.get("/api/calendar/events");
};
// 일정 추가
export const addCalendarEvent = async ({ country, startDate, endDate }) => {
  return await axios.post("/api/calendar/events", {
    country,
    startDate,
    endDate,
  });
};
// 일정 삭제
export const deleteCalendarEvent = async (eventId) => {
  return await axios.delete(`/api/calendar/events/${eventId}`);
};
