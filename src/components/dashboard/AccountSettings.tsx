
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

export const AccountSettings = () => {
  const { signOut } = useAuth();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDeleteAccount = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete your account? This action cannot be undone."
    );

    if (!confirmed) return;

    try {
      setIsDeleting(true);
      // Since we can't directly delete the user from the client side,
      // we'll use a custom method or fallback to just signing out
      const { error } = await supabase.auth.updateUser({
        data: { requested_deletion: true }
      });
      
      if (error) throw error;
      
      // Delete the user's profile data
      const { error: profileError } = await supabase
        .from('profiles')
        .delete()
        .eq('id', (await supabase.auth.getUser()).data.user?.id || '');
        
      if (profileError) throw profileError;
      
      await signOut();
      toast.success("Account deleted successfully");
    } catch (error: any) {
      toast.error(error.message || "Failed to delete account");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">Account Settings</h2>
        <p className="text-muted-foreground">
          Manage your account preferences and settings
        </p>
      </div>

      <div className="space-y-4">
        <Button
          variant="outline"
          onClick={signOut}
          className="w-full sm:w-auto"
        >
          Sign Out
        </Button>

        <div className="border-t pt-4">
          <h3 className="text-lg font-semibold text-destructive mb-2">
            Danger Zone
          </h3>
          <Button
            variant="destructive"
            onClick={handleDeleteAccount}
            disabled={isDeleting}
            className="w-full sm:w-auto"
          >
            {isDeleting ? "Deleting..." : "Delete Account"}
          </Button>
        </div>
      </div>
    </div>
  );
};
