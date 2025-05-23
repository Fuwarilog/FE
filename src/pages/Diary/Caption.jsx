// components/Diary/caption.jsx
import { format } from "date-fns";
import { ko } from "date-fns/locale";

export default function CustomCaption({ displayMonth, nextMonth, previousMonth, goToMonth }) {
  return (
    <div className="flex items-center justify-center gap-6 py-2">
      {/* 이전 버튼 */}
      <button
        onClick={() => previousMonth && goToMonth(previousMonth)}
        className="text-gray-600 text-lg"
      >
        ◀
      </button>

      {/* 월/년도 텍스트 */}
      <span className="text-base font-medium">
        {format(displayMonth, "yyyy년 M월", { locale: ko })}
      </span>

      {/* 다음 버튼 */}
      <button
        onClick={() => nextMonth && goToMonth(nextMonth)}
        className="text-gray-600 text-lg"
      >
        ▶
      </button>
    </div>
  );
}