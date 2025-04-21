
import React, { useEffect, useState } from "react";
import { useParams, Navigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { animations } from "@/utils/animations";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { NoteViewer } from "@/components/NoteViewer";
import { NoteEditor } from "@/components/NoteEditor";
import { useAuth } from "@/contexts/AuthContext";
import { EmailVerificationAlert } from "@/components/EmailVerificationAlert";
import { getNote, Note } from "@/services/noteService";
import { toast } from "sonner";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Lock, AlertCircle } from "lucide-react";

const NotePage = () => {
  const { noteUrl } = useParams<{ noteUrl: string }>();
  const { isAuthenticated, isEmailVerified, user } = useAuth();
  const [showVerificationAlert, setShowVerificationAlert] = useState(false);
  const [note, setNote] = useState<Note | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isCreatingNote, setIsCreatingNote] = useState(false);
  
  // If no note URL provided, redirect to home
  if (!noteUrl) {
    return <Navigate to="/" />;
  }
  
  useEffect(() => {
    const loadNote = async () => {
      setIsLoading(true);
      try {
        const noteData = await getNote(noteUrl);
        setNote(noteData);
        
        if (!noteData) {
          // Note doesn't exist, we'll create a new one
          setIsCreatingNote(true);
        }
      } catch (error) {
        console.error("Error loading note:", error);
        toast.error("Failed to load note");
      } finally {
        setIsLoading(false);
      }
    };
    
    loadNote();
  }, [noteUrl]);
  
  // Check if verification alert should be shown
  useEffect(() => {
    if (isAuthenticated && !isEmailVerified) {
      setShowVerificationAlert(true);
    } else {
      setShowVerificationAlert(false);
    }
  }, [isAuthenticated, isEmailVerified]);
  
  // Determine if user can edit this note
  const canEdit = () => {
    if (!note) return true; // If creating a new note, user can edit
    
    if (!note.is_reserved) return true; // Anyone can edit non-reserved notes
    
    // Only the owner can edit reserved notes
    return isAuthenticated && user?.id === note.owner_id;
  };
  
  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex justify-center items-center p-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      );
    }
    
    if (isCreatingNote) {
      return (
        <>
          <Alert variant="default" className="mb-4">
            <AlertCircle className="h-4 w-4 mr-2" />
            <AlertDescription>
              Creating a new note at <strong>/{noteUrl}</strong>
            </AlertDescription>
          </Alert>
          <NoteEditor
            initialContent=""
            defaultCustomUrl={noteUrl}
            className={animations.fadeIn({ delay: 0.2 })}
          />
        </>
      );
    }
    
    if (note && !canEdit()) {
      return (
        <>
          <Alert variant="default" className="mb-4 bg-amber-50 text-amber-800 border-amber-200 dark:bg-amber-900/20 dark:text-amber-400 dark:border-amber-800/30">
            <Lock className="h-4 w-4 mr-2" />
            <AlertDescription>
              This note is reserved by its owner and cannot be edited
            </AlertDescription>
          </Alert>
          <NoteViewer 
            url={noteUrl} 
            className={animations.fadeIn({ delay: 0.2 })} 
          />
        </>
      );
    }
    
    return (
      <NoteViewer 
        url={noteUrl} 
        className={animations.fadeIn({ delay: 0.2 })} 
      />
    );
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 container px-4 py-6 max-w-3xl mx-auto">
        {showVerificationAlert && (
          <EmailVerificationAlert />
        )}
        
        {renderContent()}
      </main>
      
      <Footer />
    </div>
  );
};

export default NotePage;
