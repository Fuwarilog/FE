import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function OAuth2RedirectPage({ setUser }) {
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        // ✅ 1. 쿠키 기반으로 사용자 정보 요청
        const res = await axios.get("http://localhost:8080/api/v1/users/my-info", {
          withCredentials: true, // ✅ 쿠키 전송 필수
        });

        // ✅ 2. 사용자 정보 상태 반영 및 로컬 저장
        setUser(res.data);
        localStorage.setItem("fuwari-user", JSON.stringify(res.data));

        // ✅ 3. 홈으로 이동
        navigate("/");
      } catch (err) {
        console.error("사용자 정보 불러오기 실패", err);
        navigate("/"); // 실패 시에도 홈으로 이동 (필요 시 에러페이지로 변경 가능)
      }
    };

    fetchUser();
  }, [setUser, navigate]);

  return <p className="text-center text-gray-500 mt-10">로그인 처리 중입니다...</p>;
}
