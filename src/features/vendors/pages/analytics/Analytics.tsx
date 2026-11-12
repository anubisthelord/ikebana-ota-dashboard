
import React, { useMemo, useState } from 'react';
import {
 
  CalendarDays,
  IndianRupee,
  Hotel,
  Users,
  ArrowUpRight,
  ArrowDownRight,
  Download,
  ChevronDown,
  BedDouble,
  CheckCircle2,
  XCircle,
} from 'lucide-react';

type Period = '7D' | '30D' | '90D' | '12M';

const revenueData: Record<Period, { label: string; revenue: number; bookings: number }[]> = {
  '7D': [
    { label: 'Mon', revenue: 18000, bookings: 5 },
    { label: 'Tue', revenue: 24000, bookings: 7 },
    { label: 'Wed', revenue: 21000, bookings: 6 },
    { label: 'Thu', revenue: 32000, bookings: 9 },
    { label: 'Fri', revenue: 28000, bookings: 8 },
    { label: 'Sat', revenue: 42000, bookings: 13 },
    { label: 'Sun', revenue: 36000, bookings: 11 },
  ],
  '30D': [
    { label: 'Week 1', revenue: 125000, bookings: 32 },
    { label: 'Week 2', revenue: 148000, bookings: 38 },
    { label: 'Week 3', revenue: 132000, bookings: 35 },
    { label: 'Week 4', revenue: 185000, bookings: 49 },
  ],
  '90D': [
    { label: 'Sep 1', revenue: 320000, bookings: 82 },
    { label: 'Sep 15', revenue: 365000, bookings: 91 },
    { label: 'Oct 1', revenue: 410000, bookings: 105 },
    { label: 'Oct 15', revenue: 390000, bookings: 98 },
    { label: 'Nov 1', revenue: 490000, bookings: 126 },
    { label: 'Nov 15', revenue: 520000, bookings: 134 },
  ],
  '12M': [
    { label: 'Jan', revenue: 280000, bookings: 72 },
    { label: 'Feb', revenue: 310000, bookings: 81 },
    { label: 'Mar', revenue: 350000, bookings: 90 },
    { label: 'Apr', revenue: 325000, bookings: 84 },
    { label: 'May', revenue: 390000, bookings: 102 },
    { label: 'Jun', revenue: 420000, bookings: 110 },
    { label: 'Jul', revenue: 460000, bookings: 119 },
    { label: 'Aug', revenue: 435000, bookings: 113 },
    { label: 'Sep', revenue: 490000, bookings: 126 },
    { label: 'Oct', revenue: 520000, bookings: 134 },
    { label: 'Nov', revenue: 550000, bookings: 142 },
    { label: 'Dec', revenue: 590000, bookings: 153 },
  ],
};

const hotelPerformance = [
  {
    name: 'The Grand Heritage',
    location: 'Jaipur, Rajasthan',
    bookings: 342,
    revenue: 1545000,
    occupancy: 82,
  },
  {
    name: 'Mountain View Resort',
    location: 'Manali, Himachal Pradesh',
    bookings: 186,
    revenue: 892000,
    occupancy: 74,
  },
  {
    name: 'The Urban Suites',
    location: 'New Delhi',
    bookings: 94,
    revenue: 478000,
    occupancy: 61,
  },
  {
    name: 'Coastal Breeze Hotel',
    location: 'Goa',
    bookings: 128,
    revenue: 735000,
    occupancy: 68,
  },
];

const bookingStatusData = [
  { label: 'Confirmed', value: 58, color: 'bg-emerald-500' },
  { label: 'Pending', value: 18, color: 'bg-amber-400' },
  { label: 'Cancelled', value: 14, color: 'bg-red-400' },
  { label: 'Completed', value: 10, color: 'bg-gray-400' },
];

const formatCurrency = (value: number) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(value);

const formatCompactCurrency = (value: number) => {
  if (value >= 100000) {
    return `₹${(value / 100000).toFixed(1)}L`;
  }

  if (value >= 1000) {
    return `₹${(value / 1000).toFixed(0)}K`;
  }

  return `₹${value}`;
};

