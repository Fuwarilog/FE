import { Routes, Route } from "react-router-dom";
import MainPage from "../pages/MainPage";
import LoginPage from "../pages/LoginPage";
import Mypage from "../pages/MyPage";
import DiaryPage from "../pages/DiaryPage";

export default function Router({user, setUser}) {
  return (
      <Routes>
        <Route path="/" element={<MainPage user={user} />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/mypage" element={<Mypage />} />
        <Route path="/diary" element={<DiaryPage />} />
      </Routes>
  );
}
