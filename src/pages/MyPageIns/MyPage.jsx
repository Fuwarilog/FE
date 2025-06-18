import { useUserInfo } from "../../hooks/useUserInfo";

export default function Mypage() {
    const user = useUserInfo();

    if (!user) {
      return <p className="p-8 font-pretendard text-red-500">사용자 정보를 불러올 수 없습니다.</p>;
    }

    return (
      <div className="p-8">
        <h2 className="text-xl font-gangwon font-bold mb-4">내 정보</h2>

        <div className="flex items-center gap-4">
          <img
            src={user.picture || "/profile.png"}
            alt="프로필"
            className="w-20 h-20 rounded-full object-cover border"
            onError={(e) => (e.currentTarget.src = "/profile.png")}
          />
          <div>
            <p className="text-xl font-gangwon font-medium">이름: {user.name}</p>
            <p className="text-base font-gangwon text-gray-600">이메일: {user.email}</p>
          </div>
        </div>
      </div>
    );
  }