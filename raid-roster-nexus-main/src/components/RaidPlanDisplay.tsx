import React from 'react';
import { RaidPlan } from '../types';

interface RaidPlanDisplayProps {
  raidPlan: RaidPlan;
}

const RaidPlanDisplay: React.FC<RaidPlanDisplayProps> = ({ raidPlan }) => {
  return (
    <div className="rounded-lg border border-white/20 bg-slate-900/50 p-4">
      <h2 className="text-xl font-semibold text-white mb-3">레이드 일정</h2>
      <div className="grid grid-cols-2 gap-4">
        <div className="text-left p-3 bg-slate-800/50 rounded border border-white/20">
          <p className="text-white/80 mb-1 text-sm">날짜</p>
          <p className="font-bold text-white">{raidPlan.date}</p>
        </div>
        <div className="text-right p-3 bg-slate-800/50 rounded border border-white/20">
          <p className="text-white/80 mb-1 text-sm">시간</p>
          <p className="font-bold text-white">{raidPlan.time}</p>
        </div>
        <div className="text-left p-3 bg-slate-800/50 rounded border border-white/20">
          <p className="text-white/80 mb-1 text-sm">던전</p>
          <p className="font-bold text-white">{raidPlan.dungeonName}</p>
        </div>
        <div className="text-right p-3 bg-slate-800/50 rounded border border-white/20">
          <p className="text-white/80 mb-1 text-sm">최소 인원</p>
          <p className="font-bold text-white">{raidPlan.minimumParticipants}</p>
        </div>
      </div>
      <div className="mt-4">
        <div className="p-3 bg-slate-800/50 rounded border border-white/20">
          <p className="text-white/80 mb-1 text-sm">최소 아이템 레벨</p>
          <p className="font-bold text-white">{raidPlan.minimumItemLevel}</p>
        </div>
      </div>
      <div className="mt-4 text-right">
        <p className="text-white/80 text-sm">
          공대장: <span className="font-bold text-white">{raidPlan.raidLeader}</span>
        </p>
      </div>
    </div>
  );
};

export default RaidPlanDisplay;
