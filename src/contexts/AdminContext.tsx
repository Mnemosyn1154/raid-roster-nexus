import React, { createContext, useContext, useState } from 'react';

interface AdminContextType {
  isAdmin: boolean;
  setIsAdmin: (value: boolean) => void;
  verifyPassword: (password: string) => boolean;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export function AdminProvider({ children }: { children: React.ReactNode }) {
  const [isAdmin, setIsAdmin] = useState(false);
  
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