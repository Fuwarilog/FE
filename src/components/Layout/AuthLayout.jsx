export default function AuthLayout({ children, user }) {
  return (
    <div className="w-full h-screen bg-gray-50 overflow-y-auto relative">
      {/* ✅ 사용자 정보 표시 */}
      {user && (
        <div className="absolute top-4 right-6 z-50 flex flex-col items-center">
          <img
            src={user.picture || "/profile.png"}
            onError={(e) => (e.currentTarget.src = "/profile.png")}
            alt="프로필"
            className="w-8 h-8 rounded-full object-cover border"
          />
          <span className="mt-1 text-xs font-medium">{user.name}</span>
        </div>
      )}

      <main className="px-6 py-8">{children}</main>
    </div>
  );
}
