import { useEffect, useState } from "react";
import axios from "axios";
import { mockUser } from "../data/sample";


export default function Mypage() {
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMyInfo = async () => {
      try {
        const token = localStorage.getItem("access_token"); // 저장된 access_token
        localStorage.getItem("access_token")

        const res = await axios.get("/api/users/my-info", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUserInfo(res.data);
      } catch (err) {
        console.error("❌ 사용자 정보 조회 실패:", err);
        setUserInfo(mockUser);
      } finally {
        setLoading(false);
      }
    };

    fetchMyInfo();
  }, []);

  if (loading) return <p className="p-8">불러오는 중...</p>;

  if (!userInfo) {
    return <p className="p-8 font-pretendard text-red-500">사용자 정보를 불러올 수 없습니다.</p>;
  }

  return (
    <div className="p-8">
      <h2 className="text-xl font-pretendard font-bold mb-4">내 정보</h2>

      <div className="flex items-center gap-4">
        <img
          src={userInfo.picture || "/profile.png"}
          alt="프로필"
          className="w-20 h-20 rounded-full object-cover border"
          onError={(e) => (e.currentTarget.src = "/profile.png")}
        />
        <div>
          <p className="text-lg font-pretendard font-medium">이름: {userInfo.name}</p>
          <p className="text-sm font-pretendard text-gray-600">이메일: {userInfo.email}</p>
        </div>
      </div>
    </div>
  );
}
