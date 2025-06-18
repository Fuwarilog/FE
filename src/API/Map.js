import axios from "axios";
import { getAccessToken } from "../lib/token"; // ✅ 토큰 유틸 import

// ✅ 1. 현재 위치 조회
export const fetchCurrentLocation = async (latitude, longitude) => {
  const body = { latitude, longitude };

  const response = await axios.post("http://localhost:8080/api/v1/maps/location", body, {
    headers: {
      Authorization: `Bearer ${getAccessToken()}`,
    },
  });

  return response.data;
};

// ✅ 2. 키워드 기반 장소 검색
export const searchMapKeyword = async (keyword) => {
  const response = await axios.get("http://localhost:8080/api/v1/maps/search", {
    headers: {
      Authorization: `Bearer ${getAccessToken()}`,
    },
    params: { keyword },
  });

  return response.data;
};

// ✅ 3. 경로 탐색
export const fetchRoute = async (origin, destination, tripDate) => {
  const body = { origin, destination, tripDate };

  const response = await axios.post("http://localhost:8080/api/v1/maps/route", body, {
    headers: {
      Authorization: `Bearer ${getAccessToken()}`,
    },
  });

  return response.data;
};


// ✅ 4. 장소 북마크 추가 (리팩토링된 버전)
export const addBookmark = async (dto) => {
  return axios.post(
    "http://localhost:8080/api/v1/maps/bookmark",
    dto,
    {
      // 스프링 시큐리티가 쿠키에서 토큰을 꺼내 쓰도록 구현되어 있다면
      withCredentials: true,
    }
  );
};

// ✅ 5. 장소 북마크 삭제
// 📁 src/API/Map.js

export const deleteBookmark = async ({ name, latitude, longitude, diaryListId, placeId }) => {
  const response = await axios.delete("http://localhost:8080/api/v1/maps/bookmark", {
    withCredentials: true, // ✅ 쿠키 인증 방식 사용
    data: {
      name,
      latitude,
      longitude,
      diaryListId,
      placeId,
    },
  });

  return response.data;
};
