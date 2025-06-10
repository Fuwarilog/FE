import { useEffect } from "react";
import GoogleLoginButton from "../ui/GoogleLoginButton";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import { getServerUserInfo } from "../../API/AuthServer"; 

export default function Sidebar({ user, setUser }) {
  const handleLoginSuccess = async (userData) => {
  // ✅ 1. googleAccessToken이 userData에 있다고 가정
  const googleAccessToken = userData.credential || userData.accessToken;
  if (!googleAccessToken) {
    console.error("❌ Google AccessToken 없음");
    return;
  }

  try {
    await getServerUserInfo(googleAccessToken); // ✅ 2. JWT 쿠키 요청
  } catch (err) {
    console.error("❌ 서버 로그인 실패", err);
    return;
  }

  // ✅ 3. 사용자 정보 저장
  const user = {
    name: userData.name,
    picture: userData.picture,
  };
  localStorage.setItem("fuwari-user", JSON.stringify(user));
  setUser(user);
};


  useEffect(() => {
    const savedUser = localStorage.getItem("fuwari-user");
    if (savedUser && !user) {
      setUser(JSON.parse(savedUser));
    }
  }, [user, setUser]);

  const handleLogout = () => {
    localStorage.removeItem("fuwari-user"); // 저장된 로그인 정보 삭제
    setUser(null); // 상태 초기화
  };

  return (
    <aside className="w-64 h-screen bg-white border-r px-6 py-8 flex flex-col items-center">

      {/* 로고 */}
      <div className="mb-6">
        <Link to="/">
          <img src="/fuwari.png" alt="logo" className="w-40" />
        </Link>
      </div>

      {/* 모든 버튼 포함 그룹: 메뉴 + 로그인/로그아웃 포함 */}

      <div className="font-gangwon flex flex-col w-full gap-4">
        <Link to="/">
          <Button variant="outline" className="w-full justify-start px-4 py-6 font-semibold text-[16px]">
            HOME
          </Button>
        </Link>

        <Link to="/calendar">
          <Button variant="outline" className="w-full justify-start px-4 py-6 font-semibold text-[16px]">
            CALENDAR
          </Button>
        </Link>

        <Link to="/diary">
          <Button variant="outline" className="w-full justify-start px-4 py-6 font-semibold text-[16px]">
            DIARY
          </Button>
        </Link>
        <Link to="/community">
          <Button variant="outline" className="w-full justify-start px-4 py-6 font-semibold text-[16px]">
            COMMUNITY
          </Button>
        </Link>
        <Link to="/map">
          <Button variant="outline" className="w-full justify-start px-4 py-6 font-semibold text-[16px]">
            MAP
          </Button>
        </Link>
        <Link to="/mypage">
          <Button variant="outline" className="w-full justify-start px-4 py-6 font-semibold text-[16px]">
            MY PAGE
          </Button>
        </Link>

        {/* ✅ 로그인/로그아웃도 같은 그룹에 포함 */}
        {!user ? (
          <GoogleLoginButton />
        ) : (
          <Button
            onClick={() => handleLogout()}
            className="w-full justify-start px-4 py-6 font-semibold text-[16px]"
            variant="outline"
          >
            LOGOUT
          </Button>
        )}
      </div>

    </aside>

  );
}