const Analytics: React.FC = () => {
  const [period, setPeriod] = useState<Period>('30D');
  const [selectedHotel, setSelectedHotel] = useState('ALL');

  const chartData = revenueData[period];

  const maxRevenue = Math.max(...chartData.map((item) => item.revenue));

  const filteredHotels = useMemo(() => {
    return selectedHotel === 'ALL'
      ? hotelPerformance
      : hotelPerformance.filter((hotel) => hotel.name === selectedHotel);
  }, [selectedHotel]);

  const totalRevenue = filteredHotels.reduce(
    (sum, hotel) => sum + hotel.revenue,
    0
  );

  const totalBookings = filteredHotels.reduce(
    (sum, hotel) => sum + hotel.bookings,
    0
  );

  const averageOccupancy =
    filteredHotels.length > 0
      ? Math.round(
          filteredHotels.reduce((sum, hotel) => sum + hotel.occupancy, 0) /
            filteredHotels.length
        )
      : 0;

  const handleExport = () => {
    const rows = [
      ['Hotel', 'Location', 'Bookings', 'Revenue', 'Occupancy'],
      ...filteredHotels.map((hotel) => [
        hotel.name,
        hotel.location,
        String(hotel.bookings),
        String(hotel.revenue),
        `${hotel.occupancy}%`,
      ]),
    ];

    const csv = rows
      .map((row) =>
        row.map((value) => `"${value.replace(/"/g, '""')}"`).join(',')
      )
      .join('\n');

    const blob = new Blob([csv], {
      type: 'text/csv;charset=utf-8;',
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'ikebana-vendor-analytics.csv';
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">
            Analytics
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Track your property performance, revenue and booking trends.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="relative">
            <select
              value={selectedHotel}
              onChange={(event) => setSelectedHotel(event.target.value)}
              className="appearance-none bg-white border border-gray-200 rounded-lg px-3 py-2.5 pr-9 text-sm text-gray-700 outline-none"
            >
              <option value="ALL">All properties</option>
              {hotelPerformance.map((hotel) => (
                <option key={hotel.name} value={hotel.name}>
                  {hotel.name}
                </option>
              ))}
            </select>
            <ChevronDown
              size={15}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
            />
          </div>

          <button
            onClick={handleExport}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            <Download size={16} />
            Export CSV
          </button>
        </div>
      </div>

      {/* KPI cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {[
          {
            label: 'Total Revenue',
            value: formatCompactCurrency(totalRevenue),
            change: '+12.8%',
            positive: true,
            icon: IndianRupee,
          },
          {
            label: 'Total Bookings',
            value: totalBookings.toLocaleString('en-IN'),
            change: '+8.4%',
            positive: true,
            icon: CalendarDays,
          },
          {
            label: 'Average Occupancy',
            value: `${averageOccupancy}%`,
            change: '+5.2%',
            positive: true,
            icon: Hotel,
          },
          {
            label: 'Average Booking Value',
            value: formatCompactCurrency(
              totalBookings ? totalRevenue / totalBookings : 0
            ),
            change: '-2.1%',
            positive: false,
            icon: IndianRupee,
          },
        ].map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.label}
              className="bg-white border border-gray-100 rounded-xl p-5"
            >
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-500">{stat.label}</p>
                <div className="h-9 w-9 rounded-lg bg-gray-50 flex items-center justify-center">
                  <Icon size={18} className="text-gray-500" />
                </div>
              </div>

              <p className="text-2xl font-semibold text-gray-900 mt-3">
                {stat.value}
              </p>

              <div className="flex items-center gap-1 mt-2">
                {stat.positive ? (
                  <ArrowUpRight size={14} className="text-emerald-600" />
                ) : (
                  <ArrowDownRight size={14} className="text-red-500" />
                )}
                <span
                  className={`text-xs font-medium ${
                    stat.positive ? 'text-emerald-600' : 'text-red-500'
                  }`}
                >
                  {stat.change}
                </span>
                <span className="text-xs text-gray-400">
                  vs previous period
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Revenue chart */}
      <div className="bg-white border border-gray-100 rounded-xl p-5">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-base font-semibold text-gray-900">
              Revenue overview
            </h2>
            <p className="text-xs text-gray-500 mt-1">
              Revenue performance over time
            </p>
          </div>

          <div className="flex items-center gap-1 bg-gray-50 rounded-lg p-1">
            {(['7D', '30D', '90D', '12M'] as Period[]).map((item) => (
              <button
                key={item}
                onClick={() => setPeriod(item)}
                className={`px-3 py-1.5 rounded-md text-xs font-medium transition ${
                  period === item
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-500 hover:text-gray-800'
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-8">
          <div className="flex items-end justify-between gap-3 h-64 border-b border-gray-100 pb-2">
            {chartData.map((item) => {
              const height = (item.revenue / maxRevenue) * 100;

              return (
                <div
                  key={item.label}
                  className="flex-1 h-full flex flex-col justify-end items-center gap-2 group"
                >
                  <div className="text-xs text-gray-500 opacity-0 group-hover:opacity-100 transition">
                    {formatCompactCurrency(item.revenue)}
                  </div>
                  <div
                    className="w-full max-w-14 rounded-t-md bg-gray-800 hover:bg-gray-600 transition relative"
                    style={{ height: `${height}%` }}
                    title={`${item.label}: ${formatCurrency(item.revenue)}`}
                  />
                  <span className="text-[11px] text-gray-400 whitespace-nowrap">
                    {item.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Secondary analytics */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Booking status */}
        <div className="bg-white border border-gray-100 rounded-xl p-5">
          <div>
            <h2 className="text-base font-semibold text-gray-900">
              Booking status
            </h2>
            <p className="text-xs text-gray-500 mt-1">
              Booking distribution by status
            </p>
          </div>

          <div className="flex h-3 overflow-hidden rounded-full mt-7">
            {bookingStatusData.map((item) => (
              <div
                key={item.label}
                className={item.color}
                style={{ width: `${item.value}%` }}
                title={`${item.label}: ${item.value}%`}
              />
            ))}
          </div>

          <div className="space-y-4 mt-6">
            {bookingStatusData.map((item) => (
              <div
                key={item.label}
                className="flex items-center justify-between"
              >
                <div className="flex items-center gap-2">
                  <span className={`h-2.5 w-2.5 rounded-full ${item.color}`} />
                  <span className="text-sm text-gray-600">{item.label}</span>
                </div>
                <span className="text-sm font-semibold text-gray-800">
                  {item.value}%
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Booking trends */}
        <div className="bg-white border border-gray-100 rounded-xl p-5 xl:col-span-2">
          <div>
            <h2 className="text-base font-semibold text-gray-900">
              Booking insights
            </h2>
            <p className="text-xs text-gray-500 mt-1">
              Key operational indicators
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-7">
            <div className="flex items-start gap-3">
              <div className="h-10 w-10 rounded-lg bg-emerald-50 flex items-center justify-center">
                <CheckCircle2 size={19} className="text-emerald-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Confirmation rate</p>
                <p className="text-xl font-semibold text-gray-900 mt-1">
                  86.4%
                </p>
                <p className="text-xs text-emerald-600 mt-1">
                  +4.2% from last period
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="h-10 w-10 rounded-lg bg-red-50 flex items-center justify-center">
                <XCircle size={19} className="text-red-500" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Cancellation rate</p>
                <p className="text-xl font-semibold text-gray-900 mt-1">
                  8.6%
                </p>
                <p className="text-xs text-emerald-600 mt-1">
                  -1.8% from last period
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="h-10 w-10 rounded-lg bg-blue-50 flex items-center justify-center">
                <Users size={19} className="text-blue-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Average guests</p>
                <p className="text-xl font-semibold text-gray-900 mt-1">
                  2.4
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  Guests per reservation
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="h-10 w-10 rounded-lg bg-purple-50 flex items-center justify-center">
                <BedDouble size={19} className="text-purple-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Available room nights</p>
                <p className="text-xl font-semibold text-gray-900 mt-1">
                  428
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  Across all properties
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Hotel performance */}
      <div className="bg-white border border-gray-100 rounded-xl overflow-hidden">
        <div className="p-5 border-b border-gray-100">
          <h2 className="text-base font-semibold text-gray-900">
            Property performance
          </h2>
          <p className="text-xs text-gray-500 mt-1">
            Compare performance across your properties.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px] text-left">
            <thead className="bg-gray-50/70">
              <tr>
                {[
                  'Property',
                  'Bookings',
                  'Revenue',
                  'Occupancy',
                ].map((heading) => (
                  <th
                    key={heading}
                    className="px-5 py-3 text-xs font-medium text-gray-500"
                  >
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {filteredHotels.map((hotel) => (
                <tr key={hotel.name} className="hover:bg-gray-50/50">
                  <td className="px-5 py-4">
                    <p className="text-sm font-medium text-gray-900">
                      {hotel.name}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      {hotel.location}
                    </p>
                  </td>

                  <td className="px-5 py-4 text-sm text-gray-700">
                    {hotel.bookings}
                  </td>

                  <td className="px-5 py-4 text-sm font-medium text-gray-900">
                    {formatCurrency(hotel.revenue)}
                  </td>

                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-24 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gray-800 rounded-full"
                          style={{ width: `${hotel.occupancy}%` }}
                        />
                      </div>
                      <span className="text-sm text-gray-700">
                        {hotel.occupancy}%
                      </span>
                    </div>
                  </td>
                </tr>
              ))}

              {filteredHotels.length === 0 && (
                <tr>
                  <td
                    colSpan={4}
                    className="px-5 py-10 text-center text-sm text-gray-500"
                  >
                    No property data available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
