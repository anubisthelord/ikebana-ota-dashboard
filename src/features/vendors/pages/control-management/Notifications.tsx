
import React, { useMemo, useState } from 'react';
import {
  Bell,
  CalendarCheck,
  CreditCard,
  Building2,
  Settings,
  CheckCheck,
  Check,
  Trash2,
  Filter,
  Inbox,
} from 'lucide-react';

type NotificationType = 'BOOKING' | 'PAYMENT' | 'HOTEL' | 'SYSTEM';
type NotificationFilter = 'ALL' | 'UNREAD' | 'READ';

interface NotificationItem {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  time: string;
  read: boolean;
}

const initialNotifications: NotificationItem[] = [
  {
    id: 'NTF-001',
    type: 'BOOKING',
    title: 'New booking received',
    message: 'A new booking was received for The Grand Heritage. Booking ID: BK-2026-008.',
    time: '5 minutes ago',
    read: false,
  },
  {
    id: 'NTF-002',
    type: 'PAYMENT',
    title: 'Payment received',
    message: 'Payment of ₹13,500 has been successfully received for booking BK-2026-001.',
    time: '25 minutes ago',
    read: false,
  },
  {
    id: 'NTF-003',
    type: 'HOTEL',
    title: 'Hotel listing approved',
    message: 'Your property The Grand Heritage has been approved and is now active.',
    time: '2 hours ago',
    read: false,
  },
  {
    id: 'NTF-004',
    type: 'BOOKING',
    title: 'Booking cancellation',
    message: 'Booking BK-2026-006 has been cancelled by the guest.',
    time: 'Yesterday',
    read: true,
  },
  {
    id: 'NTF-005',
    type: 'SYSTEM',
    title: 'Profile updated',
    message: 'Your business contact information was successfully updated.',
    time: 'Yesterday',
    read: true,
  },
  {
    id: 'NTF-006',
    type: 'PAYMENT',
    title: 'Payout processed',
    message: 'Your payout of ₹28,500 has been processed successfully.',
    time: '2 days ago',
    read: true,
  },
  {
    id: 'NTF-007',
    type: 'HOTEL',
    title: 'Hotel information required',
    message: 'Please complete the missing property information to improve your listing.',
    time: '3 days ago',
    read: true,
  },
];

const typeConfig: Record<
  NotificationType,
  { label: string; icon: React.ElementType; color: string; background: string }
> = {
  BOOKING: {
    label: 'Booking',
    icon: CalendarCheck,
    color: 'text-[#5485C9]',
    background: 'bg-[#EEF5FF]',
  },
  PAYMENT: {
    label: 'Payment',
    icon: CreditCard,
    color: 'text-[#26966B]',
    background: 'bg-[#EAF8F1]',
  },
  HOTEL: {
    label: 'Hotel',
    icon: Building2,
    color: 'text-[#9B78CE]',
    background: 'bg-[#F3EDFC]',
  },
  SYSTEM: {
    label: 'System',
    icon: Settings,
    color: 'text-[#C58A4C]',
    background: 'bg-[#FFF5EB]',
  },
};

