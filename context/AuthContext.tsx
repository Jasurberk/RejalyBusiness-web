
import React, { createContext, useState, useContext, useMemo, useCallback } from 'react';
import type { User } from '../types';
import { MOCK_USERS } from '../constants';

interface AuthContextType {
  currentUser: User | null;
  login: (email: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const login = useCallback((email: string) => {
    // Attempt to find the user by email
    const userToLogin = Object.values(MOCK_USERS).find(u => u.email === email);
    
    // Only allow logging in if the user exists and has the 'business' role
    if (userToLogin && userToLogin.role === 'business') {
        setCurrentUser(userToLogin);
        return true;
    }
    
    // If user doesn't exist or is not a business, login fails
    return false;
  }, []);

  const logout = useCallback(() => {
    setCurrentUser(null);
  }, []);
  
  const value = useMemo(() => ({ currentUser, login, logout }), [currentUser, login, logout]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};