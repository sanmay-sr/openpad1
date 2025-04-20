
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Link } from "react-router-dom";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Copy, Heart } from "lucide-react";

interface FavoriteNote {
  note_url: string;
  created_at: string;
}

export const FavoriteNotes = () => {
  const { user } = useAuth();
  const [favorites, setFavorites] = useState<FavoriteNote[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchFavorites();
  }, [user?.id]);

  const fetchFavorites = async () => {
    if (!user) return;
    
    try {
      const { data, error } = await supabase
        .from('favorites')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setFavorites(data || []);
    } catch (error: any) {
      toast.error(error.message || "Failed to fetch favorites");
    } finally {
      setIsLoading(false);
    }
  };

  const removeFavorite = async (noteUrl: string) => {
    try {
      const { error } = await supabase
        .from('favorites')
        .delete()
        .eq('user_id', user?.id)
        .eq('note_url', noteUrl);

      if (error) throw error;
      setFavorites(favorites.filter(fav => fav.note_url !== noteUrl));
      toast.success("Note removed from favorites");
    } catch (error: any) {
      toast.error(error.message || "Failed to remove favorite");
    }
  };

  const copyNoteUrl = (url: string) => {
    navigator.clipboard.writeText(`${window.location.origin}/${url}`);
    toast.success("Link copied to clipboard");
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Favorite Notes</h2>
        <p className="text-muted-foreground">
          Your collection of favorite notes
        </p>
      </div>

      {favorites.length > 0 ? (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>URL</TableHead>
              <TableHead>Added On</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {favorites.map((favorite) => (
              <TableRow key={favorite.note_url}>
                <TableCell className="font-medium">
                  <Link to={`/${favorite.note_url}`} className="text-primary hover:underline">
                    {favorite.note_url}
                  </Link>
                </TableCell>
                <TableCell>
                  {new Date(favorite.created_at).toLocaleDateString()}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => copyNoteUrl(favorite.note_url)}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="destructive"
                      size="icon"
                      onClick={() => removeFavorite(favorite.note_url)}
                    >
                      <Heart className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <div className="text-center py-8 text-muted-foreground">
          No favorite notes yet. Add some by clicking the heart icon on notes you like!
        </div>
      )}
    </div>
  );
};
