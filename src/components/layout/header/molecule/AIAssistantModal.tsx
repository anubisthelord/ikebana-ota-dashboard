import React from 'react';
import { Sparkles, X, Send } from 'lucide-react';

interface AIAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AIAssistantModal: React.FC<AIAssistantModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-end justify-end p-6 bg-slate-900/20 backdrop-blur-sm transition-opacity">
      {/* Modal Container */}
      <div className="w-full max-w-md bg-white rounded-xl shadow-2xl border border-slate-200 flex flex-col h-[500px] animate-in slide-in-from-bottom-5 duration-300">
        
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100 bg-purple-50/50 rounded-t-xl">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-md bg-purple-100 flex items-center justify-center border border-purple-200">
              <Sparkles className="w-4 h-4 text-purple-600" />
            </div>
            <div>
              <h3 className="text-[14px] font-semibold text-slate-800">Ikebana AI</h3>
              <p className="text-[11px] text-slate-500 font-medium">Always here to help</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-md transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Chat Area */}
        <div className="flex-1 p-4 overflow-y-auto bg-[#F8F7FC] space-y-4">
          {/* AI Message */}
          <div className="flex items-start gap-2 max-w-[85%]">
            <div className="w-6 h-6 rounded-full bg-purple-600 flex items-center justify-center shrink-0 mt-0.5">
              <Sparkles className="w-3 h-3 text-white" />
            </div>
            <div className="bg-white border border-slate-200 px-3 py-2 rounded-lg rounded-tl-none shadow-xs">
              <p className="text-[13px] text-slate-700 leading-relaxed">
                Hello! I'm your AI assistant. How can I help you manage your dashboard today?
              </p>
            </div>
          </div>

          {/* User Message (Example) */}
          <div className="flex items-start justify-end gap-2 max-w-[85%] ml-auto">
            <div className="bg-purple-600 px-3 py-2 rounded-lg rounded-tr-none shadow-xs">
              <p className="text-[13px] text-white leading-relaxed">
                Show me the latest bookings.
              </p>
            </div>
          </div>
        </div>

        {/* Input Area */}
        <div className="p-3 bg-white border-t border-slate-100 rounded-b-xl">
          <div className="relative flex items-center">
            <input
              type="text"
              placeholder="Ask AI anything..."
              className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-3 pr-10 py-2.5 text-[13px] text-slate-700 placeholder-slate-400 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
            />
            <button className="absolute right-2 p-1.5 bg-purple-600 hover:bg-purple-700 text-white rounded-md transition-colors">
              <Send className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};