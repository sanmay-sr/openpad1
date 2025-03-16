
import React from "react";
import { cn } from "@/lib/utils";
import { animations } from "@/utils/animations";
import { Header } from "@/components/Header";
import { NoteEditor } from "@/components/NoteEditor";
import { Footer } from "@/components/Footer";
import { useIsMobile } from "@/hooks/use-mobile";

const SimplifiedLanding = () => {
  const isMobile = useIsMobile();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 container px-4 py-4 md:py-8 max-w-4xl mx-auto">
        <div className={cn("max-w-xl mx-auto mb-4 md:mb-6 text-center", animations.fadeIn())}>
          {!isMobile && (
            <h1 className="text-xl md:text-2xl font-bold tracking-tight mb-2">
              Create & share notes instantly
            </h1>
          )}
        </div>
        
        <NoteEditor className={animations.slideUp({ delay: 0.1 })} />
      </main>
      
      <Footer />
    </div>
  );
};

export default SimplifiedLanding;
