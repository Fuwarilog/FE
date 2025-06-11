import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { fetchPosts } from "../../API/Community";
import Paging from "../../components/ui/paging";

export default function CommunityPage() {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const forceReload = location.state?.forceReload;

  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 5;

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const res = await fetchPosts();
        console.log("📥 posts 확인:", res.data);
        setPosts(res.data);
        window.history.replaceState({}, document.title);
      } catch (err) {
        console.error("게시글 목록 불러오기 실패", err);
      }
    };
    loadPosts();
  }, [forceReload]);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  return (
    <div className="relative min-h-screen">
      <table className="w-full table-fixed border-collapse">
        <thead className="bg-indigo-100 text-left text-xl font-semibold font-gangwon text-gray-700">
          <tr>
            <th className="w-10 px-3 py-2">No.</th>
            <th className="px-3 py-2 text-center">제목</th>
            <th className="w-24 px-3 py-2">작성자</th>
            <th className="w-24 px-3 py-2">작성일</th>
            <th className="w-16 px-3 py-2">조회</th>
            <th className="w-16 px-3 py-2">좋아요</th>
          </tr>
        </thead>
        <tbody className="bg-white text-base text-gray-800 font-gangwon">
          {currentPosts.map((post, index) => (
            <tr
              key={`${post.id || post.diaryListId || index}`}
              className="border-b hover:bg-indigo-50 cursor-pointer"
              onClick={() => navigate(`/community/post/${post.id}`)}
            >
              <td className="px-3 py-2 text-center">{indexOfFirstPost + index + 1}</td>
              <td className="px-3 py-2 text-gray-700">{post.title}</td>
              <td className="px-3 py-2">{post.userName}</td>
              <td className="px-3 py-2">{post.createdDate?.substring(0, 10)}</td>
              <td className="px-3 py-2 text-center">{post.views}</td>
              <td className="px-3 py-2 text-center">{post.likes}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="absolute left-1/2 bottom-8 transform -translate-x-1/2">
        <Paging
          currentPage={currentPage}
          totalItems={posts.length}
          itemsPerPage={postsPerPage}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
}