import React, { useState } from 'react';
import { Search, SlidersHorizontal, Command } from 'lucide-react';

interface AISearchProps {
  onSearch?: (query: string) => void;
}

export const AISearch: React.FC<AISearchProps> = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    if (onSearch) onSearch(e.target.value);
  };

  return (
    <div className="flex items-center gap-3 flex-1 max-w-xl">
      <div className="relative flex items-center w-full">
        <Search className="absolute left-3.5 w-4 h-4 text-slate-400 pointer-events-none" />
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search tasks, issues, or projects..."
          className="w-full bg-white border border-slate-200/80 rounded-md pl-10 pr-12 py-2 text-xs font-medium text-slate-700 placeholder-slate-400 shadow-xs focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
        />
        <div className="absolute right-3 hidden sm:flex items-center gap-0.5 pointer-events-none">
          <kbd className="bg-slate-100 border border-slate-200 text-slate-400 rounded text-[10px] px-1.5 py-0.5 font-mono">
            <Command className="w-2.5 h-2.5 inline mr-0.5" />K
          </kbd>
        </div>
      </div>

      <button
        title="Filter Results"
        className="p-2 bg-white border border-slate-200/80 rounded-md text-slate-500 hover:text-slate-800 hover:bg-slate-50 shadow-xs transition-all"
      >
        <SlidersHorizontal className="w-4 h-4" />
      </button>
    </div>
  );
};