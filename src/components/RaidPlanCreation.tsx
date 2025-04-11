import React, { useState } from 'react';

interface RaidPlanCreationProps {
  onCreateRaidPlan: (date: string, time: string, dungeonName: string, minimumParticipants: number, raidLeader: string) => void;
}

const RaidPlanCreation: React.FC<RaidPlanCreationProps> = ({ onCreateRaidPlan }) => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [dungeonName, setDungeonName] = useState('');
  const [minimumParticipants, setMinimumParticipants] = useState(10);
  const [raidLeader, setRaidLeader] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (date && time && dungeonName && raidLeader) {
      onCreateRaidPlan(date, time, dungeonName, minimumParticipants, raidLeader);
      setIsFormOpen(false);
      // Reset form
      setDate('');
      setTime('');
      setDungeonName('');
      setMinimumParticipants(10);
      setRaidLeader('');
    }
  };

  return (
    <div className="mt-4">
      {!isFormOpen ? (
        <button 
          onClick={() => setIsFormOpen(true)} 
          className="w-full rounded border border-white/20 bg-slate-800/50 py-3 text-white transition-colors hover:bg-slate-700/50 focus:outline-none focus:ring-2 focus:ring-white/20"
        >
          새 레이드 생성
        </button>
      ) : (
        <div className="rounded-lg border border-white/20 bg-slate-900/50 p-4">
          <h2 className="text-xl font-semibold text-white mb-3">새 레이드 일정 생성</h2>
          <form onSubmit={handleSubmit} className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-white/80 mb-1 text-sm">날짜</label>
                <input
                  type="text"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  placeholder="3월 25일"
                  className="w-full rounded border border-white/20 bg-slate-800/50 px-3 py-2 text-white placeholder:text-white/50 focus:border-white/40 focus:outline-none"
                  required
                />
              </div>
              <div>
                <label className="block text-white/80 mb-1 text-sm">시간</label>
                <input
                  type="text"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  placeholder="20:00"
                  className="w-full rounded border border-white/20 bg-slate-800/50 px-3 py-2 text-white placeholder:text-white/50 focus:border-white/40 focus:outline-none"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-white/80 mb-1 text-sm">던전 이름</label>
              <input
                type="text"
                value={dungeonName}
                onChange={(e) => setDungeonName(e.target.value)}
                placeholder="현신의 금고"
                className="w-full rounded border border-white/20 bg-slate-800/50 px-3 py-2 text-white placeholder:text-white/50 focus:border-white/40 focus:outline-none"
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
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
            </div>
            <div className="grid grid-cols-2 gap-3 pt-2">
              <button 
                type="button" 
                onClick={() => setIsFormOpen(false)} 
                className="rounded border border-white/20 bg-slate-800/50 py-2 px-4 text-white transition-colors hover:bg-slate-700/50 focus:outline-none focus:ring-2 focus:ring-white/20"
              >
                취소
              </button>
              <button 
                type="submit" 
                className="rounded border border-white/20 bg-slate-800/50 py-2 px-4 text-white transition-colors hover:bg-slate-700/50 focus:outline-none focus:ring-2 focus:ring-white/20"
              >
                생성하기
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default RaidPlanCreation;
