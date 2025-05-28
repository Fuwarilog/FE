import axios from "axios";
// ✅ 구글 로그인 (리디렉션 방식)
export function redirectToGoogleLogin() {
  window.location.href = "http://localhost:8080/oauth2/authorization/google";
}

export const getUserInfo = async () => {
  const accessToken = localStorage.getItem("access_token");
  if (!accessToken) throw new Error("JWT가 없습니다");

  const response = await axios.get("http://localhost:8080/api/v1/users/my-info", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return response.data;
};
