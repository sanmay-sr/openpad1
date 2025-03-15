
import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { animations } from "@/utils/animations";
import { Button } from "@/components/Button";
import { Check, Clipboard, Code, X } from "lucide-react";

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
  const [copied, setCopied] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState(language);
  
  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  
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
    <div className={cn(
      "code-box group relative", 
      animations.scaleIn(),
      className
    )}>
      <div className="code-box-header">
        <div className="flex items-center gap-3">
          <Code className="h-4 w-4 text-muted-foreground" />
          
          <select
            value={currentLanguage}
            onChange={(e) => setCurrentLanguage(e.target.value)}
            className="bg-transparent text-sm focus:outline-none focus:ring-1 focus:ring-primary/20 rounded px-1 py-0.5"
          >
            {languageOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            className="h-7 w-7 p-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
            onClick={handleCopy}
            title="Copy code"
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
            className="h-7 w-7 p-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
            onClick={onRemove}
            title="Remove code block"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <textarea
        value={content}
        onChange={(e) => onContentChange(e.target.value)}
        className="w-full p-3 bg-transparent border-none font-mono text-sm outline-none resize-none min-h-[100px]"
        placeholder="// Enter your code here"
        spellCheck={false}
      />
    </div>
  );
};
