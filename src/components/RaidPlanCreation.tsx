
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
          className="wow-button w-full"
        >
          New Raid Plan
        </button>
      ) : (
        <div className="wow-frame">
          <h2 className="wow-header text-xl mb-3">Create New Raid Plan</h2>
          <form onSubmit={handleSubmit} className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-wow-gold/80 mb-1 text-sm">Date</label>
                <input
                  type="text"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  placeholder="March 25"
                  className="wow-input"
                  required
                />
              </div>
              <div>
                <label className="block text-wow-gold/80 mb-1 text-sm">Time</label>
                <input
                  type="text"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  placeholder="20:00"
                  className="wow-input"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-wow-gold/80 mb-1 text-sm">Dungeon Name</label>
              <input
                type="text"
                value={dungeonName}
                onChange={(e) => setDungeonName(e.target.value)}
                placeholder="Vault of the Incarnates"
                className="wow-input"
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-wow-gold/80 mb-1 text-sm">Minimum Participants</label>
                <input
                  type="number"
                  value={minimumParticipants}
                  onChange={(e) => setMinimumParticipants(parseInt(e.target.value))}
                  min={5}
                  className="wow-input"
                  required
                />
              </div>
              <div>
                <label className="block text-wow-gold/80 mb-1 text-sm">Raid Leader</label>
                <input
                  type="text"
                  value={raidLeader}
                  onChange={(e) => setRaidLeader(e.target.value)}
                  placeholder="Your character name"
                  className="wow-input"
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3 pt-2">
              <button 
                type="button" 
                onClick={() => setIsFormOpen(false)} 
                className="bg-wow-blue text-wow-gold/80 border border-wow-gold/50 py-2 px-4 rounded-md hover:bg-wow-blue/70"
              >
                Cancel
              </button>
              <button type="submit" className="wow-button">
                Create Raid
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default RaidPlanCreation;
