import { redirectToGoogleLogin } from "../../API/AuthServer"; 
import { Button } from "../ui/button"; // shadcn의 버튼 컴포넌트

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
