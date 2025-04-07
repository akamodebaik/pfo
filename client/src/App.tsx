import { Switch, Route } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { LanguageProvider } from "@/components/ui/language-provider";
import { PortfolioProvider } from "@/contexts/portfolio-context";
import { AuthProvider } from "@/hooks/use-auth";
import { ProtectedRoute } from "@/lib/protected-route";
import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";

// Pages
import Home from "@/pages/home";
import About from "@/pages/about";
import Projects from "@/pages/projects";
import Friends from "@/pages/friends";
import Updates from "@/pages/updates";
import AdminLogin from "@/pages/admin/login";
import AdminDashboard from "@/pages/admin/dashboard";
import NotFound from "@/pages/not-found";

// Components
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import MusicPlayer from "@/components/music-player";
import CustomCursor from "@/components/custom-cursor";
import ConnectivityStatus from "@/components/connectivity-status";
import LoadingScreen from "@/components/loading-screen";
import ContactSection from "@/components/contact-section";
import PageTransition from "@/components/page-transition";
import SmoothScroll from "@/components/smooth-scroll";

function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      {children}
      <ContactSection />
      <Footer />
      <MusicPlayer />
      <CustomCursor />
      <ConnectivityStatus />
    </>
  );
}

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Preload critical assets
    const preloadImages = [
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c'
    ];

    const promises = preloadImages.map(src => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = src;
        img.onload = resolve;
        img.onerror = reject;
      });
    });

    // Add a minimum loading time (2 seconds) for better UX
    const minLoadingTime = new Promise(resolve => 
      setTimeout(resolve, 2000)
    );

    // Wait for all preloads and minimum time
    Promise.all([...promises, minLoadingTime])
      .finally(() => {
        // Loading complete
        setIsLoading(false);
      });
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="light">
        <LanguageProvider defaultLanguage="en">
          <PortfolioProvider>
            <AuthProvider>
              {isLoading ? (
                <LoadingScreen onLoadingComplete={() => setIsLoading(false)} />
              ) : (
                <AnimatePresence mode="wait">
                  <Switch>
                    <Route path="/admin/login">
                      <AdminLogin />
                    </Route>
                    <ProtectedRoute path="/admin/dashboard/:page?" component={AdminDashboard} />
                    <ProtectedRoute path="/admin" component={AdminDashboard} />
                    
                    <Route path="/">
                      <MainLayout>
                        <PageTransition>
                          <Home />
                        </PageTransition>
                      </MainLayout>
                    </Route>
                    
                    <Route path="/about">
                      <MainLayout>
                        <PageTransition>
                          <About />
                        </PageTransition>
                      </MainLayout>
                    </Route>
                    
                    <Route path="/projects">
                      <MainLayout>
                        <PageTransition>
                          <Projects />
                        </PageTransition>
                      </MainLayout>
                    </Route>
                    
                    <Route path="/friends">
                      <MainLayout>
                        <PageTransition>
                          <Friends />
                        </PageTransition>
                      </MainLayout>
                    </Route>
                    
                    <Route path="/updates">
                      <MainLayout>
                        <PageTransition>
                          <Updates />
                        </PageTransition>
                      </MainLayout>
                    </Route>
                    
                    <Route>
                      <MainLayout>
                        <NotFound />
                      </MainLayout>
                    </Route>
                  </Switch>
                </AnimatePresence>
              )}
              <Toaster />
            </AuthProvider>
          </PortfolioProvider>
        </LanguageProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
