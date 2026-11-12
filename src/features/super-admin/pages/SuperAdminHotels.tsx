
import React, { useMemo, useState } from 'react';
import {
  Search,
  Hotel,
  MapPin,
  Eye,
  CheckCircle2,
  Clock3,
  Ban,
  X,
  Building2,
  SlidersHorizontal,
} from 'lucide-react';

type HotelStatus = 'ACTIVE' | 'PENDING' | 'REJECTED' | 'SUSPENDED';

interface PlatformHotel {
  id: string;
  name: string;
  vendor: string;
  location: string;
  rooms: number;
  status: HotelStatus;
  submittedAt: string;
}

const initialHotels: PlatformHotel[] = [
  {
    id: 'HT-2001',
    name: 'The Grand Heritage Palace',
    vendor: 'The Grand Heritage',
    location: 'Jaipur, Rajasthan',
    rooms: 84,
    status: 'ACTIVE',
    submittedAt: '12 Aug 2026',
  },
  {
    id: 'HT-2002',
    name: 'Heritage Garden Resort',
    vendor: 'The Grand Heritage',
    location: 'Udaipur, Rajasthan',
    rooms: 56,
    status: 'ACTIVE',
    submittedAt: '15 Aug 2026',
  },
  {
    id: 'HT-2003',
    name: 'Mountain View Retreat',
    vendor: 'Mountain View Resorts',
    location: 'Manali, Himachal Pradesh',
    rooms: 42,
    status: 'ACTIVE',
    submittedAt: '18 Aug 2026',
  },
  {
    id: 'HT-2004',
    name: 'Royal Orchid Suites',
    vendor: 'Royal Orchid Hospitality',
    location: 'New Delhi',
    rooms: 65,
    status: 'PENDING',
    submittedAt: '02 Sep 2026',
  },
  {
    id: 'HT-2005',
    name: 'Coastal Bay Resort',
    vendor: 'Coastal Stay Group',
    location: 'North Goa',
    rooms: 38,
    status: 'PENDING',
    submittedAt: '05 Sep 2026',
  },
  {
    id: 'HT-2006',
    name: 'Urban Living Central',
    vendor: 'Urban Living Hotels',
    location: 'Mumbai, Maharashtra',
    rooms: 92,
    status: 'REJECTED',
    submittedAt: '20 Aug 2026',
  },
  {
    id: 'HT-2007',
    name: 'Blue Horizon Lake Resort',
    vendor: 'Blue Horizon Stays',
    location: 'Udaipur, Rajasthan',
    rooms: 31,
    status: 'SUSPENDED',
    submittedAt: '10 Jul 2026',
  },
  {
    id: 'HT-2008',
    name: 'City Comfort Chandigarh',
    vendor: 'City Comfort Properties',
    location: 'Chandigarh',
    rooms: 48,
    status: 'ACTIVE',
    submittedAt: '25 Jul 2026',
  },
  {
    id: 'HT-2009',
    name: 'Pine Valley Mountain Lodge',
    vendor: 'Pine Valley Retreats',
    location: 'Shimla, Himachal Pradesh',
    rooms: 24,
    status: 'PENDING',
    submittedAt: '08 Sep 2026',
  },
];

const statusStyles: Record<HotelStatus, string> = {
  ACTIVE: 'bg-emerald-50 text-emerald-700',
  PENDING: 'bg-amber-50 text-amber-700',
  REJECTED: 'bg-rose-50 text-rose-700',
  SUSPENDED: 'bg-slate-100 text-slate-700',
};

