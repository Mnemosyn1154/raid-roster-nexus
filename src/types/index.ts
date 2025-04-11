
export type Role = 'Tank' | 'Healer' | 'DPS';

export type WoWClass = 'Warrior' | 'Paladin' | 'Hunter' | 'Rogue' | 'Priest' | 'Shaman' | 'Mage' | 'Warlock' | 'Monk' | 'Druid' | 'Demon Hunter' | 'Death Knight' | 'Evoker';

// Specializations for each class
export type WoWSpecialization = {
  [key in WoWClass]: string[];
};

export const wowSpecs: WoWSpecialization = {
  'Warrior': ['Arms', 'Fury', 'Protection'],
  'Paladin': ['Holy', 'Protection', 'Retribution'],
  'Hunter': ['Beast Mastery', 'Marksmanship', 'Survival'],
  'Rogue': ['Assassination', 'Outlaw', 'Subtlety'],
  'Priest': ['Discipline', 'Holy', 'Shadow'],
  'Shaman': ['Elemental', 'Enhancement', 'Restoration'],
  'Mage': ['Arcane', 'Fire', 'Frost'],
  'Warlock': ['Affliction', 'Demonology', 'Destruction'],
  'Monk': ['Brewmaster', 'Mistweaver', 'Windwalker'],
  'Druid': ['Balance', 'Feral', 'Guardian', 'Restoration'],
  'Demon Hunter': ['Havoc', 'Vengeance'],
  'Death Knight': ['Blood', 'Frost', 'Unholy'],
  'Evoker': ['Devastation', 'Preservation', 'Augmentation']
};

export interface Participant {
  id: string;
  characterName: string;
  role: Role;
  class?: WoWClass;
  specialization?: string;
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
