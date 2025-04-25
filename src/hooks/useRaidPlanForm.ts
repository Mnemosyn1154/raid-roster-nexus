import { useState, useEffect, useCallback } from 'react';
import { RaidPlan } from '@/types';
import { format, isBefore, set, parse } from 'date-fns';
import { supabase } from '@/integrations/supabase/client';

interface UseRaidPlanFormProps {
  currentRaidPlan?: RaidPlan;
  onCreateRaidPlan: (
    date: string,
    time: string,
    dungeonName: string,
    minimumParticipants: number,
    minimumItemLevel: number,
    raidLeader: string,
    details: string
  ) => void;
  onUpdateRaidPlan?: (raidPlan: RaidPlan) => void;
  onFormToggle: (isOpen: boolean) => void;
}

export const useRaidPlanForm = ({
  currentRaidPlan,
  onCreateRaidPlan,
  onUpdateRaidPlan,
  onFormToggle,
}: UseRaidPlanFormProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [time, setTime] = useState('');
  const [dungeonName, setDungeonName] = useState('');
  const [minimumParticipants, setMinimumParticipants] = useState(10);
  const [minimumItemLevel, setMinimumItemLevel] = useState(600);
  const [raidLeader, setRaidLeader] = useState('');
  const [details, setDetails] = useState('');

  const timeOptions = Array.from({ length: 13 }, (_, i) => {
    const hour = Math.floor(i / 2) + 18;
    const minute = i % 2 === 0 ? '00' : '30';
    return `${hour}:${minute}`;
  });

  const resetForm = useCallback(() => {
    setSelectedDate(undefined);
    setTime('');
    setDungeonName('');
    setMinimumParticipants(10);
    setMinimumItemLevel(600);
    setRaidLeader('');
    setDetails('');
    setIsEditing(false);
  }, []);

  useEffect(() => {
    if (currentRaidPlan && isEditing) {
      // Parse the date string (e.g., "3월 25일") to Date object
      try {
        const parsedDate = parse(currentRaidPlan.date, 'M월 d일', new Date());
        // Set year to current year if parsing doesn't include it
        const currentYear = new Date().getFullYear();
        if (parsedDate.getFullYear() !== currentYear) {
            parsedDate.setFullYear(currentYear);
        }
         // Check if parsedDate is valid before setting
        if (!isNaN(parsedDate.getTime())) {
             setSelectedDate(parsedDate);
        } else {
            console.error("Failed to parse date:", currentRaidPlan.date);
            setSelectedDate(undefined); // Reset if parsing fails
        }
      } catch (error) {
          console.error("Error parsing date:", error);
          setSelectedDate(undefined); // Reset on error
      }

      setTime(currentRaidPlan.time);
      setDungeonName(currentRaidPlan.dungeonName);
      setMinimumParticipants(currentRaidPlan.minimumParticipants);
      setMinimumItemLevel(currentRaidPlan.minimumItemLevel);
      setRaidLeader(currentRaidPlan.raidLeader);
      setDetails(currentRaidPlan.details || '');
    } else {
        resetForm(); // Reset form if not editing or no current plan
    }
  }, [currentRaidPlan, isEditing, resetForm]);


  const validateDateTime = (date: Date, timeStr: string): boolean => {
    if (!timeStr) return false; // Ensure time is selected
    const [hours, minutes] = timeStr.split(':').map(Number);
    const selectedDateTime = set(date, { hours, minutes });
    const now = new Date();

    if (isBefore(selectedDateTime, now)) {
      alert('과거 시간으로 레이드 일정을 생성할 수 없습니다.');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDate || !time || !dungeonName || !raidLeader) {
        alert('모든 필수 필드를 입력해주세요.');
        return;
    }

    if (!validateDateTime(selectedDate, time)) {
      return;
    }

    const formattedDate = format(selectedDate, 'M월 d일');
    const raidPlanData = {
      date: formattedDate,
      time,
      dungeon_name: dungeonName,
      minimum_participants: minimumParticipants,
      minimum_item_level: minimumItemLevel,
      raid_leader: raidLeader,
      details,
    };

    try {
      if (isEditing && currentRaidPlan && onUpdateRaidPlan) {
        console.log('Updating raid plan:', raidPlanData);
        const { error: updateError } = await supabase
          .from('raid_plans')
          .update(raidPlanData)
          .eq('id', currentRaidPlan.id);

        if (updateError) throw updateError;

        onUpdateRaidPlan({
          ...currentRaidPlan,
          date: formattedDate,
          time,
          dungeonName,
          minimumParticipants,
          minimumItemLevel,
          raidLeader,
          details,
        });
        alert('레이드 일정이 성공적으로 수정되었습니다.');

      } else {
        console.log('Creating new raid plan:', raidPlanData);
        const { data: newRaidPlan, error: insertError } = await supabase
          .from('raid_plans')
          .insert({ ...raidPlanData, participants: [] }) // Add empty participants for new plan
          .select()
          .single();

        if (insertError) throw insertError;

        console.log('New raid plan created:', newRaidPlan);
        if (newRaidPlan) {
          onCreateRaidPlan(
            formattedDate,
            time,
            dungeonName,
            minimumParticipants,
            minimumItemLevel,
            raidLeader,
            details
          );
           alert('새 레이드 일정이 성공적으로 생성되었습니다.');
        }
      }

      resetForm();
      onFormToggle(false); // Close form after successful submission

    } catch (error) {
      console.error('Error saving raid plan:', error);
      const action = isEditing ? '수정' : '저장';
      alert(`레이드 일정 ${action} 중 오류가 발생했습니다.`);
    }
  };

  const handleEditClick = () => {
    if (currentRaidPlan) {
      setIsEditing(true);
      onFormToggle(true); // Open form when editing
    }
  };

   const handleCreateClick = () => {
    resetForm(); // Ensure form is reset for creation
    setIsEditing(false);
    onFormToggle(true); // Open form for creation
  };

  const handleCancelClick = () => {
    resetForm();
    onFormToggle(false); // Close form on cancel
  };


  return {
    isEditing,
    selectedDate,
    setSelectedDate,
    time,
    setTime,
    dungeonName,
    setDungeonName,
    minimumParticipants,
    setMinimumParticipants,
    minimumItemLevel,
    setMinimumItemLevel,
    raidLeader,
    setRaidLeader,
    details,
    setDetails,
    timeOptions,
    handleSubmit,
    handleEditClick,
    handleCreateClick,
    handleCancelClick,
  };
};