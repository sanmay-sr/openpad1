import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { EmailVerificationAlert } from "./EmailVerificationAlert";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireVerification?: boolean;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  requireVerification = true 
}) => {
  const { isAuthenticated, isLoading, isEmailVerified } = useAuth();
  const location = useLocation();

  // Show loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  // If email verification is required and email is not verified
  if (requireVerification && !isEmailVerified) {
    return (
      <div className="container max-w-3xl mx-auto px-4 py-8">
        <EmailVerificationAlert />
        {children}
      </div>
    );
  }

  // Otherwise, render the protected content
  return <>{children}</>;
};
