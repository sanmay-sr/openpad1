
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { animations } from "@/utils/animations";
import { Button } from "@/components/Button";
import { FileText, User, Moon, Sun, LogOut } from "lucide-react";
import { useTheme } from "./ThemeProvider";
import { useAuth } from "@/contexts/AuthContext";

interface HeaderProps {
  className?: string;
}

export const Header: React.FC<HeaderProps> = ({ className }) => {
  const { theme, toggleTheme } = useTheme();
  const { isAuthenticated, signOut, isLoading } = useAuth();
  const navigate = useNavigate();

  return (
    <header 
      className={cn(
        "w-full py-6 px-4 md:px-8 flex items-center justify-between border-b border-border/30 glassmorphism sticky top-0 z-50",
        className
      )}
    >
      <Link 
        to="/" 
        className={cn("flex items-center gap-2", animations.fadeIn())}
      >
        <FileText className="h-6 w-6 text-primary" />
        <span className="text-xl font-semibold tracking-tight hover:text-primary transition-colors duration-200">
          OpenPad
        </span>
        <div className="hidden sm:block">
          <span className="text-xs px-2 py-0.5 ml-2 rounded-full bg-secondary text-muted-foreground">
            Beta
          </span>
        </div>
      </Link>
      
      <div className={cn("flex items-center gap-3", animations.fadeIn({ delay: 0.1 }))}>
        <Button
          variant="ghost"
          size="sm"
          onClick={toggleTheme}
          className="w-9 px-0"
        >
          {theme === 'light' ? (
            <Moon className="h-4 w-4" />
          ) : (
            <Sun className="h-4 w-4" />
          )}
        </Button>
        
        {isAuthenticated ? (
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate('/dashboard')}
              className="gap-2"
            >
              <User className="h-4 w-4" />
              <span>Dashboard</span>
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              className="gap-2"
              onClick={() => signOut()}
              disabled={isLoading}
            >
              <LogOut className="h-4 w-4" />
              <span>Sign Out</span>
            </Button>
          </div>
        ) : (
          <Link to="/auth">
            <Button 
              variant="outline" 
              size="sm"
              className="gap-2"
            >
              <User className="h-4 w-4" />
              <span>Sign In</span>
            </Button>
          </Link>
        )}
      </div>
    </header>
  );
};
