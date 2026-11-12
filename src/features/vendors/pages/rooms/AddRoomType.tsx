
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  ArrowLeft,
  BedDouble,
  Check,
  ChevronDown,
  Info,
  Plus,
} from 'lucide-react';

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

const AddRoomType: React.FC = () => {
  const navigate = useNavigate();
  const { vendorId } = useParams<{ vendorId: string }>();

  const [form, setForm] = useState({
    hotelId: '',
    name: '',
    description: '',
    totalRooms: '10',
    maxAdults: '2',
    maxChildren: '1',
    bedType: 'King',
    bedCount: '1',
    roomSize: '',
    pricePerNight: '',
    extraGuestPrice: '',
    status: 'ACTIVE',
  });

  const [amenities, setAmenities] = useState<string[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [success, setSuccess] = useState(false);

  const updateField = (
    field: keyof typeof form,
    value: string,
  ) => {
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

  const handleBack = () => {
    navigate(vendorId ? `/vendor/${vendorId}/rooms` : '/');
  };

  return (
    <div className="mx-auto max-w-5xl space-y-6 pb-10">
      {/* Page heading */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <button
            type="button"
            onClick={handleBack}
            className="mb-3 inline-flex items-center gap-2 text-sm text-gray-500 transition hover:text-gray-900"
          >
            <ArrowLeft size={16} />
            Back to Rooms
          </button>

          <h1 className="text-2xl font-semibold tracking-tight text-gray-900">
            Add Room Type
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Configure a room category, inventory, occupancy and pricing.
          </p>
        </div>

        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gray-100 text-gray-600">
          <BedDouble size={21} />
        </div>
      </div>

      {success && (
        <div className="flex items-start gap-3 rounded-lg border border-green-200 bg-green-50 p-4 text-sm text-green-800">
          <Check size={18} className="mt-0.5 shrink-0" />
          <div>
            <p className="font-medium">Form completed successfully.</p>
            <p className="mt-1 text-green-700">
              This is a frontend preview. Room data has not been saved to the backend.
            </p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic information */}
        <section className="rounded-xl border border-gray-200 bg-white p-5 sm:p-6">
          <div className="mb-5">
            <h2 className="text-base font-semibold text-gray-900">
              Basic Information
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Select the property and describe the room category.
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
                placeholder="Describe the room, its features and guest experience..."
                className={`${inputClass} resize-y`}
              />
            </div>
          </div>
        </section>

        {/* Inventory and occupancy */}
        <section className="rounded-xl border border-gray-200 bg-white p-5 sm:p-6">
          <div className="mb-5">
            <h2 className="text-base font-semibold text-gray-900">
              Inventory & Occupancy
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Define how many rooms are available and their guest capacity.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
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
                <p className="mt-1 text-xs text-red-600">{errors.totalRooms}</p>
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
                <p className="mt-1 text-xs text-red-600">{errors.maxAdults}</p>
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

        {/* Bed and room details */}
        <section className="rounded-xl border border-gray-200 bg-white p-5 sm:p-6">
          <div className="mb-5">
            <h2 className="text-base font-semibold text-gray-900">
              Bed & Room Details
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Specify the room layout and sleeping arrangements.
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
            <h2 className="text-base font-semibold text-gray-900">
              Pricing
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Set the base rate and additional guest charges.
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
              These are base rates for the room type. Taxes, seasonal pricing
              and OTA-specific pricing can be configured separately later.
            </p>
          </div>
        </section>

        {/* Amenities */}
        <section className="rounded-xl border border-gray-200 bg-white p-5 sm:p-6">
          <div className="mb-5">
            <h2 className="text-base font-semibold text-gray-900">
              Room Amenities
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Select the facilities available in this room type.
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
          <h2 className="text-base font-semibold text-gray-900">
            Room Type Status
          </h2>
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

        {/* Form actions */}
        <div className="flex flex-col-reverse justify-end gap-3 sm:flex-row">
          <button
            type="button"
            onClick={handleBack}
            className="rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-gray-900 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800"
          >
            <Plus size={16} />
            Create Room Type
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddRoomType;
