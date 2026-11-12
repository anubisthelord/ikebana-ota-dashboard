
import React, { useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  BedDouble,
  Plus,
  Search,
  Users,
  IndianRupee,
  Building2,
  SlidersHorizontal,
} from 'lucide-react';

type RoomStatus = 'ACTIVE' | 'INACTIVE';

interface RoomType {
  id: string;
  name: string;
  hotelName: string;
  totalRooms: number;
  availableRooms: number;
  maxAdults: number;
  maxChildren: number;
  pricePerNight: number;
  status: RoomStatus;
}

const roomTypes: RoomType[] = [
  {
    id: 'RM-001',
    name: 'Deluxe King Room',
    hotelName: 'The Grand Heritage',
    totalRooms: 25,
    availableRooms: 12,
    maxAdults: 2,
    maxChildren: 1,
    pricePerNight: 4500,
    status: 'ACTIVE',
  },
  {
    id: 'RM-002',
    name: 'Executive Suite',
    hotelName: 'The Grand Heritage',
    totalRooms: 15,
    availableRooms: 8,
    maxAdults: 3,
    maxChildren: 2,
    pricePerNight: 8500,
    status: 'ACTIVE',
  },
  {
    id: 'RM-003',
    name: 'Standard Mountain View',
    hotelName: 'Mountain View Resort',
    totalRooms: 20,
    availableRooms: 6,
    maxAdults: 2,
    maxChildren: 1,
    pricePerNight: 3200,
    status: 'ACTIVE',
  },
  {
    id: 'RM-004',
    name: 'Premium Family Suite',
    hotelName: 'Mountain View Resort',
    totalRooms: 10,
    availableRooms: 0,
    maxAdults: 4,
    maxChildren: 2,
    pricePerNight: 7200,
    status: 'INACTIVE',
  },
  {
    id: 'RM-005',
    name: 'City Comfort Room',
    hotelName: 'The Urban Suites',
    totalRooms: 30,
    availableRooms: 18,
    maxAdults: 2,
    maxChildren: 0,
    pricePerNight: 2800,
    status: 'ACTIVE',
  },
];

const statusStyles: Record<RoomStatus, string> = {
  ACTIVE: 'bg-emerald-50 text-emerald-700',
  INACTIVE: 'bg-gray-100 text-gray-600',
};

