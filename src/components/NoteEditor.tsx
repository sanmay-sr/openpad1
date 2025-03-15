
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
        <div className="p-6">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full text-2xl font-semibold bg-transparent border-none outline-none mb-4 placeholder:text-muted-foreground/70"
            placeholder="Untitled Note"
          />
          
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="note-editor min-h-[200px]"
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
        
        <div className="flex flex-wrap items-center justify-between p-4 border-t border-border">
          <div className="flex items-center gap-3 mb-3 sm:mb-0">
            <Button
              variant="outline"
              size="sm"
              className="gap-2"
              onClick={addCodeSnippet}
            >
              <Code className="h-4 w-4" />
              <span>Add Code</span>
            </Button>
          </div>
          
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
            <div className="flex-1 sm:w-64">
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-muted-foreground">
                  openpad.com/
                </span>
                <input
                  type="text"
                  value={customUrl}
                  onChange={(e) => setCustomUrl(e.target.value.replace(/\s+/g, "-").toLowerCase())}
                  className="w-full pl-28 pr-3 py-2 rounded-md border border-input bg-transparent text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                  placeholder="custom-url"
                />
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Button
                variant="secondary"
                size="sm"
                className="gap-2 sm:flex-grow-0 flex-1"
                onClick={handleShare}
              >
                <Share className="h-4 w-4" />
                <span>Share</span>
              </Button>
              
              <Button
                variant="default"
                size="sm"
                className="gap-2 sm:flex-grow-0 flex-1"
                onClick={handleSave}
              >
                <Save className="h-4 w-4" />
                <span>Save</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      <div className={cn("mt-4 text-sm text-muted-foreground text-center", animations.fadeIn({ delay: 0.2 }))}>
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
