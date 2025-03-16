
import React from "react";
import { useParams, Navigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { animations } from "@/utils/animations";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { NoteViewer } from "@/components/NoteViewer";

const NotePage = () => {
  const { noteUrl } = useParams<{ noteUrl: string }>();
  
  // If no note URL provided, redirect to home
  if (!noteUrl) {
    return <Navigate to="/" />;
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 container px-4 py-6 max-w-3xl mx-auto">
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
