import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { animations } from "@/utils/animations";
import { Button } from "@/components/Button";
import { FileText, User, Moon, Sun, LogOut, Menu, X } from "lucide-react";
import { useTheme } from "./ThemeProvider";
import { useAuth } from "@/contexts/AuthContext";

interface HeaderProps {
  className?: string;
}

export const Header: React.FC<HeaderProps> = ({ className }) => {
  const { theme, toggleTheme } = useTheme();
  const { isAuthenticated, signOut, isLoading } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header 
      className={cn(
        "w-full py-4 px-4 md:px-8 flex flex-col md:flex-row items-center justify-between border-b border-border/30 glassmorphism sticky top-0 z-50",
        className
      )}
    >
      <div className="w-full md:w-auto flex items-center justify-between">
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

        <Button
          variant="ghost"
          size="sm"
          onClick={toggleMenu}
          className="md:hidden w-9 px-0"
        >
          {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>
      
      <div 
        className={cn(
          "w-full md:w-auto flex flex-col md:flex-row items-center gap-3 mt-4 md:mt-0",
          animations.fadeIn({ delay: 0.1 }),
          isMenuOpen ? "flex" : "hidden md:flex"
        )}
      >
        <Button
          variant="ghost"
          size="sm"
          onClick={toggleTheme}
          className="w-full md:w-9 px-0 justify-center md:justify-start"
        >
          {theme === 'light' ? (
            <Moon className="h-4 w-4" />
          ) : (
            <Sun className="h-4 w-4" />
          )}
          <span className="ml-2 md:hidden">Toggle Theme</span>
        </Button>
        
        {isAuthenticated ? (
          <div className="flex flex-col md:flex-row items-center gap-3 w-full md:w-auto">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                navigate('/dashboard');
                setIsMenuOpen(false);
              }}
              className="gap-2 w-full md:w-auto justify-center"
            >
              <User className="h-4 w-4" />
              <span>Dashboard</span>
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              className="gap-2 w-full md:w-auto justify-center"
              onClick={() => {
                signOut();
                setIsMenuOpen(false);
              }}
              disabled={isLoading}
            >
              <LogOut className="h-4 w-4" />
              <span>Sign Out</span>
            </Button>
          </div>
        ) : (
          <Link to="/auth" className="w-full md:w-auto" onClick={() => setIsMenuOpen(false)}>
            <Button 
              variant="outline" 
              size="sm"
              className="gap-2 w-full md:w-auto justify-center"
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
