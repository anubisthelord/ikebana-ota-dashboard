import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Settings, LogOut } from 'lucide-react';
import { useAuth } from '../../../../features/auth/context/AuthContext';

export const UserProfileMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { logout } = useAuth();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) setIsOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login', { replace: true });
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <div 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 pl-2 cursor-pointer group"
      >
        <div className="relative">
          <img
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
            alt="Abdul Aziz"
            className={`w-8 h-8 rounded-md object-cover border transition-colors ${
              isOpen ? 'border-purple-500' : 'border-slate-200 group-hover:border-purple-400'
            }`}
          />
          <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-white rounded-full" />
        </div>
      </div>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-slate-200 py-1 z-50 animate-in fade-in zoom-in-95 duration-100">
          <div className="px-4 py-2 border-b border-slate-100 mb-1">
            <p className="text-sm font-semibold text-slate-800">Abdul Aziz</p>
            <p className="text-xs text-slate-500 truncate">contact@yopmail.com</p>
          </div>

          <button 
            onClick={() => { setIsOpen(false); }}
            className="w-full text-left px-4 py-2 text-[13px] font-medium text-slate-700 hover:bg-slate-50 flex items-center gap-2 transition-colors"
          >
            <User className="w-4 h-4 text-slate-400" />
            View Profile
          </button>

          <button 
            onClick={() => { setIsOpen(false); }}
            className="w-full text-left px-4 py-2 text-[13px] font-medium text-slate-700 hover:bg-slate-50 flex items-center gap-2 transition-colors"
          >
            <Settings className="w-4 h-4 text-slate-400" />
            Settings
          </button>

          <div className="h-[1px] bg-slate-100 my-1" />

          <button 
            onClick={handleLogout}
            className="w-full text-left px-4 py-2 text-[13px] font-medium text-red-600 hover:bg-red-50 flex items-center gap-2 transition-colors"
          >
            <LogOut className="w-4 h-4 text-red-500" />
            Logout
          </button>
        </div>
      )}
    </div>
  );
};