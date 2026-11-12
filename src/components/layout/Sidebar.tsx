
import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

import {
  LayoutDashboard,
  BarChart3,
  Bell,
  Settings,
  Search,
  ChevronDown,
  ChevronsUpDown,
  MoreHorizontal,
  Menu,
  Hotel,
  CalendarCheck,
  Users,
  Building2,
  UserCog,
  BedDouble,
} from 'lucide-react';

import { useAuth } from '../../features/auth/context/AuthContext';

// ==========================================
// TYPES & INTERFACES
// ==========================================

export interface SubItem {
  id: string;
  label: string;
  path?: string;
  badge?: number;
}

export interface NavItemType {
  id: string;
  label: string;
  icon: React.ElementType;
  path?: string;
  badge?: number;
  subItems?: SubItem[];
}

interface SidebarProps {
  onToggle?: (collapsed: boolean) => void;
  title?: string;
  items?: NavItemType[];
  generalItems?: NavItemType[];
  profileName?: string;
  profileEmail?: string;
  profileAvatar?: string;
}

interface SubTreeItemProps {
  label: string;
  isActive: boolean;
  onClick: () => void;
}

interface NavItemButtonProps {
  item: NavItemType;
  isActive: boolean;
  isOpen?: boolean;
  isCollapsed?: boolean;
  onClick: () => void;
}

interface NavSectionProps {
  title?: string;
  actionIcon?: React.ReactNode;
  isCollapsed?: boolean;
  children: React.ReactNode;
}

interface UserProfileTileProps {
  name: string;
  email: string;
  avatarUrl: string;
  isCollapsed?: boolean;
}

// ==========================================
// DEFAULT OTA NAVIGATION
// ==========================================

export const vendorNavItems: NavItemType[] = [
  {
    id: 'overview',
    label: 'Overview',
    icon: LayoutDashboard,
    path: 'overview',
  },
  {
    id: 'hotels',
    label: 'Hotels',
    icon: Hotel,
    subItems: [
      { id: 'all-hotels', label: 'All Hotels', path: 'hotels' },
      { id: 'add-hotel', label: 'Add Hotel', path: 'hotels/new' },
    ],
    
  },
  {
    id: 'rooms',
    label: 'Rooms',
    icon: BedDouble,
    path: 'rooms',
  },
  {
    id: 'bookings',
    label: 'Bookings',
    icon: CalendarCheck,
    path: 'bookings',
  },
  {
    id: 'team',
    label: 'Team',
    icon: Users,
    path: 'team',
  },
  {
    id: 'analytics',
    label: 'Analytics',
    icon: BarChart3,
    path: 'analytics',
  },
];

export const superAdminNavItems: NavItemType[] = [
  {
    id: 'overview',
    label: 'Overview',
    icon: LayoutDashboard,
    path: '/super-admin',
  },
  {
    id: 'vendors',
    label: 'Vendors',
    icon: Building2,
    path: '/super-admin/vendors',
  },
  
  {
    id: 'users',
    label: 'Users',
    icon: Users,
    path: '/super-admin/users',
  },
  {
    id: 'hotels',
    label: 'Hotels',
    icon: Hotel,
    path: '/super-admin/hotels',
  },
  {
    id: 'bookings',
    label: 'Bookings',
    icon: CalendarCheck,
    path: '/super-admin/bookings',
  },
  {
    id: 'analytics',
    label: 'Analytics',
    icon: BarChart3,
    path: '/super-admin/analytics',

  },
  {
    id: 'notifications',
    label: 'Notifications',
    icon: Bell,
    path: '/super-admin/notifications',
  }
];

export const vendorGeneralItems: NavItemType[] = [
  {
    id: 'notifications',
    label: 'Notifications',
    icon: Bell,
    badge: 0,
    path: 'notifications',
  },
  {
    id: 'settings',
    label: 'Settings',
    icon: Settings,
    path: 'settings',
  },
];

export const superAdminGeneralItems: NavItemType[] = [
  {
    id: 'admin-settings',
    label: 'Settings',
    icon: Settings,
    path: '/super-admin/settings',
  },
  {
    id: 'admin-team',
    label: 'Administrators',
    icon: UserCog,
    path: '/super-admin/administrators',
  },
];

