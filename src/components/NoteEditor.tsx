import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { animations } from "@/utils/animations";
import { Button } from "@/components/Button";
import { CodeBox } from "@/components/CodeBox";
import { Code, Save, Share } from "lucide-react";

interface NoteEditorProps {
  className?: string;
}

interface CodeSnippet {
  id: string;
  content: string;
  language: string;
}

export const NoteEditor: React.FC<NoteEditorProps> = ({ className }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [codeSnippets, setCodeSnippets] = useState<CodeSnippet[]>([]);
  const [customUrl, setCustomUrl] = useState("");
  
  const generateId = () => Math.random().toString(36).substr(2, 9);
  
  const addCodeSnippet = () => {
    const newSnippet: CodeSnippet = {
      id: generateId(),
      content: "",
      language: "javascript",
    };
    
    setCodeSnippets([...codeSnippets, newSnippet]);
  };
  
  const updateCodeSnippet = (id: string, newContent: string) => {
    setCodeSnippets(
      codeSnippets.map((snippet) =>
        snippet.id === id ? { ...snippet, content: newContent } : snippet
      )
    );
  };
  
  const removeCodeSnippet = (id: string) => {
    setCodeSnippets(codeSnippets.filter((snippet) => snippet.id !== id));
  };
  
  const handleSave = () => {
    // In the future, this will save to the backend
    console.log({
      title,
      content,
      codeSnippets,
      customUrl: customUrl.trim() || null,
    });
  };
  
  const handleShare = () => {
    // In the future, this will generate a shareable URL
    console.log("Sharing note");
  };
  
  return (
    <div className={cn("w-full max-w-3xl mx-auto", className)}>
      <div className={cn("editor-container", animations.fadeIn())}>
        <div className="p-3 md:p-6">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full text-xl md:text-2xl font-semibold bg-transparent border-none outline-none mb-3 md:mb-4 placeholder:text-muted-foreground/70"
            placeholder="Untitled Note"
          />
          
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="note-editor min-h-[150px] md:min-h-[200px]"
            placeholder="Start typing your note here..."
          />
          
          {codeSnippets.map((snippet, index) => (
            <CodeBox
              key={snippet.id}
              content={snippet.content}
              language={snippet.language}
              onContentChange={(newContent) => updateCodeSnippet(snippet.id, newContent)}
              onRemove={() => removeCodeSnippet(snippet.id)}
              className={animations.scaleIn({ delay: 0.1 + index * 0.05 })}
            />
          ))}
        </div>
        
        <div className="flex flex-col md:flex-row items-stretch gap-3 p-3 md:p-4 border-t border-border">
          <Button
            variant="outline"
            size="sm"
            className="gap-2"
            onClick={addCodeSnippet}
          >
            <Code className="h-4 w-4" />
            <span>Add Code</span>
          </Button>
          
          <div className="flex flex-col md:flex-row items-stretch gap-3 w-full md:w-auto md:ml-auto">
            <div className="relative w-full md:w-64">
              <span className="absolute inset-y-0 left-0 flex items-center pl-2 text-xs md:text-sm text-muted-foreground">
                openpad.com/
              </span>
              <input
                type="text"
                value={customUrl}
                onChange={(e) => setCustomUrl(e.target.value.replace(/\s+/g, "-").toLowerCase())}
                className="w-full pl-24 md:pl-28 pr-3 py-2 text-sm rounded-md border border-input bg-transparent focus:outline-none focus:ring-1 focus:ring-primary"
                placeholder="custom-url"
              />
            </div>
            
            <div className="flex gap-2">
              <Button
                variant="secondary"
                size="sm"
                className="flex-1"
                onClick={handleShare}
              >
                <Share className="h-4 w-4 md:mr-2" />
                <span className="hidden md:inline">Share</span>
              </Button>
              
              <Button
                variant="default"
                size="sm"
                className="flex-1"
                onClick={handleSave}
              >
                <Save className="h-4 w-4 md:mr-2" />
                <span className="hidden md:inline">Save</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      <div className={cn("mt-3 md:mt-4 text-xs md:text-sm text-muted-foreground text-center", animations.fadeIn({ delay: 0.2 }))}>
        <p>Notes are public by default and will expire after 30 days.</p>
        <p className="mt-1">
          <button className="text-primary hover:underline">
            Sign in
          </button>{" "}
          to reserve custom URLs and secure your notes.
        </p>
      </div>
    </div>
  );
};
