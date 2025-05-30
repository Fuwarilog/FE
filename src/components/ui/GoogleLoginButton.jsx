import { redirectToGoogleLogin } from "../../API/Auth"; // 리디렉션 함수 import
import { Button } from "./button"; // shadcn의 버튼 컴포넌트

export default function GoogleLoginButton() {
  
  return (
    <Button
      onClick={redirectToGoogleLogin}
      className="w-full justify-start px-4 py-6 font-semibold text-[16px]"
      variant="outline"
    >
      LOGIN
    </Button>
  );
}