const SuperAdminHotels: React.FC = () => {
  const [hotels, setHotels] = useState(initialHotels);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [selectedHotel, setSelectedHotel] = useState<PlatformHotel | null>(null);

  const counts = useMemo(() => ({
    total: hotels.length,
    active: hotels.filter((hotel) => hotel.status === 'ACTIVE').length,
    pending: hotels.filter((hotel) => hotel.status === 'PENDING').length,
    suspended: hotels.filter((hotel) => hotel.status === 'SUSPENDED').length,
  }), [hotels]);

  const filteredHotels = useMemo(() => {
    const term = search.toLowerCase().trim();

    return hotels.filter((hotel) => {
      const matchesSearch =
        !term ||
        hotel.name.toLowerCase().includes(term) ||
        hotel.vendor.toLowerCase().includes(term) ||
        hotel.location.toLowerCase().includes(term) ||
        hotel.id.toLowerCase().includes(term);

      const matchesStatus =
        statusFilter === 'ALL' || hotel.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [hotels, search, statusFilter]);

  const updateStatus = (hotelId: string, status: HotelStatus) => {
    const action = status === 'ACTIVE' ? 'approve' : 'suspend';

    if (!window.confirm(`Are you sure you want to ${action} this hotel?`)) {
      return;
    }

    setHotels((current) =>
      current.map((hotel) =>
        hotel.id === hotelId ? { ...hotel, status } : hotel
      )
    );

    setSelectedHotel((current) =>
      current?.id === hotelId ? { ...current, status } : current
    );
  };

  const statCards = [
    {
      label: 'Total Hotels',
      value: counts.total,
      icon: Hotel,
      color: 'text-gray-600',
      bg: 'bg-gray-100',
    },
    {
      label: 'Active Hotels',
      value: counts.active,
      icon: CheckCircle2,
      color: 'text-emerald-600',
      bg: 'bg-emerald-50',
    },
    {
      label: 'Pending Review',
      value: counts.pending,
      icon: Clock3,
      color: 'text-amber-600',
      bg: 'bg-amber-50',
    },
    {
      label: 'Suspended Hotels',
      value: counts.suspended,
      icon: Ban,
      color: 'text-slate-600',
      bg: 'bg-slate-100',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Heading */}
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-gray-900">
          Hotel Management
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          Monitor and manage hotels registered across the platform.
        </p>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {statCards.map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.label}
              className="rounded-xl border border-gray-200 bg-white p-5"
            >
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-500">{stat.label}</p>
                <div className={`rounded-lg p-2 ${stat.bg}`}>
                  <Icon size={18} className={stat.color} />
                </div>
              </div>
              <p className="mt-3 text-2xl font-semibold text-gray-900">
                {stat.value}
              </p>
            </div>
          );
        })}
      </div>

      {/* Hotel table */}
      <section className="overflow-hidden rounded-xl border border-gray-200 bg-white">
        <div className="flex flex-col gap-4 border-b border-gray-100 p-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="font-semibold text-gray-900">All Hotels</h2>
            <p className="mt-1 text-sm text-gray-500">
              View hotel properties and their platform status.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <div className="relative">
              <Search
                size={17}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search hotels, vendors..."
                className="h-10 w-full rounded-lg border border-gray-200 bg-white pl-9 pr-3 text-sm outline-none transition focus:border-gray-400 sm:w-64"
              />
            </div>

            <div className="relative">
              <SlidersHorizontal
                size={15}
                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <select
                value={statusFilter}
                onChange={(event) => setStatusFilter(event.target.value)}
                className="h-10 w-full appearance-none rounded-lg border border-gray-200 bg-white pl-9 pr-8 text-sm text-gray-700 outline-none focus:border-gray-400 sm:w-44"
              >
                <option value="ALL">All statuses</option>
                <option value="ACTIVE">Active</option>
                <option value="PENDING">Pending</option>
                <option value="REJECTED">Rejected</option>
                <option value="SUSPENDED">Suspended</option>
              </select>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[850px] text-left">
            <thead className="bg-gray-50">
              <tr className="text-xs font-medium uppercase tracking-wide text-gray-500">
                <th className="px-5 py-4">Hotel</th>
                <th className="px-5 py-4">Vendor</th>
                <th className="px-5 py-4">Location</th>
                <th className="px-5 py-4">Rooms</th>
                <th className="px-5 py-4">Status</th>
                <th className="px-5 py-4">Submitted</th>
                <th className="px-5 py-4 text-right">Action</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {filteredHotels.map((hotel) => (
                <tr key={hotel.id} className="transition hover:bg-gray-50/70">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gray-100">
                        <Hotel size={18} className="text-gray-500" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          {hotel.name}
                        </p>
                        <p className="mt-1 text-xs text-gray-400">{hotel.id}</p>
                      </div>
                    </div>
                  </td>

                  <td className="px-5 py-4 text-sm text-gray-700">
                    {hotel.vendor}
                  </td>

                  <td className="px-5 py-4">
                    <span className="flex items-center gap-1.5 text-sm text-gray-600">
                      <MapPin size={14} className="shrink-0 text-gray-400" />
                      {hotel.location}
                    </span>
                  </td>

                  <td className="px-5 py-4 text-sm text-gray-700">
                    {hotel.rooms}
                  </td>

                  <td className="px-5 py-4">
                    <span
                      className={`rounded-full px-2.5 py-1 text-xs font-medium ${statusStyles[hotel.status]}`}
                    >
                      {hotel.status}
                    </span>
                  </td>

                  <td className="px-5 py-4 text-sm text-gray-500">
                    {hotel.submittedAt}
                  </td>

                  <td className="px-5 py-4 text-right">
                    <button
                      onClick={() => setSelectedHotel(hotel)}
                      title="View hotel"
                      className="rounded-lg p-2 text-gray-500 transition hover:bg-gray-100 hover:text-gray-900"
                    >
                      <Eye size={17} />
                    </button>
                  </td>
                </tr>
              ))}

              {filteredHotels.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-5 py-14 text-center">
                    <Hotel className="mx-auto h-8 w-8 text-gray-300" />
                    <p className="mt-3 text-sm font-medium text-gray-700">
                      No hotels found
                    </p>
                    <p className="mt-1 text-xs text-gray-500">
                      Try changing your search or status filter.
                    </p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="border-t border-gray-100 px-5 py-4">
          <p className="text-xs text-gray-500">
            Showing {filteredHotels.length} of {hotels.length} hotels
          </p>
        </div>
      </section>

      {/* Hotel details modal */}
      {selectedHotel && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
          onClick={() => setSelectedHotel(null)}
        >
          <div
            className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">
                  Hotel Details
                </h2>
                <p className="mt-1 text-sm text-gray-500">
                  {selectedHotel.id}
                </p>
              </div>
              <button
                onClick={() => setSelectedHotel(null)}
                className="rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-700"
              >
                <X size={18} />
              </button>
            </div>

            <div className="mt-6 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gray-100">
                <Hotel size={22} className="text-gray-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">
                  {selectedHotel.name}
                </h3>
                <span
                  className={`mt-1 inline-block rounded-full px-2.5 py-1 text-xs font-medium ${statusStyles[selectedHotel.status]}`}
                >
                  {selectedHotel.status}
                </span>
              </div>
            </div>

            <div className="mt-6 space-y-4 border-t border-gray-100 pt-5">
              <div className="flex items-start gap-3">
                <Building2 size={17} className="mt-0.5 text-gray-400" />
                <div>
                  <p className="text-xs text-gray-400">Vendor</p>
                  <p className="mt-1 text-sm font-medium text-gray-800">
                    {selectedHotel.vendor}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin size={17} className="mt-0.5 text-gray-400" />
                <div>
                  <p className="text-xs text-gray-400">Location</p>
                  <p className="mt-1 text-sm font-medium text-gray-800">
                    {selectedHotel.location}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Hotel size={17} className="mt-0.5 text-gray-400" />
                <div>
                  <p className="text-xs text-gray-400">Room Count</p>
                  <p className="mt-1 text-sm font-medium text-gray-800">
                    {selectedHotel.rooms} rooms
                  </p>
                </div>
              </div>
            </div>

            {selectedHotel.status === 'PENDING' && (
              <div className="mt-7 flex justify-end gap-2 border-t border-gray-100 pt-5">
                <button
                  onClick={() => updateStatus(selectedHotel.id, 'REJECTED')}
                  className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Reject
                </button>
                <button
                  onClick={() => updateStatus(selectedHotel.id, 'ACTIVE')}
                  className="rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
                >
                  Approve Hotel
                </button>
              </div>
            )}

            {selectedHotel.status === 'ACTIVE' && (
              <div className="mt-7 flex justify-end border-t border-gray-100 pt-5">
                <button
                  onClick={() => updateStatus(selectedHotel.id, 'SUSPENDED')}
                  className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Suspend Hotel
                </button>
              </div>
            )}

            {selectedHotel.status === 'SUSPENDED' && (
              <div className="mt-7 flex justify-end border-t border-gray-100 pt-5">
                <button
                  onClick={() => updateStatus(selectedHotel.id, 'ACTIVE')}
                  className="rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
                >
                  Reactivate Hotel
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SuperAdminHotels;
