
import React, { useMemo, useState } from 'react';
import {
  Bell,
  Check,
  CheckCheck,
  Trash2,
  Building2,
  Hotel,
  CalendarCheck,
  Settings,
  Search,
  MailOpen,
  Inbox,
} from 'lucide-react';

type NotificationCategory =
  | 'Vendors'
  | 'Hotels'
  | 'Bookings'
  | 'System';

type NotificationStatus = 'Unread' | 'Read';

interface PlatformNotification {
  id: number;
  title: string;
  message: string;
  category: NotificationCategory;
  date: string;
  status: NotificationStatus;
}

const initialNotifications: PlatformNotification[] = [
  {
    id: 1,
    title: 'New vendor application received',
    message:
      'Royal Orchid Hospitality has submitted a new vendor application for review.',
    category: 'Vendors',
    date: '2026-11-12T10:30:00',
    status: 'Unread',
  },
  {
    id: 2,
    title: 'Hotel awaiting approval',
    message:
      'Royal Orchid Suites has been submitted and is waiting for platform approval.',
    category: 'Hotels',
    date: '2026-11-12T09:15:00',
    status: 'Unread',
  },
  {
    id: 3,
    title: 'New booking received',
    message:
      'Booking BK-5009 has been created for Grand Heritage Palace.',
    category: 'Bookings',
    date: '2026-11-11T17:45:00',
    status: 'Unread',
  },
  {
    id: 4,
    title: 'Vendor application approved',
    message:
      'Mountain View Resorts has successfully completed vendor approval.',
    category: 'Vendors',
    date: '2026-11-11T14:20:00',
    status: 'Read',
  },
  {
    id: 5,
    title: 'Platform maintenance scheduled',
    message:
      'Scheduled platform maintenance is planned for the upcoming weekend.',
    category: 'System',
    date: '2026-11-10T12:00:00',
    status: 'Read',
  },
  {
    id: 6,
    title: 'Hotel status updated',
    message:
      'Coastal Bay Resort has been moved to pending review.',
    category: 'Hotels',
    date: '2026-11-09T16:30:00',
    status: 'Read',
  },
  {
    id: 7,
    title: 'Booking cancelled',
    message:
      'Booking BK-5004 at Urban Living Central has been cancelled.',
    category: 'Bookings',
    date: '2026-11-08T11:10:00',
    status: 'Read',
  },
  {
    id: 8,
    title: 'Security settings reminder',
    message:
      'Review administrator access and platform security preferences.',
    category: 'System',
    date: '2026-11-07T09:00:00',
    status: 'Read',
  },
];

type StatusFilter = 'All' | 'Unread' | 'Read';
type CategoryFilter = 'All' | NotificationCategory;

const categoryIcons = {
  Vendors: Building2,
  Hotels: Hotel,
  Bookings: CalendarCheck,
  System: Settings,
};

const categoryStyles: Record<NotificationCategory, string> = {
  Vendors: 'bg-[#F1EDF8] text-[#8068B3]',
  Hotels: 'bg-[#EDF3FA] text-[#5C83B5]',
  Bookings: 'bg-[#FDF2E9] text-[#C48A50]',
  System: 'bg-[#FCEEF2] text-[#C16D8A]',
};

