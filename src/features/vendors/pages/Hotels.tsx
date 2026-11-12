
import React, { useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
    Building2,
    MapPin,
    BedDouble,
    Search,
    Plus,
    SlidersHorizontal,
} from 'lucide-react';

type HotelStatus = 'ACTIVE' | 'PENDING' | 'INACTIVE';

interface Hotel {
    id: string;
    name: string;
    location: string;
    rooms: number;
    bookings: number;
    status: HotelStatus;
    createdAt: string;
}

const hotels: Hotel[] = [
    {
        id: 'HTL-001',
        name: 'The Grand Heritage',
        location: 'Jaipur, Rajasthan',
        rooms: 85,
        bookings: 342,
        status: 'ACTIVE',
        createdAt: '12 Oct 2026',
    },
    {
        id: 'HTL-002',
        name: 'Mountain View Resort',
        location: 'Manali, Himachal Pradesh',
        rooms: 42,
        bookings: 186,
        status: 'ACTIVE',
        createdAt: '18 Oct 2026',
    },
    {
        id: 'HTL-003',
        name: 'The Urban Suites',
        location: 'New Delhi, India',
        rooms: 64,
        bookings: 0,
        status: 'PENDING',
        createdAt: '02 Nov 2026',
    },
    {
        id: 'HTL-004',
        name: 'Coastal Breeze Hotel',
        location: 'Goa, India',
        rooms: 38,
        bookings: 94,
        status: 'INACTIVE',
        createdAt: '05 Nov 2026',
    },
];

const statusStyles: Record<HotelStatus, string> = {
    ACTIVE: 'bg-emerald-50 text-emerald-700 ring-emerald-600/20',
    PENDING: 'bg-amber-50 text-amber-700 ring-amber-600/20',
    INACTIVE: 'bg-gray-100 text-gray-600 ring-gray-500/20',
};

