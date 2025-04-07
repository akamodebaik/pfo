import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLocation } from 'wouter';
import { Lock, User, X, ArrowRight } from 'lucide-react';
import { useLanguage } from '@/components/ui/language-provider';
import { useAuth } from '@/hooks/use-auth';
import { useToast } from '@/hooks/use-toast';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function AdminLogin() {
  const [, setLocation] = useLocation();
  const { t } = useLanguage();
  const { toast } = useToast();
  const { user, loginMutation } = useAuth();
  
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      setLocation('/admin/dashboard');
    }
  }, [user, setLocation]);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    try {
      await loginMutation.mutateAsync({ username, password });
      setLocation('/admin/dashboard');
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message || t('admin.error'));
      } else {
        setError(t('admin.error'));
      }
    }
  };
  
  const handleDemoLogin = () => {
    // Set the admin credentials as requested
    setUsername('aka');
    setPassword('akaanakbaik17!');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-secondary/50 px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="bg-card rounded-3xl shadow-md w-full max-w-md"
      >
        <div className="p-6 md:p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-playfair font-bold text-foreground">{t('admin.login')}</h2>
            <button 
              onClick={() => setLocation('/')}
              className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-foreground hover:text-primary transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="username" className="block mb-2 text-sm font-medium text-foreground">
                {t('admin.username')}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                  <User className="h-4 w-4 text-muted-foreground" />
                </div>
                <Input
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="pl-10"
                  placeholder="aka"
                  required
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="password" className="block mb-2 text-sm font-medium text-foreground">
                {t('admin.password')}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                  <Lock className="h-4 w-4 text-muted-foreground" />
                </div>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10"
                  placeholder="••••••••••••"
                  required
                />
              </div>
            </div>
            
            {error && (
              <div className="text-red-500 text-sm">
                {error}
              </div>
            )}
            
            <Button 
              type="submit" 
              className="w-full flex items-center justify-center space-x-2"
              disabled={loginMutation.isPending}
            >
              <span className="font-montserrat">{loginMutation.isPending ? 'Logging in...' : 'Login'}</span>
              <ArrowRight className="h-4 w-4" />
            </Button>
            
            <div className="text-center">
              <button
                type="button"
                onClick={handleDemoLogin}
                className="text-sm text-primary hover:text-primary/80 transition-colors"
              >
                Use demo credentials
              </button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
