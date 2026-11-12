
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  ArrowLeft,
  Building2,
  MapPin,
  Phone,
  FileText,
  CheckCircle2,
} from 'lucide-react';

const availableAmenities = [
  'Free Wi-Fi',
  'Swimming Pool',
  'Restaurant',
  'Parking',
  'Gym',
  'Spa',
  'Room Service',
  'Air Conditioning',
  'Airport Transfer',
  'Pet Friendly',
];

const AddHotel: React.FC = () => {
  const navigate = useNavigate();
  const { vendorId } = useParams<{ vendorId: string }>();

  const [amenities, setAmenities] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);

  const handleAmenityChange = (amenity: string) => {
    setAmenities((current) =>
      current.includes(amenity)
        ? current.filter((item) => item !== amenity)
        : [...current, amenity],
    );
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };

  const handleBack = () => {
    if (vendorId) {
      navigate(`/vendor/${vendorId}/hotels`);
    }
  };

  return (
    <div className="mx-auto w-full max-w-[1100px] space-y-6 pb-8">
      {/* Heading */}
      <div>
        <button
          type="button"
          onClick={handleBack}
          className="mb-4 inline-flex items-center gap-2 text-sm text-gray-500 transition hover:text-gray-900"
        >
          <ArrowLeft size={16} />
          Back to hotels
        </button>

        <h1 className="text-2xl font-semibold tracking-tight text-gray-900">
          Add a hotel
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          Add your property information to start managing it on Ikebana OTA.
        </p>
      </div>

      {submitted && (
        <div className="flex items-start gap-3 rounded-lg border border-emerald-200 bg-emerald-50 p-4">
          <CheckCircle2 size={20} className="mt-0.5 text-emerald-600" />
          <div>
            <p className="text-sm font-medium text-emerald-800">
              Form validation successful
            </p>
            <p className="mt-1 text-xs text-emerald-700">
              This is a frontend preview. Your hotel has not been saved because
              backend integration is not connected yet.
            </p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Basic information */}
        <section className="rounded-xl border border-gray-200 bg-white">
          <div className="flex items-center gap-3 border-b border-gray-100 px-5 py-4">
            <Building2 size={19} className="text-gray-500" />
            <div>
              <h2 className="text-sm font-semibold text-gray-900">
                Basic information
              </h2>
              <p className="mt-0.5 text-xs text-gray-500">
                General details about your property.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-5 p-5 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Hotel name <span className="text-red-500">*</span>
              </label>
              <input
                name="hotelName"
                required
                placeholder="e.g. The Grand Heritage"
                className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none transition focus:border-gray-400"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Property type <span className="text-red-500">*</span>
              </label>
              <select
                name="propertyType"
                required
                defaultValue=""
                className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-gray-400"
              >
                <option value="" disabled>
                  Select property type
                </option>
                <option value="HOTEL">Hotel</option>
                <option value="RESORT">Resort</option>
                <option value="VILLA">Villa</option>
                <option value="APARTMENT">Apartment</option>
                <option value="HOSTEL">Hostel</option>
                <option value="GUEST_HOUSE">Guest House</option>
                <option value="BOUTIQUE_HOTEL">Boutique Hotel</option>
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Short description
              </label>
              <textarea
                name="description"
                rows={4}
                placeholder="Describe your property, its atmosphere and what makes it special..."
                className="w-full resize-y rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none transition focus:border-gray-400"
              />
            </div>
          </div>
        </section>

        {/* Location */}
        <section className="rounded-xl border border-gray-200 bg-white">
          <div className="flex items-center gap-3 border-b border-gray-100 px-5 py-4">
            <MapPin size={19} className="text-gray-500" />
            <div>
              <h2 className="text-sm font-semibold text-gray-900">
                Location and address
              </h2>
              <p className="mt-0.5 text-xs text-gray-500">
                Where guests can find your property.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-5 p-5 md:grid-cols-2">
            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Street address <span className="text-red-500">*</span>
              </label>
              <input
                name="address"
                required
                placeholder="Building, street, area"
                className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-gray-400"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                City <span className="text-red-500">*</span>
              </label>
              <input
                name="city"
                required
                placeholder="Enter city"
                className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-gray-400"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                State / Province <span className="text-red-500">*</span>
              </label>
              <input
                name="state"
                required
                placeholder="Enter state"
                className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-gray-400"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Country <span className="text-red-500">*</span>
              </label>
              <input
                name="country"
                required
                placeholder="Enter country"
                className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-gray-400"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Postal code <span className="text-red-500">*</span>
              </label>
              <input
                name="postalCode"
                required
                placeholder="Enter postal code"
                className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-gray-400"
              />
            </div>
          </div>
        </section>

        {/* Contact information */}
        <section className="rounded-xl border border-gray-200 bg-white">
          <div className="flex items-center gap-3 border-b border-gray-100 px-5 py-4">
            <Phone size={19} className="text-gray-500" />
            <div>
              <h2 className="text-sm font-semibold text-gray-900">
                Contact information
              </h2>
              <p className="mt-0.5 text-xs text-gray-500">
                Official contact details for this property.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-5 p-5 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Contact email <span className="text-red-500">*</span>
              </label>
              <input
                name="contactEmail"
                type="email"
                required
                placeholder="hotel@example.com"
                className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-gray-400"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Contact phone <span className="text-red-500">*</span>
              </label>
              <input
                name="contactPhone"
                type="tel"
                required
                placeholder="+91 98765 43210"
                className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-gray-400"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Website
              </label>
              <input
                name="website"
                type="url"
                placeholder="https://example.com"
                className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-gray-400"
              />
            </div>
          </div>
        </section>

        {/* Property details */}
        <section className="rounded-xl border border-gray-200 bg-white">
          <div className="flex items-center gap-3 border-b border-gray-100 px-5 py-4">
            <FileText size={19} className="text-gray-500" />
            <div>
              <h2 className="text-sm font-semibold text-gray-900">
                Property details
              </h2>
              <p className="mt-0.5 text-xs text-gray-500">
                Basic operational information.
              </p>
            </div>
          </div>

          <div className="space-y-5 p-5">
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Total rooms <span className="text-red-500">*</span>
                </label>
                <input
                  name="totalRooms"
                  type="number"
                  min="1"
                  required
                  placeholder="e.g. 50"
                  className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-gray-400"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Star rating
                </label>
                <select
                  name="starRating"
                  defaultValue=""
                  className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-gray-400"
                >
                  <option value="">Select rating</option>
                  <option value="1">1 Star</option>
                  <option value="2">2 Stars</option>
                  <option value="3">3 Stars</option>
                  <option value="4">4 Stars</option>
                  <option value="5">5 Stars</option>
                </select>
              </div>
            </div>

            <div>
              <p className="mb-3 text-sm font-medium text-gray-700">
                Available amenities
              </p>

              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {availableAmenities.map((amenity) => (
                  <label
                    key={amenity}
                    className="flex cursor-pointer items-center gap-2 text-sm text-gray-600"
                  >
                    <input
                      type="checkbox"
                      checked={amenities.includes(amenity)}
                      onChange={() => handleAmenityChange(amenity)}
                      className="h-4 w-4 rounded border-gray-300 accent-gray-900"
                    />
                    {amenity}
                  </label>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Actions */}
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
            className="rounded-lg bg-gray-900 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800"
          >
            Validate hotel information
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddHotel;
