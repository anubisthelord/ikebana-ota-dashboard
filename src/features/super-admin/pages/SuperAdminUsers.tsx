
import React, { useMemo, useState } from 'react';
import {
  Search,
  Users,
  ShieldCheck,
  UserRound,
  Ban,
  Eye,
  X,
  Mail,
  Phone,
  CalendarDays,
  CheckCircle2,
  UserCog,
} from 'lucide-react';

type UserRole = 'SUPER_ADMIN' | 'VENDOR_OWNER' | 'VENDOR_ADMIN' | 'VENDOR_STAFF' | 'USER';
type UserStatus = 'ACTIVE' | 'SUSPENDED';

interface PlatformUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  status: UserStatus;
  joinedAt: string;
  vendor: string;
}

const initialUsers: PlatformUser[] = [
  {
    id: 'US-1001',
    name: 'Sanjay Sharma',
    email: 'sanjay@grandheritage.com',
    phone: '+91 98765 43210',
    role: 'VENDOR_OWNER',
    status: 'ACTIVE',
    joinedAt: '12 Aug 2026',
    vendor: 'The Grand Heritage',
  },
  {
    id: 'US-1002',
    name: 'Aarav Mehta',
    email: 'aarav@mountainview.com',
    phone: '+91 98765 12345',
    role: 'VENDOR_OWNER',
    status: 'ACTIVE',
    joinedAt: '18 Aug 2026',
    vendor: 'Mountain View Resorts',
  },
  {
    id: 'US-1003',
    name: 'Amit Sharma',
    email: 'amit@royalorchid.com',
    phone: '+91 98111 22334',
    role: 'VENDOR_OWNER',
    status: 'ACTIVE',
    joinedAt: '02 Sep 2026',
    vendor: 'Royal Orchid Hospitality',
  },
  {
    id: 'US-1004',
    name: 'Priya Verma',
    email: 'priya@urbanliving.com',
    phone: '+91 98333 44556',
    role: 'VENDOR_ADMIN',
    status: 'ACTIVE',
    joinedAt: '20 Aug 2026',
    vendor: 'Urban Living Hotels',
  },
  {
    id: 'US-1005',
    name: 'Neha Kapoor',
    email: 'neha@citycomfort.com',
    phone: '+91 98555 66778',
    role: 'VENDOR_STAFF',
    status: 'ACTIVE',
    joinedAt: '25 Jul 2026',
    vendor: 'City Comfort Properties',
  },
  {
    id: 'US-1006',
    name: 'Rohan Verma',
    email: 'rohan@example.com',
    phone: '+91 98666 77889',
    role: 'USER',
    status: 'ACTIVE',
    joinedAt: '08 Sep 2026',
    vendor: '—',
  },
  {
    id: 'US-1007',
    name: 'Karan Malhotra',
    email: 'karan@bluehorizon.com',
    phone: '+91 98444 55667',
    role: 'VENDOR_OWNER',
    status: 'SUSPENDED',
    joinedAt: '10 Jul 2026',
    vendor: 'Blue Horizon Stays',
  },
  {
    id: 'US-1008',
    name: 'Platform Administrator',
    email: 'admin@ikebana.com',
    phone: '+91 98000 11223',
    role: 'SUPER_ADMIN',
    status: 'ACTIVE',
    joinedAt: '01 Jul 2026',
    vendor: '—',
  },
  {
    id: 'US-1009',
    name: 'Meera Singh',
    email: 'meera@example.com',
    phone: '+91 98700 12345',
    role: 'USER',
    status: 'ACTIVE',
    joinedAt: '10 Sep 2026',
    vendor: '—',
  },
];

const roleLabels: Record<UserRole, string> = {
  SUPER_ADMIN: 'Super Admin',
  VENDOR_OWNER: 'Vendor Owner',
  VENDOR_ADMIN: 'Vendor Admin',
  VENDOR_STAFF: 'Vendor Staff',
  USER: 'Customer',
};

const statusStyles: Record<UserStatus, string> = {
  ACTIVE: 'bg-emerald-50 text-emerald-700',
  SUSPENDED: 'bg-slate-100 text-slate-700',
};

