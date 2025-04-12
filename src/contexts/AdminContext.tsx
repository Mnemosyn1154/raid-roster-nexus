import React, { createContext, useContext, useState, useEffect } from 'react';

interface AdminContextType {
  isAdmin: boolean;
  setIsAdmin: (value: boolean) => void;
  verifyPassword: (password: string) => boolean;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export function AdminProvider({ children }: { children: React.ReactNode }) {
  const [isAdmin, setIsAdmin] = useState(() => {
    // 초기 상태를 로컬 스토리지에서 가져옴
    const stored = localStorage.getItem('isAdmin');
    return stored === 'true';
  });
  
  // isAdmin 상태가 변경될 때마다 로컬 스토리지에 저장
  useEffect(() => {
    localStorage.setItem('isAdmin', isAdmin.toString());
  }, [isAdmin]);

  const verifyPassword = (password: string) => {
    // 실제 구현에서는 더 안전한 방식으로 비밀번호를 검증해야 합니다
    const isValid = password === "impreza1234!";
    setIsAdmin(isValid);
    return isValid;
  };

  return (
    <AdminContext.Provider value={{ isAdmin, setIsAdmin, verifyPassword }}>
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
}