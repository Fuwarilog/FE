import axios from "axios";

/**
 * 조회수 증가
 * @param {string|number} postId
 */
export const incrementWatchCount = async (postId) => {
  try {
    const res = await axios.patch(`/api/posts/${postId}/watch`);
    return res.data;
  } catch (err) {
    console.error("조회수 증가 실패:", err);
    throw err;
  }
};

/**
 * 좋아요 증가
 * @param {string|number} postId
 */
export const incrementLikeCount = async (postId) => {
  try {
    const res = await axios.patch(`/api/posts/${postId}/like`);
    return res.data;
  } catch (err) {
    console.error("좋아요 증가 실패:", err);
    throw err;
  }
};
