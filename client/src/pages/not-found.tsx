import { useEffect } from 'react';
import { Link } from "wouter";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertCircle, Home } from "lucide-react";
import { siteConfig } from '@/config/site';

export default function NotFound() {
  // Set page title
  useEffect(() => {
    document.title = `404 - Page Not Found | ${siteConfig.name}`;
  }, []);

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <Card className="w-full max-w-md mx-4 border-2 border-primary/20 shadow-lg animate-fadeIn">
        <CardContent className="pt-6 pb-2">
          <div className="flex flex-col items-center text-center gap-4 mb-6">
            <AlertCircle className="h-16 w-16 text-primary animate-pulse" />
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white">404</h1>
            <h2 className="text-xl font-medium text-gray-800 dark:text-gray-200">Page Not Found</h2>
          </div>

          <p className="text-center text-gray-600 dark:text-gray-400">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </CardContent>
        <CardFooter className="flex justify-center pt-2 pb-6">
          <Link to="/">
            <Button className="gap-2">
              <Home className="h-4 w-4" /> 
              Back to Home
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
