import React, { useState, useEffect } from 'react';
import { Role, WoWClass, Specialization, ClassSpec } from '../types';
import { specIcons } from '@/data/specIcons';
import { 
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

interface SignUpFormProps {
  onSignUp: (characterName: string, role: Role, wowClass: WoWClass, spec: Specialization, itemLevel: number) => void;
}

const SignUpForm: React.FC<SignUpFormProps> = ({ onSignUp }) => {
  const [characterName, setCharacterName] = useState('');
  const [selectedClass, setSelectedClass] = useState<WoWClass>('전사');
  const [selectedSpec, setSelectedSpec] = useState<Specialization>('무기');
  const [role, setRole] = useState<Role>('딜러');
  const [itemLevel, setItemLevel] = useState<number>(0);

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
    if (characterName.trim() && itemLevel > 0) {
      onSignUp(characterName, role, selectedClass, selectedSpec, itemLevel);
      setCharacterName('');
      setSelectedClass('전사');
      setSelectedSpec('무기');
      setRole('딜러');
      setItemLevel(0);
    }
  };

  const classColors: { [key: string]: string } = {
    '죽음의 기사': 'text-[#C41F3B]',  // 붉은색
    '악마사냥꾼': 'text-[#A330C9]',   // 보라색
    '드루이드': 'text-[#FF7D0A]',     // 주황색
    '기원사': 'text-[#33937F]',       // 청록색
    '사냥꾼': 'text-[#ABD473]',       // 연두색
    '마법사': 'text-[#69CCF0]',       // 하늘색
    '수도사': 'text-[#00FF96]',       // 연녹색
    '성기사': 'text-[#F58CBA]',       // 분홍색
    '사제': 'text-[#FFFFFF]',         // 흰색
    '도적': 'text-[#FFF569]',         // 노란색
    '주술사': 'text-[#0070DE]',       // 파란색
    '흑마법사': 'text-[#9482C9]',     // 보라색
    '전사': 'text-[#C79C6E]'          // 갈색
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
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block text-white/80 mb-1 text-sm">직업</label>
            <Select value={selectedClass} onValueChange={(value: WoWClass) => setSelectedClass(value)}>
              <SelectTrigger className="w-full bg-slate-800/50 border-white/20 text-white">
                <SelectValue placeholder="직업 선택" />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-white/20">
                <SelectGroup>
                  {Object.keys(specs).map((wowClass) => (
                    <SelectItem 
                      key={wowClass} 
                      value={wowClass}
                      className={cn(
                        "text-white focus:bg-slate-700 focus:text-white",
                        classColors[wowClass]
                      )}
                    >
                      {wowClass}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="block text-white/80 mb-1 text-sm">전문화</label>
            <Select value={selectedSpec} onValueChange={(value: Specialization) => setSelectedSpec(value)}>
              <SelectTrigger className="w-full bg-slate-800/50 border-white/20 text-white">
                {specIcons[selectedClass]?.[selectedSpec] && (
                  <div className="flex items-center gap-2">
                    <img
                      src={specIcons[selectedClass][selectedSpec].path}
                      alt={`${selectedSpec} 전문화 아이콘`}
                      className="w-5 h-5 object-contain"
                    />
                    <span>{selectedSpec}</span>
                  </div>
                )}
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-white/20">
                <SelectGroup>
                  {specs[selectedClass].map((spec) => (
                    <SelectItem 
                      key={spec} 
                      value={spec}
                      className="text-white focus:bg-slate-700 focus:text-white"
                    >
                      <div className="flex items-center gap-2">
                        {specIcons[selectedClass]?.[spec] && (
                          <img
                            src={specIcons[selectedClass][spec].path}
                            alt={`${spec} 전문화 아이콘`}
                            className="w-5 h-5 object-contain"
                          />
                        )}
                        {spec}
                      </div>
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="block text-white/80 mb-1 text-sm">아이템 레벨</label>
            <input
              type="number"
              value={itemLevel || ''}
              onChange={(e) => setItemLevel(Math.max(0, parseInt(e.target.value) || 0))}
              min="0"
              className="w-full rounded border border-white/20 bg-slate-800/50 px-3 py-2 text-white placeholder:text-white/50 focus:border-white/40 focus:outline-none"
              placeholder="447"
              required
            />
          </div>
        </div>
        <div>
          <button 
            type="submit" 
            className="w-full rounded bg-purple-600 py-3 text-white transition-colors hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
          >
            참가 신청 ({role})
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignUpForm;
