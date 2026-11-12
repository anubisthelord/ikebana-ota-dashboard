import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search,
  Building2,
  CheckCircle2,
  Clock3,
  XCircle,
  Ban,
  Eye,
  Check,
  X,
  RefreshCw,
  Users,
  Hotel,
  Filter,
} from 'lucide-react';

type VendorStatus =
  | 'APPROVED'
  | 'PENDING'
  | 'REJECTED'
  | 'SUSPENDED';

interface Vendor {
  id: string;
  name: string;
  owner: string;
  email: string;
  phone: string;
  hotels: number;
  joinedAt: string;
  status: VendorStatus;
}

const initialVendors: Vendor[] = [
  {
    id: 'VN-1001',
    name: 'The Grand Heritage',
    owner: 'Sanjay Sharma',
    email: 'sanjay@grandheritage.example',
    phone: '+91 98765 43210',
    hotels: 4,
    joinedAt: '12 Jan 2026',
    status: 'APPROVED',
  },
  {
    id: 'VN-1002',
    name: 'Mountain View Resorts',
    owner: 'Aarav Mehta',
    email: 'aarav@mountainview.example',
    phone: '+91 98765 12345',
    hotels: 3,
    joinedAt: '18 Feb 2026',
    status: 'APPROVED',
  },
  {
    id: 'VN-1003',
    name: 'Royal Orchid Hospitality',
    owner: 'Amit Sharma',
    email: 'amit@royalorchid.example',
    phone: '+91 98111 22334',
    hotels: 0,
    joinedAt: '12 Nov 2026',
    status: 'PENDING',
  },
  {
    id: 'VN-1004',
    name: 'Coastal Stay Group',
    owner: 'Rahul Mehta',
    email: 'rahul@coastalstay.example',
    phone: '+91 98989 11223',
    hotels: 0,
    joinedAt: '10 Nov 2026',
    status: 'PENDING',
  },
  {
    id: 'VN-1005',
    name: 'Urban Living Hotels',
    owner: 'Priya Verma',
    email: 'priya@urbanliving.example',
    phone: '+91 98100 45678',
    hotels: 2,
    joinedAt: '09 Nov 2026',
    status: 'REJECTED',
  },
  {
    id: 'VN-1006',
    name: 'Blue Horizon Stays',
    owner: 'Karan Malhotra',
    email: 'karan@bluehorizon.example',
    phone: '+91 98700 12345',
    hotels: 1,
    joinedAt: '05 Oct 2026',
    status: 'SUSPENDED',
  },
  {
    id: 'VN-1007',
    name: 'City Comfort Properties',
    owner: 'Neha Kapoor',
    email: 'neha@citycomfort.example',
    phone: '+91 98900 11223',
    hotels: 5,
    joinedAt: '21 Sep 2026',
    status: 'APPROVED',
  },
  {
    id: 'VN-1008',
    name: 'Pine Valley Retreats',
    owner: 'Rohan Verma',
    email: 'rohan@pinevalley.example',
    phone: '+91 98000 55443',
    hotels: 0,
    joinedAt: '08 Nov 2026',
    status: 'PENDING',
  },
];

const statusConfig: Record<
  VendorStatus,
  { label: string; className: string }
> = {
  APPROVED: {
    label: 'Approved',
    className: 'bg-[#EAF8F1] text-[#26966B]',
  },
  PENDING: {
    label: 'Pending',
    className: 'bg-[#FFF5EB] text-[#B47A38]',
  },
  REJECTED: {
    label: 'Rejected',
    className: 'bg-[#FFF0F0] text-[#C65D5D]',
  },
  SUSPENDED: {
    label: 'Suspended',
    className: 'bg-[#F0EFF3] text-[#777583]',
  },
};

