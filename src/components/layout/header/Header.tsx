
import React, { useState } from 'react';
import { Plus, Sparkles } from 'lucide-react';

import { AIAssistantModal } from './molecule/AIAssistantModal';
import { AISearch } from './molecule/AISearch';
import { NotificationMenu } from './molecule/NotificationMenu';
import { UserProfileMenu } from './molecule/UserProfileMenu';

// ==========================================
// TYPES & INTERFACES
// ==========================================

interface HeaderProps {
  onSearch?: (query: string) => void;

  // Action button
  showAction?: boolean;
  actionLabel?: string;
  onAction?: () => void;
  actionIcon?: React.ReactNode;

  // Header features
  showSearch?: boolean;
  showAI?: boolean;
  showNotifications?: boolean;
  showProfile?: boolean;
}

// ==========================================
// HEADER COMPONENT
// ==========================================

export const Header: React.FC<HeaderProps> = ({
  onSearch,

  // Defaults preserve the existing Header
  showAction = true,
  actionLabel = 'Add New Room',
  onAction,
  actionIcon = <Plus className="w-4 h-4" />,

  showSearch = true,
  showAI = true,
  showNotifications = true,
  showProfile = true,
}) => {
  const [isAIOpen, setIsAIOpen] = useState(false);

  const hasRightContent =
    showAction || showAI || showNotifications || showProfile;

  return (
    <>
      <header className="w-full border-b border-b-purple-100 bg-[#F8F7FC] px-6 py-3.5 font-sans select-none flex items-center justify-between gap-4">

        {/* Search */}
        {showSearch && (
          <AISearch onSearch={onSearch} />
        )}

        {!showSearch && <div className="flex-1" />}

        {/* Header Actions */}
        {hasRightContent && (
          <div className="flex items-center gap-3">

            {/* Configurable Action Button */}
            {showAction && (
              <button
                type="button"
                onClick={onAction}
                className="hidden sm:flex items-center gap-1.5 bg-purple-600 hover:bg-purple-700 text-white text-xs font-semibold px-3 py-2 rounded-md shadow-xs transition-all"
              >
                {actionIcon}
                <span>{actionLabel}</span>
              </button>
            )}

            {/* AI Assistant */}
            {showAI && (
              <button
                type="button"
                onClick={() => setIsAIOpen(true)}
                aria-label="Open AI Assistant"
                className="p-2 bg-white border border-slate-200/80 rounded-md text-purple-600 hover:bg-purple-50 shadow-xs transition-all flex items-center justify-center"
              >
                <Sparkles className="w-4 h-4" />
              </button>
            )}

            {/* Divider */}
            {showAI && (showNotifications || showProfile) && (
              <div className="h-5 w-[1px] bg-slate-200/80 mx-1" />
            )}

            {/* Notifications */}
            {showNotifications && <NotificationMenu />}

            {/* User Profile */}
            {showProfile && <UserProfileMenu />}

          </div>
        )}
      </header>

      {/* AI Assistant Modal */}
      {showAI && (
        <AIAssistantModal
          isOpen={isAIOpen}
          onClose={() => setIsAIOpen(false)}
        />
      )}
    </>
  );
};

export default Header;