const Rooms: React.FC = () => {
  const navigate = useNavigate();
  const { vendorId } = useParams<{ vendorId: string }>();

  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<'ALL' | RoomStatus>('ALL');

  const filteredRooms = useMemo(() => {
    const query = search.trim().toLowerCase();

    return roomTypes.filter((room) => {
      const matchesSearch =
        room.name.toLowerCase().includes(query) ||
        room.hotelName.toLowerCase().includes(query);

      const matchesStatus =
        statusFilter === 'ALL' || room.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [search, statusFilter]);

  const totalRooms = roomTypes.reduce((sum, room) => sum + room.totalRooms, 0);
  const availableRooms = roomTypes.reduce(
    (sum, room) => sum + room.availableRooms,
    0,
  );
  const activeTypes = roomTypes.filter((room) => room.status === 'ACTIVE').length;

  const handleAddRoom = () => {
    if (!vendorId) return;
    navigate(`/vendor/${vendorId}/rooms/new`);
  };

  return (
    <div className="mx-auto w-full max-w-[1400px] space-y-6 pb-8">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-gray-900">
            Room management
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage room types, pricing, occupancy, and inventory.
          </p>
        </div>

        <button
          type="button"
          onClick={handleAddRoom}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-gray-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800"
        >
          <Plus size={17} />
          Add room type
        </button>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-xl border border-gray-200 bg-white p-5">
          <div className="flex items-center justify-between text-sm text-gray-500">
            Total room types
            <BedDouble size={19} className="text-gray-400" />
          </div>
          <p className="mt-3 text-2xl font-semibold text-gray-900">
            {roomTypes.length}
          </p>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-5">
          <div className="text-sm text-gray-500">Total room inventory</div>
          <p className="mt-3 text-2xl font-semibold text-gray-900">
            {totalRooms}
          </p>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-5">
          <div className="text-sm text-gray-500">Available rooms</div>
          <p className="mt-3 text-2xl font-semibold text-gray-900">
            {availableRooms}
          </p>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-5">
          <div className="text-sm text-gray-500">Active room types</div>
          <p className="mt-3 text-2xl font-semibold text-gray-900">
            {activeTypes}
          </p>
        </div>
      </div>

      {/* Listing */}
      <section className="overflow-hidden rounded-xl border border-gray-200 bg-white">
        <div className="flex flex-col gap-3 border-b border-gray-200 p-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="font-semibold text-gray-900">All room types</h2>
            <p className="mt-1 text-xs text-gray-500">
              {filteredRooms.length} of {roomTypes.length} room types
            </p>
          </div>

          <div className="flex flex-col gap-2 sm:flex-row">
            <div className="relative">
              <Search
                size={16}
                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search rooms or hotels"
                className="h-10 w-full rounded-lg border border-gray-200 pl-9 pr-3 text-sm outline-none focus:border-gray-400 sm:w-64"
              />
            </div>

            <div className="relative">
              <SlidersHorizontal
                size={15}
                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <select
                value={statusFilter}
                onChange={(event) =>
                  setStatusFilter(event.target.value as 'ALL' | RoomStatus)
                }
                className="h-10 w-full appearance-none rounded-lg border border-gray-200 bg-white pl-9 pr-8 text-sm outline-none focus:border-gray-400 sm:w-40"
              >
                <option value="ALL">All statuses</option>
                <option value="ACTIVE">Active</option>
                <option value="INACTIVE">Inactive</option>
              </select>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px] text-left">
            <thead className="bg-gray-50">
              <tr className="text-xs font-medium uppercase tracking-wide text-gray-500">
                <th className="px-5 py-3">Room type</th>
                <th className="px-5 py-3">Hotel</th>
                <th className="px-5 py-3">Inventory</th>
                <th className="px-5 py-3">Occupancy</th>
                <th className="px-5 py-3">Price / night</th>
                <th className="px-5 py-3">Status</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {filteredRooms.map((room) => {
                const occupancy =
                  room.totalRooms > 0
                    ? Math.round(
                        ((room.totalRooms - room.availableRooms) /
                          room.totalRooms) *
                          100,
                      )
                    : 0;

                return (
                  <tr key={room.id} className="transition hover:bg-gray-50/70">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100 text-gray-500">
                          <BedDouble size={19} />
                        </div>
                        <div>
                        <button
  type="button"
  onClick={() =>
    vendorId &&
    navigate(`/vendor/${vendorId}/rooms/${room.id}`)
  }
  className="font-medium text-gray-900 transition hover:text-blue-600 cursor-pointer"
>
  {room.name}
</button>
                          <p className="mt-1 text-xs text-gray-400">
                            {room.id}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2 text-sm text-gray-700">
                        <Building2 size={15} className="text-gray-400" />
                        {room.hotelName}
                      </div>
                    </td>

                    <td className="px-5 py-4 text-sm text-gray-700">
                      <span className="font-medium">{room.availableRooms}</span>
                      <span className="text-gray-400"> / {room.totalRooms}</span>
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2">
                        <div className="h-1.5 w-20 overflow-hidden rounded-full bg-gray-100">
                          <div
                            className="h-full rounded-full bg-gray-700"
                            style={{ width: `${occupancy}%` }}
                          />
                        </div>
                        <span className="text-xs text-gray-600">
                          {occupancy}%
                        </span>
                      </div>
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex items-center gap-1 text-sm font-medium text-gray-900">
                        <IndianRupee size={14} />
                        {room.pricePerNight.toLocaleString('en-IN')}
                      </div>
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2">
                        <span
                          className={`rounded-full px-2.5 py-1 text-xs font-medium ${statusStyles[room.status]}`}
                        >
                          {room.status.charAt(0) +
                            room.status.slice(1).toLowerCase()}
                        </span>
                        <span className="hidden items-center gap-1 text-xs text-gray-400 xl:inline-flex">
                          <Users size={13} />
                          {room.maxAdults} adults
                        </span>
                      </div>
                    </td>
                  </tr>
                );
              })}

              {filteredRooms.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-5 py-14 text-center">
                    <BedDouble size={28} className="mx-auto text-gray-300" />
                    <p className="mt-3 text-sm font-medium text-gray-700">
                      No room types found
                    </p>
                    <p className="mt-1 text-xs text-gray-500">
                      Try another search or filter.
                    </p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      <p className="text-xs text-gray-400">
        Sample room inventory for UI development. Backend integration is not
        connected yet.
      </p>
    </div>
  );
};

export default Rooms;
