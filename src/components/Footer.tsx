
import React from "react";
import { cn } from "@/lib/utils";
import { animations } from "@/utils/animations";

interface FooterProps {
  className?: string;
}

export const Footer: React.FC<FooterProps> = ({ className }) => {
  return (
    <footer 
      className={cn(
        "w-full py-6 px-4 md:px-8 mt-auto border-t border-border/30",
        animations.fadeIn({ delay: 0.2 }),
        className
      )}
    >
      <div className="container flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <img src="/lovable-uploads/9cd142a6-d1cc-41db-a20a-f419772b0b0e.png"
               className="h-5 w-5 rounded-full bg-[#23262a]"
               alt="Ghostpadz ghost logo"
          />
          <p>© {new Date().getFullYear()} <strong>Ghostpadz</strong>. All rights reserved.</p>
        </div>
        <div className="flex items-center gap-6">
          <a 
            href="#" 
            className="hover:text-foreground transition-colors duration-200"
          >
            Terms
          </a>
          <a 
            href="#" 
            className="hover:text-foreground transition-colors duration-200"
          >
            Privacy
          </a>
          <a 
            href="#" 
            className="hover:text-foreground transition-colors duration-200"
          >
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
};
