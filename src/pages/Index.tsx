
import React from "react";
import { cn } from "@/lib/utils";
import { animations } from "@/utils/animations";
import { Header } from "@/components/Header";
import { NoteEditor } from "@/components/NoteEditor";
import { Footer } from "@/components/Footer";
import { FileText } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 container px-4 py-12 max-w-5xl mx-auto">
        <div className="max-w-3xl mx-auto mb-12 text-center">
          <div className={cn("inline-flex items-center justify-center p-2 bg-secondary/50 rounded-full mb-4", animations.fadeIn())}>
            <FileText className="h-5 w-5 text-primary mr-2" />
            <span className="text-sm font-medium">Minimalist. Fast. Shareable.</span>
          </div>
          
          <h1 className={cn("text-4xl md:text-5xl font-bold tracking-tight mb-4", animations.fadeIn({ delay: 0.1 }))}>
            The simplest way to share text and code
          </h1>
          
          <p className={cn("text-xl text-muted-foreground", animations.fadeIn({ delay: 0.2 }))}>
            Create notes with custom URLs. Share code with syntax highlighting.
            No signup required.
          </p>
        </div>
        
        <NoteEditor className={animations.slideUp({ delay: 0.3 })} />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
