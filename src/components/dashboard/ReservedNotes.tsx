
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Link } from "react-router-dom";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Trash2, Copy, PlusCircle } from "lucide-react";

interface Note {
  id: string;
  url: string;
  created_at: string;
  expires_at: string;
}

export const ReservedNotes = () => {
  const { user } = useAuth();
  const [notes, setNotes] = useState<Note[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchNotes();
  }, [user?.id]);

  const fetchNotes = async () => {
    if (!user) return;
    
    try {
      const { data, error } = await supabase
        .from('notes')
        .select('*')
        .eq('owner_id', user.id)
        .eq('is_reserved', true)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setNotes(data || []);
    } catch (error: any) {
      toast.error(error.message || "Failed to fetch notes");
    } finally {
      setIsLoading(false);
    }
  };

  const deleteNote = async (id: string) => {
    try {
      const { error } = await supabase
        .from('notes')
        .delete()
        .eq('id', id);

      if (error) throw error;
      setNotes(notes.filter(note => note.id !== id));
      toast.success("Note deleted successfully");
    } catch (error: any) {
      toast.error(error.message || "Failed to delete note");
    }
  };

  const copyNoteUrl = (url: string) => {
    navigator.clipboard.writeText(`${window.location.origin}/${url}`);
    toast.success("Link copied to clipboard");
  };

  const getRemainingDays = (expiresAt: string) => {
    const days = Math.ceil((new Date(expiresAt).getTime() - new Date().getTime()) / (1000 * 3600 * 24));
    return Math.max(0, days);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Reserved Notes</h2>
          <p className="text-muted-foreground">
            You can have up to 3 reserved notes. Currently using: {notes.length}/3
          </p>
        </div>
        
        {notes.length < 3 && (
          <Button asChild>
            <Link to="/" className="flex items-center gap-2">
              <PlusCircle className="h-4 w-4" />
              Create New Note
            </Link>
          </Button>
        )}
      </div>

      {notes.length > 0 ? (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>URL</TableHead>
              <TableHead>Created</TableHead>
              <TableHead>Expires In</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {notes.map((note) => (
              <TableRow key={note.id}>
                <TableCell className="font-medium">
                  <Link to={`/${note.url}`} className="text-primary hover:underline">
                    {note.url}
                  </Link>
                </TableCell>
                <TableCell>
                  {new Date(note.created_at).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  {getRemainingDays(note.expires_at)} days
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => copyNoteUrl(note.url)}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="destructive"
                      size="icon"
                      onClick={() => deleteNote(note.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <div className="text-center py-8 text-muted-foreground">
          No reserved notes yet. Create one to get started!
        </div>
      )}
    </div>
  );
};
