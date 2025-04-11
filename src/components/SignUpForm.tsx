import React, { useState, useEffect } from 'react';
import { Role, WoWClass, Specialization, ClassSpec } from '../types';

interface SignUpFormProps {
  onSignUp: (characterName: string, role: Role, wowClass: WoWClass, spec: Specialization) => void;
}

const SignUpForm: React.FC<SignUpFormProps> = ({ onSignUp }) => {
  const [characterName, setCharacterName] = useState('');
  const [selectedClass, setSelectedClass] = useState<WoWClass>('전사');
  const [selectedSpec, setSelectedSpec] = useState<Specialization>('무기');
  const [role, setRole] = useState<Role>('딜러');

  // 직업별 가능한 특성 목록
  const specs = {
    '죽음의 기사': ['혈기', '냉기', '부정'],
    '악마사냥꾼': ['파멸', '복수'],
    '드루이드': ['조화', '야성', '수호', '회복'],
    '기원사': ['황폐', '보존', '증강'],
    '사냥꾼': ['야수', '사격', '생존'],
    '마법사': ['비전', '화염', '냉기'],
    '수도사': ['양조', '운무', '풍운'],
    '성기사': ['신성', '보호', '징벌'],
    '사제': ['수양', '신성', '암흑'],
    '도적': ['암살', '무법', '잠행'],
    '주술사': ['원소', '고양', '회복'],
    '흑마법사': ['고통', '악마', '파괴'],
    '전사': ['무기', '분노', '방어']
  } as const;

  // 직업과 특성에 따른 역할 매핑
  const getRole = (wowClass: WoWClass, spec: string): Role => {
    const tankSpecs = ['혈기', '복수', '수호', '양조', '보호', '방어'];
    const healerSpecs = ['회복', '보존', '운무', '신성', '수양'];
    
    if (tankSpecs.includes(spec)) return '탱커';
    if (healerSpecs.includes(spec)) return '힐러';
    return '딜러';
  };

  // 직업이 변경될 때 해당 직업의 첫 번째 특성으로 자동 선택
  useEffect(() => {
    const defaultSpec = specs[selectedClass][0];
    setSelectedSpec(defaultSpec as Specialization);
    setRole(getRole(selectedClass, defaultSpec));
  }, [selectedClass]);

  // 특성이 변경될 때 해당하는 역할로 자동 변경
  useEffect(() => {
    setRole(getRole(selectedClass, selectedSpec));
  }, [selectedSpec]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (characterName.trim()) {
      onSignUp(characterName, role, selectedClass, selectedSpec);
      setCharacterName('');
      setSelectedClass('전사');
      setSelectedSpec('무기');
      setRole('딜러');
    }
  };

  return (
    <div className="mt-4 rounded-lg border border-white/20 bg-slate-900/50 p-4">
      <h2 className="text-xl font-semibold text-white mb-3">레이드 참가 신청</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-white/80 mb-1 text-sm">캐릭터 이름</label>
          <input
            type="text"
            value={characterName}
            onChange={(e) => setCharacterName(e.target.value)}
            className="w-full rounded border border-white/20 bg-slate-800/50 px-3 py-2 text-white placeholder:text-white/50 focus:border-white/40 focus:outline-none"
            required
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-white/80 mb-1 text-sm">직업</label>
            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value as WoWClass)}
              className="w-full rounded border border-white/20 bg-slate-800/50 px-3 py-2 text-white focus:border-white/40 focus:outline-none"
            >
              {Object.keys(specs).map((wowClass) => (
                <option key={wowClass} value={wowClass}>
                  {wowClass}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-white/80 mb-1 text-sm">전문화</label>
            <select
              value={selectedSpec}
              onChange={(e) => setSelectedSpec(e.target.value as Specialization)}
              className="w-full rounded border border-white/20 bg-slate-800/50 px-3 py-2 text-white focus:border-white/40 focus:outline-none"
            >
              {specs[selectedClass].map((spec) => (
                <option key={spec} value={spec}>
                  {spec}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div>
          <button 
            type="submit" 
            className="w-full rounded border border-white/20 bg-slate-800/50 py-3 text-white transition-colors hover:bg-slate-700/50 focus:outline-none focus:ring-2 focus:ring-white/20"
          >
            참가 신청 ({role})
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignUpForm;
