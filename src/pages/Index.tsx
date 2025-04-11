import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { RaidPlan, Participant, Role, WoWClass } from '../types';
import { mockRaidPlan } from '../data/mockData';
import RaidPlanCreation from '../components/RaidPlanCreation';
import RaidPlanDisplay from '../components/RaidPlanDisplay';
import ParticipantList from '../components/ParticipantList';
import SignUpForm from '../components/SignUpForm';
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [raidPlan, setRaidPlan] = useState<RaidPlan | null>(mockRaidPlan);
  const { toast } = useToast();
  
  const handleCreateRaidPlan = (
    date: string,
    time: string,
    dungeonName: string,
    minimumParticipants: number,
    raidLeader: string
  ) => {
    const newRaidPlan: RaidPlan = {
      id: uuidv4(),
      date,
      time,
      dungeonName,
      minimumParticipants,
      raidLeader,
      participants: []
    };
    
    setRaidPlan(newRaidPlan);
    toast({
      title: "Raid Plan Created",
      description: `New raid plan for ${dungeonName} has been created.`,
    });
  };

  const handleSignUp = (characterName: string, role: Role, wowClass: WoWClass, specialization: string) => {
    if (!raidPlan) return;
    
    if (raidPlan.participants.some(p => p.characterName.toLowerCase() === characterName.toLowerCase())) {
      toast({
        title: "Sign Up Failed",
        description: "This character is already signed up for the raid.",
        variant: "destructive"
      });
      return;
    }
    
    const newParticipant: Participant = {
      id: uuidv4(),
      characterName,
      role,
      class: wowClass,
      specialization
    };
    
    setRaidPlan({
      ...raidPlan,
      participants: [...raidPlan.participants, newParticipant]
    });
    
    toast({
      title: "Successfully Signed Up",
      description: `${characterName} has joined as ${wowClass} (${specialization})`,
    });
  };

  const handleRemoveParticipant = (id: string) => {
    if (!raidPlan) return;
    
    const participant = raidPlan.participants.find(p => p.id === id);
    if (!participant) return;
    
    setRaidPlan({
      ...raidPlan,
      participants: raidPlan.participants.filter(p => p.id !== id)
    });
    
    toast({
      title: "Participant Removed",
      description: `${participant.characterName} has been removed from the raid.`,
    });
  };

  return (
    <div className="min-h-screen flex flex-col items-center py-8 px-4">
      <div className="w-full max-w-md">
        <div className="wow-frame">
          <h1 className="wow-header font-wow tracking-wider text-shadow animate-glow">
            GUILD RAID STATUS
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
              <p className="text-wow-gold/80 mb-4">No active raid plans</p>
            </div>
          )}
          
          <RaidPlanCreation onCreateRaidPlan={handleCreateRaidPlan} />
        </div>
      </div>
    </div>
  );
};

export default Index;
