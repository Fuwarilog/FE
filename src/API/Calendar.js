import axios from "axios";
import { getAccessToken } from "../lib/token";

// 1. 일정 조회: 특정 tripId에 대한 일정 정보 가져오기
export const fetchCalendarEvents = async (tripId) => {
  if (!tripId) throw new Error("tripId는 필수입니다.");

  return await axios.get(`/api/v1/trips/event/${tripId}`, {
    withCredentials: true,
  });
};

// 2. 일정 추가 (trip 생성 포함)
export const addCalendarEvent = async (eventData) => {
  return await axios.post(
    "http://localhost:8080/api/v1/trips/event",
    eventData,
    {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getAccessToken()}`, // ✅ 리팩토링
      },
    }
  );
};

// ✅ 월별 일정 가져오기
export const fetchTripsByMonth = async (year, month) => {
  const url = `http://localhost:8080/api/v1/trips/event/month?year=${year}&month=${month}`;

  return await axios.get(url, {
    headers: {
      Authorization: `Bearer ${getAccessToken()}`,
    },
    withCredentials: true,
  });
};

// 일정 삭제 
export const deleteCalendarEvent = async (tripId) => {
  const url = `http://localhost:8080/api/v1/trips/${tripId}`;
  return await axios.delete(url,
    {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${getAccessToken()}`, 
      },
    }
  );
};

