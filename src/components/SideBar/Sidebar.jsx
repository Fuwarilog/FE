import GoogleLoginButton from "../ui/GoogleLoginButton";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";

export default function Sidebar({ user, setUser }) {
  const handleLoginSuccess = (userData) => {
    localStorage.setItem("fuwari-user", JSON.stringify(userData));
    setUser(user);
  };

  const handleLogout = () => {
    localStorage.removeItem("fuwari-user"); // 저장된 로그인 정보 삭제
    setUser(null); // 상태 초기화
  };
  

  return (
    <aside className="w-64 h-screen bg-white border-r px-6 py-8 flex flex-col items-center">
      
      {/* 로고 */}
      <div className="mb-6">
        <img src="/fuwari.png" alt="logo" className="w-40" />
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
          <GoogleLoginButton onLoginSuccess={handleLoginSuccess} />
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