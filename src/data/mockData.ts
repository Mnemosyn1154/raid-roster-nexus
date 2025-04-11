import { RaidPlan, Role } from '@/types';

export const mockRaidPlan: RaidPlan = {
  id: '1',
  date: '3월 25일',
  time: '20:00',
  dungeonName: '언더마인해방전선(영웅)',
  minimumParticipants: 10,
  minimumItemLevel: 447,
  raidLeader: '공대장',
  participants: [
    { id: '1', characterName: '용사1', role: '탱커', class: '전사', spec: '방어', itemLevel: 450 },
    { id: '2', characterName: '치유사1', role: '힐러', class: '성기사', spec: '신성', itemLevel: 449 },
    { id: '3', characterName: '암살자1', role: '딜러', class: '도적', spec: '암살', itemLevel: 448 },
  ]
};
