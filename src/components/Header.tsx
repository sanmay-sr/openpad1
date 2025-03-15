
import React from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { animations } from "@/utils/animations";
import { Button } from "@/components/Button";
import { FileText, Github, User } from "lucide-react";

interface HeaderProps {
  className?: string;
}

export const Header: React.FC<HeaderProps> = ({ className }) => {
  return (
    <header 
      className={cn(
        "w-full py-6 px-4 md:px-8 flex items-center justify-between border-b border-border/30 glassmorphism sticky top-0 z-50",
        className
      )}
    >
      <div className={cn("flex items-center gap-2", animations.fadeIn())}>
        <FileText className="h-6 w-6 text-primary" />
        <Link to="/" className="text-xl font-semibold tracking-tight hover:text-primary transition-colors duration-200">
          OpenPad
        </Link>
        <div className="hidden sm:block">
          <span className="text-xs px-2 py-0.5 ml-2 rounded-full bg-secondary text-muted-foreground">
            Beta
          </span>
        </div>
      </div>
      
      <div className={cn("flex items-center gap-3", animations.fadeIn({ delay: 0.1 }))}>
        <a 
          href="https://github.com" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-muted-foreground hover:text-foreground transition-colors duration-200"
        >
          <Github className="h-5 w-5" />
        </a>
        
        <Button 
          variant="outline" 
          size="sm"
          className="gap-2"
        >
          <User className="h-4 w-4" />
          <span>Sign In</span>
        </Button>
      </div>
    </header>
  );
};
