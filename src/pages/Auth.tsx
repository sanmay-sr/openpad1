
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate, Navigate, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { animations } from '@/utils/animations';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Eye, EyeOff, LogIn, UserPlus, Mail, Lock } from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { InfoIcon } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, signupSchema, resetPasswordSchema } from '@/lib/auth-schema';
import { ForgotPassword } from '@/components/auth/ForgotPassword';
import { supabase } from '@/integrations/supabase/client';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

type AuthMode = 'signin' | 'signup' | 'forgot-password' | 'reset-password';

const Auth = () => {
  const { signIn, signUp, isAuthenticated, isLoading: authLoading, isEmailVerified, user, updatePassword } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mode, setMode] = useState<AuthMode>('signin');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showVerificationMessage, setShowVerificationMessage] = useState(false);
  const [generalError, setGeneralError] = useState<string | null>(null);
  const [isHandlingPasswordReset, setIsHandlingPasswordReset] = useState(false);

  const form = useForm({
    resolver: zodResolver(
      mode === 'signin' 
        ? loginSchema 
        : mode === 'signup' 
          ? signupSchema 
          : mode === 'reset-password'
            ? resetPasswordSchema
            : forgotPasswordSchema
    ),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  // Check for access token in URL hash on component mount
  useEffect(() => {
    const handlePasswordResetToken = async () => {
      const hash = window.location.hash;
      
      if (hash && hash.includes('access_token') && hash.includes('type=recovery')) {
        console.log('Password reset token detected');
        setIsHandlingPasswordReset(true);
        setMode('reset-password');
        
        try {
          // Extract and set the access token
          const accessToken = new URLSearchParams(hash.substring(1)).get('access_token');
          
          if (accessToken) {
            // The updateUser method will be called when the form is submitted
            toast.info('Please enter your new password');
          } else {
            throw new Error('Invalid password reset link');
          }
        } catch (error) {
          console.error('Error processing password reset:', error);
          toast.error('Invalid or expired password reset link');
          setMode('signin');
        } finally {
          // Clear the URL hash
          window.history.replaceState({}, document.title, window.location.pathname + window.location.search);
          setIsHandlingPasswordReset(false);
        }
      }
    };

    handlePasswordResetToken();
  }, []);

  // Reset general error when mode changes
  useEffect(() => {
    setGeneralError(null);
    form.reset();
  }, [mode, form]);

  // Check URL parameters for verification status
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.has('verification')) {
      setShowVerificationMessage(true);
    }
    
    if (params.has('type') && params.get('type') === 'reset') {
      setMode('reset-password');
    }
  }, [location]);

  // If user is authenticated and verified, redirect to home
  if (isAuthenticated && isEmailVerified && !authLoading && !isHandlingPasswordReset) {
    return <Navigate to="/" />;
  }
  
  const showVerificationAlert = isAuthenticated && !isEmailVerified && !authLoading;

  const onSubmit = async (values: {
    email: string;
    password: string;
    confirmPassword?: string;
  }) => {
    setGeneralError(null);
    
    try {
      if (mode === 'signin') {
        await signIn(values.email, values.password);
      } else if (mode === 'signup') {
        await signUp(values.email, values.password);
        setShowVerificationMessage(true);
      } else if (mode === 'reset-password') {
        await updatePassword(values.password);
        toast.success("Password has been reset successfully");
        setMode('signin');
      }
    } catch (error: any) {
      console.error("Auth error:", error.message);
      
      // Handle specific error messages for better user experience
      if (error.message.includes('User already registered')) {
        setGeneralError('This email is already registered. Please sign in instead.');
      } else if (error.message.includes('Invalid login credentials')) {
        setGeneralError('Invalid email or password. Please try again.');
      } else {
        setGeneralError(error.message || 'An error occurred during authentication');
      }
    }
  };

  const toggleMode = (newMode: AuthMode) => {
    setMode(newMode);
    setGeneralError(null);
    form.reset();
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 container px-4 py-8 max-w-md mx-auto flex items-center justify-center">
        <div className={cn("w-full space-y-6", animations.fadeIn())}>
          {mode === 'forgot-password' ? (
            <ForgotPassword onBack={() => toggleMode('signin')} />
          ) : (
            <>
              <div className="text-center">
                <h1 className="text-2xl font-bold">
                  {mode === 'signin' ? 'Welcome Back' : 
                   mode === 'signup' ? 'Create Account' : 
                   'Reset Your Password'}
                </h1>
                <p className="text-muted-foreground mt-2">
                  {mode === 'signin' 
                    ? 'Sign in to access your reserved notes'
                    : mode === 'signup'
                      ? 'Create an account to reserve custom URLs'
                      : 'Enter a new password for your account'}
                </p>
              </div>

              {showVerificationMessage && (
                <Alert className="mb-6 bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800">
                  <InfoIcon className="h-4 w-4 text-blue-500" />
                  <AlertDescription className="text-blue-700 dark:text-blue-300">
                    Verification email sent! Please check your inbox and verify your email address before signing in.
                  </AlertDescription>
                </Alert>
              )}
              
              {showVerificationAlert && (
                <Alert className="mb-6 bg-amber-50 dark:bg-amber-950 border-amber-200 dark:border-amber-800">
                  <InfoIcon className="h-4 w-4 text-amber-500" />
                  <AlertDescription className="text-amber-700 dark:text-amber-300">
                    Please verify your email address to fully access the application. Check your inbox for a verification link.
                  </AlertDescription>
                </Alert>
              )}

              {generalError && (
                <Alert variant="destructive">
                  <AlertDescription>
                    {generalError}
                  </AlertDescription>
                </Alert>
              )}

              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  {mode !== 'reset-password' && (
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input 
                              {...field}
                              type="email"
                              placeholder="Enter your email"
                              disabled={authLoading}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}

                  {(mode === 'signin' || mode === 'signup' || mode === 'reset-password') && (
                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            {mode === 'reset-password' ? 'New Password' : 'Password'}
                          </FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Input 
                                {...field}
                                type={showPassword ? "text" : "password"}
                                placeholder={mode === 'reset-password' ? "Enter your new password" : "Enter your password"}
                                disabled={authLoading}
                              />
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                className="absolute right-0 top-0 h-full px-3"
                                onClick={() => setShowPassword(!showPassword)}
                              >
                                {showPassword ? (
                                  <EyeOff className="h-4 w-4" />
                                ) : (
                                  <Eye className="h-4 w-4" />
                                )}
                              </Button>
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}

                  {(mode === 'signup' || mode === 'reset-password') && (
                    <FormField
                      control={form.control}
                      name="confirmPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Confirm {mode === 'reset-password' ? 'New ' : ''}Password</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Input 
                                {...field}
                                type={showConfirmPassword ? "text" : "password"}
                                placeholder="Confirm your password"
                                disabled={authLoading}
                              />
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                className="absolute right-0 top-0 h-full px-3"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                              >
                                {showConfirmPassword ? (
                                  <EyeOff className="h-4 w-4" />
                                ) : (
                                  <Eye className="h-4 w-4" />
                                )}
                              </Button>
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}

                  <div className="space-y-2">
                    <Button type="submit" className="w-full" disabled={authLoading}>
                      {mode === 'signin' ? (
                        <>
                          <LogIn className="mr-2 h-4 w-4" />
                          {authLoading ? "Signing in..." : "Sign In"}
                        </>
                      ) : mode === 'signup' ? (
                        <>
                          <UserPlus className="mr-2 h-4 w-4" />
                          {authLoading ? "Creating account..." : "Create Account"}
                        </>
                      ) : (
                        <>
                          <Lock className="mr-2 h-4 w-4" />
                          {authLoading ? "Resetting..." : "Reset Password"}
                        </>
                      )}
                    </Button>

                    {mode === 'signin' && (
                      <Button
                        type="button"
                        variant="link"
                        className="w-full"
                        onClick={() => toggleMode('forgot-password')}
                        disabled={authLoading}
                      >
                        <Mail className="mr-2 h-4 w-4" />
                        Forgot Password?
                      </Button>
                    )}
                  </div>
                </form>
              </Form>

              {(mode === 'signin' || mode === 'signup') && (
                <div className="text-center">
                  <Button
                    type="button"
                    variant="link"
                    onClick={() => toggleMode(mode === 'signin' ? 'signup' : 'signin')}
                    disabled={authLoading}
                  >
                    {mode === 'signin'
                      ? "Don't have an account? Sign up"
                      : 'Already have an account? Sign in'}
                  </Button>
                </div>
              )}
              
              {mode === 'reset-password' && (
                <div className="text-center">
                  <Button
                    type="button"
                    variant="link"
                    onClick={() => toggleMode('signin')}
                    disabled={authLoading}
                  >
                    Back to Sign In
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Auth;
