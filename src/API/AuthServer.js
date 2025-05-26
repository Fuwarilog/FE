import axios from "axios";

// Spring 서버에 쿠키 기반 JWT로 사용자 정보 요청
export const getServerUserInfo = async () => {
  return await axios.get("http://localhost:8080/api/v1/users/my-info", {
    withCredentials: true, // ✅ 쿠키 기반 인증
  });
};
