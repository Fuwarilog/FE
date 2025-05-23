import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { com } from "../../data/sample"
import { getPublicPosts } from "../../lib/getPublicPosts";
import Paging from "../../components/ui/paging";

export default function CommunityPage() {
    const [posts, setPosts] = useState([]);
    const navigate = useNavigate();

    // 비공개 -> 리스트 없애기
    const location = useLocation();
    const forceReload = location.state?.forceReload;

    // paging - shadcn
    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 5;

    useEffect(() => {
        const myPosts = getPublicPosts();
        const allPosts = [...com, ...myPosts];

        const sorted = allPosts.sort((a, b) => {
            const dateA = new Date(a.date.replace(/\./g, "-"));
            const dateB = new Date(b.date.replace(/\./g, "-"));
            return dateB - dateA;
        });

        setPosts(sorted);

         window.history.replaceState({}, document.title);
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
                            key={post.id}
                            className="border-b hover:bg-indigo-50 cursor-pointer"
                            onClick={() => navigate(`/community/post/${post.id}`)}
                        >
                            <td className="px-3 py-2 text-center">
                                {indexOfFirstPost + index + 1}
                            </td>
                            <td className="px-3 py-2 text-gray-700">{post.title}</td>
                            <td className="px-3 py-2">{post.userName}</td>
                            <td className="px-3 py-2">{post.date}</td>
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
