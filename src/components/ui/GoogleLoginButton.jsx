import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { Button } from "./button"; // shadcn 버튼

export default function GoogleLoginButton({ onLoginSuccess }) {
  const login = useGoogleLogin({
    scope: "profile email",
    prompt: "consent select_account",

    onSuccess: async (tokenResponse) => {
    const accessToken = tokenResponse.access_token;
    localStorage.setItem("access_token", accessToken);

      try {
        const res = await axios.get("https://www.googleapis.com/oauth2/v3/userinfo", {
          headers: {
            Authorization: `Bearer ${tokenResponse.access_token}`,
          },
        });

        const userData = res.data;
        console.log("✅ 사용자 정보:", userData);

        localStorage.setItem("fuwari-user", JSON.stringify(userData));

        //setUser 연결
        onLoginSuccess(userData);
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
      className="w-full font-semibold text-[16px] py-6 bg-white text-black border border-gray rounded-xl shadow-none flex items-center justify-center gap-2"
      variant="outline"
    >
      LOGIN
    </Button>
  );
}