const Notifications: React.FC = () => {
  const [notifications, setNotifications] = useState(initialNotifications);
  const [filter, setFilter] = useState<NotificationFilter>('ALL');
  const [category, setCategory] = useState<'ALL' | NotificationType>('ALL');

  const unreadCount = notifications.filter((item) => !item.read).length;

  const filteredNotifications = useMemo(() => {
    return notifications.filter((item) => {
      const matchesStatus =
        filter === 'ALL' ||
        (filter === 'UNREAD' && !item.read) ||
        (filter === 'READ' && item.read);

      const matchesCategory =
        category === 'ALL' || item.type === category;

      return matchesStatus && matchesCategory;
    });
  }, [notifications, filter, category]);

 

  const toggleReadStatus = (id: string) => {
    setNotifications((current) =>
      current.map((item) =>
        item.id === id ? { ...item, read: !item.read } : item,
      ),
    );
  };

  const markAllAsRead = () => {
    setNotifications((current) =>
      current.map((item) => ({ ...item, read: true })),
    );
  };

  const deleteNotification = (id: string) => {
    setNotifications((current) =>
      current.filter((item) => item.id !== id),
    );
  };

  return (
    <div className="mx-auto w-full max-w-6xl space-y-6 pb-8">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-semibold tracking-tight text-[#292735]">
              Notifications
            </h1>
            {unreadCount > 0 && (
              <span className="rounded-full bg-[#F3EDFC] px-2.5 py-1 text-xs font-medium text-[#8965C5]">
                {unreadCount} unread
              </span>
            )}
          </div>
          <p className="mt-1 text-sm text-[#858391]">
            Stay updated with your bookings, payments and property activity.
          </p>
        </div>

        <button
          type="button"
          onClick={markAllAsRead}
          disabled={unreadCount === 0}
          className="inline-flex items-center justify-center gap-2 rounded-lg border border-[#E8E7ED] bg-white px-4 py-2.5 text-sm font-medium text-[#555362] transition hover:bg-[#F8F7FC] disabled:cursor-not-allowed disabled:opacity-40"
        >
          <CheckCheck size={16} />
          Mark all as read
        </button>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-[#EAE9EF] bg-white p-4">
          <p className="text-sm text-[#858391]">Total Notifications</p>
          <p className="mt-2 text-2xl font-semibold text-[#292735]">
            {notifications.length}
          </p>
        </div>

        <div className="rounded-xl border border-[#EAE9EF] bg-white p-4">
          <p className="text-sm text-[#858391]">Unread</p>
          <p className="mt-2 text-2xl font-semibold text-[#8965C5]">
            {unreadCount}
          </p>
        </div>

        <div className="rounded-xl border border-[#EAE9EF] bg-white p-4">
          <p className="text-sm text-[#858391]">Read</p>
          <p className="mt-2 text-2xl font-semibold text-[#26966B]">
            {notifications.length - unreadCount}
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col justify-between gap-4 rounded-xl border border-[#EAE9EF] bg-white p-4 lg:flex-row lg:items-center">
        <div className="flex flex-wrap items-center gap-2">
          {(
            [
              ['ALL', 'All'],
              ['UNREAD', 'Unread'],
              ['READ', 'Read'],
            ] as const
          ).map(([value, label]) => (
            <button
              key={value}
              type="button"
              onClick={() => setFilter(value)}
              className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
                filter === value
                  ? 'bg-[#292735] text-white'
                  : 'bg-[#F7F6FA] text-[#686675] hover:bg-[#EFEDF4]'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <Filter size={16} className="text-[#858391]" />
          <select
            value={category}
            onChange={(e) =>
              setCategory(e.target.value as 'ALL' | NotificationType)
            }
            className="min-w-36 rounded-lg border border-[#E8E7ED] bg-white px-3 py-2.5 text-sm text-[#555362] outline-none focus:border-[#A78BFA]"
          >
            <option value="ALL">All categories</option>
            <option value="BOOKING">Bookings</option>
            <option value="PAYMENT">Payments</option>
            <option value="HOTEL">Hotels</option>
            <option value="SYSTEM">System</option>
          </select>
        </div>
      </div>

      {/* Notification List */}
      <div className="overflow-hidden rounded-xl border border-[#EAE9EF] bg-white">
        <div className="flex items-center justify-between border-b border-[#F0EFF3] px-5 py-4">
          <h2 className="font-semibold text-[#292735]">
            Recent Activity
          </h2>
          <span className="text-xs text-[#9694A0]">
            {filteredNotifications.length} notifications
          </span>
        </div>

        {filteredNotifications.length > 0 ? (
          <div className="divide-y divide-[#F0EFF3]">
            {filteredNotifications.map((notification) => {
              const config = typeConfig[notification.type];
              const Icon = config.icon;

              return (
                <div
                  key={notification.id}
                  className={`group flex gap-4 px-5 py-5 transition hover:bg-[#FBFAFD] ${
                    !notification.read ? 'bg-[#FCFBFF]' : ''
                  }`}
                >
                  <div
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${config.background} ${config.color}`}
                  >
                    <Icon size={19} />
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-sm font-semibold text-[#393746]">
                        {notification.title}
                      </h3>

                      {!notification.read && (
                        <span className="h-2 w-2 rounded-full bg-[#8965C5]" />
                      )}
                    </div>

                    <p className="mt-1 text-sm leading-6 text-[#777583]">
                      {notification.message}
                    </p>

                    <div className="mt-3 flex flex-wrap items-center gap-3">
                      <span className="text-xs text-[#9694A0]">
                        {notification.time}
                      </span>
                      <span
                        className={`rounded-md px-2 py-1 text-xs font-medium ${config.background} ${config.color}`}
                      >
                        {config.label}
                      </span>
                    </div>
                  </div>

                  <div className="flex shrink-0 items-start gap-1">
                    <button
                      type="button"
                      onClick={() => toggleReadStatus(notification.id)}
                      title={notification.read ? 'Mark as unread' : 'Mark as read'}
                      className="rounded-lg p-2 text-[#9694A0] transition hover:bg-[#F0EFF5] hover:text-[#555362]"
                    >
                      {notification.read ? (
                        <Bell size={16} />
                      ) : (
                        <Check size={16} />
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={() => deleteNotification(notification.id)}
                      title="Delete notification"
                      className="rounded-lg p-2 text-[#9694A0] transition hover:bg-red-50 hover:text-red-600"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center px-5 py-16 text-center">
            <div className="mb-4 rounded-full bg-[#F5F3F9] p-4 text-[#9694A0]">
              <Inbox size={26} />
            </div>
            <h3 className="text-sm font-semibold text-[#393746]">
              No notifications found
            </h3>
            <p className="mt-1 text-sm text-[#858391]">
              There are no notifications matching your selected filters.
            </p>
            <button
              type="button"
              onClick={() => {
                setFilter('ALL');
                setCategory('ALL');
              }}
              className="mt-4 text-sm font-medium text-[#8065C9] hover:underline"
            >
              Clear filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Notifications;