// ==========================================
// REUSABLE MOLECULES
// ==========================================

export const SubTreeItem: React.FC<SubTreeItemProps> = ({
  label,
  isActive,
  onClick,
}) => (
  <div className="relative flex items-center">
    <span className="absolute -left-[17px] top-1/2 w-3 h-3 border-b border-l border-slate-200 rounded-bl-lg" />
    <button
      onClick={onClick}
      className={`text-[13px] py-0.5 px-2 rounded-md transition-colors ${
        isActive
          ? 'text-slate-900 font-semibold'
          : 'text-slate-500 hover:text-slate-800'
      }`}
    >
      {label}
    </button>
  </div>
);

export const NavItemButton: React.FC<NavItemButtonProps> = ({
  item,
  isActive,
  isOpen,
  isCollapsed,
  onClick,
}) => {
  const Icon = item.icon;
  const hasSubItems = Boolean(item.subItems?.length);

  return (
    <button
      onClick={onClick}
      title={isCollapsed ? item.label : undefined}
      className={`w-full flex items-center justify-between px-3 py-2 rounded-md text-[13px] font-medium transition-all ${
        isActive
          ? 'bg-purple-100/70 text-purple-700 shadow-sm'
          : 'text-slate-600 hover:bg-slate-100 cursor-pointer hover:text-slate-900'
      } ${isCollapsed ? 'justify-center' : ''}`}
    >
      <div className={`flex items-center gap-2.5 ${isCollapsed ? 'justify-center w-full' : ''}`}>
        <Icon
          className={`w-4 h-4 shrink-0 ${
            isActive ? 'text-purple-600' : 'text-slate-500'
          }`}
        />
        {!isCollapsed && <span className="truncate">{item.label}</span>}
      </div>

      {!isCollapsed && (
        <div className="flex items-center gap-2">
          {item.badge !== undefined && (
            <span className="bg-purple-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[18px] text-center">
              {item.badge}
            </span>
          )}

          {hasSubItems && (
            <ChevronDown
              className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${
                isOpen ? 'rotate-180' : ''
              }`}
            />
          )}
        </div>
      )}
    </button>
  );
};

export const NavSection: React.FC<NavSectionProps> = ({
  title,
  actionIcon,
  isCollapsed,
  children,
}) => (
  <div className="flex flex-col gap-1">
    {title && !isCollapsed && (
      <div className="flex items-center justify-between px-2 mb-1">
        <span className="text-[11px] font-semibold text-slate-400 tracking-wider">
          {title}
        </span>
        {actionIcon}
      </div>
    )}
    <nav className="flex flex-col gap-0.5">{children}</nav>
  </div>
);

export const UserProfileTile: React.FC<UserProfileTileProps> = ({
  name,
  email,
  avatarUrl,
  isCollapsed,
}) => (
  <div
    title={isCollapsed ? name : undefined}
    className={`flex items-center rounded-xl hover:bg-slate-100/80 transition-colors ${
      isCollapsed ? 'justify-center p-1' : 'justify-between px-1 py-1'
    }`}
  >
    <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'gap-2.5'}`}>
      <img
        src={avatarUrl}
        alt={name}
        className="w-8 h-8 rounded-full object-cover border border-slate-200 shrink-0"
      />
      {!isCollapsed && (
        <div className="flex flex-col text-left">
          <span className="text-[13px] font-semibold text-slate-800 leading-tight truncate max-w-[120px]">
            {name}
          </span>
          <span className="text-[11px] text-slate-400 leading-tight truncate max-w-[120px]">
            {email}
          </span>
        </div>
      )}
    </div>

    {!isCollapsed && (
      <ChevronsUpDown className="w-3.5 h-3.5 text-slate-400 shrink-0" />
    )}
  </div>
);

// ==========================================
// MAIN SIDEBAR COMPONENT
// ==========================================

const fallbackAvatar =
  'https://ui-avatars.com/api/?name=User&background=ede9fe&color=6d28d9';

export const Sidebar: React.FC<SidebarProps> = ({
  onToggle,
  title = 'Ikebana OTA',
  items,
  generalItems,
  profileName,
  profileEmail,
  profileAvatar,
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [openItems, setOpenItems] = useState<string[]>(['hotels']);

  const location = useLocation();
  const { user } = useAuth();

  const isVendorPortal = location.pathname.startsWith('/vendor/');
  const vendorId = isVendorPortal
  ? location.pathname.split('/')[2]
  : undefined;
  const isSuperAdminPortal = location.pathname.startsWith('/super-admin');

  const defaultItems = isVendorPortal
    ? vendorNavItems
    : isSuperAdminPortal
      ? superAdminNavItems
      : vendorNavItems;

  const defaultGeneralItems = isSuperAdminPortal
    ? superAdminGeneralItems
    : vendorGeneralItems;

  const mainNavItems = items ?? defaultItems;
  const generalNavItems = generalItems ?? defaultGeneralItems;

  const displayName = profileName ?? user?.fullName ?? 'Account';
  const displayEmail = profileEmail ?? user?.email ?? '';
  const avatar = profileAvatar ?? fallbackAvatar;
  const isPathActive = (path?: string) => {
    if (!path) return false;
  
    const fullPath = path.startsWith('/')
      ? path
      : isVendorPortal && vendorId
        ? `/vendor/${vendorId}/${path}`
        : `/${path}`;
  
    return (
      location.pathname === fullPath ||
      location.pathname.startsWith(`${fullPath}/`)
    );
  };

  const handleToggle = () => {
    const nextCollapsed = !isCollapsed;
    setIsCollapsed(nextCollapsed);
    onToggle?.(nextCollapsed);
  };

  const handleItemClick = (item: NavItemType) => {
    if (item.subItems?.length) {
      setOpenItems((current) =>
        current.includes(item.id)
          ? current.filter((id) => id !== item.id)
          : [...current, item.id],
      );
    }
  };

  return (
    <aside
      className={`bg-[#F8F7FC] text-slate-700 flex flex-col border-r border-purple-100 font-sans select-none justify-between transition-all duration-300 relative z-20 ${
        isCollapsed ? 'w-16 p-2' : 'w-64 p-4'
      }`}
    >
      <div className="flex flex-col gap-5 w-full">
        {/* Brand / Logo Header */}
        <div
          className={`flex items-center px-1 ${
            isCollapsed ? 'justify-center' : 'justify-between'
          }`}
        >
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded bg-purple-100 flex items-center justify-center border border-purple-200 shrink-0">
              <span className="text-purple-600 text-[13px] font-bold">@</span>
            </div>

            {!isCollapsed && (
              <span className="font-semibold text-slate-800 text-base tracking-tight truncate">
                {title}
              </span>
            )}
          </div>

          <button
            onClick={handleToggle}
            title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            className="text-slate-400 hover:text-slate-600 p-1 rounded-md transition-colors"
          >
            <Menu className="w-4 h-4" />
          </button>
        </div>

        {/* Search Input */}
        {!isCollapsed && (
          <div className="relative flex items-center">
            <Search className="absolute left-3 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
            <input
              type="text"
              placeholder="Search..."
              className="w-full bg-white border border-slate-200/80 rounded-md pl-9 pr-3 py-2 text-[13px] font-medium text-slate-700 placeholder-slate-400 shadow-xs focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
            />
          </div>
        )}

        {/* Main Navigation */}
        <NavSection
          title="Workspace"
          isCollapsed={isCollapsed}
          actionIcon={
            <button className="text-slate-400 hover:text-slate-600">
              <MoreHorizontal className="w-3.5 h-3.5" />
            </button>
          }
        >
          {mainNavItems.map((item) => {
            const hasSubItems = Boolean(item.subItems?.length);
            const isOpen = openItems.includes(item.id);
            const isActive =
              isPathActive(item.path) ||
              Boolean(item.subItems?.some((sub) => isPathActive(sub.path)));

            return (
              <div key={item.id} className="relative group flex flex-col">
                {item.path ? (
                 <NavLink
                 to={
                   item.path.startsWith('/')
                     ? item.path
                     : isVendorPortal && vendorId
                       ? `/vendor/${vendorId}/${item.path}`
                       : `/${item.path}`
                 }
                 end={!item.subItems?.length}
                 className="block"
               >
                    {({ isActive: linkActive }) => (
                      <NavItemButton
                        item={item}
                        isActive={linkActive || isActive}
                        isCollapsed={isCollapsed}
                        onClick={() => handleItemClick(item)}
                      />
                    )}
                  </NavLink>
                ) : (
                  <NavItemButton
                    item={item}
                    isActive={isActive}
                    isOpen={isOpen}
                    isCollapsed={isCollapsed}
                    onClick={() => handleItemClick(item)}
                  />
                )}

                {/* Collapsed Flyout */}
                {hasSubItems && isCollapsed && (
                  <div className="absolute left-[44px] top-0 invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-200 z-50">
                    <div className="bg-white border border-slate-200 shadow-xl rounded-lg p-2 w-48 ml-2">
                      <div className="text-[13px] font-semibold text-slate-800 mb-2 px-2 pb-1 border-b border-slate-100">
                        {item.label}
                      </div>
                      <div className="flex flex-col gap-1">
                        {item.subItems?.map((sub) => (
                          <NavLink
                            key={sub.id}
                            to={
                              sub.path?.startsWith('/')
                                ? sub.path
                                : isVendorPortal && vendorId
                                  ? `/vendor/${vendorId}/${sub.path}`
                                  : `/${sub.path}`
                            }
                            className={({ isActive }) =>
                              `text-left text-[13px] px-2 py-1.5 rounded transition-colors ${
                                isActive
                                  ? 'bg-purple-50 text-purple-700 font-semibold'
                                  : 'text-slate-600 hover:bg-slate-100'
                              }`
                            }
                          >
                            {sub.label}
                          </NavLink>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Normal Tree View */}
                {hasSubItems && !isCollapsed && isOpen && (
                  <div className="relative ml-5 mt-1 pl-4 flex flex-col gap-2 border-l border-slate-200">
                    {item.subItems?.map((sub) => (
                      <NavLink
                        key={sub.id}
                        to={
                          sub.path?.startsWith('/')
                            ? sub.path
                            : isVendorPortal && vendorId
                              ? `/vendor/${vendorId}/${sub.path}`
                              : `/${sub.path}`
                        }
                        className={({ isActive }) =>
                          `relative flex items-center text-[13px] py-0.5 px-2 rounded-md transition-colors ${
                            isActive
                              ? 'text-slate-900 font-semibold'
                              : 'text-slate-500 hover:text-slate-800'
                          }`
                        }
                      >
                        {sub.label}
                      </NavLink>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </NavSection>

        {/* General Navigation */}
        <NavSection title="General" isCollapsed={isCollapsed}>
          {generalNavItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.id}
                to={
                  item.path?.startsWith('/')
                    ? item.path
                    : isVendorPortal
                      ? `/vendor/${location.pathname.split('/')[2]}/${item.path}`
                      : `/${item.path}`
                }
                className="block"
              >
                {({ isActive }) => (
                  <button
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-md text-[13px] font-medium transition-all ${
                      isActive
                        ? 'bg-purple-100/70 text-purple-700 shadow-sm'
                        : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                    } ${isCollapsed ? 'justify-center' : ''}`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon className="w-4 h-4 shrink-0" />
                      {!isCollapsed && <span>{item.label}</span>}
                    </div>

                    {!isCollapsed && item.badge !== undefined && (
                      <span className="bg-purple-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[18px] text-center">
                        {item.badge}
                      </span>
                    )}
                  </button>
                )}
              </NavLink>
            );
          })}
        </NavSection>
      </div>

      {/* Sidebar Bottom Footer */}
      <div
        className={`flex flex-col gap-3 mt-auto w-full ${
          isCollapsed ? 'items-center' : 'pt-4 border-t border-slate-100'
        }`}
      >
        <UserProfileTile
          name={displayName}
          email={displayEmail}
          avatarUrl={avatar}
          isCollapsed={isCollapsed}
        />
      </div>
    </aside>
  );
};

export default Sidebar;
