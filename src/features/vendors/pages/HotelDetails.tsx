
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  ArrowLeft,
  Building2,
  MapPin,
  BedDouble,
  CalendarCheck,
  Pencil,
  Phone,
  Mail,
  Globe,
  Wifi,
  Waves,
  Utensils,
  Car,
  Dumbbell,
  Sparkles,
} from 'lucide-react';

const hotelDetails = [
  {
    id: 'HTL-001',
    name: 'The Grand Heritage',
    location: 'Jaipur, Rajasthan',
    address: 'MI Road, Jaipur, Rajasthan, India',
    rooms: 85,
    bookings: 342,
    status: 'ACTIVE',
    rating: 5,
    email: 'contact@grandheritage.example',
    phone: '+91 98765 43210',
    website: 'https://example.com',
    description:
      'A premium heritage property offering comfortable accommodation and a memorable guest experience in the heart of Jaipur.',
    amenities: ['Free Wi-Fi', 'Swimming Pool', 'Restaurant', 'Parking', 'Gym', 'Spa'],
    createdAt: '12 October 2026',
  },
  {
    id: 'HTL-002',
    name: 'Mountain View Resort',
    location: 'Manali, Himachal Pradesh',
    address: 'Old Manali Road, Manali, Himachal Pradesh, India',
    rooms: 42,
    bookings: 186,
    status: 'ACTIVE',
    rating: 4,
    email: 'stay@mountainview.example',
    phone: '+91 98765 12345',
    website: 'https://example.com',
    description:
      'A mountain retreat with beautiful surroundings and comfortable rooms for travellers.',
    amenities: ['Free Wi-Fi', 'Restaurant', 'Parking', 'Room Service'],
    createdAt: '18 October 2026',
  },
  {
    id: 'HTL-003',
    name: 'The Urban Suites',
    location: 'New Delhi, India',
    address: 'Connaught Place, New Delhi, India',
    rooms: 64,
    bookings: 0,
    status: 'PENDING',
    rating: 3,
    email: 'hello@urbansuites.example',
    phone: '+91 98765 67890',
    website: 'https://example.com',
    description: 'Modern city accommodation designed for business and leisure guests.',
    amenities: ['Free Wi-Fi', 'Restaurant', 'Air Conditioning'],
    createdAt: '02 November 2026',
  },
  {
    id: 'HTL-004',
    name: 'Coastal Breeze Hotel',
    location: 'Goa, India',
    address: 'Calangute Beach Road, Goa, India',
    rooms: 38,
    bookings: 94,
    status: 'INACTIVE',
    rating: 4,
    email: 'info@coastalbreeze.example',
    phone: '+91 98765 98765',
    website: 'https://example.com',
    description: 'A relaxed coastal property close to popular beaches and attractions.',
    amenities: ['Free Wi-Fi', 'Swimming Pool', 'Restaurant', 'Parking'],
    createdAt: '05 November 2026',
  },
];

const statusStyles: Record<string, string> = {
  ACTIVE: 'bg-emerald-50 text-emerald-700',
  PENDING: 'bg-amber-50 text-amber-700',
  INACTIVE: 'bg-gray-100 text-gray-600',
};

const amenityIcons: Record<string, React.ReactNode> = {
  'Free Wi-Fi': <Wifi size={17} />,
  'Swimming Pool': <Waves size={17} />,
  Restaurant: <Utensils size={17} />,
  Parking: <Car size={17} />,
  Gym: <Dumbbell size={17} />,
  Spa: <Sparkles size={17} />,
};

