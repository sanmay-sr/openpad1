import React, { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { animations } from "@/utils/animations";
import { Button } from "@/components/Button";
import { Check, Clipboard, Code, X } from "lucide-react";
import Prism from "prismjs";
import { useTheme } from "@/components/ThemeProvider";
// Import both themes
import "prismjs/themes/prism-tomorrow.css"; // Dark theme
import "prismjs/themes/prism-solarizedlight.css"; // Light theme
// Import the theme and languages you want to support
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-python";
import "prismjs/components/prism-jsx";
// ... add more language imports as needed

// Import base Prism styles
import "prismjs/themes/prism.css";

interface CodeBoxProps {
  content: string;
  language?: string;
  onContentChange: (content: string) => void;
  onRemove: () => void;
  className?: string;
}

export const CodeBox: React.FC<CodeBoxProps> = ({
  content,
  language = "javascript",
  onContentChange,
  onRemove,
  className,
}) => {
  const { theme } = useTheme();
  const [copied, setCopied] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState(language);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  
  // Auto-resize textarea
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  }, [content]);

  // Syntax highlighting
  useEffect(() => {
    if (typeof window !== 'undefined') {
      Prism.highlightAll();
    }
  }, [content, currentLanguage, theme]);

  const languageOptions = [
    { value: "javascript", label: "JavaScript" },
    { value: "typescript", label: "TypeScript" },
    { value: "python", label: "Python" },
    { value: "java", label: "Java" },
    { value: "csharp", label: "C#" },
    { value: "cpp", label: "C++" },
    { value: "go", label: "Go" },
    { value: "rust", label: "Rust" },
    { value: "php", label: "PHP" },
    { value: "ruby", label: "Ruby" },
    { value: "swift", label: "Swift" },
    { value: "kotlin", label: "Kotlin" },
    { value: "html", label: "HTML" },
    { value: "css", label: "CSS" },
    { value: "sql", label: "SQL" },
    { value: "json", label: "JSON" },
    { value: "yaml", label: "YAML" },
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
        "code-box-header flex items-center justify-between p-2",
        theme === 'light' ? 'bg-gray-100' : 'bg-gray-800'
      )}>
        <div className="flex items-center gap-3">
          <Code className="h-4 w-4 text-muted-foreground" />
          
          <select
            value={currentLanguage}
            onChange={(e) => setCurrentLanguage(e.target.value)}
            className={cn(
              "text-sm focus:outline-none focus:ring-1 focus:ring-primary/20 rounded px-1 py-0.5",
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
          
          <Button
            variant="ghost"
            size="sm"
            className="h-7 w-7 p-0"
            onClick={onRemove}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <div className="relative">
        <textarea
          ref={textareaRef}
          value={content}
          onChange={(e) => {
            onContentChange(e.target.value);
          }}
          className={cn(
            "w-full px-4 py-3 font-mono text-sm outline-none resize-none overflow-hidden",
            "min-h-[60px] max-h-[600px]",
            theme === 'light' 
              ? 'bg-white text-gray-900' 
              : 'bg-gray-900 text-gray-100'
          )}
          placeholder="// Enter your code here"
          spellCheck={false}
        />
        <pre 
          className={cn(
            "w-full px-4 py-3 m-0 font-mono text-sm overflow-hidden absolute top-0 left-0 pointer-events-none",
            theme === 'light' ? 'bg-white' : 'bg-gray-900'
          )}
          aria-hidden="true"
        >
          <code className={`language-${currentLanguage}`}>
            {content || "// Enter your code here"}
          </code>
        </pre>
      </div>
    </div>
  );
};
