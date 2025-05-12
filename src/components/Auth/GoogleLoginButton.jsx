import React from "react";
import { redirectToGoogleLogin } from "../../API/Auth";

export default function GoogleLoginButton() {
  return (
    <button
      onClick={redirectToGoogleLogin}
      className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-500"
    >
      Google 로그인
    </button>
  );
}
