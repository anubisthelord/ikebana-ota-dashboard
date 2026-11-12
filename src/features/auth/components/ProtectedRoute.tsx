import { Navigate } from 'react-router-dom';
import { Bot } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
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
            Checking your session...
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

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}