import { ReactNode } from 'react';
import Sidebar from './sidebar';
import { LogOut, Settings } from 'lucide-react';
import { useLocation } from 'wouter';
import { useAuth } from '@/hooks/use-auth';
import { useToast } from '@/hooks/use-toast';

interface DashboardLayoutProps {
  children: ReactNode;
  currentPage: string;
}

export default function DashboardLayout({ children, currentPage }: DashboardLayoutProps) {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const { logoutMutation } = useAuth();

  const handleLogout = async () => {
    try {
      await logoutMutation.mutateAsync();
      setLocation('/admin/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar currentPage={currentPage} />

      <div className="flex-1 flex flex-col">
        <header className="bg-card shadow-sm border-b border-border h-16 flex items-center justify-between px-6">
          <h1 className="text-xl font-playfair font-bold text-foreground">Aka Admin Dashboard</h1>
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => setLocation('/admin/dashboard/settings')}
              className="p-2 text-muted-foreground hover:text-foreground transition-colors rounded-full hover:bg-secondary"
              aria-label="Settings"
            >
              <Settings className="h-5 w-5" />
            </button>
            <button 
              onClick={handleLogout}
              className="p-2 text-muted-foreground hover:text-foreground transition-colors rounded-full hover:bg-secondary"
              aria-label="Log out"
            >
              <LogOut className="h-5 w-5" />
            </button>
          </div>
        </header>

        <main className="flex-1 p-6 overflow-auto">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>

        <footer className="bg-card shadow-sm border-t border-border py-4 px-6 text-center text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} Aka Portfolio Admin Dashboard. All rights reserved.
        </footer>
      </div>
    </div>
  );
}
