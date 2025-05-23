// API/Calendar.js
import axios from "../lib/axiosInstance";

// 사용자 일정 조회
export const fetchCalendarEvents = async (tripId) => {
  if (!tripId) throw new Error("tripId는 필수입니다.");
  const accessToken = localStorage.getItem("access_token");
  console.log(" accessToken:", accessToken);
  const url = `/api/v1/trips/event/${tripId}`;
  return await axios.get(url, {
    headers: {
      Authorization: `Bearer ${accessToken}`, // ✅ 헤더에 토큰 포함
    },
    withCredentials: true, // ✅ 쿠키 방식 인증도 함께 사용한다면 필요
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
