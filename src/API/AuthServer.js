import axios from "axios";
import { setAccessToken } from "../lib/token";

// 구글 accessToken → JWT 발급 → 저장
export const getServerUserInfo = async (googleAccessToken) => {
  const res = await axios.post("http://localhost:8080/api/v1/auth/google-login", {
    accessToken: googleAccessToken,
  });

  const jwtToken = res.data.accessToken;
  if (!jwtToken) throw new Error("JWT 토큰이 응답에 없습니다.");

  setAccessToken(jwtToken);
  return res.data;
};

// 구글 리디렉션 로그인
export function redirectToGoogleLogin() {
  window.location.href = "http://localhost:8080/oauth2/authorization/google";
}
