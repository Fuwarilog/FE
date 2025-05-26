// API/Calendar.js
import axios from "axios";

// 사용자 일정 조회
export const fetchCalendarEvents = async (tripId) => {
  if (!tripId) throw new Error("tripId는 필수입니다.");

  const accessToken = localStorage.getItem("access_token");
  const url =  `http://localhost:8080/api/v1/trips/event/${tripId}`;
  return await axios.get(url, {
   headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    withCredentials: true,
  });
};

// 일정 추가
export const addCalendarEvent = async ({ country, startDate, endDate }) => {
  return await axios.post("/api/v1/trips/event", {
    country,
    startDate,
    endDate,
  });
};

// 일정 삭제
//export const deleteCalendarEvent = async (eventId) => {
//  return await axios.delete(`/api/calendar/events/${eventId}`);
//};
