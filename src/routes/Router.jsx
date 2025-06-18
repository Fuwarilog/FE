import { Routes, Route } from "react-router-dom";
import MainPage from "../pages/MainPage";
import LoginPage from "../pages/LoginPage";
import Mypage from "../pages/MyPageIns/MyPage";
import DiaryPage from "../pages/Diary/DiaryPage";
import DiaryWritePage from "../pages/Diary/DiaryWritePage";
import DiaryViewPage from "../pages/Diary/DiaryViewPage";
import CalendarPage from "../pages/CalendarPage";
import RedirectHandler from "../components/Auth/RedirectHandler";
import CommunityPage from "../pages/Community/CommunityPage";
import CommunityDetail from "../pages/Community/CommunityDetail";
import MapPage from "../pages/MapPage";

export default function Router({ user, setUser }) {
  return (
    <Routes>
      <Route path="/" element={<MainPage user={user} />} />
      <Route path="/oauth2/redirect" element={<RedirectHandler />} />
      <Route path="/mypage" element={<Mypage />} />
      <Route path="/diary" element={<DiaryPage />} />
      <Route path="/diary/write" element={<DiaryWritePage />} />
      <Route path="/diary/view" element={<DiaryViewPage />} />
      <Route path="/calendar" element={<CalendarPage />} />

      <Route path="/login" element={<LoginPage />} />
      <Route path="/community" element={<CommunityPage />} />
      <Route path="/community/post/:id" element={<CommunityDetail />} />

      <Route path="/map" element={<MapPage />} />


    </Routes>
  );
}
