import { useEffect, useState } from "react";
import { getUserInfo } from "../../API/Auth";
import { fetchPosts } from "../../API/Community";

export default function MyPublicPost() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const load = async () => {
      const user = await getUserInfo();
      const all = await fetchPosts();
      const filtered = all.filter(p => p.userId === user.id && !p.isPrivate);
      setPosts(filtered);
    };
    load();
  }, []);

  return (
    <div className="space-y-2">
      {posts.length === 0 ? (
        <p className="text-gray-400">작성한 공개 게시글이 없습니다.</p>
      ) : (
        posts.map(p => (
          <div key={p._id} className="p-4 bg-gray-100 rounded-xl">
            <h3 className="font-semibold">{p.title}</h3>
            <p className="text-sm text-gray-500">{p.summary}</p>
          </div>
        ))
      )}
    </div>
  );
}
