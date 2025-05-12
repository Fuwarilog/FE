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
import { Calendar } from "../ui/calendar"
import { Popover, PopoverTrigger, PopoverContent } from "../ui/popover"
import { format } from "date-fns"
import { ko } from "date-fns/locale"

export default function DayAddCard({ onAdd }) {
    const [open, setOpen] = useState(false)
    const [country, setCountry] = useState("")
    const [startDate, setStartDate] = useState("")
    const [endDate, setEndDate] = useState("")

    const handleSave = () => {
        if (!country || !startDate) return
        onAdd({
            id: Date.now(),
            title: country,
            start: startDate,
            end: endDate || startDate,
        })
        setOpen(false)
        setCountry("")
        setStartDate("")
        setEndDate("")
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="!bg-indigo-100 !text-indigo-700 !hover:bg-indigo-200 !rounded-lg !px-4 !py-2 !font-pretendard !shadow-sm">
                    + 일정 추가
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>일정 추가</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                    <Input
                        className="font-pretendard"
                        placeholder="국가를 입력하세요"
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                    />
                    <div className="flex items-center gap-2 font-pretendard">
                        {/* 시작일 */}
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button variant="outline" className="w-full font-pretendard">
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

                        <span className="text-gray-500 font-pretendard">~</span>

                        {/* 종료일 */}
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button variant="outline" className="w-full font-pretendard">
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
                <DialogFooter>
                    <Button onClick={handleSave} className="font-pretendard">저장</Button>
                    <Button variant="outline" onClick={() => setOpen(false)} className="font-pretendard">취소</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog >
    )
}
