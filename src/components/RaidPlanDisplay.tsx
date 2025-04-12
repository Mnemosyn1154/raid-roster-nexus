import React from 'react';
import { RaidPlan } from '@/types';

interface RaidPlanDisplayProps {
  raidPlan: RaidPlan;
}

const RaidPlanDisplay: React.FC<RaidPlanDisplayProps> = ({ raidPlan }) => {
  return (
    <div className="rounded-lg border border-white/20 bg-slate-900/50 p-4">
      <h2 className="text-xl font-semibold text-white mb-3">레이드 일정</h2>
      <div className="grid grid-cols-2 gap-4">
        <div className="p-3 bg-slate-800/50 rounded border border-white/20">
          <p className="text-white/80 mb-2 text-base font-medium text-left">날짜</p>
          <p className="font-semibold text-white text-lg text-left">{raidPlan.date}</p>
        </div>
        <div className="p-3 bg-slate-800/50 rounded border border-white/20">
          <p className="text-white/80 mb-2 text-base font-medium text-left">시간</p>
          <p className="font-semibold text-white text-lg text-left">{raidPlan.time}</p>
        </div>
        <div className="p-3 bg-slate-800/50 rounded border border-white/20">
          <p className="text-white/80 mb-2 text-base font-medium text-left">던전</p>
          <p className="font-semibold text-white text-lg text-left">{raidPlan.dungeonName}</p>
        </div>
        <div className="p-3 bg-slate-800/50 rounded border border-white/20">
          <p className="text-white/80 mb-2 text-base font-medium text-left">최소 인원</p>
          <p className="font-semibold text-white text-lg text-left">{raidPlan.minimumParticipants}</p>
        </div>
        <div className="p-3 bg-slate-800/50 rounded border border-white/20">
          <p className="text-white/80 mb-2 text-base font-medium text-left">공대장</p>
          <p className="font-semibold text-white text-lg text-left">{raidPlan.raidLeader}</p>
        </div>
        <div className="p-3 bg-slate-800/50 rounded border border-white/20">
          <p className="text-white/80 mb-2 text-base font-medium text-left">최소 아이템 레벨</p>
          <p className="font-semibold text-white text-lg text-left">{raidPlan.minimumItemLevel}</p>
        </div>
      </div>
      {raidPlan.details && (
        <div className="mt-4 p-3 bg-slate-800/50 rounded border border-white/20">
          <p className="text-white/80 mb-2 text-base font-medium text-left">세부사항</p>
          <p className="font-semibold text-white text-lg text-left whitespace-pre-line">{raidPlan.details}</p>
        </div>
      )}
    </div>
  );
};

export default RaidPlanDisplay;
