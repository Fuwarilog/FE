import { useState } from "react";
import DiaryForm from "../components/Diary/DiaryEditor";

export default function DiaryPage() {
  const [diaries, setDiaries] = useState([]);

  const handleSave = (newDiary) => {
    setDiaries((prev) => [...prev, newDiary]);
  };

  return (
    <div className="p-8">
      <DiaryForm onSave={handleSave} />

      <hr className="my-8" />

      <h2 className="text-xl font-bold mb-4">📖 작성한 다이어리</h2>
      <ul className="space-y-4">
        {diaries.map((diary) => (
          <li key={diary.id} className="border p-4 rounded shadow">
            <h3 className="font-bold text-lg">{diary.title}</h3>
            <p className="text-sm text-gray-600">{diary.date} · {diary.location}</p>
            <p className="text-sm">환율: {diary.rate} </p>
            <p className="mt-2 whitespace-pre-line">{diary.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
