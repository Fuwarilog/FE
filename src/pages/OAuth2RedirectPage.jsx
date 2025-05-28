import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function OAuth2RedirectPage({setUser}) {
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("http://localhost:8080/api/v1/users/my-info", {
          withCredentials: true,
        });
        setUser(res.data); // ✅ 상태 반영
        localStorage.setItem("fuwari-user", JSON.stringify(res.data)); // optional
        navigate("/");
      } catch (err) {
        console.log("사용자 정보 불러오기 실패", err);
        navigate("/"); // 로그인 실패로 간주
      }
    };

    fetchUser();
  }, []);

  return <p>로그인 처리 중입니다...</p>;
}
