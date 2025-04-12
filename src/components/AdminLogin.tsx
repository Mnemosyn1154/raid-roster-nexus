import React, { useState } from 'react';
import { useAdmin } from '@/contexts/AdminContext';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

export function AdminLogin() {
  const [password, setPassword] = useState('');
  const { verifyPassword, isAdmin, setIsAdmin } = useAdmin();
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (verifyPassword(password)) {
      toast({
        title: "로그인 성공",
        description: "관리자 모드로 전환되었습니다.",
      });
    } else {
      toast({
        title: "로그인 실패",
        description: "비밀번호가 일치하지 않습니다.",
        variant: "destructive",
      });
    }
    setPassword('');
  };

  return (
    <div className="w-full bg-slate-900 border-b border-white/10">
      <div className="container mx-auto px-4 py-2">
        <div className="flex justify-end">
          {!isAdmin ? (
            <form onSubmit={handleSubmit} className="flex gap-2">
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="관리자 비밀번호"
                className="w-40 bg-slate-800/50 border-white/20"
              />
              <Button type="submit" variant="outline">
                로그인
              </Button>
            </form>
          ) : (
            <Button 
              variant="outline" 
              onClick={() => setIsAdmin(false)}
              className="text-red-400 hover:text-red-300"
            >
              로그아웃
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}