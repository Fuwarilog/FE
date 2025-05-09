import { GoogleLogin } from "@react-oauth/google";

const LoginPage = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="p-8 bg-white rounded shadow text-center">
        <h2 className="text-xl font-semibold mb-4">Fuwari Log 로그인</h2>

        <GoogleLogin
          onSuccess={(credentialResponse) => {
            console.log("✅ 로그인 성공:", credentialResponse);
          }}
          onError={() => {
            console.log("❌ 로그인 실패");
          }}
          width="300px"
        />
      </div>
    </div>
  );
};

export default LoginPage;
