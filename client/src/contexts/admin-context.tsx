import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useLocation } from 'wouter';
import { useToast } from '@/hooks/use-toast';
import { apiRequest } from '@/lib/queryClient';

interface AdminProviderProps {
  children: ReactNode;
}

interface AdminContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  error: string | null;
}

const AdminContext = createContext<AdminContextType>({
  isAuthenticated: false,
  isLoading: true,
  login: async () => false,
  logout: () => {},
  error: null
});

export const useAdmin = () => useContext(AdminContext);

export const AdminProvider = ({ children }: AdminProviderProps) => {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Check initial auth status
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch('/api/admin/check-auth', {
          credentials: 'include'
        });
        
        setIsAuthenticated(res.ok);
        setIsLoading(false);
      } catch (err) {
        setIsAuthenticated(false);
        setIsLoading(false);
      }
    };
    
    checkAuth();
  }, []);

  const login = async (username: string, password: string): Promise<boolean> => {
    try {
      setError(null);
      const res = await apiRequest('POST', '/api/admin/login', { username, password });
      
      if (res.ok) {
        setIsAuthenticated(true);
        return true;
      } else {
        const data = await res.json();
        setError(data.message || 'Invalid credentials');
        return false;
      }
    } catch (err) {
      setError('Login failed. Please try again.');
      return false;
    }
  };

  const logout = async () => {
    try {
      await apiRequest('POST', '/api/admin/logout', undefined);
      setIsAuthenticated(false);
      setLocation('/admin/login');
      toast({
        title: 'Logged out',
        description: 'You have been successfully logged out.',
      });
    } catch (err) {
      console.error('Logout error:', err);
      toast({
        title: 'Logout failed',
        description: 'There was an error logging out. Please try again.',
        variant: 'destructive',
      });
    }
  };

  return (
    <AdminContext.Provider value={{ 
      isAuthenticated, 
      isLoading, 
      login, 
      logout,
      error
    }}>
      {children}
    </AdminContext.Provider>
  );
};
