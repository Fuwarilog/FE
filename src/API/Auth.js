import axios from "axios";

// 내 정보 조회
export const getUserInfo = async () => {
  try {
    const res = await axios.get("http://localhost:8080/api/v1/users/my-info", {
      withCredentials: true, // ✅ 쿠키 포함
    });
    return res.data;
  } catch (err) {
    console.warn("❗ 사용자 정보 요청 실패:", err.response?.data || err.message);
    return null;
  }
};

// 내가 좋아요한 게시글 조회
export const getLikedPosts = async () => {
  try {
    const res = await axios.get("http://localhost:8080/api/v1/users/my-like-post", {
      withCredentials: true,
    });
    return res.data;
  } catch (err) {
    console.warn("❗ 좋아요한 게시글 요청 실패:", err.response?.data || err.message);
    return [];
  }
};
// 내가 북마크한 게시글 조회
export const getBookmarkedPosts = async () => {
  try {
    const res = await axios.get("http://localhost:8080/api/v1/users/my-bookmark-post", {
      withCredentials: true,
    });
    return res.data;
  } catch (err) {
    console.warn("❗ 북마크한 게시글 요청 실패:", err.response?.data || err.message);
    return [];
  }
};