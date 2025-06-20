import { useUserInfo } from "../hooks/useUserInfo";
import { useEffect, useState } from "react";
import {
  getLikedPosts,
  getBookmarkedPosts,
} from "../API/Auth";
import { fetchAllDiaries as fetchPosts, fetchPublicDiaryLists } from "../API/Diary";
import PostList from "../components/Mypage/PostList";

export default function MyPage() {
  const user = useUserInfo();
  const [selected, setSelected] = useState("liked");

  const [liked, setLiked] = useState([]);
  const [bookmarked, setBookmarked] = useState([]);
  const [myPublic, setMyPublic] = useState([]);

  useEffect(() => {
    if (!user) return;
     getLikedPosts().then((res) => {
    console.log("💖 좋아요한 게시글 응답:", res.postLikes);
    setLiked(res.postLikes);
  });
    getBookmarkedPosts().then(setBookmarked);

    // fetchPosts 통해서 diaryId 추출 -> fetchPublicDiaryLists 불러오기
    fetchPosts().then((posts) => {
      const diaryIds = posts
        .flatMap((p) => p.diaries)
        .map((d) => d.id);

      Promise.all(diaryIds.map((id) => fetchPublicDiaryLists(id)))
        .then((results) => {
          const allPublic = results.flat();
          setMyPublic(allPublic);
        });
    });

  }, [user]);


const selectedData = (() => {
  if (selected === "liked") {
    return Array.isArray(liked) ? liked : [];
  } else if (selected === "bookmark") {
    return Array.isArray(bookmarked?.posts) ? bookmarked.posts : [];
  } else {
    return Array.isArray(myPublic) ? myPublic : [];
  }
})();


  return (
    <div className="p-8 space-y-10 max-w-6xl mx-auto">
      {/* 내 정보 */}
      <section>
        <h2 className="text-xl font-bold font-gangwon mb-4">내 정보</h2>
        <div className="flex items-center gap-4">
          <img
            src={user?.picture || "/profile.png"}
            alt="프로필"
            className="w-20 h-20 rounded-full border object-cover"
          />
          <div>
            <p className="text-lg font-gangwon">이름: {user?.name}</p>
            <p className="text-gray-600 font-gangwon">{user?.email}</p>
          </div>
        </div>
      </section>

      {/* 테이블 형식 메뉴 */}
      <section className="w-1/2 text-left">
        <table className="w-full table-fixed text-center border-separate border-spacing-y-2">

          <tbody>
            <tr>
              <td
                onClick={() => setSelected("liked")}
                className={`py-4 border-r border-b cursor-pointer font-gangwon text-[16px] ${selected === "liked"
                  ? "bg-slate-100 font-bold text-neutral-700"
                  : "hover:bg-slate-50"
                  }`}
              >
                내가 좋아요 한 게시글
              </td>
              <td
                onClick={() => setSelected("bookmark")}
                className={`py-4 border-b cursor-pointer font-gangwon text-[16px] ${selected === "bookmark"
                  ? "bg-slate-100 font-bold text-neutral-700"
                  : "hover:bg-slate-50"
                  }`}
              >
                내가 북마크 한 게시글
              </td>
            </tr>

          </tbody>
        </table>
      </section>

      {/* 선택된 게시글 목록 */}
      <section>
        <h3 className="text-lg font-bold font-gangwon mt-4 mb-2">
          {selected === "liked"
            ? "❤️ 내가 좋아요한 게시글"
            : selected === "bookmark"
              ? "⭐ 내가 북마크한 게시글"
              : "📘 내가 작성한 공개글"}
        </h3>
        <PostList posts={selectedData} />
      </section>
    </div>
  );
}

//<tr>
//              <td
//                onClick={() => setSelected("public")}
//                className={`py-4 border-r cursor-pointer font-gangwon text-[16px] ${selected === "public"
//                  ? "bg-slate-100 font-bold text-neutral-700"
//                  : "hover:bg-slate-50"
//                  }`}
//              >
//                내가 공개한 게시글
//              </td>
//              <td className="py-4 text-gray-300 font-gangwon">-</td>
//            </tr>