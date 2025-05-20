import { useEffect, useState } from "react";
import { getUserInfo } from "../API/Auth";

export default function Mypage() {
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMyInfo = async () => {
      try {
        const res = await getUserInfo(); 
        setUserInfo(res.data);
      } catch (err) {
        console.error("❌ 사용자 정보 조회 실패:", err);
        setUserInfo(null);
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
      <h2 className="text-xl font-gangwon font-bold mb-4">내 정보</h2>

      <div className="flex items-center gap-4">
        <img
          src={userInfo.picture || "/profile.png"}
          alt="프로필"
          className="w-20 h-20 rounded-full object-cover border"
          onError={(e) => (e.currentTarget.src = "/profile.png")}
        />
        <div>
          <p className="text-xl font-gangwon font-medium">이름: {userInfo.name}</p>
          <p className="text-base font-gangwon text-gray-600">이메일: {userInfo.email}</p>
        </div>
      </div>
    </div>
  );
}