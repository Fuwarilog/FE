import { useState } from "react";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Card } from "../ui/card";
import  DatePicker  from "../ui/datepicker";

export default function DiaryEditor({ onSave }) {
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [rate, setRate] = useState("9.53");
  const [content, setContent] = useState("");
  const [date, setDate] = useState(new Date());

  const handleSubmit = (e) => {
    e.preventDefault();
    const diary = {
      id: crypto.randomUUID(),
      title,
      date,
      location,
      rate,
      content,
    };
    onSave(diary);
    setTitle("");
    setDate("");
    setLocation("");
    setRate("9.53");
    setContent("");
  };

  return (
    <Card className="max-w-2xl mx-auto p-6 shadow-md">
      <form onSubmit={handleSubmit} className="space-y-6">
        <h2 className="text-2xl font-semibold text-center">다이어리 작성</h2>

        <div className="flex flex-col gap-1">
          <Label htmlFor="title">제목</Label>
          <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </div>

        <div className="flex flex-col gap-1">
          <Label htmlFor="date">날짜</Label>
          <DatePicker date={date} setDate={setDate} />
        </div>

        <div className="flex flex-col gap-1">
          <Label htmlFor="location">여행지</Label>
          <Input id="location" placeholder="예: 도쿄" value={location} onChange={(e) => setLocation(e.target.value)} required />
        </div>

        <div className="flex flex-col gap-1">
          <Label htmlFor="rate">환율</Label>
          <Input id="rate" value={rate} onChange={(e) => setRate(e.target.value)} required />
        </div>

        <div className="flex flex-col gap-1">
          <Label htmlFor="content">내용</Label>
          <Textarea id="content" value={content} onChange={(e) => setContent(e.target.value)} rows={5} required />
        </div>

        <Button type="submit" className="w-full">저장하기</Button>
      </form>
    </Card>
  );
}
