
export type Role = 'Tank' | 'Healer' | 'DPS';

export interface Participant {
  id: string;
  characterName: string;
  role: Role;
}

export interface RaidPlan {
  id: string;
  date: string;
  time: string;
  dungeonName: string;
  minimumParticipants: number;
  raidLeader: string;
  participants: Participant[];
}
