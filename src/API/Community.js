import axios from "axios";
import { getAccessToken } from "../lib/token";

// 게시글 목록 조회
export const fetchPosts = async () => {
  return await axios.get("http://localhost:8080/api/v1/posts", {
    headers: {
      Authorization: `Bearer ${getAccessToken()}`,
    },
    withCredentials: true,
  });
};

// 북마크 등록 / 취소
export const editPostBookmark = async (postId) => {
  return await axios.post(
    `http://localhost:8080/api/v1/posts/bookmarks/${postId}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
      },
      withCredentials: true,
    }
  );
};

// 좋아요 등록 / 취소
export const editPostLikes = async (postId) => {
  return await axios.post(
    `http://localhost:8080/api/v1/posts/likes/${postId}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
      },
      withCredentials: true,
    }
  );
};
