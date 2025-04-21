import React from "react";
import { Link } from "react-router-dom";
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
        <div>
          <p>© {new Date().getFullYear()} OpenPad. All rights reserved.</p>
        </div>
        
        <div className="flex items-center gap-6">
          <Link 
            to="/terms" 
            className="hover:text-foreground transition-colors duration-200"
          >
            Terms
          </Link>
          <Link 
            to="/privacy" 
            className="hover:text-foreground transition-colors duration-200"
          >
            Privacy
          </Link>
          <Link 
            to="/contact" 
            className="hover:text-foreground transition-colors duration-200"
          >
            Contact
          </Link>
        </div>
      </div>
    </footer>
  );
};
