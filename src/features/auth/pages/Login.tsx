import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { isAxiosError } from 'axios';
import * as z from 'zod';
import { Bot } from 'lucide-react'; // Import for loader
import { useAuth } from '../context/AuthContext';
import { getPostLoginPath } from '../utils/getPostLoginPath';

const loginSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function Login() {
    const {
        login,
        user,
        vendorMemberships,
        isAuthenticated,
        isLoading,
      } = useAuth();
  const [serverError, setServerError] = useState('');
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  });

  const onSubmit = async (data: LoginFormValues) => {
    setServerError('');
    
    try {
      await login({
        email: data.email.trim().toLowerCase(),
        password: data.password,
      });

      // Only navigate AFTER login() has fully finished
      if (!user) {
        setServerError('Unable to retrieve your account details.');
        return;
      }
      
      const destination = getPostLoginPath(user, vendorMemberships);
      
      navigate(destination, { replace: true });
    } catch (error) {
      if (isAxiosError(error)) {
        const message = error.response?.data?.message;
        setServerError(
          Array.isArray(message)
            ? message.join(', ')
            : typeof message === 'string'
              ? message
              : 'Login failed. Please check your credentials.'
        );
      } else {
        setServerError('Something went wrong. Please try again.');
      }
    }
  };

  // 1. If the app is checking the session on mount
  // 2. If the user just clicked "Sign in" and AuthContext is loading
  // 3. If React Hook Form is submitting
  if (isLoading || isSubmitting) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-[#F8F7FC] font-sans select-none">
        <div className="relative flex flex-col items-center">
          <div className="absolute inset-0 bg-purple-400 blur-2xl opacity-20 rounded-full animate-pulse w-16 h-16 -top-2 mx-auto" />
          <div className="relative z-10 w-16 h-16 bg-white border border-purple-100 rounded-2xl shadow-sm flex items-center justify-center animate-bounce">
            <Bot className="w-8 h-8 text-purple-600" />
          </div>
          <div className="w-10 h-2 bg-purple-900/10 rounded-[100%] mt-4 animate-[ping_1.5s_ease-in-out_infinite]" />
        </div>
        <div className="mt-8 flex flex-col items-center gap-1">
          <p className="text-[14px] font-semibold text-slate-700 tracking-tight">
            {isSubmitting ? 'Signing you in...' : 'Checking your session...'}
          </p>
          <div className="flex gap-1 mt-1">
            <span className="w-1.5 h-1.5 bg-purple-400 rounded-full animate-bounce [animation-delay:-0.3s]" />
            <span className="w-1.5 h-1.5 bg-purple-500 rounded-full animate-bounce [animation-delay:-0.15s]" />
            <span className="w-1.5 h-1.5 bg-purple-600 rounded-full animate-bounce" />
          </div>
        </div>
      </div>
    );
  }

  if (isAuthenticated && user) {
    const destination = getPostLoginPath(user, vendorMemberships);
  
    return <Navigate to={destination} replace />;
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#F8F7FC] px-4 font-sans select-none">
      <div className="w-full max-w-md rounded-xl border border-slate-200/80 bg-white p-5 shadow-sm">
        
        <div className="mb-8 flex flex-col items-center mt-2">
          <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center border border-purple-200 mb-4 shadow-sm">
            <span className="text-purple-600 text-lg font-bold">@</span>
          </div>
          <h1 className="text-xl font-semibold text-slate-800 tracking-tight">
            Sign in to Ikebana OTA
          </h1>
          <p className="mt-1.5 text-[13px] font-medium text-slate-500">
            Enter your credentials to access the dashboard.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <label className="mb-2 block text-[13px] font-medium text-slate-700">
              Email address
            </label>
            <input
              {...register('email')}
              type="email"
              autoComplete="username"
              placeholder="admin@ikebana.com"
              className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-[13px] font-medium text-slate-700 placeholder-slate-400 outline-none transition-all focus:border-purple-500 focus:ring-1 focus:ring-purple-500 shadow-xs"
            />
            {errors.email && (
              <p className="mt-1.5 text-[11px] font-medium text-red-600">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label className="mb-2 block text-[13px] font-medium text-slate-700">
              Password
            </label>
            <input
              {...register('password')}
              type="password"
              autoComplete="current-password"
              placeholder="Enter your password"
              className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-[13px] font-medium text-slate-700 placeholder-slate-400 outline-none transition-all focus:border-purple-500 focus:ring-1 focus:ring-purple-500 shadow-xs"
            />
            {errors.password && (
              <p className="mt-1.5 text-[11px] font-medium text-red-600">{errors.password.message}</p>
            )}
          </div>

          {serverError && (
            <div className="rounded-md border border-red-200 bg-red-50 px-3 py-2.5 text-[13px] font-medium text-red-700">
              {serverError}
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-md bg-purple-600 px-4 py-2.5 text-[13px] font-medium text-white transition-all hover:bg-purple-700 disabled:cursor-not-allowed disabled:opacity-60 shadow-sm"
          >
            {isSubmitting ? 'Signing in...' : 'Sign in'}
          </button>
        </form>
      </div>
    </div>
  );
}