
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate, Navigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { animations } from '@/utils/animations';
import { Button } from '@/components/Button';
import { Eye, EyeOff, LogIn, UserPlus } from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

type AuthMode = 'signin' | 'signup';

const Auth = () => {
  const { signIn, signUp, isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();
  const [mode, setMode] = useState<AuthMode>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  // If already authenticated, redirect to home
  if (isAuthenticated && !isLoading) {
    return <Navigate to="/" />;
  }

  const toggleMode = () => {
    setMode(mode === 'signin' ? 'signup' : 'signin');
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      if (mode === 'signin') {
        await signIn(email, password);
        navigate('/');
      } else {
        await signUp(email, password);
        // Stay on page for confirmation message
      }
    } catch (error: any) {
      setError(error.message || 'An error occurred');
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 container px-4 py-8 max-w-md mx-auto flex items-center justify-center">
        <div className={cn("w-full", animations.fadeIn())}>
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold">
              {mode === 'signin' ? 'Sign In' : 'Create Account'}
            </h1>
            <p className="text-muted-foreground mt-2">
              {mode === 'signin' 
                ? 'Sign in to access your reserved notes'
                : 'Create an account to reserve custom URLs'}
            </p>
          </div>

          {error && (
            <div className="bg-destructive/10 text-destructive px-4 py-3 rounded-md mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-1">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-input rounded-md bg-background focus:outline-none focus:ring-1 focus:ring-primary"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2 border border-input rounded-md bg-background focus:outline-none focus:ring-1 focus:ring-primary"
                  required
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? (
                'Processing...'
              ) : mode === 'signin' ? (
                <span className="flex items-center justify-center gap-2">
                  <LogIn className="h-4 w-4" />
                  Sign In
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  <UserPlus className="h-4 w-4" />
                  Sign Up
                </span>
              )}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <button
              type="button"
              onClick={toggleMode}
              className="text-primary hover:underline"
            >
              {mode === 'signin'
                ? "Don't have an account? Sign up"
                : 'Already have an account? Sign in'}
            </button>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Auth;
