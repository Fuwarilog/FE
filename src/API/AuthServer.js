import axios from "axios";

// Spring 서버에 쿠키 기반 JWT로 사용자 정보 요청
export const getServerUserInfo  = async (googleAccessToken) => {
  await axios.post("http://localhost:8080/api/v1/auth/google-login", {
    accessToken: googleAccessToken, 
  }, {
    withCredentials: true, 
  });
};
