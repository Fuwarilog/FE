// ✅ API/Auth.js
import axios from "axios";

export const loginWithGoogle = async (token) => {
  return await axios.post("/api/auth/google", { token });
};

export const getUserInfo = async () => {
  return await axios.get("/api/user/me");
};
