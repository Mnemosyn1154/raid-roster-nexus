import React from 'react';
import { Participant, Role } from '../types';
import { specIcons } from '../data/specIcons';
import { cn } from '@/lib/utils';

interface ParticipantListProps {
  participants: Participant[];
  onRemoveParticipant: (id: string) => void;
}

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

const roleOrder: Role[] = ['탱커', '힐러', '딜러'];

const ParticipantList: React.FC<ParticipantListProps> = ({ participants, onRemoveParticipant }) => {
  // 역할별로 참가자 그룹화
  const groupedParticipants = roleOrder.reduce((acc, role) => {
    acc[role] = participants.filter(p => p.role === role);
    return acc;
  }, {} as Record<Role, Participant[]>);

  const ParticipantItem = ({ participant }: { participant: Participant }) => {
    const specIcon = specIcons[participant.class]?.[participant.spec];
    
    return (
      <div key={participant.id} className="flex items-center justify-between bg-slate-800/50 p-2 rounded">
        <div className="flex items-center gap-3">
          <div className="flex-shrink-0 w-10 h-10 bg-slate-800/50 rounded-md overflow-hidden border border-white/20">
            {specIcon && (
              <img 
                src={specIcon.path}
                alt={`${participant.spec} 전문화 아이콘`}
                className="w-full h-full object-contain p-1"
                onError={(e) => {
                  console.log(`Failed to load icon: ${specIcon.path}`);
                  const target = e.target as HTMLImageElement;
                  target.src = '/placeholder.svg';
                  target.classList.add('opacity-50');
                }}
              />
            )}
          </div>
          <div className="flex flex-col gap-0.5">
            <span className={cn(
              "font-medium text-base",
              classColors[participant.class] || 'text-white'
            )}>
              {participant.characterName}
            </span>
            <span className="text-sm text-white/80">
              {participant.class} - {participant.spec}
            </span>
          </div>
        </div>
        <button
          onClick={() => onRemoveParticipant(participant.id)}
          className="text-red-400 hover:text-red-300 px-2 py-1 transition-colors"
        >
          삭제
        </button>
      </div>
    );
  };

  return (
    <div className="mt-4 rounded-lg border border-white/20 bg-slate-900/50 p-4">
      <h2 className="text-xl font-semibold text-white mb-3">참가자 목록 ({participants.length}명)</h2>
      <div className="space-y-4">
        {roleOrder.map(role => {
          const roleParticipants = groupedParticipants[role];
          if (roleParticipants.length === 0) return null;

          return (
            <div key={role} className="space-y-2">
              <h3 className="text-lg font-medium text-white border-b border-white/20 pb-1">
                {role} ({roleParticipants.length}명)
              </h3>
              <div className="space-y-2">
                {roleParticipants.map(participant => (
                  <ParticipantItem 
                    key={participant.id} 
                    participant={participant} 
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ParticipantList;
