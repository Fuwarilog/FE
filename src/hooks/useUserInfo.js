// src/hooks/useUserInfo.js
import { useEffect, useState } from "react";
import axios from "axios";

export const useUserInfo = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("http://localhost:8080/api/v1/users/my-info", {
          withCredentials: true, // ✅ 쿠키 인증 방식이면 이거 필수
        });
        setUser(res.data);
      } catch (err) {
        console.error("사용자 정보 조회 실패", err);
      }
    };

    fetchUser();
  }, []);

  return user;
};
