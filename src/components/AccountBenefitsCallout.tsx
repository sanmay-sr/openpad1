import React from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { animations } from "@/utils/animations";
import { Button } from "@/components/ui/button";
import { Shield, Star, Clock, Lock } from "lucide-react";

interface AccountBenefitsCalloutProps {
  className?: string;
  variant?: "banner" | "card" | "inline";
}

export const AccountBenefitsCallout: React.FC<AccountBenefitsCalloutProps> = ({
  className,
  variant = "card"
}) => {
  const benefits = [
    {
      icon: <Shield className="h-4 w-4" />,
      text: "Reserve custom URLs"
    },
    {
      icon: <Lock className="h-4 w-4" />,
      text: "Secure your notes"
    },
    {
      icon: <Star className="h-4 w-4" />,
      text: "Save favorites"
    },
    {
      icon: <Clock className="h-4 w-4" />,
      text: "Extended note lifetime"
    }
  ];

  if (variant === "banner") {
    return (
      <div className={cn(
        "w-full bg-primary/5 border border-primary/10 rounded-lg p-4",
        "flex flex-col md:flex-row items-center justify-between gap-4",
        animations.fadeIn(),
        className
      )}>
        <div className="flex flex-col md:flex-row items-center gap-4">
          <div className="flex items-center gap-2">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-center gap-1 text-sm text-muted-foreground">
                {benefit.icon}
                <span className="hidden sm:inline">{benefit.text}</span>
              </div>
            ))}
          </div>
        </div>
        <Button asChild variant="default" size="sm">
          <Link to="/auth?mode=signup">
            Sign Up Free
          </Link>
        </Button>
      </div>
    );
  }

  if (variant === "inline") {
    return (
      <div className={cn(
        "flex items-center gap-2 text-sm text-muted-foreground",
        animations.fadeIn(),
        className
      )}>
        <span>Unlock more features:</span>
        <div className="flex items-center gap-2">
          {benefits.map((benefit, index) => (
            <div key={index} className="flex items-center gap-1">
              {benefit.icon}
              <span className="hidden sm:inline">{benefit.text}</span>
            </div>
          ))}
        </div>
        <Button asChild variant="link" size="sm" className="text-primary">
          <Link to="/auth?mode=signup">
            Sign up free →
          </Link>
        </Button>
      </div>
    );
  }

  // Default card variant
  return (
    <div className={cn(
      "bg-primary/5 border border-primary/10 rounded-lg p-4",
      "flex flex-col gap-4",
      animations.fadeIn(),
      className
    )}>
      <div className="flex items-center justify-between">
        <h3 className="font-medium">Unlock More Features</h3>
        <Button asChild variant="default" size="sm">
          <Link to="/auth?mode=signup">
            Sign Up Free
          </Link>
        </Button>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {benefits.map((benefit, index) => (
          <div key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
            {benefit.icon}
            <span>{benefit.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
}; 