export const mockTrips = [
  {
    title: "엄마랑 제주 여행",
    startDate: "2024-12-29",
    endDate: "2025-01-02",
    diaries: [
      { date: "2024-12-29", written: true },
      { date: "2024-12-30", written: true },
      { date: "2024-12-31", written: false },
      { date: "2025-01-01", written: false },
      { date: "2025-01-02", written: false },
    ],
  },
  {
    title: "동기랑 부산 여행",
    startDate: "2023-08-10",
    endDate: "2023-08-13",
    diaries: [
      { date: "2023-08-10", written: true },
      { date: "2023-08-11", written: true },
      { date: "2023-08-12", written: true },
      { date: "2023-08-13", written: false },
    ],
  },{
    title: "동기랑 부산 여행",
    startDate: "2024-08-10",
    endDate: "2024-08-13",
    diaries: [
      { date: "2024-08-10", written: true },
      { date: "2024-08-11", written: true },
      { date: "2024-08-12", written: true },
      { date: "2024-08-13", written: false },
    ],
  },
];

// 🧪 mock diary content 저장소 예시 (localStorage를 흉내 낸 구조)
export const mockDiaryContents = {
  "2024-12-29": {
    content: "엄마랑 도착해서 흑돼지 먹었음!",
    isPublic: true,
    tags: ["흑돼지", "공항", "숙소"]
  },
  "2023-08-11": {
    content: "광안리에서 불꽃놀이 봤다.",
    isPublic: false,
    tags: ["광안리", "밤바다"]
  }
};
// 🧪 mock 지도 태그 (구글맵 연동 전용 임시)
export const mockMapTags = [
  { name: "제주도민속촌", placeId: "place_1" },
  { name: "성산일출봉", placeId: "place_2" },
  { name: "우도", placeId: "place_3" },
];

// 🧪 mock Google 로그인 사용자 예시
export const mockUser = {
  name: "송지윤",
  email: "jiyun.dev@gmail.com",
  picture: "/profile.png",
  uid: "user-1234"
};

// 다이어리 수정 예시
export function getDiaryContent(date) {
  return mockDiaryContents[date] || {
    content: "",
    isPublic: true,
    tags: []
  };
}

export function saveDiaryContent(date, data) {
  mockDiaryContents[date] = {
    ...data,
    written: true,
  };
}


export const sampleEvents = [
  {
    id: 1,
    title: "디즈니랜드",
    start: "2025-06-03",
    end: "2025-06-03",
  },
  {
    id: 2,
    title: "도쿄여행",
    start: "2025-05-18",
    end: "2025-05-20",
  },
  {
    id: 3,
    title: "벚꽃축제",
    start: "2025-05-14",
    end: "2025-05-14",
  },
]
