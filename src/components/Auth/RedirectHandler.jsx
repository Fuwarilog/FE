// src/components/RedirectHandler.jsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function RedirectHandler() {
  const navigate = useNavigate();

  useEffect(() => {
    // 백엔드가 쿠키로 access_token, refresh_token 세팅했으므로 여기서 별도 처리는 없음
    alert("로그인 완료!");
    navigate("/"); // 홈으로 이동
  }, [navigate]);

  return <div>로그인 중입니다...</div>;
}