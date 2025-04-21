import React from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { animations } from "@/utils/animations";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

interface LegalLayoutProps {
  children: React.ReactNode;
  title: string;
  lastUpdated?: string;
}

export const LegalLayout: React.FC<LegalLayoutProps> = ({
  children,
  title,
  lastUpdated
}) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 container px-4 py-8 md:py-12 max-w-4xl mx-auto">
        <div className={cn("mb-8", animations.fadeIn())}>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">{title}</h1>
          {lastUpdated && (
            <p className="text-sm text-muted-foreground">
              Last updated: {lastUpdated}
            </p>
          )}
        </div>

        <div className={cn("prose prose-slate dark:prose-invert max-w-none", animations.fadeIn({ delay: 0.1 }))}>
          {children}
        </div>

        <div className={cn("mt-8 pt-8 border-t border-border", animations.fadeIn({ delay: 0.2 }))}>
          <p className="text-sm text-muted-foreground">
            Need help? <Link to="/contact" className="text-primary hover:underline">Contact us</Link>
          </p>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}; 