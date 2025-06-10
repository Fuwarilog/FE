// accessToken 저장
export const setAccessToken = (token) => {
  localStorage.setItem("access_token", token);
};

// accessToken 가져오기
export const getAccessToken = () => {
  return localStorage.getItem("access_token");
};

// accessToken 삭제
export const removeAccessToken = () => {
  localStorage.removeItem("access_token");
};

// 로그인 상태 확인용 (true/false)
export const isLoggedIn = () => {
  return !!getAccessToken();
};
