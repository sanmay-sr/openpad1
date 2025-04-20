
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate, Navigate, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { animations } from '@/utils/animations';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Eye, EyeOff, LogIn, UserPlus, Mail } from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { InfoIcon } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, signupSchema } from '@/lib/auth-schema';
import { ForgotPassword } from '@/components/auth/ForgotPassword';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

type AuthMode = 'signin' | 'signup' | 'forgot-password';

const Auth = () => {
  const { signIn, signUp, isAuthenticated, isLoading: authLoading, isEmailVerified, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mode, setMode] = useState<AuthMode>('signin');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showVerificationMessage, setShowVerificationMessage] = useState(false);

  const form = useForm({
    resolver: zodResolver(mode === 'signin' ? loginSchema : signupSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  // Check URL parameters for verification status
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.has('verification')) {
      setShowVerificationMessage(true);
    }
  }, [location]);

  // If user is authenticated and verified, redirect to home
  if (isAuthenticated && isEmailVerified && !authLoading) {
    return <Navigate to="/" />;
  }
  
  const showVerificationAlert = isAuthenticated && !isEmailVerified && !authLoading;

  const onSubmit = async (values: {
    email: string;
    password: string;
    confirmPassword?: string;
  }) => {
    try {
      if (mode === 'signin') {
        await signIn(values.email, values.password);
      } else {
        await signUp(values.email, values.password);
        setShowVerificationMessage(true);
      }
    } catch (error: any) {
      if (error.message.includes('User already registered')) {
        form.setError('email', {
          message: 'This email is already registered. Please sign in instead.',
        });
      } else {
        form.setError('root', {
          message: error.message || 'An error occurred',
        });
      }
    }
  };

  const toggleMode = (newMode: AuthMode) => {
    setMode(newMode);
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
                  {mode === 'signin' ? 'Welcome Back' : 'Create Account'}
                </h1>
                <p className="text-muted-foreground mt-2">
                  {mode === 'signin' 
                    ? 'Sign in to access your reserved notes'
                    : 'Create an account to reserve custom URLs'}
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

              {form.formState.errors.root && (
                <Alert variant="destructive">
                  <AlertDescription>
                    {form.formState.errors.root.message}
                  </AlertDescription>
                </Alert>
              )}

              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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

                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input 
                              {...field}
                              type={showPassword ? "text" : "password"}
                              placeholder="Enter your password"
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

                  {mode === 'signup' && (
                    <FormField
                      control={form.control}
                      name="confirmPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Confirm Password</FormLabel>
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
                      ) : (
                        <>
                          <UserPlus className="mr-2 h-4 w-4" />
                          {authLoading ? "Creating account..." : "Create Account"}
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
            </>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Auth;
