import React, { useState } from 'react';
import { RaidPlan } from '@/types';
import { Calendar } from "@/components/ui/calendar";
import { ko } from "date-fns/locale";
import { format } from "date-fns";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAdmin } from '@/contexts/AdminContext';

interface RaidPlanCreationProps {
  onCreateRaidPlan: (
    date: string,
    time: string,
    dungeonName: string,
    minimumParticipants: number,
    minimumItemLevel: number,
    raidLeader: string,
    details: string
  ) => void;
  onUpdateRaidPlan?: (raidPlan: RaidPlan) => void;
  currentRaidPlan?: RaidPlan;
}

const RaidPlanCreation: React.FC<RaidPlanCreationProps> = ({ 
  onCreateRaidPlan, 
  onUpdateRaidPlan,
  currentRaidPlan 
}) => {
  const { isAdmin } = useAdmin();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [time, setTime] = useState('');
  const [dungeonName, setDungeonName] = useState('');
  const [minimumParticipants, setMinimumParticipants] = useState(10);
  const [minimumItemLevel, setMinimumItemLevel] = useState(600);
  const [raidLeader, setRaidLeader] = useState('');
  const [details, setDetails] = useState('');

  // 30분 단위로 시간 옵션 생성 (18:00부터)
  const timeOptions = Array.from({ length: 13 }, (_, i) => {
    const hour = Math.floor(i / 2) + 18;
    const minute = i % 2 === 0 ? '00' : '30';
    return `${hour}:${minute}`;
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedDate && time && dungeonName && raidLeader) {
      const formattedDate = format(selectedDate, 'M월 d일');
      
      if (isEditing && currentRaidPlan && onUpdateRaidPlan) {
        onUpdateRaidPlan({
          ...currentRaidPlan,
          date: formattedDate,
          time,
          dungeonName,
          minimumParticipants,
          minimumItemLevel,
          raidLeader,
          details
        });
      } else {
        onCreateRaidPlan(
          formattedDate, 
          time, 
          dungeonName, 
          minimumParticipants, 
          minimumItemLevel, 
          raidLeader,
          details
        );
      }
      
      setIsFormOpen(false);
      setIsEditing(false);
      
      // Reset form
      setSelectedDate(undefined);
      setTime('');
      setDungeonName('');
      setMinimumParticipants(10);
      setMinimumItemLevel(600);
      setRaidLeader('');
      setDetails('');
    }
  };

  const handleEdit = () => {
    if (currentRaidPlan) {
      setIsEditing(true);
      setIsFormOpen(true);
      
      // Parse the date string (e.g., "3월 25일") to Date object
      const dateRegex = /(\d+)월\s*(\d+)일/;
      const matches = currentRaidPlan.date.match(dateRegex);
      if (matches) {
        const month = parseInt(matches[1]) - 1; // 0-based month
        const day = parseInt(matches[2]);
        const currentYear = new Date().getFullYear();
        setSelectedDate(new Date(currentYear, month, day));
      }
      
      setTime(currentRaidPlan.time);
      setDungeonName(currentRaidPlan.dungeonName);
      setMinimumParticipants(currentRaidPlan.minimumParticipants);
      setMinimumItemLevel(currentRaidPlan.minimumItemLevel);
      setRaidLeader(currentRaidPlan.raidLeader);
      setDetails(currentRaidPlan.details || '');
    }
  };

  return (
    <div className="mt-4">
      {isAdmin ? (
        !isFormOpen ? (
          <div className="grid grid-cols-2 gap-3">
            <button 
              onClick={() => {
                setIsEditing(false);
                setIsFormOpen(true);
              }} 
              className="rounded bg-purple-600 py-3 text-white text-lg transition-colors hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
            >
              새 레이드 생성
            </button>
            {currentRaidPlan && (
              <button 
                onClick={handleEdit}
                className="rounded bg-blue-600 py-3 text-white text-lg transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                수정
              </button>
            )}
          </div>
        ) : (
          <div className="rounded-lg border border-white/20 bg-slate-900/50 p-4">
            <h2 className="text-xl font-semibold text-white mb-3">
              {isEditing ? '레이드 일정 수정' : '새 레이드 일정 생성'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="block text-white/80 mb-1 text-sm">날짜</label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal bg-slate-800/50 border-white/20 text-white hover:bg-slate-700/50",
                          !selectedDate && "text-white/50"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {selectedDate ? format(selectedDate, 'PPP', { locale: ko }) : "날짜 선택"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0 bg-slate-800 border-white/20">
                      <Calendar
                        mode="single"
                        selected={selectedDate}
                        onSelect={setSelectedDate}
                        locale={ko}
                        className="bg-slate-800 text-white"
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div>
                  <label className="block text-white/80 mb-1 text-sm">시작 시간</label>
                  <Select value={time} onValueChange={setTime}>
                    <SelectTrigger className="w-full bg-slate-800/50 border-white/20 text-white">
                      <SelectValue placeholder="시작 시간 선택" />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-800 border-white/20">
                      {timeOptions.map((timeOption) => (
                        <SelectItem
                          key={timeOption}
                          value={timeOption}
                          className="text-white focus:bg-slate-700 focus:text-white"
                        >
                          {timeOption}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <label className="block text-white/80 mb-1 text-sm">던전</label>
                <input
                  type="text"
                  value={dungeonName}
                  onChange={(e) => setDungeonName(e.target.value)}
                  placeholder="언더마인 해방전선(영웅) / 3탐 등"
                  className="w-full rounded border border-white/20 bg-slate-800/50 px-3 py-2 text-white placeholder:text-white/50 focus:border-white/40 focus:outline-none"
                  required
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="block text-white/80 mb-1 text-sm">최소 인원</label>
                  <input
                    type="number"
                    value={minimumParticipants}
                    onChange={(e) => setMinimumParticipants(parseInt(e.target.value))}
                    min={5}
                    className="w-full rounded border border-white/20 bg-slate-800/50 px-3 py-2 text-white placeholder:text-white/50 focus:border-white/40 focus:outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-white/80 mb-1 text-sm">최소 아이템 레벨</label>
                  <input
                    type="number"
                    value={minimumItemLevel}
                    onChange={(e) => setMinimumItemLevel(parseInt(e.target.value))}
                    min={0}
                    className="w-full rounded border border-white/20 bg-slate-800/50 px-3 py-2 text-white placeholder:text-white/50 focus:border-white/40 focus:outline-none"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-white/80 mb-1 text-sm">공대장</label>
                <input
                  type="text"
                  value={raidLeader}
                  onChange={(e) => setRaidLeader(e.target.value)}
                  placeholder="캐릭터 이름"
                  className="w-full rounded border border-white/20 bg-slate-800/50 px-3 py-2 text-white placeholder:text-white/50 focus:border-white/40 focus:outline-none"
                  required
                />
              </div>
              <div>
                <label className="block text-white/80 mb-1 text-sm">세부사항</label>
                <textarea
                  value={details}
                  onChange={(e) => setDetails(e.target.value)}
                  placeholder="예) 2탐, 길드원만 1천 올분 팟"
                  className="w-full rounded border border-white/20 bg-slate-800/50 px-3 py-2 text-white placeholder:text-white/50 focus:border-white/40 focus:outline-none min-h-[80px]"
                />
              </div>
              <div className="grid grid-cols-2 gap-3 pt-2">
                <button 
                  type="button" 
                  onClick={() => {
                    setIsFormOpen(false);
                    setIsEditing(false);
                  }} 
                  className="rounded border border-white/20 bg-slate-800/50 py-2 px-4 text-white transition-colors hover:bg-slate-700/50 focus:outline-none focus:ring-2 focus:ring-white/20"
                >
                  취소
                </button>
                <button 
                  type="submit" 
                  className={`rounded py-2 px-4 text-white text-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                    isEditing 
                      ? "bg-blue-600 hover:bg-blue-700 focus:ring-blue-500" 
                      : "bg-purple-600 hover:bg-purple-700 focus:ring-purple-500"
                  }`}
                >
                  {isEditing ? '수정하기' : '생성하기'}
                </button>
              </div>
            </form>
          </div>
        )
      ) : null}
    </div>
  );
};

export default RaidPlanCreation;
