
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  ArrowLeft,
  BedDouble,
  Building2,
  CheckCircle2,
  Edit3,
  IndianRupee,
  MapPin,
  Users,
  Wifi,
  Wind,
  Tv,
  Coffee,
  Bath,
  BriefcaseBusiness,
} from 'lucide-react';

const roomRecords = [
  {
    id: 'RM-001',
    name: 'Deluxe King Room',
    hotelId: 'HTL-001',
    hotel: 'The Grand Heritage',
    location: 'Jaipur, Rajasthan',
    description:
      'A spacious and comfortable room designed for guests who value relaxation and convenience. Features a king-size bed and modern amenities.',
    totalRooms: 25,
    availableRooms: 12,
    maxAdults: 2,
    maxChildren: 1,
    bedType: 'King',
    bedCount: 1,
    roomSize: 350,
    price: 4500,
    extraGuestPrice: 800,
    status: 'ACTIVE',
    amenities: [
      'Free Wi-Fi',
      'Air Conditioning',
      'Television',
      'Mini Bar',
      'Room Service',
      'Private Bathroom',
      'Coffee Maker',
      'Safe',
    ],
  },
  {
    id: 'RM-002',
    name: 'Executive Suite',
    hotelId: 'HTL-001',
    hotel: 'The Grand Heritage',
    location: 'Jaipur, Rajasthan',
    description:
      'An elegant executive suite with additional space, premium furnishings and enhanced guest comfort.',
    totalRooms: 15,
    availableRooms: 8,
    maxAdults: 3,
    maxChildren: 2,
    bedType: 'King',
    bedCount: 1,
    roomSize: 520,
    price: 8500,
    extraGuestPrice: 1200,
    status: 'ACTIVE',
    amenities: [
      'Free Wi-Fi',
      'Air Conditioning',
      'Television',
      'Mini Bar',
      'Balcony',
      'Work Desk',
      'Bathtub',
      'Safe',
    ],
  },
  {
    id: 'RM-003',
    name: 'Standard Mountain View',
    hotelId: 'HTL-002',
    hotel: 'Mountain View Resort',
    location: 'Manali, Himachal Pradesh',
    description:
      'A comfortable room offering beautiful mountain surroundings and essential modern facilities.',
    totalRooms: 20,
    availableRooms: 6,
    maxAdults: 2,
    maxChildren: 1,
    bedType: 'Queen',
    bedCount: 1,
    roomSize: 320,
    price: 3200,
    extraGuestPrice: 600,
    status: 'ACTIVE',
    amenities: [
      'Free Wi-Fi',
      'Air Conditioning',
      'Television',
      'Balcony',
      'Private Bathroom',
      'Mountain View',
    ],
  },
  {
    id: 'RM-004',
    name: 'Premium Family Suite',
    hotelId: 'HTL-002',
    hotel: 'Mountain View Resort',
    location: 'Manali, Himachal Pradesh',
    description:
      'A larger family-oriented suite with additional sleeping capacity and comfortable shared space.',
    totalRooms: 10,
    availableRooms: 0,
    maxAdults: 4,
    maxChildren: 2,
    bedType: 'King + Single',
    bedCount: 2,
    roomSize: 650,
    price: 7200,
    extraGuestPrice: 1000,
    status: 'INACTIVE',
    amenities: [
      'Free Wi-Fi',
      'Television',
      'Mini Bar',
      'Room Service',
      'Balcony',
      'Private Bathroom',
    ],
  },
  {
    id: 'RM-005',
    name: 'City Comfort Room',
    hotelId: 'HTL-003',
    hotel: 'The Urban Suites',
    location: 'New Delhi, India',
    description:
      'A practical and modern room suitable for business and leisure travellers.',
    totalRooms: 30,
    availableRooms: 18,
    maxAdults: 2,
    maxChildren: 0,
    bedType: 'Queen',
    bedCount: 1,
    roomSize: 290,
    price: 2800,
    extraGuestPrice: 500,
    status: 'ACTIVE',
    amenities: [
      'Free Wi-Fi',
      'Air Conditioning',
      'Television',
      'Work Desk',
      'Coffee Maker',
      'Private Bathroom',
    ],
  },
];



