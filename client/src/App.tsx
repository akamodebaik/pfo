import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import { AppProvider } from "@/contexts/AppContext";
import HomePage from "@/pages/HomePage";
import NotFound from "@/pages/not-found";
import { Route, Switch, Redirect } from "wouter";
import { lazy, Suspense, useState, useEffect } from "react";
import { siteConfig } from "@/config/site";
import "./lib/i18n";

// Lazy loaded components
const AdminDashboard = lazy(() => import("@/pages/AdminDashboard"));
const LoginPage = lazy(() => import("@/pages/LoginPage"));

// Simple loading component
function SimpleLoader() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="w-16 h-16 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
      <p className="mt-4 text-gray-600 dark:text-gray-400">Loading...</p>
    </div>
  );
}

// Protected Route component for admin access
function ProtectedRoute({ component: Component, ...rest }: { component: React.ComponentType<any>, path: string }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Set document title for admin routes
    document.title = `Admin Dashboard | ${siteConfig.name}`;
    
    // Check if user is authenticated
    const authUser = localStorage.getItem('authUser');
    if (authUser) {
      try {
        const user = JSON.parse(authUser);
        setIsAuthenticated(!!user);
      } catch (error) {
        setIsAuthenticated(false);
      }
    } else {
      setIsAuthenticated(false);
    }
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return <SimpleLoader />;
  }

  if (!isAuthenticated) {
    return <Redirect to="/login" />;
  }

  return <Component {...rest} />;
}

function App() {
  // Set default document language based on site config
  useEffect(() => {
    document.documentElement.lang = siteConfig.defaultLanguage;
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <AppProvider>
        <div className="page-wrapper">
          <Suspense fallback={<SimpleLoader />}>
            <Switch>
              <Route path="/" component={HomePage} />
              <Route path="/login" component={LoginPage} />
              <Route path="/admin">
                {() => <ProtectedRoute component={AdminDashboard} path="/admin" />}
              </Route>
              <Route component={NotFound} />
            </Switch>
          </Suspense>
        </div>
        <Toaster />
      </AppProvider>
    </QueryClientProvider>
  );
}

export default App;
