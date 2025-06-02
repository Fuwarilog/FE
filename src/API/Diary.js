import axios from "axios";

// 모든 다이어리 폴더 조회
export const fetchAllDiaries = async () => {
  const accessToken = localStorage.getItem("access_token");
  return await axios.get("http://localhost:8080/api/v1/diaries", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    withCredentials: true,
  });
};

// 1. 특정 날짜의 다이어리 조회
export const fetchDiaryContent = async (diaryListId, date) => {
  const token = localStorage.getItem("access_token");
  const response = await axios.get(`/api/v1/diaries/content/${diaryListId}`, {
    params: { date },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

// 2. 다이어리 내용 작성
export const createDiaryContent = async (diaryListId, data) => {
  const token = localStorage.getItem("access_token");
  const response = await axios.post(
    `/api/v1/diaries/content/${diaryListId}`,
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

// 3. 다이어리 내용 수정
export const updateDiaryContent = async (diaryListId, data) => {
  const token = localStorage.getItem("access_token");
  const response = await axios.put(
    `/api/v1/diaries/content/${diaryListId}`,
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

// 공개여부설정
export const setDiaryPublic = async (diaryListId, isPublic) => {
  const token = localStorage.getItem("access_token");
  return await axios.post(
    `/api/v1/diaries/content/${diaryListId}?isPublic=${isPublic}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

// 특정 여행(tripId)에 해당하는 일차별 다이어리 리스트 조회
export const fetchDiaryList = async (diaryListId) => {
  const accessToken = localStorage.getItem("access_token");
  return await axios.get(`http://localhost:8080/api/v1/diaries/${diaryListId}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    withCredentials: true,
  });
};

