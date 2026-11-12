
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  ArrowLeft,
  BedDouble,
  Check,
  ChevronDown,
  Info,
  Save,
} from 'lucide-react';

const roomRecords = [
  {
    id: 'RM-001',
    name: 'Deluxe King Room',
    hotelId: 'HTL-001',
    description: 'A spacious and comfortable room with a king-size bed and modern amenities.',
    totalRooms: 25,
    maxAdults: 2,
    maxChildren: 1,
    bedType: 'King',
    bedCount: 1,
    roomSize: '350',
    pricePerNight: '4500',
    extraGuestPrice: '800',
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
    description: 'An elegant executive suite with premium furnishings and enhanced guest comfort.',
    totalRooms: 15,
    maxAdults: 3,
    maxChildren: 2,
    bedType: 'King',
    bedCount: 1,
    roomSize: '520',
    pricePerNight: '8500',
    extraGuestPrice: '1200',
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
    description: 'A comfortable room with beautiful mountain surroundings.',
    totalRooms: 20,
    maxAdults: 2,
    maxChildren: 1,
    bedType: 'Queen',
    bedCount: 1,
    roomSize: '320',
    pricePerNight: '3200',
    extraGuestPrice: '600',
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
    description: 'A spacious family suite with additional sleeping capacity.',
    totalRooms: 10,
    maxAdults: 4,
    maxChildren: 2,
    bedType: 'King + Single',
    bedCount: 2,
    roomSize: '650',
    pricePerNight: '7200',
    extraGuestPrice: '1000',
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
    description: 'A modern room suitable for business and leisure travellers.',
    totalRooms: 30,
    maxAdults: 2,
    maxChildren: 0,
    bedType: 'Queen',
    bedCount: 1,
    roomSize: '290',
    pricePerNight: '2800',
    extraGuestPrice: '500',
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

const hotels = [
  { id: 'HTL-001', name: 'The Grand Heritage' },
  { id: 'HTL-002', name: 'Mountain View Resort' },
  { id: 'HTL-003', name: 'The Urban Suites' },
  { id: 'HTL-004', name: 'Coastal Breeze Hotel' },
];

const roomAmenities = [
  'Free Wi-Fi',
  'Air Conditioning',
  'Television',
  'Mini Bar',
  'Room Service',
  'Balcony',
  'Work Desk',
  'Private Bathroom',
  'Bathtub',
  'Coffee Maker',
  'Safe',
  'Mountain View',
];

const inputClass =
  'w-full rounded-lg border border-gray-200 bg-white px-3.5 py-2.5 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-gray-400';

const labelClass = 'mb-1.5 block text-sm font-medium text-gray-700';

const EditRoomType: React.FC = () => {
  const navigate = useNavigate();
  const { vendorId, roomId } = useParams<{
    vendorId: string;
    roomId: string;
  }>();

  const room = roomRecords.find((item) => item.id === roomId);

  const [form, setForm] = useState(() => ({
    hotelId: room?.hotelId ?? '',
    name: room?.name ?? '',
    description: room?.description ?? '',
    totalRooms: String(room?.totalRooms ?? 1),
    maxAdults: String(room?.maxAdults ?? 2),
    maxChildren: String(room?.maxChildren ?? 0),
    bedType: room?.bedType ?? 'King',
    bedCount: String(room?.bedCount ?? 1),
    roomSize: room?.roomSize ?? '',
    pricePerNight: room?.pricePerNight ?? '',
    extraGuestPrice: room?.extraGuestPrice ?? '',
    status: room?.status ?? 'ACTIVE',
  }));

  const [amenities, setAmenities] = useState<string[]>(
    room?.amenities ?? [],
  );

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [success, setSuccess] = useState(false);

  const updateField = (field: keyof typeof form, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: '' }));
    setSuccess(false);
  };

  const toggleAmenity = (amenity: string) => {
    setAmenities((prev) =>
      prev.includes(amenity)
        ? prev.filter((item) => item !== amenity)
        : [...prev, amenity],
    );
    setSuccess(false);
  };

  const goBack = () => {
    navigate(vendorId ? `/vendor/${vendorId}/rooms` : '/');
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newErrors: Record<string, string> = {};

    if (!form.hotelId) newErrors.hotelId = 'Please select a hotel.';
    if (!form.name.trim()) newErrors.name = 'Room name is required.';

    if (!form.totalRooms || Number(form.totalRooms) < 1) {
      newErrors.totalRooms = 'Enter at least 1 room.';
    }

    if (!form.maxAdults || Number(form.maxAdults) < 1) {
      newErrors.maxAdults = 'At least 1 adult is required.';
    }

    if (!form.pricePerNight || Number(form.pricePerNight) <= 0) {
      newErrors.pricePerNight = 'Enter a valid nightly price.';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setSuccess(true);
  };

  if (!room) {
    return (
      <div className="rounded-xl border border-gray-200 bg-white p-8 text-center">
        <BedDouble size={32} className="mx-auto mb-3 text-gray-400" />
        <h2 className="text-lg font-semibold text-gray-900">
          Room type not found
        </h2>
        <p className="mt-1 text-sm text-gray-500">
          The room type you're trying to edit does not exist.
        </p>
        <button
          type="button"
          onClick={goBack}
          className="mt-5 rounded-lg bg-gray-900 px-4 py-2 text-sm text-white"
        >
          Back to Rooms
        </button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl space-y-6 pb-10">
      {/* Header */}
      <div>
        <button
          type="button"
          onClick={goBack}
          className="mb-3 inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900"
        >
          <ArrowLeft size={16} />
          Back to Rooms
        </button>

        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-gray-900">
              Edit Room Type
            </h1>
            <p className="mt-1 text-sm text-gray-500">
              Update the configuration for {room.name}.
            </p>
          </div>

          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gray-100 text-gray-600">
            <BedDouble size={21} />
          </div>
        </div>
      </div>

      {success && (
        <div className="flex items-start gap-3 rounded-lg border border-green-200 bg-green-50 p-4 text-sm text-green-800">
          <Check size={18} className="mt-0.5 shrink-0" />
          <div>
            <p className="font-medium">Changes validated successfully.</p>
            <p className="mt-1 text-green-700">
              This is a frontend preview. Changes have not been saved to the backend.
            </p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic information */}
        <section className="rounded-xl border border-gray-200 bg-white p-5 sm:p-6">
          <div className="mb-5">
            <h2 className="font-semibold text-gray-900">Basic Information</h2>
            <p className="mt-1 text-sm text-gray-500">
              Update the property and room category details.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label className={labelClass}>
                Select Hotel <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <select
                  value={form.hotelId}
                  onChange={(e) => updateField('hotelId', e.target.value)}
                  className={`${inputClass} appearance-none pr-10`}
                >
                  <option value="">Choose a hotel</option>
                  {hotels.map((hotel) => (
                    <option key={hotel.id} value={hotel.id}>
                      {hotel.name}
                    </option>
                  ))}
                </select>
                <ChevronDown
                  size={16}
                  className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                />
              </div>
              {errors.hotelId && (
                <p className="mt-1 text-xs text-red-600">{errors.hotelId}</p>
              )}
            </div>

            <div className="sm:col-span-2">
              <label className={labelClass}>
                Room Type Name <span className="text-red-500">*</span>
              </label>
              <input
                value={form.name}
                onChange={(e) => updateField('name', e.target.value)}
                placeholder="e.g. Deluxe King Room"
                className={inputClass}
              />
              {errors.name && (
                <p className="mt-1 text-xs text-red-600">{errors.name}</p>
              )}
            </div>

            <div className="sm:col-span-2">
              <label className={labelClass}>Description</label>
              <textarea
                rows={4}
                value={form.description}
                onChange={(e) => updateField('description', e.target.value)}
                placeholder="Describe the room and its features..."
                className={`${inputClass} resize-y`}
              />
            </div>
          </div>
        </section>

        {/* Inventory */}
        <section className="rounded-xl border border-gray-200 bg-white p-5 sm:p-6">
          <div className="mb-5">
            <h2 className="font-semibold text-gray-900">
              Inventory & Occupancy
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Update the room count and maximum guest capacity.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
            <div>
              <label className={labelClass}>
                Total Rooms <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                min="1"
                value={form.totalRooms}
                onChange={(e) => updateField('totalRooms', e.target.value)}
                className={inputClass}
              />
              {errors.totalRooms && (
                <p className="mt-1 text-xs text-red-600">
                  {errors.totalRooms}
                </p>
              )}
            </div>

            <div>
              <label className={labelClass}>
                Maximum Adults <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                min="1"
                value={form.maxAdults}
                onChange={(e) => updateField('maxAdults', e.target.value)}
                className={inputClass}
              />
              {errors.maxAdults && (
                <p className="mt-1 text-xs text-red-600">
                  {errors.maxAdults}
                </p>
              )}
            </div>

            <div>
              <label className={labelClass}>Maximum Children</label>
              <input
                type="number"
                min="0"
                value={form.maxChildren}
                onChange={(e) => updateField('maxChildren', e.target.value)}
                className={inputClass}
              />
            </div>
          </div>
        </section>

        {/* Bed details */}
        <section className="rounded-xl border border-gray-200 bg-white p-5 sm:p-6">
          <div className="mb-5">
            <h2 className="font-semibold text-gray-900">Bed & Room Details</h2>
            <p className="mt-1 text-sm text-gray-500">
              Update the room layout and sleeping arrangements.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
            <div>
              <label className={labelClass}>Bed Type</label>
              <select
                value={form.bedType}
                onChange={(e) => updateField('bedType', e.target.value)}
                className={inputClass}
              >
                <option value="Single">Single</option>
                <option value="Twin">Twin</option>
                <option value="Double">Double</option>
                <option value="Queen">Queen</option>
                <option value="King">King</option>
                <option value="King + Single">King + Single</option>
              </select>
            </div>

            <div>
              <label className={labelClass}>Number of Beds</label>
              <input
                type="number"
                min="1"
                value={form.bedCount}
                onChange={(e) => updateField('bedCount', e.target.value)}
                className={inputClass}
              />
            </div>

            <div>
              <label className={labelClass}>Room Size (sq. ft.)</label>
              <input
                type="number"
                min="0"
                value={form.roomSize}
                onChange={(e) => updateField('roomSize', e.target.value)}
                placeholder="e.g. 350"
                className={inputClass}
              />
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section className="rounded-xl border border-gray-200 bg-white p-5 sm:p-6">
          <div className="mb-5">
            <h2 className="font-semibold text-gray-900">Pricing</h2>
            <p className="mt-1 text-sm text-gray-500">
              Update the base rate and extra guest charge.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div>
              <label className={labelClass}>
                Base Price Per Night (₹) <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                min="1"
                value={form.pricePerNight}
                onChange={(e) => updateField('pricePerNight', e.target.value)}
                placeholder="e.g. 4500"
                className={inputClass}
              />
              {errors.pricePerNight && (
                <p className="mt-1 text-xs text-red-600">
                  {errors.pricePerNight}
                </p>
              )}
            </div>

            <div>
              <label className={labelClass}>
                Extra Guest Price Per Night (₹)
              </label>
              <input
                type="number"
                min="0"
                value={form.extraGuestPrice}
                onChange={(e) => updateField('extraGuestPrice', e.target.value)}
                placeholder="e.g. 800"
                className={inputClass}
              />
            </div>
          </div>

          <div className="mt-4 flex items-start gap-2 rounded-lg bg-gray-50 p-3 text-xs text-gray-500">
            <Info size={15} className="mt-0.5 shrink-0" />
            <p>
              These are base room rates. Seasonal pricing, taxes and
              channel-specific rates can be managed separately later.
            </p>
          </div>
        </section>

        {/* Amenities */}
        <section className="rounded-xl border border-gray-200 bg-white p-5 sm:p-6">
          <div className="mb-5">
            <h2 className="font-semibold text-gray-900">Room Amenities</h2>
            <p className="mt-1 text-sm text-gray-500">
              Update the facilities available in this room.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {roomAmenities.map((amenity) => {
              const selected = amenities.includes(amenity);

              return (
                <button
                  key={amenity}
                  type="button"
                  onClick={() => toggleAmenity(amenity)}
                  className={`flex items-center gap-2 rounded-lg border px-3 py-2.5 text-left text-sm transition ${
                    selected
                      ? 'border-gray-500 bg-gray-50 text-gray-900'
                      : 'border-gray-200 text-gray-600 hover:border-gray-300'
                  }`}
                >
                  <span
                    className={`flex h-4 w-4 shrink-0 items-center justify-center rounded border ${
                      selected
                        ? 'border-gray-800 bg-gray-800 text-white'
                        : 'border-gray-300'
                    }`}
                  >
                    {selected && <Check size={11} />}
                  </span>
                  {amenity}
                </button>
              );
            })}
          </div>
        </section>

        {/* Status */}
        <section className="rounded-xl border border-gray-200 bg-white p-5 sm:p-6">
          <h2 className="font-semibold text-gray-900">Room Type Status</h2>
          <p className="mt-1 text-sm text-gray-500">
            Choose whether this room type should be active.
          </p>

          <div className="mt-4 flex flex-wrap gap-3">
            {[
              { value: 'ACTIVE', label: 'Active' },
              { value: 'INACTIVE', label: 'Inactive' },
            ].map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => updateField('status', option.value)}
                className={`rounded-lg border px-4 py-2 text-sm transition ${
                  form.status === option.value
                    ? 'border-gray-700 bg-gray-900 text-white'
                    : 'border-gray-200 text-gray-600 hover:border-gray-400'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </section>

        {/* Actions */}
        <div className="flex flex-col-reverse justify-end gap-3 sm:flex-row">
          <button
            type="button"
            onClick={goBack}
            className="rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-gray-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-gray-800"
          >
            <Save size={16} />
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditRoomType;