const SuperAdminNotifications: React.FC = () => {
  const [notifications, setNotifications] =
    useState<PlatformNotification[]>(initialNotifications);

  const [statusFilter, setStatusFilter] =
    useState<StatusFilter>('All');

  const [categoryFilter, setCategoryFilter] =
    useState<CategoryFilter>('All');

  const [search, setSearch] = useState('');

  const unreadCount = notifications.filter(
    (item) => item.status === 'Unread'
  ).length;

  const readCount = notifications.filter(
    (item) => item.status === 'Read'
  ).length;

  const filteredNotifications = useMemo(() => {
    return notifications.filter((item) => {
      const matchesStatus =
        statusFilter === 'All' || item.status === statusFilter;

      const matchesCategory =
        categoryFilter === 'All' ||
        item.category === categoryFilter;

      const searchText =
        `${item.title} ${item.message} ${item.category}`.toLowerCase();

      const matchesSearch = searchText.includes(search.toLowerCase());

      return matchesStatus && matchesCategory && matchesSearch;
    });
  }, [notifications, statusFilter, categoryFilter, search]);

  const updateStatus = (id: number) => {
    setNotifications((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              status: item.status === 'Unread' ? 'Read' : 'Unread',
            }
          : item
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) =>
      prev.map((item) => ({ ...item, status: 'Read' }))
    );
  };

  const deleteNotification = (id: number) => {
    setNotifications((prev) =>
      prev.filter((item) => item.id !== id)
    );
  };

  const clearReadNotifications = () => {
    setNotifications((prev) =>
      prev.filter((item) => item.status !== 'Read')
    );
  };

  const formatDate = (date: string) =>
    new Intl.DateTimeFormat('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
    }).format(new Date(date));

  return (
    <div className="mx-auto max-w-[1500px] space-y-6 pb-8">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <div className="mb-2 flex items-center gap-2 text-xs text-[#9995A6]">
            <Bell size={14} />
            <span>Super Admin</span>
            <span>/</span>
            <span>Notifications</span>
          </div>

          <h1 className="text-2xl font-semibold tracking-tight text-[#272435]">
            Notifications
          </h1>

          <p className="mt-1 text-sm text-[#9290A0]">
            Stay updated with platform activities and important alerts.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={clearReadNotifications}
            disabled={readCount === 0}
            className="rounded-xl border border-[#E9E7EF] bg-white px-4 py-2.5 text-sm font-medium text-[#666174] transition hover:bg-[#F8F7FC] disabled:cursor-not-allowed disabled:opacity-40"
          >
            Clear read
          </button>

          <button
            type="button"
            onClick={markAllAsRead}
            disabled={unreadCount === 0}
            className="flex items-center gap-2 rounded-xl bg-[#8068B3] px-4 py-2.5 text-sm font-medium text-white transition hover:bg-[#7058A3] disabled:cursor-not-allowed disabled:opacity-40"
          >
            <CheckCheck size={16} />
            Mark all as read
          </button>
        </div>
      </div>

      {/* Summary */}
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-[#ECEAF1] bg-white p-5">
          <div className="flex items-center justify-between">
            <p className="text-sm text-[#9290A0]">Total Notifications</p>
            <div className="rounded-xl bg-[#F1EDF8] p-2 text-[#8068B3]">
              <Bell size={18} />
            </div>
          </div>
          <p className="mt-3 text-2xl font-semibold text-[#302D40]">
            {notifications.length}
          </p>
        </div>

        <div className="rounded-2xl border border-[#ECEAF1] bg-white p-5">
          <div className="flex items-center justify-between">
            <p className="text-sm text-[#9290A0]">Unread</p>
            <div className="rounded-xl bg-[#FCEEF2] p-2 text-[#C16D8A]">
              <MailOpen size={18} />
            </div>
          </div>
          <p className="mt-3 text-2xl font-semibold text-[#302D40]">
            {unreadCount}
          </p>
        </div>

        <div className="rounded-2xl border border-[#ECEAF1] bg-white p-5">
          <div className="flex items-center justify-between">
            <p className="text-sm text-[#9290A0]">Read</p>
            <div className="rounded-xl bg-[#EDF3FA] p-2 text-[#5C83B5]">
              <Check size={18} />
            </div>
          </div>
          <p className="mt-3 text-2xl font-semibold text-[#302D40]">
            {readCount}
          </p>
        </div>
      </div>

      {/* Filters */}
      <section className="rounded-2xl border border-[#ECEAF1] bg-white p-5">
        <div className="flex flex-col gap-4">
          <div className="relative w-full md:max-w-sm">
            <Search
              size={17}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#A29EAE]"
            />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search notifications..."
              className="w-full rounded-xl border border-[#E9E7EF] bg-white py-3 pl-10 pr-4 text-sm outline-none transition focus:border-[#9B8BC4] focus:ring-2 focus:ring-[#9B8BC4]/10"
            />
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap gap-2">
              {(['All', 'Unread', 'Read'] as StatusFilter[]).map((filter) => (
                <button
                  key={filter}
                  type="button"
                  onClick={() => setStatusFilter(filter)}
                  className={`rounded-lg px-3.5 py-2 text-sm font-medium transition ${
                    statusFilter === filter
                      ? 'bg-[#8068B3] text-white'
                      : 'bg-[#F7F6FA] text-[#777386] hover:bg-[#EFEDF4]'
                  }`}
                >
                  {filter}
                  {filter === 'Unread' && (
                    <span className="ml-2 opacity-75">{unreadCount}</span>
                  )}
                </button>
              ))}
            </div>

            <select
              value={categoryFilter}
              onChange={(e) =>
                setCategoryFilter(e.target.value as CategoryFilter)
              }
              className="rounded-xl border border-[#E9E7EF] bg-white px-3.5 py-2.5 text-sm text-[#666174] outline-none focus:border-[#9B8BC4]"
            >
              <option value="All">All Categories</option>
              <option value="Vendors">Vendors</option>
              <option value="Hotels">Hotels</option>
              <option value="Bookings">Bookings</option>
              <option value="System">System</option>
            </select>
          </div>
        </div>
      </section>

      {/* Notification list */}
      <section className="overflow-hidden rounded-2xl border border-[#ECEAF1] bg-white">
        <div className="flex items-center justify-between border-b border-[#F0EEF4] px-5 py-4">
          <div>
            <h2 className="font-semibold text-[#302D40]">
              All Notifications
            </h2>
            <p className="mt-1 text-xs text-[#9995A6]">
              {filteredNotifications.length} notification
              {filteredNotifications.length === 1 ? '' : 's'} found
            </p>
          </div>
        </div>

        {filteredNotifications.length > 0 ? (
          <div className="divide-y divide-[#F0EEF4]">
            {filteredNotifications.map((item) => {
              const Icon = categoryIcons[item.category];
              const isUnread = item.status === 'Unread';

              return (
                <div
                  key={item.id}
                  className={`flex gap-4 px-5 py-5 transition hover:bg-[#FBFAFD] ${
                    isUnread ? 'bg-[#FCFBFE]' : ''
                  }`}
                >
                  <div
                    className={`mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${categoryStyles[item.category]}`}
                  >
                    <Icon size={18} />
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-sm font-semibold text-[#302D40]">
                        {item.title}
                      </h3>

                      {isUnread && (
                        <span className="h-2 w-2 rounded-full bg-[#8068B3]" />
                      )}

                      <span
                        className={`rounded-md px-2 py-1 text-[10px] font-medium ${categoryStyles[item.category]}`}
                      >
                        {item.category}
                      </span>
                    </div>

                    <p className="mt-1.5 text-sm leading-6 text-[#858194]">
                      {item.message}
                    </p>

                    <p className="mt-2 text-xs text-[#AAA6B4]">
                      {formatDate(item.date)}
                    </p>
                  </div>

                  <div className="flex shrink-0 items-start gap-1">
                    <button
                      type="button"
                      onClick={() => updateStatus(item.id)}
                      title={isUnread ? 'Mark as read' : 'Mark as unread'}
                      aria-label={isUnread ? 'Mark as read' : 'Mark as unread'}
                      className="rounded-lg p-2 text-[#898496] transition hover:bg-[#F1EDF8] hover:text-[#8068B3]"
                    >
                      {isUnread ? (
                        <MailOpen size={17} />
                      ) : (
                        <Check size={17} />
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={() => deleteNotification(item.id)}
                      title="Delete notification"
                      aria-label="Delete notification"
                      className="rounded-lg p-2 text-[#A29EAE] transition hover:bg-[#FCEEF2] hover:text-[#C16D8A]"
                    >
                      <Trash2 size={17} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center px-5 py-16 text-center">
            <div className="rounded-2xl bg-[#F5F3F8] p-4 text-[#A29AAF]">
              <Inbox size={27} />
            </div>
            <h3 className="mt-4 font-semibold text-[#302D40]">
              No notifications found
            </h3>
            <p className="mt-1 max-w-sm text-sm text-[#9995A6]">
              Try changing your filters or search terms to find notifications.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearch('');
                setStatusFilter('All');
                setCategoryFilter('All');
              }}
              className="mt-4 text-sm font-medium text-[#8068B3] hover:underline"
            >
              Clear filters
            </button>
          </div>
        )}
      </section>
    </div>
  );
};

export default SuperAdminNotifications;
