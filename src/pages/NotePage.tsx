
import React, { useEffect, useState } from "react";
import { useParams, Navigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { animations } from "@/utils/animations";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { NoteViewer } from "@/components/NoteViewer";
import { useAuth } from "@/contexts/AuthContext";
import { EmailVerificationAlert } from "@/components/EmailVerificationAlert";

const NotePage = () => {
  const { noteUrl } = useParams<{ noteUrl: string }>();
  const { isAuthenticated, isEmailVerified } = useAuth();
  const [showVerificationAlert, setShowVerificationAlert] = useState(false);
  
  // If no note URL provided, redirect to home
  if (!noteUrl) {
    return <Navigate to="/" />;
  }
  
  // Check if this is a reserved URL that might need authentication
  // This is just a placeholder logic - you would implement the actual check
  // based on your data structure and reserved URL patterns
  useEffect(() => {
    // Only show verification alert for reserved notes when user is logged in but not verified
    if (isAuthenticated && !isEmailVerified) {
      // In a real implementation, you would check if this is a reserved note here
      // For now, we're just setting a flag to potentially show the alert
      setShowVerificationAlert(true);
    } else {
      setShowVerificationAlert(false);
    }
  }, [isAuthenticated, isEmailVerified]);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 container px-4 py-6 max-w-3xl mx-auto">
        {showVerificationAlert && (
          <EmailVerificationAlert />
        )}
        
        <NoteViewer 
          url={noteUrl} 
          className={cn("py-4", animations.fadeIn())} 
        />
      </main>
      
      <Footer />
    </div>
  );
};

export default NotePage;
