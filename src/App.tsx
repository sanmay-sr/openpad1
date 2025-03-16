
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Index from "./pages/Index";
import SimplifiedLanding from "./pages/SimplifiedLanding";
import NotFound from "./pages/NotFound";
import NotePage from "./pages/NotePage";
import Auth from "./pages/Auth";
import { ThemeProvider } from "@/components/ThemeProvider";
import { AuthProvider } from "@/contexts/AuthContext";

// Import the CSS for code highlighting
import "./styles/code.css";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isDirectVisit, setIsDirectVisit] = useState(false);

  useEffect(() => {
    // Check if this is a direct visit or navigation from another page
    const referrer = document.referrer;
    const isDirectNavigation = !referrer || !referrer.includes(window.location.host);
    setIsDirectVisit(isDirectNavigation);
    
    console.log("App component mounted");
    console.log("Is direct visit:", isDirectNavigation);
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AuthProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route 
                  path="/" 
                  element={isDirectVisit ? <SimplifiedLanding /> : <Index />} 
                />
                <Route path="/full" element={<Index />} />
                <Route path="/simple" element={<SimplifiedLanding />} />
                <Route path="/auth" element={<Auth />} />
                <Route path="/:noteUrl" element={<NotePage />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
