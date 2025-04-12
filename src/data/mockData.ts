import { RaidPlan, Role } from '@/types';

export const mockRaidPlan: RaidPlan = {
  id: '1',
  date: '3월 25일',
  time: '20:00',
  dungeonName: '언더마인해방전선(영웅)',
  minimumParticipants: 10,
  minimumItemLevel: 600,
  raidLeader: '공대장',
  participants: [
    { id: '1', characterName: '샤꼰', role: '탱커', class: '전사', spec: '방어', itemLevel: 620 },
    { id: '2', characterName: '호타테', role: '힐러', class: '주술사', spec: '복원', itemLevel: 630 },
    { id: '3', characterName: '그림', role: '딜러', class: '도적', spec: '암살', itemLevel: 622 },
  ],
  details: '이번 레이드에서는 언더마인해방전선 던전을 클리어할 예정입니다.'
};
