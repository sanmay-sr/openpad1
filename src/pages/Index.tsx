
import React, { useState, useRef, useLayoutEffect } from "react";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { animations } from "@/utils/animations";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FileText, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const DOMAIN_PREFIX = () => {
  // Gets the current domain; fallback to openpad.io in development
  if (typeof window !== "undefined" && window.location) {
    return window.location.origin + "/";
  }
  return "https://openpad.io/";
};

function measureTextWidth(text: string, font = "16px Inter, sans-serif") {
  // Create offscreen canvas to measure pixel width of string
  const canvas = measureTextWidth._canvas || (measureTextWidth._canvas = document.createElement("canvas"));
  const context = canvas.getContext("2d");
  if (!context) return 150;
  context.font = font;
  const metrics = context.measureText(text);
  return metrics.width;
}

const Index = () => {
  const [customUrl, setCustomUrl] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [inputWidth, setInputWidth] = useState(120); // px, initial minimum
  const inputRef = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();

  // Update input width dynamically
  useLayoutEffect(() => {
    // Use ~16px font + low weight (update if input uses a diff font-size)
    const width = Math.max(
      measureTextWidth(customUrl || " ", "16px Inter, sans-serif") + 32,
      120 // px min width
    );
    setInputWidth(width);
  }, [customUrl]);

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
          <div
            className={cn(
              "inline-flex items-center justify-center p-1 md:p-2 bg-secondary/50 rounded-full mb-3 md:mb-4",
              animations.fadeIn()
            )}
          >
            <FileText className="h-4 w-4 md:h-5 md:w-5 text-primary mr-1 md:mr-2" />
            <span className="text-xs md:text-sm font-medium">
              Minimalist. Fast. Shareable.
            </span>
          </div>

          <h1
            className={cn(
              "text-2xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-3 md:mb-4",
              animations.fadeIn({ delay: 0.1 })
            )}
          >
            Create notes with custom URLs. Share code with syntax highlighting.
            <span className="block text-base font-normal text-muted-foreground mt-2">
              No signup required.
            </span>
          </h1>

          <form
            onSubmit={handleSubmit}
            className={cn(
              "max-w-md mx-auto",
              animations.fadeIn({ delay: 0.3 })
            )}
            autoComplete="off"
          >
            <div className="flex flex-col gap-1 items-center w-full">
              <div className="flex w-full items-center gap-2 relative">
                <span
                  className={cn(
                    "px-3 py-2 rounded-l-md border border-input bg-muted text-muted-foreground border-r-0 h-10 flex items-center text-base min-w-max",
                    "select-none"
                  )}
                  style={{
                    borderTopRightRadius: 0,
                    borderBottomRightRadius: 0,
                  }}
                >
                  {DOMAIN_PREFIX()}
                </span>
                <div className="relative flex-1">
                  <Input
                    ref={inputRef}
                    type="text"
                    value={customUrl}
                    onChange={(e) =>
                      setCustomUrl(e.target.value.replace(/\s+/g, "-").toLowerCase())
                    }
                    style={{
                      width: inputWidth,
                      fontFamily: "Inter, sans-serif",
                      borderTopLeftRadius: 0,
                      borderBottomLeftRadius: 0,
                      borderTopRightRadius: "0.375rem",
                      borderBottomRightRadius: "0.375rem",
                      transition: "width 0.2s", // Animate width
                      paddingLeft: 10,
                      paddingRight: 10,
                    }}
                    placeholder="your-note-name"
                    disabled={isSubmitting}
                    aria-label="Custom URL"
                    className="!border-l-0 !rounded-l-none text-base"
                  />
                </div>
                <Button type="submit" disabled={isSubmitting} className="h-10 px-4 ml-2">
                  <ArrowRight className="h-4 w-4 md:mr-2" />
                  <span className="hidden md:inline">Go</span>
                </Button>
              </div>
              <p className="mt-2 text-xs text-center text-muted-foreground">
                Enter a custom URL to access or create a new note
              </p>
            </div>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Index;

