export default function DiaryList({ diaries }) {
    if (diaries.length === 0) {
      return <p className="text-gray-500">작성한 다이어리가 없습니다.</p>;
    }
  
    return (
      <ul className="space-y-4">
        {diaries.map((diary) => (
          <li key={diary.id} className="border p-4 rounded shadow">
            <h3 className="font-bold text-lg">{diary.title}</h3>
            <p className="text-sm text-gray-600">
              {diary.date} · {diary.location}
            </p>
            <p className="text-sm">환율: {diary.rate}</p>
            <p className="mt-2 whitespace-pre-line">{diary.content}</p>
          </li>
        ))}
      </ul>
    );
  }
  