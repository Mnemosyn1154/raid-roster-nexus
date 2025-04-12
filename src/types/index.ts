export type Role = '탱커' | '힐러' | '딜러';

export type WoWClass =
  | '죽음의 기사'
  | '악마사냥꾼'
  | '드루이드'
  | '기원사'
  | '사냥꾼'
  | '마법사'
  | '수도사'
  | '성기사'
  | '사제'
  | '도적'
  | '주술사'
  | '흑마법사'
  | '전사';

export type ClassSpec = {
  '죽음의 기사': ['혈기', '냉기', '부정'];
  '악마사냥꾼': ['파멸', '복수'];
  '드루이드': ['조화', '야성', '수호', '회복'];
  '기원사': ['황폐', '보존', '증강'];
  '사냥꾼': ['야수', '사격', '생존'];
  '마법사': ['비전', '화염', '냉기'];
  '수도사': ['양조', '운무', '풍운'];
  '성기사': ['신성', '보호', '징벌'];
  '사제': ['수양', '신성', '암흑'];
  '도적': ['암살', '무법', '잠행'];
  '주술사': ['원소', '고양', '복원'];
  '흑마법사': ['고통', '악마', '파괴'];
  '전사': ['무기', '분노', '방어'];
};

export type Specialization = ClassSpec[WoWClass][number];

export interface Participant {
  id: string;
  characterName: string;
  role: Role;
  class: WoWClass;
  spec: Specialization;
  itemLevel: number;
}

export interface RaidPlan {
  id: string;
  date: string;
  time: string;
  dungeonName: string;
  minimumParticipants: number;
  minimumItemLevel: number;
  raidLeader: string;
  details?: string;
  participants: Participant[];
}

export interface SpecIcon {
  name: string;
  path: string;
}

export type SpecIconMapping = {
  [key in WoWClass]: {
    [key in Specialization]?: SpecIcon;
  };
};
