
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { animations } from "@/utils/animations";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FileText, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const Index = () => {
  const [customUrl, setCustomUrl] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!customUrl.trim()) {
      toast.error("Please enter a custom URL");
      return;
    }
    
    // Format the URL (remove spaces, special characters, etc.)
    const formattedUrl = customUrl.trim().replace(/\s+/g, "-").toLowerCase();
    
    // Navigate to the formatted URL
    setIsSubmitting(true);
    navigate(`/${formattedUrl}`);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 container px-4 py-6 md:py-12 max-w-5xl mx-auto">
        <div className="max-w-3xl mx-auto mb-6 md:mb-12 text-center">
          <div className={cn("inline-flex items-center justify-center p-1 md:p-2 bg-secondary/50 rounded-full mb-3 md:mb-4", animations.fadeIn())}>
            <FileText className="h-4 w-4 md:h-5 md:w-5 text-primary mr-1 md:mr-2" />
            <span className="text-xs md:text-sm font-medium">Minimalist. Fast. Shareable.</span>
          </div>
          
          <h1 className={cn("text-2xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-3 md:mb-4", animations.fadeIn({ delay: 0.1 }))}>
            The simplest way to share text and code
          </h1>
          
          <p className={cn("text-base md:text-xl text-muted-foreground mb-8", animations.fadeIn({ delay: 0.2 }))}>
            Create notes with custom URLs. Share code with syntax highlighting.
            <span className="hidden md:inline"> No signup required.</span>
          </p>
          
          <form 
            onSubmit={handleSubmit}
            className={cn("max-w-md mx-auto", animations.fadeIn({ delay: 0.3 }))}
          >
            <div className="flex items-center gap-2">
              <div className="relative flex-1">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-muted-foreground">
                  {process.env.NODE_ENV === 'development' ? 'openpad.io/' : window.location.origin + '/'}
                </span>
                <Input
                  type="text"
                  value={customUrl}
                  onChange={(e) => setCustomUrl(e.target.value.replace(/\s+/g, "-").toLowerCase())}
                  className="pl-[120px]"
                  placeholder="your-note-name"
                  disabled={isSubmitting}
                />
              </div>
              <Button type="submit" disabled={isSubmitting}>
                <ArrowRight className="h-4 w-4 md:mr-2" />
                <span className="hidden md:inline">Go</span>
              </Button>
            </div>
            <p className="mt-2 text-xs text-center text-muted-foreground">
              Enter a custom URL to access or create a new note
            </p>
          </form>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
