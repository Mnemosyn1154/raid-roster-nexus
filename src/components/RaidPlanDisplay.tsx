
import React from 'react';
import { RaidPlan } from '../types';

interface RaidPlanDisplayProps {
  raidPlan: RaidPlan;
}

const RaidPlanDisplay: React.FC<RaidPlanDisplayProps> = ({ raidPlan }) => {
  return (
    <div className="wow-frame mt-4">
      <h2 className="wow-header text-xl mb-3">Raid Plan</h2>
      <div className="grid grid-cols-2 gap-2">
        <div className="text-left">
          <p className="text-wow-gold/80 mb-1">Date</p>
          <p className="font-bold">{raidPlan.date}</p>
        </div>
        <div className="text-right">
          <p className="text-wow-gold/80 mb-1">Time</p>
          <p className="font-bold">{raidPlan.time}</p>
        </div>
        <div className="text-left">
          <p className="text-wow-gold/80 mb-1">{raidPlan.dungeonName}</p>
        </div>
        <div className="text-right">
          <p className="text-wow-gold/80 mb-1">Minimum {raidPlan.minimumParticipants}</p>
        </div>
      </div>
      <div className="mt-2 text-right">
        <p className="text-wow-gold/90 text-sm">
          Raid Leader: <span className="font-bold">{raidPlan.raidLeader}</span>
        </p>
      </div>
    </div>
  );
};

export default RaidPlanDisplay;
