import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface UrlInputProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit?: (e?: React.FormEvent) => void;
  placeholder?: string;
  className?: string;
  showSubmitButton?: boolean;
  disabled?: boolean;
  autoFocus?: boolean;
}

export const UrlInput: React.FC<UrlInputProps> = ({
  value,
  onChange,
  onSubmit,
  placeholder = "your-note-name",
  className,
  showSubmitButton = true,
  disabled = false,
  autoFocus = false,
}) => {
  const [prefixWidth, setPrefixWidth] = useState(0);
  const prefixRef = React.useRef<HTMLSpanElement>(null);

  // Calculate prefix width
  useEffect(() => {
    if (prefixRef.current) {
      const width = prefixRef.current.getBoundingClientRect().width;
      setPrefixWidth(width);
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Remove any protocol, domain, or slashes
    let newValue = e.target.value
      .replace(/^https?:\/\//, '')
      .replace(/^[^/]+\//, '')
      .replace(/^\//, '')
      .trim();

    // Replace spaces and special characters with hyphens
    newValue = newValue.replace(/[^a-zA-Z0-9-]/g, '-')
      .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
      .toLowerCase();

    onChange(newValue);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && onSubmit) {
      e.preventDefault();
      onSubmit();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(e);
    }
  };

  const getPrefix = () => {
    // Always use the correct production domain for the deployed version
    return 'open-pad.vercel.app/';
  };

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div className="relative flex-1">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <span 
            ref={prefixRef}
            className="text-muted-foreground text-sm whitespace-nowrap overflow-hidden text-ellipsis"
            style={{ maxWidth: '150px' }}
          >
            {getPrefix()}
          </span>
        </div>
        <Input
          type="text"
          value={value}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          style={{
            paddingLeft: prefixWidth ? `${prefixWidth + 16}px` : '120px',
          }}
          className="font-mono text-sm"
          placeholder={placeholder}
          disabled={disabled}
          autoFocus={autoFocus}
          maxLength={50}
        />
      </div>
      {showSubmitButton && (
        <Button 
          type="submit" 
          onClick={handleSubmit}
          disabled={disabled}
          className="shrink-0"
        >
          <ArrowRight className="h-4 w-4 md:mr-2" />
          <span className="hidden md:inline">Go</span>
        </Button>
      )}
    </div>
  );
}; 