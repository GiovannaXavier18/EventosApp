import { createContext, useState, useContext, type ReactNode, useEffect } from 'react';
import type { LoginPayload, User } from '../types/api';
import { loginRequest, logoutRequest } from '../services/authService';
import { useQueryClient } from '@tanstack/react-query';
import { initializeMockData } from '../data/mockData';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (credentials: LoginPayload) => Promise<void>;
  logout: () => Promise<void>;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const queryClient = useQueryClient();

  useEffect(() => {
    initializeMockData();

    async function checkSession() {
      const userSession = localStorage.getItem('user_session');
      if (userSession) {
        setUser(JSON.parse(userSession));
      }
      setIsLoading(false);
    }
    checkSession();
  }, []);

  const login = async (credentials: LoginPayload) => {
    const { user } = await loginRequest(credentials); 
    localStorage.setItem('user_session', JSON.stringify(user));
    setUser(user);
  };

  const logout = async () => {
    await logoutRequest();
    localStorage.removeItem('user_session');
    setUser(null);
    queryClient.clear();
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
}