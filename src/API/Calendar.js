import axios from "axios";

// ✅ 일정 조회: 특정 tripId에 대한 일정 정보 가져오기
export const fetchCalendarEvents = async (tripId) => {
  if (!tripId) throw new Error("tripId는 필수입니다.");
  return await axios.get(`/api/v1/trips/event/${tripId}`, {
    withCredentials: true, // ✅ JWT 쿠키 포함
  });
};

// ✅ 일정 추가 (trip 생성 포함)
export const addCalendarEvent = async (eventData) => {
  return await axios.post(
     "http://localhost:8080/api/v1/trips/event",
    eventData, {
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("access_token")}`, // accessToken → 백엔드에서 JWT 발급용
    },
  });
};

// ✅ 일정 삭제 (선택적으로 사용할 경우)
export const deleteCalendarEvent = async (tripId) => {
  if (!tripId) throw new Error("tripId는 필수입니다.");

  return await axios.delete(`/api/v1/trips/event/${tripId}`, {
    withCredentials: true,
  });
};

export const fetchTripsByMonth = async (year, month) => {
  const accessToken = localStorage.getItem("access_token");
  const url = `http://localhost:8080/api/v1/trips/event/month?year=${year}&month=${month}`;

  return await axios.get(url, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    withCredentials: true,
  });
};
