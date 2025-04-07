import { useEffect } from 'react';
import { useLocation } from 'wouter';

export default function AdminIndex() {
  const [, setLocation] = useLocation();

  useEffect(() => {
    // Redirect to dashboard
    setLocation('/admin/dashboard');
  }, [setLocation]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <p className="text-lg text-muted-foreground">Redirecting to dashboard...</p>
      </div>
    </div>
  );
}