const Hotels: React.FC = () => {
    const navigate = useNavigate();
    const { vendorId } = useParams<{ vendorId: string }>();

    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState<'ALL' | HotelStatus>('ALL');

    const filteredHotels = useMemo(() => {
        const query = search.trim().toLowerCase();

        return hotels.filter((hotel) => {
            const matchesSearch =
                hotel.name.toLowerCase().includes(query) ||
                hotel.location.toLowerCase().includes(query);

            const matchesStatus =
                statusFilter === 'ALL' || hotel.status === statusFilter;

            return matchesSearch && matchesStatus;
        });
    }, [search, statusFilter]);

    const activeCount = hotels.filter((hotel) => hotel.status === 'ACTIVE').length;
    const pendingCount = hotels.filter((hotel) => hotel.status === 'PENDING').length;
    const totalRooms = hotels.reduce((total, hotel) => total + hotel.rooms, 0);

    const handleAddHotel = () => {
        if (!vendorId) return;
        navigate(`/vendor/${vendorId}/hotels/new`);
    };

    return (
        <div className="mx-auto w-full max-w-[1400px] space-y-6">
            {/* Page heading */}
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                <div>
                    <h1 className="text-2xl font-semibold tracking-tight text-gray-900">
                        Hotels
                    </h1>
                    <p className="mt-1 text-sm text-gray-500">
                        Manage your properties, inventory, and hotel information.
                    </p>
                </div>

                <button
                    type="button"
                    onClick={handleAddHotel}
                    className="inline-flex items-center justify-center gap-2 rounded-lg bg-gray-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800"
                >
                    <Plus size={17} />
                    Add Hotel
                </button>
            </div>

            {/* Summary cards */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                <div className="rounded-xl border border-gray-200 bg-white p-5">
                    <div className="flex items-center justify-between">
                        <p className="text-sm text-gray-500">Total hotels</p>
                        <Building2 size={19} className="text-gray-400" />
                    </div>
                    <p className="mt-3 text-2xl font-semibold text-gray-900">
                        {hotels.length}
                    </p>
                    <p className="mt-1 text-xs text-gray-500">Across your portfolio</p>
                </div>

                <div className="rounded-xl border border-gray-200 bg-white p-5">
                    <div className="flex items-center justify-between">
                        <p className="text-sm text-gray-500">Active properties</p>
                        <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
                    </div>
                    <p className="mt-3 text-2xl font-semibold text-gray-900">
                        {activeCount}
                    </p>
                    <p className="mt-1 text-xs text-gray-500">Currently active</p>
                </div>

                <div className="rounded-xl border border-gray-200 bg-white p-5">
                    <div className="flex items-center justify-between">
                        <p className="text-sm text-gray-500">Pending approval</p>
                        <span className="h-2.5 w-2.5 rounded-full bg-amber-500" />
                    </div>
                    <p className="mt-3 text-2xl font-semibold text-gray-900">
                        {pendingCount}
                    </p>
                    <p className="mt-1 text-xs text-gray-500">Awaiting review</p>
                </div>

                <div className="rounded-xl border border-gray-200 bg-white p-5">
                    <div className="flex items-center justify-between">
                        <p className="text-sm text-gray-500">Total rooms</p>
                        <BedDouble size={19} className="text-gray-400" />
                    </div>
                    <p className="mt-3 text-2xl font-semibold text-gray-900">
                        {totalRooms.toLocaleString()}
                    </p>
                    <p className="mt-1 text-xs text-gray-500">Across all properties</p>
                </div>
            </div>

            {/* Hotel listing */}
            <section className="overflow-hidden rounded-xl border border-gray-200 bg-white">
                <div className="flex flex-col gap-3 border-b border-gray-200 p-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h2 className="font-semibold text-gray-900">All properties</h2>
                        <p className="mt-1 text-xs text-gray-500">
                            {filteredHotels.length} of {hotels.length} properties
                        </p>
                    </div>

                    <div className="flex flex-col gap-2 sm:flex-row">
                        <div className="relative">
                            <Search
                                size={17}
                                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                            />
                            <input
                                type="search"
                                value={search}
                                onChange={(event) => setSearch(event.target.value)}
                                placeholder="Search hotels or locations"
                                className="h-10 w-full rounded-lg border border-gray-200 bg-white pl-9 pr-3 text-sm text-gray-700 outline-none transition placeholder:text-gray-400 focus:border-gray-400 sm:w-64"
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
                                    setStatusFilter(event.target.value as 'ALL' | HotelStatus)
                                }
                                className="h-10 w-full appearance-none rounded-lg border border-gray-200 bg-white pl-9 pr-8 text-sm text-gray-700 outline-none transition focus:border-gray-400 sm:w-40"
                            >
                                <option value="ALL">All statuses</option>
                                <option value="ACTIVE">Active</option>
                                <option value="PENDING">Pending</option>
                                <option value="INACTIVE">Inactive</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full min-w-[760px] text-left">
                        <thead className="bg-gray-50">
                            <tr className="text-xs font-medium uppercase tracking-wide text-gray-500">
                                <th className="px-5 py-3">Hotel</th>
                                <th className="px-5 py-3">Rooms</th>
                                <th className="px-5 py-3">Bookings</th>
                                <th className="px-5 py-3">Status</th>
                                <th className="px-5 py-3">Added</th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-gray-100">
                            {filteredHotels.map((hotel) => (
                                <tr key={hotel.id} className="transition hover:bg-gray-50/70">
                                    <td className="px-5 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gray-100 text-gray-500">
                                                <Building2 size={19} />
                                            </div>
                                            <div>
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        vendorId && navigate(`/vendor/${vendorId}/hotels/${hotel.id}`)
                                                    }
                                                    className="text-left text-sm font-medium text-gray-900 transition hover:text-blue-600 cursor-pointer"
                                                >
                                                    {hotel.name}
                                                </button>
                                                <p className="mt-1 flex items-center gap-1 text-xs text-gray-500">
                                                    <MapPin size={12} />
                                                    {hotel.location}
                                                </p>
                                            </div>
                                        </div>
                                    </td>

                                    <td className="px-5 py-4 text-sm text-gray-700">
                                        {hotel.rooms}
                                    </td>

                                    <td className="px-5 py-4 text-sm text-gray-700">
                                        {hotel.bookings.toLocaleString()}
                                    </td>

                                    <td className="px-5 py-4">
                                        <span
                                            className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset ${statusStyles[hotel.status]}`}
                                        >
                                            {hotel.status.charAt(0) +
                                                hotel.status.slice(1).toLowerCase()}
                                        </span>
                                    </td>

                                    <td className="px-5 py-4 text-sm text-gray-500">
                                        {hotel.createdAt}
                                    </td>
                                </tr>
                            ))}

                            {filteredHotels.length === 0 && (
                                <tr>
                                    <td colSpan={5} className="px-5 py-14 text-center">
                                        <Building2
                                            size={28}
                                            className="mx-auto text-gray-300"
                                        />
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
            </section>

            <p className="text-xs text-gray-400">
                Sample hotel data for UI development. This page is not connected to the
                backend yet.
            </p>
        </div>
    );
};

export default Hotels;
