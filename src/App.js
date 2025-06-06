import { useEffect, useState } from "react";
import Router from "./routes/Router";
import Sidebar from "./components/SideBar/Sidebar";
import { useLocation } from "react-router-dom";

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
