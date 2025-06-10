import { useEffect, useState } from "react";
import Router from "./routes/Router";
import Sidebar from "./components/SideBar/Sidebar";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { getAccessToken } from "./lib/token"; // ✅ 토큰 유틸 추가

function App() {
  const [user, setUser] = useState(null);
  const location = useLocation();
  const isMapPage = location.pathname.startsWith("/map");

  useEffect(() => {
    // ✅ 사용자 정보 복구
    const savedUser = localStorage.getItem("fuwari-user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }

    // ✅ access_token 복구 → axios 기본 설정
    const token = getAccessToken();
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
  }, []);

  return (
    <div className="flex h-screen">
      {!isMapPage && <Sidebar user={user} setUser={setUser} />}
      <div className="flex-1 bg-white">
        <Router user={user} setUser={setUser} />
      </div>
    </div>
  );
}

export default App;
