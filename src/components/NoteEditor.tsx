
import React, { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { animations } from "@/utils/animations";
import { Button } from "@/components/Button";
import { CodeBox } from "@/components/CodeBox";
import { Code, Save, Share, Plus } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { createNote, CodeSnippet, formatContentWithSnippets } from "@/services/noteService";
import { useAuth } from "@/contexts/AuthContext";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

interface NoteEditorProps {
  className?: string;
  initialContent?: string;
  onSave?: (url: string) => void;
}

export const NoteEditor: React.FC<NoteEditorProps> = ({ 
  className, 
  initialContent = "", 
  onSave 
}) => {
  const { isAuthenticated, profile } = useAuth();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [codeSnippets, setCodeSnippets] = useState<CodeSnippet[]>([]);
  const [customUrl, setCustomUrl] = useState("");
  const [urlType, setUrlType] = useState<"random" | "custom">("random");
  const [isReserved, setIsReserved] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const isMobile = useIsMobile();
  
  // Auto-resize textarea
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${Math.max(textarea.scrollHeight, isMobile ? 120 : 150)}px`;
    }
  }, [content, isMobile]);
  
  // Initialize with initial content if provided
  useEffect(() => {
    if (initialContent) {
      // In a real implementation, we would parse the content to extract title, text, and code snippets
      setContent(initialContent);
    }
  }, [initialContent]);
  
  const generateId = () => Math.random().toString(36).substr(2, 9);
  
  const addCodeSnippet = () => {
    const newSnippet: CodeSnippet = {
      id: generateId(),
      content: "",
      language: "javascript",
    };
    
    setCodeSnippets([...codeSnippets, newSnippet]);
  };
  
  const updateCodeSnippet = (id: string, newContent: string, language?: string) => {
    setCodeSnippets(
      codeSnippets.map((snippet) =>
        snippet.id === id ? { 
          ...snippet, 
          content: newContent,
          ...(language ? { language } : {})
        } : snippet
      )
    );
  };
  
  const removeCodeSnippet = (id: string) => {
    setCodeSnippets(codeSnippets.filter((snippet) => snippet.id !== id));
  };
  
  const canReserveUrl = () => {
    if (!isAuthenticated) return false;
    if (!profile) return false;
    
    // Check if the user has used all their reserved URLs for the week
    const reservedUrlsUsed = profile.reserved_urls_used || 0;
    return reservedUrlsUsed < 3;
  };
  
  const handleSave = async () => {
    if (!title.trim()) {
      toast.error("Please add a title for your note");
      return;
    }
    
    try {
      setIsSubmitting(true);
      
      // Combine title, content and code snippets
      const fullContent = formatContentWithSnippets(
        title,
        content,
        codeSnippets
      );
      
      // Determine URL to use
      const urlToUse = urlType === "custom" && customUrl.trim() ? customUrl.trim() : null;
      
      // Determine if note should be reserved
      const shouldReserve = isReserved && isAuthenticated;
      
      // Create the note
      const result = await createNote(fullContent, urlToUse, shouldReserve);
      
      if (result.error) {
        toast.error(result.error);
        return;
      }
      
      toast.success(
        shouldReserve 
          ? "Reserved note created successfully!" 
          : "Note created successfully!"
      );
      
      // Call onSave callback if provided
      if (onSave) {
        onSave(result.url);
      }
      
      // Reset form if no callback (otherwise component might unmount)
      if (!onSave) {
        setTitle("");
        setContent("");
        setCodeSnippets([]);
        setCustomUrl("");
        setUrlType("random");
        setIsReserved(false);
      }
      
    } catch (error: any) {
      toast.error(error.message || "Failed to save note");
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleShare = () => {
    // This would be implemented to share the current editor state
    toast.info("Save the note first to get a shareable link");
  };
  
  const toggleAdvancedOptions = () => {
    setShowAdvanced(!showAdvanced);
  };
  
  return (
    <div className={cn("w-full max-w-3xl mx-auto", className)}>
      <div className={cn("editor-container border border-border rounded-md overflow-hidden", animations.fadeIn())}>
        <div className="p-3 md:p-6">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full text-lg md:text-2xl font-semibold bg-transparent border-none outline-none mb-3 placeholder:text-muted-foreground/70"
            placeholder="Untitled Note"
          />
          
          <textarea
            ref={textareaRef}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full min-h-[120px] md:min-h-[150px] bg-transparent border-none outline-none resize-none text-base placeholder:text-muted-foreground/70"
            placeholder="Start typing your note here..."
          />
          
          {codeSnippets.map((snippet, index) => (
            <CodeBox
              key={snippet.id}
              content={snippet.content}
              language={snippet.language}
              onContentChange={(newContent) => updateCodeSnippet(snippet.id, newContent)}
              onLanguageChange={(language) => updateCodeSnippet(snippet.id, snippet.content, language)}
              onRemove={() => removeCodeSnippet(snippet.id)}
              className={cn("mt-3", animations.scaleIn({ delay: 0.1 + index * 0.05 }))}
            />
          ))}
        </div>
        
        <div className="flex flex-col gap-3 p-3 md:p-4 border-t border-border">
          <div className="flex flex-wrap gap-3">
            <Button
              variant="outline"
              size="sm"
              className="gap-2"
              onClick={addCodeSnippet}
            >
              <Code className="h-4 w-4" />
              <span>Add Code</span>
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              className="gap-2"
              onClick={toggleAdvancedOptions}
            >
              <Plus className="h-4 w-4" />
              <span>Options</span>
            </Button>
          </div>
          
          {showAdvanced && (
            <div className={cn("space-y-3 pt-2", animations.slideDown())}>
              <div>
                <label className="block text-sm font-medium mb-1">URL Type</label>
                <Select 
                  value={urlType}
                  onValueChange={(value) => setUrlType(value as "random" | "custom")}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select URL type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="random">Random URL (anonymous)</SelectItem>
                      <SelectItem value="custom">Custom URL</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              
              {urlType === "custom" && (
                <div>
                  <label className="block text-sm font-medium mb-1">Custom URL</label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-2 text-xs text-muted-foreground">
                      openpad.com/
                    </span>
                    <input
                      type="text"
                      value={customUrl}
                      onChange={(e) => setCustomUrl(e.target.value.replace(/\s+/g, "-").toLowerCase())}
                      className="w-full pl-24 pr-3 py-2 text-sm rounded-md border border-input bg-transparent focus:outline-none focus:ring-1 focus:ring-primary"
                      placeholder="my-custom-url"
                    />
                  </div>
                </div>
              )}
              
              {isAuthenticated && (
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="reserve-url"
                    checked={isReserved}
                    onChange={(e) => setIsReserved(e.target.checked)}
                    disabled={!canReserveUrl()}
                    className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                  />
                  <label htmlFor="reserve-url" className="ml-2 block text-sm">
                    Reserve this URL (only you can edit)
                    {!canReserveUrl() && (
                      <span className="text-yellow-500 ml-1">
                        (3 weekly limit reached)
                      </span>
                    )}
                  </label>
                </div>
              )}
            </div>
          )}
          
          <div className="flex gap-2 mt-2">
            <Button
              variant="secondary"
              size="sm"
              className="flex-1"
              onClick={handleShare}
            >
              <Share className="h-4 w-4 sm:mr-2" />
              <span className="hidden sm:inline">Share</span>
            </Button>
            
            <Button
              variant="default"
              size="sm"
              className="flex-1"
              onClick={handleSave}
              disabled={isSubmitting}
            >
              <Save className="h-4 w-4 sm:mr-2" />
              <span className="hidden sm:inline">
                {isSubmitting ? 'Saving...' : 'Save'}
              </span>
            </Button>
          </div>
        </div>
      </div>
      
      {!isMobile && (
        <div className={cn("mt-3 text-xs md:text-sm text-muted-foreground text-center", animations.fadeIn({ delay: 0.2 }))}>
          <p>Notes are public by default and will expire after 30 days.</p>
          {!isAuthenticated && (
            <p className="mt-1">
              <a href="/auth" className="text-primary hover:underline">
                Sign in
              </a>{" "}
              to reserve custom URLs and secure your notes.
            </p>
          )}
        </div>
      )}
    </div>
  );
};
