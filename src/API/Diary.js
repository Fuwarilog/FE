import axios from "axios";
import { getAccessToken } from "../lib/token";

// 1. 모든 다이어리 폴더 조회
export const fetchAllDiaries = async (returnRaw = false) => {
  const res = await axios.get("http://localhost:8080/api/v1/diaries", {
    withCredentials: true,
  });
  return returnRaw ? res : res.data;
};

// 2. 다이어리 폴더 내의 목록 조회
export const fetchPublicDiaryLists = async (diaryId) => {
  const url = `http://localhost:8080/api/v1/diaries/${diaryId}?isPublic=true`;

  const res = await axios.get(url, {
    withCredentials: true,
  });

  return res.data;
};

// 3. 다이어리 내용 조회
export const fetchDiaryContent = async (diaryListId) => {
  const url = `http://localhost:8080/api/v1/diaries/content/${diaryListId}`;
  const token = getAccessToken();

  return await axios.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
};

// 4. 다이어리 내용 수정
export const editDiaryContent = async (diaryListId, diaryData) => {
  const { content, imageFile } = diaryData;

  const formData = new FormData();

  // 1. JSON 부분을 Blob으로 감싸서 dto로 전송
  const dto = { content };

  formData.append(
    "dto",
    new Blob([JSON.stringify(dto)], { type: "application/json" })
  );

  // 2. 이미지가 있다면 첨부
  if (imageFile) {
    formData.append("image", imageFile);
  }

  // 3. API 호출
  const url = `http://localhost:8080/api/v1/diaries/content/${diaryListId}`;

  for (const pair of formData.entries()) {
    if (pair[1] instanceof Blob) {
      pair[1].text().then(text => {
        console.log(`📝 ${pair[0]} (JSON):`, text);
      });
    } else {
      console.log(`🖼️ ${pair[0]}:`, pair[1]);
    }
  }

  // 4. 전송
  return await axios.put(url, formData, {
    headers: {
      Authorization: `Bearer ${getAccessToken()}`,
    },
    withCredentials: true,
  });
};


// 7. 다이어리 공개여부 설정 기능
export const setDiaryPublic = async (diaryListId, isPublic) => {
  const url = `http://localhost:8080/api/v1/diaries/content/${diaryListId}?isPublic=${isPublic}`;

  return await axios.post(
    url,
    null, 
    {
      withCredentials: true, 
      headers: {
        "Content-Type": undefined, 
      },
    }
  );
};



// 특정 여행(tripId)에 해당하는 일차별 다이어리 리스트 조회
export const fetchDiaryList = async (diaryListId) => {
  return await axios.get(`http://localhost:8080/api/v1/diaries/${diaryListId}`, {
    headers: {
      Authorization: `Bearer ${getAccessToken()}`,
    },
    withCredentials: true,
  });
};
