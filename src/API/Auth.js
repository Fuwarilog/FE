import axios from "axios";
import { getAccessToken } from "../lib/token";

export const getUserInfo = async () => {
  const token = getAccessToken();
  if (!token) throw new Error("JWT가 없습니다");

  const response = await axios.get("http://localhost:8080/api/v1/users/my-info", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });

  return response.data;
};
