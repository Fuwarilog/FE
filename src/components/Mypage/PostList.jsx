import { useNavigate } from "react-router-dom";
import { format, parseISO } from "date-fns";

export default function PostList({ posts = [] }) {
  const navigate = useNavigate();

  if (posts.length === 0) {
    return (
      <div className="text-gray-400 font-gangwon py-6 text-center">
        게시글이 없습니다.
      </div>
    );
  }

  return (
    <ul className="space-y-4">
      {posts.map((post) => (
        <li
          key={post.postId}
          className="p-4 border rounded-xl shadow-sm hover:shadow-md transition bg-white"
        >
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-lg font-semibold font-gangwon">
                {post.date
                  ? `${format(parseISO(post.date), "yyyy.MM.dd")}의 기록`
                  : `게시글 #${post.postId}`}
              </h3>
            </div>
            <button
              onClick={() => navigate(`/community/post/${post.postId}`)}
              className="text-blue-600 hover:underline font-gangwon"
            >
              보기
            </button>
          </div>
        </li>
      ))}

    </ul>
  );
}
