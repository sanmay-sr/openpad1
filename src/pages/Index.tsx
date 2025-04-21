
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { animations } from "@/utils/animations";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ArrowRight } from "lucide-react";
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
    setIsSubmitting(true);
    navigate(`/${formattedUrl}`);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#222]" style={{background: "#222"}}>
      <Header />
      <main className="flex-1 container px-4 py-6 md:py-12 max-w-5xl mx-auto">
        <div className="max-w-3xl mx-auto mb-6 md:mb-12 text-center">
          <div className="flex flex-col items-center mb-5" style={{animation: "fade-in 0.8s"}}>
            <img
              src="/lovable-uploads/089be0ad-eaca-4c52-9952-e587dcea9949.png"
              alt="Ghostpadz Main Logo"
              className="w-28 h-28 md:w-40 md:h-40 rounded-full mb-4"
              style={{ objectFit: "contain", background: "#23262a" }}
            />
            <span className={cn(
              "text-3xl md:text-5xl font-bold tracking-tight font-mono text-white"
            )}>
              Ghost<span className="text-primary">Padz</span>
            </span>
          </div>
          <div className={cn("inline-flex items-center justify-center px-4 py-1.5 bg-secondary/60 rounded-full mb-3 md:mb-4", animations.fadeIn())}>
            <span className="text-sm md:text-base text-muted-foreground font-semibold">The cleanest way to share notes. Secure. Anonymous. Ghostly fast.</span>
          </div>
          <p className={cn("text-base md:text-xl text-muted-foreground mb-8", animations.fadeIn({ delay: 0.1 }))}>
            Create ghost notes with custom URLs.<br className="hidden md:block"/> Share code & text easily. No signup. No hassle.
          </p>
          <form 
            onSubmit={handleSubmit}
            className={cn("max-w-md mx-auto", animations.fadeIn({ delay: 0.2 }))}
          >
            <div className="flex items-center gap-2">
              <div className="relative flex-1">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-muted-foreground font-mono opacity-80">
                  {process.env.NODE_ENV === 'development' ? 'ghostpadz.com/' : window.location.origin + '/'}
                </span>
                <Input
                  type="text"
                  value={customUrl}
                  onChange={(e) => setCustomUrl(e.target.value.replace(/\s+/g, "-").toLowerCase())}
                  className="pl-[140px] bg-[#25272a] text-white"
                  placeholder="your-ghost-note"
                  disabled={isSubmitting}
                />
              </div>
              <Button type="submit" disabled={isSubmitting} className="bg-primary">
                <ArrowRight className="h-4 w-4 md:mr-2" />
                <span className="hidden md:inline">Go</span>
              </Button>
            </div>
            <p className="mt-2 text-xs text-center text-muted-foreground">
              Choose a custom URL for your note (public or reserved)
            </p>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
