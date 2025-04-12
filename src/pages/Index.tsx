import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { RaidPlan, Participant, Role, WoWClass, Specialization } from '@/types';
import RaidPlanCreation from '@/components/RaidPlanCreation';
import RaidPlanDisplay from '@/components/RaidPlanDisplay';
import ParticipantList from '@/components/ParticipantList';
import SignUpForm from '@/components/SignUpForm';
import { useToast } from "@/hooks/use-toast";
import { supabase } from '@/integrations/supabase/client';

const Index = () => {
  const [raidPlan, setRaidPlan] = useState<RaidPlan | null>(null);
  const { toast } = useToast();

  // 레이드 일정 불러오기
  useEffect(() => {
    fetchRaidPlan();
  }, []);

  const fetchRaidPlan = async () => {
    try {
      const { data, error } = await supabase
        .from('raid_plans')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(1)
        .single();

      if (error) throw error;

      if (data) {
        // Supabase의 스네이크 케이스를 캐멀 케이스로 변환
        const formattedRaidPlan = {
          id: data.id,
          date: data.date,
          time: data.time,
          dungeonName: data.dungeon_name,
          minimumParticipants: data.minimum_participants,
          minimumItemLevel: data.minimum_item_level,
          raidLeader: data.raid_leader,
          details: data.details,
          participants: data.participants || []
        };
        setRaidPlan(formattedRaidPlan);
      }
    } catch (error) {
      console.error('Error fetching raid plan:', error);
      toast({
        title: "오류",
        description: "레이드 일정을 불러오는데 실패했습니다.",
      });
    }
  };

  const handleCreateRaidPlan = async (
    date: string,
    time: string,
    dungeonName: string,
    minimumParticipants: number,
    minimumItemLevel: number,
    raidLeader: string,
    details?: string
  ) => {
    const newRaidPlan: RaidPlan = {
      id: uuidv4(),
      date,
      time,
      dungeonName,
      minimumParticipants,
      minimumItemLevel,
      raidLeader,
      details,
      participants: []
    };
    
    setRaidPlan(newRaidPlan);
    toast({
      title: "레이드 일정 생성",
      description: `${dungeonName} 레이드 일정이 생성되었습니다.`,
    });
  };

  const handleUpdateRaidPlan = (updatedRaidPlan: RaidPlan) => {
    setRaidPlan(updatedRaidPlan);
    toast({
      title: "레이드 일정 수정",
      description: `${updatedRaidPlan.dungeonName} 레이드 일정이 수정되었습니다.`,
    });
  };

  const handleSignUp = async (
    characterName: string,
    role: Role,
    wowClass: WoWClass,
    spec: Specialization,
    itemLevel: number
  ) => {
    if (!raidPlan) return;
    
    // Check if character name already exists
    if (raidPlan.participants.some(p => p.characterName.toLowerCase() === characterName.toLowerCase())) {
      toast({
        title: "참가 신청 실패",
        description: "이미 레이드에 등록된 캐릭터입니다.",
        variant: "destructive"
      });
      return;
    }

    // Check if item level meets the minimum requirement
    if (itemLevel < raidPlan.minimumItemLevel) {
      toast({
        title: "참가 신청 실패",
        description: `최소 아이템 레벨(${raidPlan.minimumItemLevel})을 충족하지 않습니다.`,
        variant: "destructive"
      });
      return;
    }
    
    const newParticipant: Participant = {
      id: uuidv4(),
      characterName,
      role,
      class: wowClass,
      spec,
      itemLevel
    };

    try {
      const updatedParticipants = [...raidPlan.participants, newParticipant];
      
      const { error } = await supabase
        .from('raid_plans')
        .update({ participants: updatedParticipants })
        .eq('id', raidPlan.id);

      if (error) throw error;

      setRaidPlan({
        ...raidPlan,
        participants: updatedParticipants
      });

      toast({
        title: "참가 신청 완료",
        description: `${characterName}(${spec} ${wowClass})님이 레이드에 참가했습니다.`,
      });
    } catch (error) {
      console.error('Error signing up:', error);
      toast({
        title: "참가 신청 실패",
        description: "레이드 신청 중 오류가 발생했습니다.",
        variant: "destructive"
      });
    }
  };

  const handleRemoveParticipant = async (id: string) => {
    if (!raidPlan) return;

    const participant = raidPlan.participants.find(p => p.id === id);
    if (!participant) return;

    try {
      const updatedParticipants = raidPlan.participants.filter(p => p.id !== id);
      
      const { error } = await supabase
        .from('raid_plans')
        .update({ participants: updatedParticipants })
        .eq('id', raidPlan.id);

      if (error) throw error;

      setRaidPlan({
        ...raidPlan,
        participants: updatedParticipants
      });

      toast({
        title: "참가자 제외",
        description: `${participant.characterName}님이 레이드에서 제외되었습니다.`,
      });
    } catch (error) {
      console.error('Error removing participant:', error);
      toast({
        title: "오류",
        description: "참가자 제외 중 오류가 발생했습니다.",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 to-slate-900 flex flex-col items-center py-4 md:py-8 px-2 md:px-4">
      <div className="w-full max-w-[720px]">
        <div className="rounded-lg border border-white/20 bg-slate-900/50 p-4 md:p-6">
          <h1 className="text-3xl font-semibold text-white mb-6">
            Impreza 길드 레이드 일정
          </h1>
          
          {raidPlan ? (
            <>
              <RaidPlanDisplay raidPlan={raidPlan} />
              <ParticipantList 
                participants={raidPlan.participants} 
                onRemoveParticipant={handleRemoveParticipant} 
              />
              <SignUpForm onSignUp={handleSignUp} />
            </>
          ) : (
            <div className="text-center py-4">
              <p className="text-white/80 mb-4">생성된 레이드 일정이 없습니다</p>
            </div>
          )}
          
          <RaidPlanCreation 
            onCreateRaidPlan={handleCreateRaidPlan} 
            onUpdateRaidPlan={handleUpdateRaidPlan}
            currentRaidPlan={raidPlan}
          />
        </div>
      </div>
    </div>
  );
};

export default Index;
