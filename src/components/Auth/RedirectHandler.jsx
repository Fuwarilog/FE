// src/components/RedirectHandler.jsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function RedirectHandler() {
  const navigate = useNavigate();

  useEffect(() => {
    alert("로그인 완료!");
    navigate("/");
  }, [navigate]);

  return <div>로그인 중입니다...</div>;
}