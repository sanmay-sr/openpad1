import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { animations } from "@/utils/animations";
import { Button } from "@/components/Button";
import { CodeBox } from "@/components/CodeBox";
import { Edit, Share, Clock, FileText, Heart } from "lucide-react";
import { getNote, Note, parseContent, updateNote } from "@/services/noteService";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { NoteEditor } from "./NoteEditor";

interface NoteViewerProps {
  className?: string;
  url: string;
}

export const NoteViewer: React.FC<NoteViewerProps> = ({ className, url }) => {
  const { user } = useAuth();
  const [note, setNote] = useState<Note | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isFavorite, setIsFavorite] = useState(false);
  
  useEffect(() => {
    fetchNote();
    if (user) {
      checkFavorite();
    }
  }, [url, user]);
  
  const checkFavorite = async () => {
    if (!user) return;
    
    try {
      const { data, error } = await supabase
        .from('favorites')
        .select('*')
        .eq('user_id', user.id)
        .eq('note_url', url)
        .maybeSingle();
      
      if (error) throw error;
      setIsFavorite(!!data);
    } catch (err) {
      console.error('Error checking favorite:', err);
    }
  };
  
  const toggleFavorite = async () => {
    if (!user) {
      toast.error("Please sign in to favorite notes");
      return;
    }
    
    try {
      if (isFavorite) {
        const { error } = await supabase
          .from('favorites')
          .delete()
          .eq('user_id', user.id)
          .eq('note_url', url);
        
        if (error) throw error;
        toast.success("Removed from favorites");
      } else {
        const { error } = await supabase
          .from('favorites')
          .insert({
            user_id: user.id,
            note_url: url
          });
        
        if (error) throw error;
        toast.success("Added to favorites");
      }
      
      setIsFavorite(!isFavorite);
    } catch (err: any) {
      toast.error(err.message || "Failed to update favorite");
    }
  };

  const fetchNote = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const noteData = await getNote(url);
      
      if (!noteData) {
        setError("Note not found");
        return;
      }
      
      setNote(noteData);
    } catch (err) {
      setError("Failed to load note");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleEdit = () => {
    setIsEditing(true);
  };
  
  const handleCancelEdit = () => {
    setIsEditing(false);
  };
  
  const handleShare = () => {
    const noteUrl = `${window.location.origin}/${url}`;
    navigator.clipboard.writeText(noteUrl)
      .then(() => toast.success("URL copied to clipboard"))
      .catch(() => toast.error("Failed to copy URL"));
  };
  
  const canEdit = () => {
    if (!note) return false;
    
    // Anyone can edit non-reserved notes
    if (!note.is_reserved) return true;
    
    // Only the owner can edit reserved notes
    return note.owner_id === user?.id;
  };
  
  if (isLoading) {
    return (
      <div className={cn("flex justify-center items-center p-8", className)}>
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }
  
  if (error || !note) {
    return (
      <div className={cn("p-6 text-center", className)}>
        <div className="bg-destructive/10 text-destructive p-4 rounded-md">
          <h3 className="font-semibold text-lg mb-2">{error || "Note not found"}</h3>
          <p>The note you're looking for might have been removed or expired.</p>
        </div>
      </div>
    );
  }
  
  if (isEditing) {
    return (
      <div className={className}>
        <div className="mb-4 flex justify-between items-center">
          <Button variant="outline" size="sm" onClick={handleCancelEdit}>
            Cancel Editing
          </Button>
        </div>
        <NoteEditor 
          initialContent={note.content || ""} 
          onSave={(newUrl) => {
            setIsEditing(false);
            // If URL changed, redirect
            if (newUrl !== url) {
              window.location.href = `/${newUrl}`;
            } else {
              fetchNote();
            }
          }}
        />
      </div>
    );
  }
  
  const { title, textContent, codeSnippets } = parseContent(note.content || "");
  
  const expiresAt = note.expires_at 
    ? new Date(note.expires_at) 
    : new Date(new Date().getTime() + 30 * 24 * 60 * 60 * 1000);
  
  const daysRemaining = Math.ceil((expiresAt.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
  
  return (
    <div className={cn("note-viewer", className)}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div>
          <h1 className="text-xl md:text-2xl font-bold truncate">{title}</h1>
          <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
            <Clock className="h-3 w-3" />
            <span>
              {daysRemaining > 0 
                ? `Expires in ${daysRemaining} days` 
                : "Expires today"}
            </span>
            
            {note.is_reserved && (
              <span className="ml-2 px-1.5 py-0.5 bg-primary/10 text-primary rounded-sm text-xs">
                Reserved
              </span>
            )}
          </div>
        </div>
        
        <div className="flex gap-2">
          {canEdit() && (
            <Button variant="outline" size="sm" onClick={handleEdit}>
              <Edit className="h-4 w-4 sm:mr-2" />
              <span className="hidden sm:inline">Edit</span>
            </Button>
          )}
          
          <Button variant="outline" size="sm" onClick={handleShare}>
            <Share className="h-4 w-4 sm:mr-2" />
            <span className="hidden sm:inline">Share</span>
          </Button>

          {user && (
            <Button
              variant={isFavorite ? "default" : "outline"}
              size="sm"
              onClick={toggleFavorite}
            >
              <Heart className={cn("h-4 w-4 sm:mr-2", isFavorite && "fill-current")} />
              <span className="hidden sm:inline">
                {isFavorite ? "Favorited" : "Favorite"}
              </span>
            </Button>
          )}
        </div>
      </div>
      
      <div className={cn("note-content space-y-4", animations.fadeIn())}>
        {textContent && (
          <div className="whitespace-pre-wrap">{textContent}</div>
        )}
        
        {codeSnippets.map((snippet, index) => (
          <CodeBox
            key={index}
            content={snippet.content}
            language={snippet.language}
            readOnly
            className={animations.fadeIn({ delay: 0.1 + index * 0.05 })}
          />
        ))}
      </div>
    </div>
  );
};
