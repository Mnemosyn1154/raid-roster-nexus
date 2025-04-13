import React from 'react';
import { RaidPlan } from '@/types';
import { useAdmin } from '@/contexts/AdminContext';
import { AlertDialog, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

interface RaidPlanDisplayProps {
  raidPlan: RaidPlan;
  onDelete?: (id: string) => void;
}

const RaidPlanDisplay: React.FC<RaidPlanDisplayProps> = ({ raidPlan, onDelete }) => {
  const { isAdmin } = useAdmin();

  return (
    <div className="rounded-lg border border-white/20 bg-slate-900/50 p-4">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-xl font-semibold text-white">레이드 일정</h2>
        {isAdmin && onDelete && (
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" size="sm">
                레이드 삭제
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="bg-slate-900 border-white/20">
              <AlertDialogHeader>
                <AlertDialogTitle className="text-white">레이드 일정을 삭제하시겠습니까?</AlertDialogTitle>
                <AlertDialogDescription className="text-white/80">
                  이 작업은 되돌릴 수 없습니다. 레이드 일정과 모든 참가자 정보가 영구적으로 삭제됩니다.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <Button variant="outline" onClick={() => {}}>취소</Button>
                <Button variant="destructive" onClick={() => onDelete(raidPlan.id)}>삭제</Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-3 bg-slate-800/50 rounded border border-white/20">
          <p className="text-white/80 mb-2 text-base font-medium text-left">날짜</p>
          <p className="font-semibold text-white text-lg text-left">{raidPlan.date}</p>
        </div>
        <div className="p-3 bg-slate-800/50 rounded border border-white/20">
          <p className="text-white/80 mb-2 text-base font-medium text-left">시간</p>
          <p className="font-semibold text-white text-lg text-left">{raidPlan.time}</p>
        </div>
        <div className="p-3 bg-slate-800/50 rounded border border-white/20">
          <p className="text-white/80 mb-2 text-base font-medium text-left">던전</p>
          <p className="font-semibold text-white text-lg text-left">{raidPlan.dungeonName}</p>
        </div>
        <div className="p-3 bg-slate-800/50 rounded border border-white/20">
          <p className="text-white/80 mb-2 text-base font-medium text-left">최소 인원</p>
          <p className="font-semibold text-white text-lg text-left">{raidPlan.minimumParticipants}</p>
        </div>
        <div className="p-3 bg-slate-800/50 rounded border border-white/20">
          <p className="text-white/80 mb-2 text-base font-medium text-left">공대장</p>
          <p className="font-semibold text-white text-lg text-left">{raidPlan.raidLeader}</p>
        </div>
        <div className="p-3 bg-slate-800/50 rounded border border-white/20">
          <p className="text-white/80 mb-2 text-base font-medium text-left">최소 아이템 레벨</p>
          <p className="font-semibold text-white text-lg text-left">{raidPlan.minimumItemLevel}</p>
        </div>
      </div>
      {raidPlan.details && (
        <div className="mt-4 p-3 bg-slate-800/50 rounded border border-white/20">
          <p className="text-white/80 mb-2 text-base font-medium text-left">세부사항</p>
          <p className="font-semibold text-white text-lg text-left whitespace-pre-line">{raidPlan.details}</p>
        </div>
      )}
    </div>
  );
};

export default RaidPlanDisplay;
