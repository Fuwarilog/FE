// src/API/Auth.js
import axios from "axios";
// ✅ 구글 로그인 (리디렉션 방식)
export function redirectToGoogleLogin() {
  window.location.href = "http://localhost:8080/oauth2/authorization/google";
}

// ✅ 로그인 여부 확인용 (예: 사이드바에 프로필 표시 등)
export const getUserInfo = async () => {
  return await axios.get("/oauth2/redirect", { withCredentials: true });

};
