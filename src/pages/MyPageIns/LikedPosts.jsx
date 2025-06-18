import { useEffect, useState } from "react";
import { getUserInfo, getLikedPosts  } from "../../API/Auth";


export default function LikedPosts() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const load = async () => {
      const user = await getUserInfo();
      const liked = await getLikedPosts(user.id); // 좋아요한 post 리스트
      setPosts(liked);
    };
    load();
  }, []);

  return (
    <div className="space-y-2">
      {posts.length === 0 ? (
        <p className="text-gray-400">좋아요한 게시글이 없습니다.</p>
      ) : (
        posts.map(p => (
          <div key={p._id} className="p-4 bg-red-100 rounded-xl">
            <h3 className="font-semibold">{p.title}</h3>
            <p className="text-sm text-gray-500">{p.summary}</p>
          </div>
        ))
      )}
    </div>
  );
}
