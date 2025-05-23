// src/lib/axiosInstance.js
import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8080", // API 서버 주소
  withCredentials: true,            // 쿠키 포함
});

export default instance;
