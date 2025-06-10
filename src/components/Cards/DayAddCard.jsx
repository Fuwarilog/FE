// src/components/card/DayAddCard.jsx
import { useState } from "react"
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "../ui/dialog"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Textarea } from "../ui/textarea";
import { Calendar } from "../ui/calendar"
import { Popover, PopoverTrigger, PopoverContent } from "../ui/popover"
import { format } from "date-fns"
import { ko } from "date-fns/locale"
import { DialogDescription } from "@radix-ui/react-dialog";

export default function DayAddCard({ onAdd }) {
    const [open, setOpen] = useState(false)
    const [country, setCountry] = useState("")
    const [description, setDescription] = useState("");
    const [startDate, setStartDate] = useState(null)
    const [endDate, setEndDate] = useState(null)

    const handleSave = () => {
        if (!country || !startDate) return;

        const newEvent = {
            title: country,
            description,
            country,
            startDate: format(startDate, "yyyy-MM-dd"),
            endDate: format(endDate || startDate, "yyyy-MM-dd"),
        };

        onAdd(newEvent); 

        setOpen(false);
        setCountry("");
        setDescription("");
        setStartDate(null);
        setEndDate(null);
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button
                    className="!bg-indigo-100 !text-indigo-700 !hover:bg-indigo-300
             !rounded-lg !px-4 !py-2 !font-gangwon !text-[17px] !shadow-sm
             flex items-center justify-center
             !focus:outline-none !focus:ring-0 !focus:border-none !focus:ring-transparent"
                >
                    + 일정 추가
                </Button>

            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle className="font-gangwon text-[22px]">일정 추가</DialogTitle>
                    <DialogDescription className="font-gangwon text-sm text-gray-500"></DialogDescription>
                </DialogHeader>
                <div className="space-y-3">
                    <Input
                        className="border rounded-lg p-2 font-gangwon text-lg"
                        placeholder=" 국가를 입력하세요"
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                    />
                    <Textarea
                        className="w-full border rounded-lg p-3 font-gangwon text-lg"
                        placeholder="여행에 대한 간단한 설명을 입력하세요"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    ></Textarea>
                    <div className="flex items-center gap-2 font-gangwon">
                        {/* 시작일 */}
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button variant="outline" className="w-full font-gangwon">
                                    {startDate ? format(startDate, "yyyy-MM-dd") : "시작일 선택"}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                                <Calendar
                                    mode="single"
                                    selected={startDate}
                                    onSelect={setStartDate}
                                    locale={ko}
                                />
                            </PopoverContent>
                        </Popover>

                        <span className="text-gray-500 font-gangwon">~</span>

                        {/* 종료일 */}
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button variant="outline" className="w-full font-gangwon">
                                    {endDate ? format(endDate, "yyyy-MM-dd") : "종료일 선택"}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                                <Calendar
                                    mode="single"
                                    selected={endDate}
                                    onSelect={setEndDate}
                                    locale={ko}
                                />
                            </PopoverContent>
                        </Popover>
                    </div>
                </div>
                <DialogFooter  className="!flex-row !justify-end !gap-2">
                    <Button onClick={handleSave} className="font-gangwon">저장</Button>
                    <Button variant="outline" onClick={() => setOpen(false)} className="font-gangwon">취소</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog >
    )
}