const VendorManagement: React.FC = () => {
  const [vendors, setVendors] = useState(initialVendors);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<
    'ALL' | VendorStatus
  >('ALL');

  const navigate = useNavigate();

  const stats = useMemo(
    () => ({
      total: vendors.length,
      approved: vendors.filter((v) => v.status === 'APPROVED').length,
      pending: vendors.filter((v) => v.status === 'PENDING').length,
      rejected: vendors.filter((v) => v.status === 'REJECTED').length,
      suspended: vendors.filter((v) => v.status === 'SUSPENDED').length,
    }),
    [vendors],
  );

  const filteredVendors = useMemo(() => {
    const query = search.trim().toLowerCase();

    return vendors.filter((vendor) => {
      const matchesSearch =
        !query ||
        vendor.name.toLowerCase().includes(query) ||
        vendor.owner.toLowerCase().includes(query) ||
        vendor.email.toLowerCase().includes(query) ||
        vendor.id.toLowerCase().includes(query);

      const matchesStatus =
        statusFilter === 'ALL' || vendor.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [vendors, search, statusFilter]);

  const updateVendorStatus = (
    vendorId: string,
    status: VendorStatus,
  ) => {
    const vendor = vendors.find((item) => item.id === vendorId);
    if (!vendor) return;

    const actionLabels: Record<VendorStatus, string> = {
      APPROVED: 'approve',
      PENDING: 'move back to pending',
      REJECTED: 'reject',
      SUSPENDED: 'suspend',
    };

    const confirmed = window.confirm(
      `Are you sure you want to ${actionLabels[status]} ${vendor.name}?`,
    );

    if (!confirmed) return;

    setVendors((current) =>
      current.map((item) =>
        item.id === vendorId ? { ...item, status } : item,
      ),
    );
  };

  const summaryCards = [
    {
      label: 'Total Vendors',
      value: stats.total,
      icon: Building2,
      color: 'bg-[#F0EDFF] text-[#8065C9]',
      filter: 'ALL' as const,
    },
    {
      label: 'Approved',
      value: stats.approved,
      icon: CheckCircle2,
      color: 'bg-[#EAF8F1] text-[#26966B]',
      filter: 'APPROVED' as const,
    },
    {
      label: 'Pending Review',
      value: stats.pending,
      icon: Clock3,
      color: 'bg-[#FFF5EB] text-[#C58A4C]',
      filter: 'PENDING' as const,
    },
    {
      label: 'Suspended',
      value: stats.suspended,
      icon: Ban,
      color: 'bg-[#F0EFF3] text-[#777583]',
      filter: 'SUSPENDED' as const,
    },
  ];

  return (
    <div className="mx-auto w-full max-w-[1500px] space-y-6 pb-8">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-[#292735]">
            Vendor Management
          </h1>
          <p className="mt-1 text-sm text-[#858391]">
            Review applications and manage vendor accounts across the platform.
          </p>
        </div>

        <button
          type="button"
          onClick={() => {
            setSearch('');
            setStatusFilter('ALL');
          }}
          className="inline-flex items-center justify-center gap-2 rounded-lg border border-[#E8E7ED] bg-white px-4 py-2.5 text-sm font-medium text-[#555362] transition hover:bg-[#F8F7FC]"
        >
          <RefreshCw size={15} />
          Reset Filters
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {summaryCards.map((card) => {
          const Icon = card.icon;
          const active = statusFilter === card.filter;

          return (
            <button
              type="button"
              key={card.label}
              onClick={() => setStatusFilter(card.filter)}
              className={`rounded-xl border bg-white p-5 text-left transition hover:border-[#C8B8EF] ${
                active
                  ? 'border-[#A78BFA] ring-1 ring-[#A78BFA]/20'
                  : 'border-[#EAE9EF]'
              }`}
            >
              <div className="flex items-center justify-between">
                <p className="text-sm text-[#858391]">{card.label}</p>
                <div className={`rounded-lg p-2.5 ${card.color}`}>
                  <Icon size={19} />
                </div>
              </div>
              <p className="mt-3 text-2xl font-semibold text-[#292735]">
                {card.value}
              </p>
            </button>
          );
        })}
      </div>

      {/* Additional status counts */}
      <div className="flex flex-wrap items-center gap-x-6 gap-y-2 rounded-xl border border-[#EAE9EF] bg-white px-5 py-4">
        <div className="flex items-center gap-2 text-sm text-[#686675]">
          <XCircle size={16} className="text-[#C65D5D]" />
          Rejected: <strong className="text-[#393746]">{stats.rejected}</strong>
        </div>
        <div className="flex items-center gap-2 text-sm text-[#686675]">
          <Hotel size={16} className="text-[#8065C9]" />
          Total listed hotels:{' '}
          <strong className="text-[#393746]">
            {vendors.reduce((sum, vendor) => sum + vendor.hotels, 0)}
          </strong>
        </div>
        <div className="flex items-center gap-2 text-sm text-[#686675]">
          <Users size={16} className="text-[#5485C9]" />
          Vendor accounts: <strong className="text-[#393746]">{stats.total}</strong>
        </div>
      </div>

      {/* Search and Filters */}
      <section className="overflow-hidden rounded-xl border border-[#EAE9EF] bg-white">
        <div className="flex flex-col justify-between gap-4 border-b border-[#F0EFF3] p-4 lg:flex-row lg:items-center">
          <div className="relative w-full lg:max-w-md">
            <Search
              size={17}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#A6A4B0]"
            />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search vendor, owner, email or ID..."
              className="w-full rounded-lg border border-[#E8E7ED] bg-white py-2.5 pl-10 pr-4 text-sm text-[#393746] outline-none transition placeholder:text-[#A6A4B0] focus:border-[#A78BFA]"
            />
          </div>

          <div className="flex items-center gap-2">
            <Filter size={16} className="text-[#858391]" />
            <select
              value={statusFilter}
              onChange={(e) =>
                setStatusFilter(e.target.value as 'ALL' | VendorStatus)
              }
              className="min-w-40 rounded-lg border border-[#E8E7ED] bg-white px-3 py-2.5 text-sm text-[#555362] outline-none focus:border-[#A78BFA]"
            >
              <option value="ALL">All statuses</option>
              <option value="APPROVED">Approved</option>
              <option value="PENDING">Pending</option>
              <option value="REJECTED">Rejected</option>
              <option value="SUSPENDED">Suspended</option>
            </select>
          </div>
        </div>

        {/* Vendor Table */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-[950px] text-left">
            <thead>
              <tr className="border-b border-[#F0EFF3] bg-[#FBFAFD]">
                {[
                  'Vendor',
                  'Owner',
                  'Contact',
                  'Hotels',
                  'Joined',
                  'Status',
                  'Actions',
                ].map((heading) => (
                  <th
                    key={heading}
                    className="px-5 py-3 text-xs font-medium text-[#858391]"
                  >
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="divide-y divide-[#F0EFF3]">
              {filteredVendors.map((vendor) => (
                <tr
                  key={vendor.id}
                  className="transition hover:bg-[#FBFAFD]"
                >
                  <td className="px-5 py-4">
                    <p className="text-sm font-medium text-[#393746]">
                      {vendor.name}
                    </p>
                    <p className="mt-1 text-xs text-[#9694A0]">
                      {vendor.id}
                    </p>
                  </td>

                  <td className="px-5 py-4 text-sm text-[#686675]">
                    {vendor.owner}
                  </td>

                  <td className="px-5 py-4">
                    <p className="text-sm text-[#555362]">{vendor.email}</p>
                    <p className="mt-1 text-xs text-[#9694A0]">
                      {vendor.phone}
                    </p>
                  </td>

                  <td className="px-5 py-4 text-sm text-[#555362]">
                    {vendor.hotels}
                  </td>

                  <td className="px-5 py-4 text-sm text-[#686675]">
                    {vendor.joinedAt}
                  </td>

                  <td className="px-5 py-4">
                    <span
                      className={`rounded-md px-2.5 py-1 text-xs font-medium ${statusConfig[vendor.status].className}`}
                    >
                      {statusConfig[vendor.status].label}
                    </span>
                  </td>

                  <td className="px-5 py-4">
                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => navigate(`/super-admin/vendors/${vendor.id}`)}
                        title="View vendor"
                        className="rounded-lg p-2 text-[#777583] transition hover:bg-[#F0EFF5] hover:text-[#555362]"
                      >
                        <Eye size={16} />
                      </button>

                      {vendor.status === 'PENDING' && (
                        <>
                          <button
                            type="button"
                            onClick={() =>
                              updateVendorStatus(vendor.id, 'APPROVED')
                            }
                            title="Approve vendor"
                            className="rounded-lg p-2 text-[#26966B] transition hover:bg-[#EAF8F1]"
                          >
                            <Check size={16} />
                          </button>
                          <button
                            type="button"
                            onClick={() =>
                              updateVendorStatus(vendor.id, 'REJECTED')
                            }
                            title="Reject vendor"
                            className="rounded-lg p-2 text-[#C65D5D] transition hover:bg-[#FFF0F0]"
                          >
                            <X size={16} />
                          </button>
                        </>
                      )}

                      {vendor.status === 'APPROVED' && (
                        <button
                          type="button"
                          onClick={() =>
                            updateVendorStatus(vendor.id, 'SUSPENDED')
                          }
                          title="Suspend vendor"
                          className="rounded-lg p-2 text-[#C58A4C] transition hover:bg-[#FFF5EB]"
                        >
                          <Ban size={16} />
                        </button>
                      )}

                      {vendor.status === 'SUSPENDED' && (
                        <button
                          type="button"
                          onClick={() =>
                            updateVendorStatus(vendor.id, 'APPROVED')
                          }
                          title="Reactivate vendor"
                          className="rounded-lg p-2 text-[#26966B] transition hover:bg-[#EAF8F1]"
                        >
                          <RefreshCw size={16} />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredVendors.length === 0 && (
            <div className="flex flex-col items-center justify-center px-5 py-16 text-center">
              <Building2 size={28} className="mb-3 text-[#B1AFBA]" />
              <h3 className="text-sm font-semibold text-[#393746]">
                No vendors found
              </h3>
              <p className="mt-1 text-sm text-[#858391]">
                Try changing your search or status filter.
              </p>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between border-t border-[#F0EFF3] px-5 py-3">
          <p className="text-xs text-[#858391]">
            Showing {filteredVendors.length} of {vendors.length} vendors
          </p>
          <p className="text-xs text-[#9694A0]">
            Demo data
          </p>
        </div>
      </section>
    </div>
  );
};

export default VendorManagement;