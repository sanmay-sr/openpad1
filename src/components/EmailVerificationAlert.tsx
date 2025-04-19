
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { AlertCircle, Mail } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export const EmailVerificationAlert = () => {
  const { user } = useAuth();
  const [isSending, setIsSending] = useState(false);
  
  const resendVerificationEmail = async () => {
    if (!user?.email) return;
    
    try {
      setIsSending(true);
      const { error } = await supabase.auth.resend({
        type: 'signup',
        email: user.email,
        options: {
          emailRedirectTo: window.location.origin + '/auth'
        }
      });
      
      if (error) throw error;
      toast.success("Verification email sent. Please check your inbox.");
    } catch (error: any) {
      toast.error(error.message || "Failed to send verification email");
    } finally {
      setIsSending(false);
    }
  };
  
  return (
    <Alert variant="destructive" className="mb-6">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Email verification required</AlertTitle>
      <AlertDescription className="flex flex-col gap-2">
        <p>Please verify your email address to access all features.</p>
        <div className="flex gap-2 mt-2">
          <Button 
            onClick={resendVerificationEmail} 
            disabled={isSending} 
            size="sm" 
            className="flex items-center gap-2"
          >
            <Mail className="h-4 w-4" />
            {isSending ? "Sending..." : "Resend verification email"}
          </Button>
        </div>
      </AlertDescription>
    </Alert>
  );
};
