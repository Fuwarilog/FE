// src/API/Auth.js
import axios from "axios";
// ✅ 구글 로그인 (리디렉션 방식)
export function redirectToGoogleLogin() {
  window.location.href = "http://localhost:8080/oauth2/authorization/google";
}

// ✅ 사용자 정보 조회 (쿠키 기반)
export const getUserInfo = async () => {
  return await axios.get("/api/v1/users/my-info", {
    withCredentials: true, // 💡 이거만 있으면 됨!
  });
};
