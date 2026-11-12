import { useCallback, useEffect, useState } from 'react';
// 1. Import BotMessageSquare instead of Bot
import { BotMessageSquare, WifiOff, LoaderCircle } from 'lucide-react'; 

type ConnectionStatus =
  | 'checking'
  | 'connected'
  | 'disconnected'
  | 'error';

const API_URL =
  import.meta.env.VITE_API_BASE_URL ||
  'http://localhost:3000/api/v1';

export default function BackendStatus() {
  const [status, setStatus] =
    useState<ConnectionStatus>('checking');

  const checkConnection = useCallback(async () => {
    setStatus('checking');

    try {
      const response = await fetch(
        `${API_URL.replace(/\/+$/, '')}/users/me`,
        {
          method: 'GET',
          cache: 'no-store',
          signal: AbortSignal.timeout(5000),
        },
      );

      if (response.status >= 500) {
        setStatus('error');
      } else {
        setStatus('connected');
      }
    } catch {
      setStatus('disconnected');
    }
  }, []);

  useEffect(() => {
    void checkConnection();

    const interval = window.setInterval(() => {
      void checkConnection();
    }, 15000);

    return () => window.clearInterval(interval);
  }, [checkConnection]);

  const statusConfig = {
    checking: {
      label: 'Checking API...',
      className: 'text-slate-600 bg-white border-slate-200',
      icon: LoaderCircle,
    },
    connected: {
      label: 'API Online',
      className: 'text-emerald-700 bg-white border-emerald-200',
      icon: BotMessageSquare, // 2. Changed to BotMessageSquare
    },
    disconnected: {
      label: 'API Offline',
      className: 'text-red-700 bg-white border-red-200',
      icon: WifiOff,
    },
    error: {
      label: 'API Error',
      className: 'text-amber-700 bg-white border-amber-200',
      icon: WifiOff,
    },
  };

  const current = statusConfig[status];
  const StatusIcon = current.icon;

  return (
    <button
      type="button"
      onClick={() => void checkConnection()}
      disabled={status === 'checking'}
      title="Click to check backend connection"
      aria-live="polite"
      className={`fixed bottom-5 right-5 z-50 flex items-center gap-2 rounded-full border px-3.5 py-2 text-xs font-medium shadow-lg transition hover:shadow-xl disabled:cursor-wait ${current.className}`}
    >
      <StatusIcon
        size={16}
        className={status === 'checking' ? 'animate-spin' : ''}
      />

      <span>{current.label}</span>
    </button>
  );
}