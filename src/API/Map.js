import axios from "axios";

// ✅ 1. 현재 위치 조회
export const fetchCurrentLocation = async (latitude, longitude) => {
  const token = localStorage.getItem("access_token");

  const body = {
    latitude,
    longitude,
  };

  const response = await axios.post("/api/v1/maps/location", body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

// ✅ 2. 키워드 기반 장소 검색
export const searchMapKeyword = async (keyword) => {
  const token = localStorage.getItem("access_token");

  const response = await axios.get(`/api/v1/maps/search`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      keyword,
    },
  });

  return response.data;
};

// ✅ 3. 경로 탐색
export const fetchRoute = async (origin, destination, tripDate) => {
  const token = localStorage.getItem("access_token");

  const body = {
    origin,
    destination,
    tripDate, // string 형식 (예: '2024-06-01')
  };

  const response = await axios.post(`/api/v1/maps/route`, body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

// ✅ 4. 장소 북마크 추가
export const addBookmark = async (diaryId, date, placeData) => {
  const token = localStorage.getItem("access_token");

  const response = await axios.post(
    `/api/v1/diaries/${diaryId}/tags`,
    placeData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: { date }, // YYYY-MM-DD
    }
  );

  return response.data;
};

// ✅ 5. 장소 북마크 삭제
export const deleteBookmark = async (locationId) => {
  const token = localStorage.getItem("access_token");

  const response = await axios.delete(`/api/v1/maps/bookmark`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: { locationId },
  });

  return response.data;
};
