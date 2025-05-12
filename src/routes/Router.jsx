import { Routes, Route } from "react-router-dom";
import MainPage from "../pages/MainPage";
import LoginPage from "../pages/LoginPage";
import Mypage from "../pages/MyPage";
import DiaryPage from "../pages/DiaryPage";
import DiaryWritePage from "../pages/DiaryWritePage";
import DiaryViewPage from "../pages/DiaryViewPage";
import CalendarPage from "../pages/CalendarPage";
import RedirectHandler from "../components/Auth/RedirectHandler";

export default function Router({user, setUser}) {
  return (
      <Routes>
        <Route path="/" element={<MainPage user={user} />} />
        <Route path="/oauth2/redirect" element={<RedirectHandler />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/mypage" element={<Mypage />} />
        <Route path="/diary" element={<DiaryPage />} />
        <Route path="/diary/write" element={<DiaryWritePage />} />
        <Route path="/diary/view" element={<DiaryViewPage />} />
        <Route path="/calendar" element={<CalendarPage />} />
      </Routes>
  );
}
