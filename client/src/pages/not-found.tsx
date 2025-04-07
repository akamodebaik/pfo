import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import PageTransition from "@/components/page-transition";

export default function NotFound() {
  const [_, setLocation] = useLocation();
  
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-50">
      <PageTransition>
        <Card className="w-full max-w-md mx-4 shadow-lg">
          <CardContent className="pt-6">
            <div className="flex flex-col items-center text-center mb-6">
              <AlertCircle className="h-16 w-16 text-red-500 mb-2" />
              <h1 className="text-5xl font-bold text-gray-900 mb-2">404</h1>
              <h2 className="text-2xl font-semibold text-gray-700">Page Not Found</h2>
            </div>

            <p className="mt-4 text-sm text-gray-600 text-center mb-6">
              The page you are looking for doesn't exist or has been moved.
            </p>
            
            <div className="flex justify-center">
              <Button 
                onClick={() => setLocation('/')}
                size="lg"
                className="px-8 font-medium"
              >
                Back to Home
              </Button>
            </div>
          </CardContent>
        </Card>
      </PageTransition>
    </div>
  );
}