const HotelDetails: React.FC = () => {
  const navigate = useNavigate();
  const { vendorId, hotelId } = useParams<{
    vendorId: string;
    hotelId: string;
  }>();

  const hotel = hotelDetails.find((item) => item.id === hotelId);

  const backToHotels = () => {
    if (vendorId) navigate(`/vendor/${vendorId}/hotels`);
  };

  if (!hotel) {
    return (
      <div className="space-y-4 py-12 text-center">
        <Building2 size={36} className="mx-auto text-gray-300" />
        <h2 className="text-lg font-semibold text-gray-900">
          Hotel not found
        </h2>
        <p className="text-sm text-gray-500">
          This hotel could not be found in the sample records.
        </p>
        <button
          onClick={backToHotels}
          className="text-sm font-medium text-gray-800 underline"
        >
          Back to hotels
        </button>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-[1200px] space-y-6 pb-8">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <button
            onClick={backToHotels}
            className="mb-3 inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900"
          >
            <ArrowLeft size={16} />
            Back to hotels
          </button>

          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-2xl font-semibold text-gray-900">
              {hotel.name}
            </h1>
            <span
              className={`rounded-full px-3 py-1 text-xs font-medium ${statusStyles[hotel.status]}`}
            >
              {hotel.status.charAt(0) + hotel.status.slice(1).toLowerCase()}
            </span>
          </div>

          <p className="mt-2 flex items-center gap-1.5 text-sm text-gray-500">
            <MapPin size={15} />
            {hotel.location}
          </p>
        </div>

        <button
          type="button"
          onClick={() =>
            vendorId &&
            navigate(`/vendor/${vendorId}/hotels/${hotel.id}/edit`)
          }
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-gray-900 px-4 py-2.5 text-sm font-medium text-white hover:bg-gray-800"
        >
          <Pencil size={16} />
          Edit hotel
        </button>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-gray-200 bg-white p-5">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <BedDouble size={17} />
            Total rooms
          </div>
          <p className="mt-3 text-2xl font-semibold text-gray-900">
            {hotel.rooms}
          </p>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-5">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <CalendarCheck size={17} />
            Total bookings
          </div>
          <p className="mt-3 text-2xl font-semibold text-gray-900">
            {hotel.bookings.toLocaleString()}
          </p>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-5">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Building2 size={17} />
            Star rating
          </div>
          <p className="mt-3 text-2xl font-semibold text-gray-900">
            {hotel.rating} / 5
          </p>
        </div>
      </div>

      {/* Property information */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        <section className="space-y-5 lg:col-span-2">
          <div className="rounded-xl border border-gray-200 bg-white">
            <div className="border-b border-gray-100 px-5 py-4">
              <h2 className="text-sm font-semibold text-gray-900">
                Property information
              </h2>
            </div>

            <div className="space-y-5 p-5">
              <div>
                <p className="text-xs text-gray-400">Description</p>
                <p className="mt-2 text-sm leading-6 text-gray-600">
                  {hotel.description}
                </p>
              </div>

              <div className="border-t border-gray-100 pt-5">
                <p className="text-xs text-gray-400">Full address</p>
                <p className="mt-2 flex items-start gap-2 text-sm text-gray-700">
                  <MapPin size={16} className="mt-0.5 shrink-0 text-gray-400" />
                  {hotel.address}
                </p>
              </div>

              <div className="border-t border-gray-100 pt-5">
                <p className="mb-3 text-xs text-gray-400">Amenities</p>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {hotel.amenities.map((amenity) => (
                    <div
                      key={amenity}
                      className="flex items-center gap-2 text-sm text-gray-600"
                    >
                      <span className="text-gray-400">
                        {amenityIcons[amenity] || <Sparkles size={17} />}
                      </span>
                      {amenity}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact details */}
        <aside className="h-fit rounded-xl border border-gray-200 bg-white">
          <div className="border-b border-gray-100 px-5 py-4">
            <h2 className="text-sm font-semibold text-gray-900">
              Contact details
            </h2>
          </div>

          <div className="space-y-5 p-5">
            <div>
              <p className="text-xs text-gray-400">Email address</p>
              <p className="mt-1 flex items-center gap-2 break-all text-sm text-gray-700">
                <Mail size={15} className="shrink-0 text-gray-400" />
                {hotel.email}
              </p>
            </div>

            <div>
              <p className="text-xs text-gray-400">Phone number</p>
              <p className="mt-1 flex items-center gap-2 text-sm text-gray-700">
                <Phone size={15} className="text-gray-400" />
                {hotel.phone}
              </p>
            </div>

            <div>
              <p className="text-xs text-gray-400">Website</p>
              <p className="mt-1 flex items-center gap-2 break-all text-sm text-gray-700">
                <Globe size={15} className="shrink-0 text-gray-400" />
                {hotel.website}
              </p>
            </div>

            <div className="border-t border-gray-100 pt-4">
              <p className="text-xs text-gray-400">Added on</p>
              <p className="mt-1 text-sm text-gray-700">
                {hotel.createdAt}
              </p>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default HotelDetails;
