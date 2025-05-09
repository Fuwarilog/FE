import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { Button } from "./button"; // shadcn 버튼
import { FcGoogle } from "react-icons/fc";

export default function GoogleLoginButton({ onLoginSuccess }) {
  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const res = await axios.get("https://www.googleapis.com/oauth2/v3/userinfo", {
          headers: {
            Authorization: `Bearer ${tokenResponse.access_token}`,
          },
        });

        const userData = res.data;
        console.log("✅ 사용자 정보:", userData);

        // ✅ Sidebar → handleLoginSuccess → setUser({ name, picture })로 연결됨
        onLoginSuccess({
          name: userData.name,
          picture: userData.picture,
        });
      } catch (err) {
        console.error("❌ 사용자 정보 불러오기 실패:", err);
      }
    },
    onError: () => {
      console.log("❌ 로그인 실패");
    },
  });

  return (
    <Button
      onClick={() => login()}
      className="w-full text-lg py-6 bg-white text-black border border-gray rounded-xl shadow-none flex items-center justify-center gap-2"
      variant="outline"
    >
      <FcGoogle size={20} />
      로그인
    </Button>
  );
}
