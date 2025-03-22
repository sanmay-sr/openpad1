
import React, { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { animations } from "@/utils/animations";
import { Button } from "@/components/Button";
import { Check, Clipboard, Code, X } from "lucide-react";
import Prism from "prismjs";
import { useTheme } from "@/components/ThemeProvider";
import "prismjs/themes/prism.css";
import "prismjs/themes/prism-tomorrow.css";
import "prismjs/themes/prism-solarizedlight.css";
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-python";
import "prismjs/components/prism-jsx";
import "prismjs/components/prism-bash";
import "prismjs/components/prism-css";
import "prismjs/components/prism-json";
import "prismjs/components/prism-markdown";

interface CodeBoxProps {
  content: string;
  language?: string;
  onContentChange?: (content: string) => void;
  onLanguageChange?: (language: string) => void;
  onRemove?: () => void;
  readOnly?: boolean;
  className?: string;
}

export const CodeBox: React.FC<CodeBoxProps> = ({
  content,
  language = "javascript",
  onContentChange,
  onLanguageChange,
  onRemove,
  readOnly = false,
  className,
}) => {
  const { theme } = useTheme();
  const [copied, setCopied] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState(language);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const preRef = useRef<HTMLPreElement>(null);
  
  // Auto-resize textarea
  useEffect(() => {
    const textarea = textareaRef.current;
    const pre = preRef.current;
    
    if (textarea && pre) {
      // Set textarea height to match pre element height
      const preHeight = pre.scrollHeight;
      textarea.style.height = `${preHeight + 16}px`; // Add padding
      
      // Minimum height
      if (preHeight < 60) {
        textarea.style.height = "60px";
      }
      
      // Maximum height (with scrolling)
      if (preHeight > 500) {
        textarea.style.height = "500px";
        textarea.style.overflowY = "auto";
      }
    }
  }, [content, currentLanguage]);

  // Syntax highlighting
  useEffect(() => {
    if (typeof window !== 'undefined') {
      Prism.highlightAll();
    }
  }, [content, currentLanguage, theme]);

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLanguage = e.target.value;
    setCurrentLanguage(newLanguage);
    if (onLanguageChange) {
      onLanguageChange(newLanguage);
    }
  };

  const languageOptions = [
    { value: "javascript", label: "JavaScript" },
    { value: "typescript", label: "TypeScript" },
    { value: "python", label: "Python" },
    { value: "java", label: "Java" },
    { value: "csharp", label: "C#" },
    { value: "php", label: "PHP" },
    { value: "html", label: "HTML" },
    { value: "css", label: "CSS" },
    { value: "sql", label: "SQL" },
    { value: "json", label: "JSON" },
    { value: "markdown", label: "Markdown" },
    { value: "bash", label: "Bash" },
    { value: "plaintext", label: "Plain Text" },
  ];
  
  return (
    <div 
      className={cn(
        "code-box group relative rounded-lg overflow-hidden",
        theme === 'light' ? 'light-code' : 'dark-code',
        animations.scaleIn(),
        className
      )}
    >
      <div className={cn(
        "code-box-header flex items-center justify-between p-2 px-3",
        theme === 'light' ? 'bg-gray-100' : 'bg-gray-800'
      )}>
        <div className="flex items-center gap-3">
          <Code className="h-4 w-4 text-muted-foreground" />
          
          <select
            value={currentLanguage}
            onChange={handleLanguageChange}
            disabled={readOnly}
            className={cn(
              "text-xs md:text-sm focus:outline-none focus:ring-1 focus:ring-primary/20 rounded px-1 py-0.5",
              theme === 'light' 
                ? 'bg-white text-gray-800 border-gray-200' 
                : 'bg-gray-700 text-gray-200 border-gray-600'
            )}
          >
            {languageOptions.map((option) => (
              <option 
                key={option.value} 
                value={option.value}
                className={theme === 'light' ? 'bg-white text-gray-800' : 'bg-gray-700 text-gray-200'}
              >
                {option.label}
              </option>
            ))}
          </select>
        </div>
        
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            className="h-7 w-7 p-0"
            onClick={() => {
              navigator.clipboard.writeText(content);
              setCopied(true);
              setTimeout(() => setCopied(false), 2000);
            }}
          >
            {copied ? (
              <Check className="h-4 w-4 text-green-500" />
            ) : (
              <Clipboard className="h-4 w-4" />
            )}
          </Button>
          
          {!readOnly && onRemove && (
            <Button
              variant="ghost"
              size="sm"
              className="h-7 w-7 p-0"
              onClick={onRemove}
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
      
      <div className="relative">
        {!readOnly ? (
          <textarea
            ref={textareaRef}
            value={content}
            onChange={(e) => {
              onContentChange && onContentChange(e.target.value);
            }}
            className={cn(
              "w-full px-4 py-3 font-mono text-sm outline-none resize-none",
              theme === 'light' 
                ? 'bg-white text-gray-900' 
                : 'bg-gray-900 text-gray-100'
            )}
            placeholder="// Enter your code here"
            spellCheck={false}
          />
        ) : (
          <div className="w-full px-4 py-3 font-mono text-sm overflow-auto max-h-[500px]"></div>
        )}
        <pre 
          ref={preRef}
          className={cn(
            "w-full px-4 py-3 m-0 font-mono text-sm whitespace-pre",
            readOnly ? "" : "absolute top-0 left-0 pointer-events-none",
            theme === 'light' ? 'bg-white' : 'bg-gray-900'
          )}
          aria-hidden={!readOnly}
        >
          <code className={`language-${currentLanguage}`}>
            {content || "// Enter your code here"}
          </code>
        </pre>
      </div>
    </div>
  );
};