const SuperAdminUsers: React.FC = () => {
  const [users, setUsers] = useState(initialUsers);
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [selectedUser, setSelectedUser] = useState<PlatformUser | null>(null);

  const counts = useMemo(() => ({
    total: users.length,
    active: users.filter((user) => user.status === 'ACTIVE').length,
    suspended: users.filter((user) => user.status === 'SUSPENDED').length,
    vendors: users.filter((user) =>
      ['VENDOR_OWNER', 'VENDOR_ADMIN', 'VENDOR_STAFF'].includes(user.role)
    ).length,
  }), [users]);

  const filteredUsers = useMemo(() => {
    const term = search.toLowerCase().trim();

    return users.filter((user) => {
      const matchesSearch =
        !term ||
        user.name.toLowerCase().includes(term) ||
        user.email.toLowerCase().includes(term) ||
        user.id.toLowerCase().includes(term) ||
        user.vendor.toLowerCase().includes(term);

      const matchesRole = roleFilter === 'ALL' || user.role === roleFilter;
      const matchesStatus = statusFilter === 'ALL' || user.status === statusFilter;

      return matchesSearch && matchesRole && matchesStatus;
    });
  }, [users, search, roleFilter, statusFilter]);

  const toggleStatus = (userId: string) => {
    const target = users.find((user) => user.id === userId);
    if (!target) return;

    if (target.role === 'SUPER_ADMIN') {
      window.alert('Super Admin accounts cannot be suspended from this screen.');
      return;
    }

    const nextStatus: UserStatus =
      target.status === 'ACTIVE' ? 'SUSPENDED' : 'ACTIVE';

    if (!window.confirm(`Are you sure you want to ${nextStatus.toLowerCase()} this user?`)) {
      return;
    }

    setUsers((current) =>
      current.map((user) =>
        user.id === userId ? { ...user, status: nextStatus } : user
      )
    );

    setSelectedUser((current) =>
      current?.id === userId ? { ...current, status: nextStatus } : current
    );
  };

  return (
    <div className="space-y-6">
      {/* Heading */}
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-gray-900">
          User Management
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          Manage platform users, roles, and account access.
        </p>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          { label: 'Total Users', value: counts.total, icon: Users, color: 'text-gray-600', bg: 'bg-gray-100' },
          { label: 'Active Users', value: counts.active, icon: CheckCircle2, color: 'text-emerald-600', bg: 'bg-emerald-50' },
          { label: 'Vendor Team Members', value: counts.vendors, icon: UserCog, color: 'text-violet-600', bg: 'bg-violet-50' },
          { label: 'Suspended Users', value: counts.suspended, icon: Ban, color: 'text-slate-600', bg: 'bg-slate-100' },
        ].map((stat) => {
          const Icon = stat.icon;

          return (
            <div key={stat.label} className="rounded-xl border border-gray-200 bg-white p-5">
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-500">{stat.label}</p>
                <div className={`rounded-lg p-2 ${stat.bg}`}>
                  <Icon size={18} className={stat.color} />
                </div>
              </div>
              <p className="mt-3 text-2xl font-semibold text-gray-900">{stat.value}</p>
            </div>
          );
        })}
      </div>

      {/* Users table */}
      <section className="overflow-hidden rounded-xl border border-gray-200 bg-white">
        <div className="flex flex-col gap-4 border-b border-gray-100 p-5 xl:flex-row xl:items-center xl:justify-between">
          <div>
            <h2 className="font-semibold text-gray-900">All Users</h2>
            <p className="mt-1 text-sm text-gray-500">
              Search and review registered platform accounts.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <div className="relative">
              <Search size={17} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search name, email, vendor..."
                className="h-10 w-full rounded-lg border border-gray-200 pl-9 pr-3 text-sm outline-none focus:border-gray-400 sm:w-64"
              />
            </div>

            <select
              value={roleFilter}
              onChange={(event) => setRoleFilter(event.target.value)}
              className="h-10 rounded-lg border border-gray-200 bg-white px-3 text-sm text-gray-700 outline-none focus:border-gray-400"
            >
              <option value="ALL">All roles</option>
              <option value="SUPER_ADMIN">Super Admin</option>
              <option value="VENDOR_OWNER">Vendor Owner</option>
              <option value="VENDOR_ADMIN">Vendor Admin</option>
              <option value="VENDOR_STAFF">Vendor Staff</option>
              <option value="USER">Customer</option>
            </select>

            <select
              value={statusFilter}
              onChange={(event) => setStatusFilter(event.target.value)}
              className="h-10 rounded-lg border border-gray-200 bg-white px-3 text-sm text-gray-700 outline-none focus:border-gray-400"
            >
              <option value="ALL">All statuses</option>
              <option value="ACTIVE">Active</option>
              <option value="SUSPENDED">Suspended</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[850px] text-left">
            <thead className="bg-gray-50">
              <tr className="text-xs font-medium uppercase tracking-wide text-gray-500">
                <th className="px-5 py-4">User</th>
                <th className="px-5 py-4">Role</th>
                <th className="px-5 py-4">Vendor</th>
                <th className="px-5 py-4">Joined</th>
                <th className="px-5 py-4">Status</th>
                <th className="px-5 py-4 text-right">Action</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="transition hover:bg-gray-50/70">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gray-100">
                        <UserRound size={18} className="text-gray-500" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{user.name}</p>
                        <p className="mt-1 text-xs text-gray-500">{user.email}</p>
                        <p className="mt-1 text-xs text-gray-400">{user.id}</p>
                      </div>
                    </div>
                  </td>

                  <td className="px-5 py-4">
                    <span className="text-sm text-gray-700">{roleLabels[user.role]}</span>
                  </td>

                  <td className="px-5 py-4 text-sm text-gray-600">{user.vendor}</td>

                  <td className="px-5 py-4 text-sm text-gray-500">{user.joinedAt}</td>

                  <td className="px-5 py-4">
                    <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${statusStyles[user.status]}`}>
                      {user.status}
                    </span>
                  </td>

                  <td className="px-5 py-4 text-right">
                    <button
                      onClick={() => setSelectedUser(user)}
                      title="View user"
                      className="rounded-lg p-2 text-gray-500 transition hover:bg-gray-100 hover:text-gray-900"
                    >
                      <Eye size={17} />
                    </button>
                  </td>
                </tr>
              ))}

              {filteredUsers.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-5 py-14 text-center">
                    <Users className="mx-auto h-8 w-8 text-gray-300" />
                    <p className="mt-3 text-sm font-medium text-gray-700">No users found</p>
                    <p className="mt-1 text-xs text-gray-500">
                      Try changing your search or filters.
                    </p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="border-t border-gray-100 px-5 py-4">
          <p className="text-xs text-gray-500">
            Showing {filteredUsers.length} of {users.length} users
          </p>
        </div>
      </section>

      {/* User details modal */}
      {selectedUser && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
          onClick={() => setSelectedUser(null)}
        >
          <div
            className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">User Details</h2>
                <p className="mt-1 text-sm text-gray-500">{selectedUser.id}</p>
              </div>
              <button
                onClick={() => setSelectedUser(null)}
                className="rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-700"
              >
                <X size={18} />
              </button>
            </div>

            <div className="mt-6 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
                <UserRound size={22} className="text-gray-600" />
              </div>
              <div>
                <p className="font-semibold text-gray-900">{selectedUser.name}</p>
                <p className="mt-1 text-xs text-gray-500">{roleLabels[selectedUser.role]}</p>
              </div>
            </div>

            <div className="mt-6 space-y-5 border-t border-gray-100 pt-5">
              <div className="flex items-start gap-3">
                <Mail size={17} className="mt-0.5 text-gray-400" />
                <div>
                  <p className="text-xs text-gray-400">Email Address</p>
                  <p className="mt-1 break-all text-sm text-gray-800">{selectedUser.email}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone size={17} className="mt-0.5 text-gray-400" />
                <div>
                  <p className="text-xs text-gray-400">Phone Number</p>
                  <p className="mt-1 text-sm text-gray-800">{selectedUser.phone}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <UserCog size={17} className="mt-0.5 text-gray-400" />
                <div>
                  <p className="text-xs text-gray-400">Vendor</p>
                  <p className="mt-1 text-sm text-gray-800">{selectedUser.vendor}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CalendarDays size={17} className="mt-0.5 text-gray-400" />
                <div>
                  <p className="text-xs text-gray-400">Joined Platform</p>
                  <p className="mt-1 text-sm text-gray-800">{selectedUser.joinedAt}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <ShieldCheck size={17} className="mt-0.5 text-gray-400" />
                <div>
                  <p className="text-xs text-gray-400">Account Status</p>
                  <span className={`mt-1 inline-block rounded-full px-2.5 py-1 text-xs font-medium ${statusStyles[selectedUser.status]}`}>
                    {selectedUser.status}
                  </span>
                </div>
              </div>
            </div>

            {selectedUser.role !== 'SUPER_ADMIN' && (
              <div className="mt-7 flex justify-end border-t border-gray-100 pt-5">
                <button
                  onClick={() => toggleStatus(selectedUser.id)}
                  className={`rounded-lg px-4 py-2 text-sm font-medium ${
                    selectedUser.status === 'ACTIVE'
                      ? 'border border-gray-200 text-gray-700 hover:bg-gray-50'
                      : 'bg-gray-900 text-white hover:bg-gray-800'
                  }`}
                >
                  {selectedUser.status === 'ACTIVE' ? 'Suspend User' : 'Reactivate User'}
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SuperAdminUsers;
