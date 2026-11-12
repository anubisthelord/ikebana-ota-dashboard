import React, { useState, useEffect, useRef } from 'react';
import { Bell, CheckCircle2, MessageSquare, AlertCircle } from 'lucide-react';

interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  isRead: boolean;
  type: 'success' | 'message' | 'alert';
}

export const NotificationMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const [notifications, setNotifications] = useState<Notification[]>([
    { id: '1', title: 'New Booking Request', message: 'Room 204 has a new booking request.', time: '2 mins ago', isRead: false, type: 'alert' },
    { id: '2', title: 'Payment Received', message: 'Payment of $450 was successfully processed.', time: '1 hour ago', isRead: false, type: 'success' },
    { id: '3', title: 'New Message', message: 'Guest John Doe sent you a message.', time: '3 hours ago', isRead: true, type: 'message' },
  ]);

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) setIsOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const markAllAsRead = () => setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
  const markAsRead = (id: string) => setNotifications(prev => prev.map(n => n.id === id ? { ...n, isRead: true } : n));

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'success': return <CheckCircle2 className="w-4 h-4 text-emerald-500" />;
      case 'alert': return <AlertCircle className="w-4 h-4 text-amber-500" />;
      case 'message': return <MessageSquare className="w-4 h-4 text-purple-500" />;
      default: return <Bell className="w-4 h-4 text-slate-500" />;
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`p-2 border rounded-md shadow-xs transition-all ${
          isOpen ? 'bg-slate-100 border-slate-300 text-slate-800' : 'bg-white border-slate-200/80 text-slate-600 hover:bg-slate-50'
        }`}
      >
        <Bell className="w-4 h-4" />
      </button>
      
      {unreadCount > 0 && (
        <span className="absolute -top-1 -right-1 bg-purple-600 text-white text-[10px] font-bold h-4 min-w-[16px] px-1 rounded-full flex items-center justify-center border-2 border-[#F8F7FC] pointer-events-none">
          {unreadCount}
        </span>
      )}

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-slate-200 z-50 animate-in fade-in zoom-in-95 duration-100 overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100 bg-slate-50/50">
            <h3 className="text-[13px] font-semibold text-slate-800">Notifications</h3>
            {unreadCount > 0 && (
              <button onClick={markAllAsRead} className="text-[11px] font-medium text-purple-600 hover:text-purple-700 transition-colors">
                Mark all as read
              </button>
            )}
          </div>

          <div className="max-h-[300px] overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="px-4 py-8 text-center text-[13px] text-slate-500">No new notifications</div>
            ) : (
              notifications.map((notif) => (
                <div 
                  key={notif.id}
                  onClick={() => markAsRead(notif.id)}
                  className={`flex items-start gap-3 px-4 py-3 border-b border-slate-50 cursor-pointer transition-colors ${
                    notif.isRead ? 'bg-white hover:bg-slate-50' : 'bg-purple-50/30 hover:bg-purple-50/60'
                  }`}
                >
                  <div className="mt-0.5 shrink-0">{getNotificationIcon(notif.type)}</div>
                  <div className="flex-1 min-w-0">
                    <p className={`text-[13px] font-medium truncate ${notif.isRead ? 'text-slate-700' : 'text-slate-900'}`}>{notif.title}</p>
                    <p className="text-[12px] text-slate-500 mt-0.5 line-clamp-2 leading-tight">{notif.message}</p>
                    <p className="text-[10px] font-medium text-slate-400 mt-1">{notif.time}</p>
                  </div>
                  {!notif.isRead && <span className="w-2 h-2 rounded-full bg-purple-600 shrink-0 mt-1.5" />}
                </div>
              ))
            )}
          </div>

          <div className="p-2 border-t border-slate-100 bg-white">
            <button className="w-full py-1.5 text-[12px] font-medium text-slate-600 hover:text-slate-800 hover:bg-slate-50 rounded-md transition-colors text-center">
              View all notifications
            </button>
          </div>
        </div>
      )}
    </div>
  );
};