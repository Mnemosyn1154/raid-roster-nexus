
import { RaidPlan, Role } from '../types';

export const mockRaidPlan: RaidPlan = {
  id: '1',
  date: 'March 25',
  time: '20:00',
  dungeonName: 'Vault of the Incarnates',
  minimumParticipants: 10,
  raidLeader: 'Thunderlord',
  participants: [
    { id: '1', characterName: 'PlayerOne', role: 'Tank' },
    { id: '2', characterName: 'PlayerTwo', role: 'Healer' },
    { id: '3', characterName: 'PlayerThree', role: 'DPS' },
  ]
};