const amenityIcons: Record<string, React.ReactNode> = {
  'Free Wi-Fi': <Wifi size={17} />,
  'Air Conditioning': <Wind size={17} />,
  Television: <Tv size={17} />,
  'Mini Bar': <Coffee size={17} />,
  'Coffee Maker': <Coffee size={17} />,
  'Private Bathroom': <Bath size={17} />,
  'Work Desk': <BriefcaseBusiness size={17} />,
};

const RoomDetails: React.FC = () => {
  const navigate = useNavigate();
  const { vendorId, roomId } = useParams<{
    vendorId: string;
    roomId: string;
  }>();

  const room = roomRecords.find((item) => item.id === roomId);

  const goBack = () => {
    navigate(vendorId ? `/vendor/${vendorId}/rooms` : '/');
  };

  const handleEdit = () => {
    if (!vendorId || !roomId) return;
    navigate(`/vendor/${vendorId}/rooms/${roomId}/edit`);
  };

  if (!room) {
    return (
      <div className="mx-auto max-w-5xl rounded-xl border border-gray-200 bg-white p-8 text-center">
        <BedDouble className="mx-auto mb-3 text-gray-400" size={32} />
        <h2 className="text-lg font-semibold text-gray-900">
          Room type not found
        </h2>
        <p className="mt-1 text-sm text-gray-500">
          The room type you're looking for does not exist.
        </p>
        <button
          onClick={goBack}
          className="mt-5 rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white"
        >
          Back to Rooms
        </button>
      </div>
    );
  }

  const occupiedRooms = room.totalRooms - room.availableRooms;
  const occupancy = room.totalRooms
    ? Math.round((occupiedRooms / room.totalRooms) * 100)
    : 0;

  const stats = [
    {
      label: 'Total Rooms',
      value: room.totalRooms,
      icon: Building2,
    },
    {
      label: 'Available Rooms',
      value: room.availableRooms,
      icon: CheckCircle2,
    },
    {
      label: 'Occupied Rooms',
      value: occupiedRooms,
      icon: Users,
    },
    {
      label: 'Maximum Guests',
      value: `${room.maxAdults + room.maxChildren}`,
      icon: Users,
    },
  ];

  return (
    <div className="mx-auto max-w-6xl space-y-6 pb-10">
      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <button
            type="button"
            onClick={goBack}
            className="mb-3 inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900"
          >
            <ArrowLeft size={16} />
            Back to Rooms
          </button>

          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-2xl font-semibold tracking-tight text-gray-900">
              {room.name}
            </h1>
            <span
              className={`rounded-full px-3 py-1 text-xs font-medium ${
                room.status === 'ACTIVE'
                  ? 'bg-green-50 text-green-700'
                  : 'bg-gray-100 text-gray-600'
              }`}
            >
              {room.status === 'ACTIVE' ? 'Active' : 'Inactive'}
            </span>
          </div>

          <p className="mt-2 text-sm text-gray-500">
            Room ID: {room.id}
          </p>
        </div>

        <button
          type="button"
          onClick={handleEdit}
          className="inline-flex items-center gap-2 rounded-lg bg-gray-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800"
        >
          <Edit3 size={16} />
          Edit Room
        </button>
      </div>

      {/* Hotel information */}
      <section className="rounded-xl border border-gray-200 bg-white p-5 sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-gray-100 text-gray-600">
              <Building2 size={21} />
            </div>
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                Property
              </p>
              <h2 className="mt-1 font-semibold text-gray-900">
                {room.hotel}
              </h2>
              <p className="mt-1 flex items-center gap-1.5 text-sm text-gray-500">
                <MapPin size={14} />
                {room.location}
              </p>
            </div>
          </div>

          <span className="rounded-lg border border-gray-200 px-3 py-2 text-xs text-gray-500">
            {room.hotelId}
          </span>
        </div>
      </section>

      {/* Inventory statistics */}
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.label}
              className="rounded-xl border border-gray-200 bg-white p-5"
            >
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-500">{stat.label}</p>
                <Icon size={18} className="text-gray-400" />
              </div>
              <p className="mt-3 text-2xl font-semibold text-gray-900">
                {stat.value}
              </p>
            </div>
          );
        })}
      </section>

      {/* Inventory utilization */}
      <section className="rounded-xl border border-gray-200 bg-white p-5 sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="font-semibold text-gray-900">
              Inventory Utilization
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Current room occupancy overview.
            </p>
          </div>
          <p className="text-xl font-semibold text-gray-900">
            {occupancy}%
          </p>
        </div>

        <div className="mt-5 h-2.5 overflow-hidden rounded-full bg-gray-100">
          <div
            className="h-full rounded-full bg-gray-800 transition-all"
            style={{ width: `${occupancy}%` }}
          />
        </div>

        <div className="mt-3 flex justify-between text-xs text-gray-500">
          <span>{occupiedRooms} occupied</span>
          <span>{room.availableRooms} available</span>
        </div>
      </section>

      {/* Room configuration */}
      <section className="rounded-xl border border-gray-200 bg-white p-5 sm:p-6">
        <div className="mb-5">
          <h2 className="font-semibold text-gray-900">
            Room Configuration
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Room layout, bed details and guest capacity.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-5 sm:grid-cols-4">
          <div>
            <p className="text-xs text-gray-500">Bed Type</p>
            <p className="mt-1 flex items-center gap-2 text-sm font-medium text-gray-900">
              <BedDouble size={16} className="text-gray-400" />
              {room.bedType}
            </p>
          </div>

          <div>
            <p className="text-xs text-gray-500">Number of Beds</p>
            <p className="mt-1 text-sm font-medium text-gray-900">
              {room.bedCount}
            </p>
          </div>

          <div>
            <p className="text-xs text-gray-500">Room Size</p>
            <p className="mt-1 text-sm font-medium text-gray-900">
              {room.roomSize} sq. ft.
            </p>
          </div>

          <div>
            <p className="text-xs text-gray-500">Maximum Adults</p>
            <p className="mt-1 text-sm font-medium text-gray-900">
              {room.maxAdults}
            </p>
          </div>

          <div>
            <p className="text-xs text-gray-500">Maximum Children</p>
            <p className="mt-1 text-sm font-medium text-gray-900">
              {room.maxChildren}
            </p>
          </div>

          <div>
            <p className="text-xs text-gray-500">Total Capacity</p>
            <p className="mt-1 text-sm font-medium text-gray-900">
              {room.maxAdults + room.maxChildren} guests
            </p>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="rounded-xl border border-gray-200 bg-white p-5 sm:p-6">
        <div className="mb-5">
          <h2 className="font-semibold text-gray-900">
            Pricing Information
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Base room rates and additional guest charges.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div className="rounded-lg bg-gray-50 p-4">
            <p className="text-sm text-gray-500">Base Price Per Night</p>
            <p className="mt-2 flex items-center gap-1 text-2xl font-semibold text-gray-900">
              <IndianRupee size={20} />
              {room.price.toLocaleString('en-IN')}
            </p>
          </div>

          <div className="rounded-lg bg-gray-50 p-4">
            <p className="text-sm text-gray-500">
              Extra Guest Price Per Night
            </p>
            <p className="mt-2 flex items-center gap-1 text-2xl font-semibold text-gray-900">
              <IndianRupee size={20} />
              {room.extraGuestPrice.toLocaleString('en-IN')}
            </p>
          </div>
        </div>
      </section>

      {/* Description */}
      <section className="rounded-xl border border-gray-200 bg-white p-5 sm:p-6">
        <h2 className="font-semibold text-gray-900">Room Description</h2>
        <p className="mt-3 text-sm leading-7 text-gray-600">
          {room.description}
        </p>
      </section>

      {/* Amenities */}
      <section className="rounded-xl border border-gray-200 bg-white p-5 sm:p-6">
        <div className="mb-5">
          <h2 className="font-semibold text-gray-900">Room Amenities</h2>
          <p className="mt-1 text-sm text-gray-500">
            Facilities included with this room type.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {room.amenities.map((amenity) => (
            <div
              key={amenity}
              className="flex items-center gap-2.5 rounded-lg border border-gray-100 p-3 text-sm text-gray-700"
            >
              <span className="text-gray-400">
                {amenityIcons[amenity] || <CheckCircle2 size={17} />}
              </span>
              {amenity}
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <div className="flex flex-wrap justify-between gap-3">
        <button
          type="button"
          onClick={goBack}
          className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          <ArrowLeft size={16} />
          Back to Rooms
        </button>

        <button
          type="button"
          onClick={handleEdit}
          className="inline-flex items-center gap-2 rounded-lg bg-gray-900 px-4 py-2.5 text-sm font-medium text-white hover:bg-gray-800"
        >
          <Edit3 size={16} />
          Edit Room
        </button>
      </div>
    </div>
  );
};

export default RoomDetails;
