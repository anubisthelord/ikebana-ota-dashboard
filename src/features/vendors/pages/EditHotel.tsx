
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Building2, MapPin, Phone, Save } from 'lucide-react';

type HotelStatus = 'ACTIVE' | 'PENDING' | 'INACTIVE';

interface HotelFormData {
  name: string;
  propertyType: string;
  description: string;
  address: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
  email: string;
  phone: string;
  website: string;
  rooms: string;
  rating: string;
  status: HotelStatus;
}

const sampleHotels: Record<string, HotelFormData> = {
  'HTL-001': {
    name: 'The Grand Heritage',
    propertyType: 'HOTEL',
    description: 'A premium heritage property offering comfortable accommodation and a memorable guest experience.',
    address: 'MI Road',
    city: 'Jaipur',
    state: 'Rajasthan',
    country: 'India',
    postalCode: '302001',
    email: 'contact@grandheritage.example',
    phone: '+91 98765 43210',
    website: 'https://example.com',
    rooms: '85',
    rating: '5',
    status: 'ACTIVE',
  },
  'HTL-002': {
    name: 'Mountain View Resort',
    propertyType: 'RESORT',
    description: 'A mountain retreat with beautiful surroundings and comfortable rooms for travellers.',
    address: 'Old Manali Road',
    city: 'Manali',
    state: 'Himachal Pradesh',
    country: 'India',
    postalCode: '175131',
    email: 'stay@mountainview.example',
    phone: '+91 98765 12345',
    website: 'https://example.com',
    rooms: '42',
    rating: '4',
    status: 'ACTIVE',
  },
  'HTL-003': {
    name: 'The Urban Suites',
    propertyType: 'APARTMENT',
    description: 'Modern city accommodation designed for business and leisure guests.',
    address: 'Connaught Place',
    city: 'New Delhi',
    state: 'Delhi',
    country: 'India',
    postalCode: '110001',
    email: 'hello@urbansuites.example',
    phone: '+91 98765 67890',
    website: 'https://example.com',
    rooms: '64',
    rating: '3',
    status: 'PENDING',
  },
  'HTL-004': {
    name: 'Coastal Breeze Hotel',
    propertyType: 'HOTEL',
    description: 'A relaxed coastal property close to popular beaches and attractions.',
    address: 'Calangute Beach Road',
    city: 'Calangute',
    state: 'Goa',
    country: 'India',
    postalCode: '403516',
    email: 'info@coastalbreeze.example',
    phone: '+91 98765 98765',
    website: 'https://example.com',
    rooms: '38',
    rating: '4',
    status: 'INACTIVE',
  },
};

const amenitiesList = [
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

const initialAmenities: Record<string, string[]> = {
  'HTL-001': ['Free Wi-Fi', 'Swimming Pool', 'Restaurant', 'Parking', 'Gym', 'Spa'],
  'HTL-002': ['Free Wi-Fi', 'Restaurant', 'Parking', 'Room Service'],
  'HTL-003': ['Free Wi-Fi', 'Restaurant', 'Air Conditioning'],
  'HTL-004': ['Free Wi-Fi', 'Swimming Pool', 'Restaurant', 'Parking'],
};

const fieldClass =
  'w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-700 outline-none transition placeholder:text-gray-400 focus:border-gray-400';

const labelClass = 'mb-2 block text-sm font-medium text-gray-700';

const EditHotel: React.FC = () => {
  const navigate = useNavigate();
  const { vendorId, hotelId } = useParams<{
    vendorId: string;
    hotelId: string;
  }>();

  const hotel = hotelId ? sampleHotels[hotelId] : undefined;

  const [form, setForm] = useState<HotelFormData>(
    () => hotel ? { ...hotel } : {
      name: '',
      propertyType: '',
      description: '',
      address: '',
      city: '',
      state: '',
      country: '',
      postalCode: '',
      email: '',
      phone: '',
      website: '',
      rooms: '',
      rating: '',
      status: 'ACTIVE',
    },
  );

  const [amenities, setAmenities] = useState<string[]>(
    () => hotelId ? initialAmenities[hotelId] ?? [] : [],
  );

  const [saved, setSaved] = useState(false);

  const updateField = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
    setSaved(false);
  };

  const toggleAmenity = (amenity: string) => {
    setAmenities((current) =>
      current.includes(amenity)
        ? current.filter((item) => item !== amenity)
        : [...current, amenity],
    );
    setSaved(false);
  };

  const backToDetails = () => {
    if (vendorId && hotelId) {
      navigate(`/vendor/${vendorId}/hotels/${hotelId}`);
    } else if (vendorId) {
      navigate(`/vendor/${vendorId}/hotels`);
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSaved(true);
  };

  if (!hotel) {
    return (
      <div className="py-16 text-center">
        <Building2 size={32} className="mx-auto text-gray-300" />
        <h2 className="mt-3 font-semibold text-gray-900">Hotel not found</h2>
        <p className="mt-1 text-sm text-gray-500">
          This hotel does not exist in the sample records.
        </p>
        <button onClick={backToDetails} className="mt-4 text-sm underline">
          Back to hotels
        </button>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-[1100px] space-y-6 pb-8">
      <div>
        <button
          type="button"
          onClick={backToDetails}
          className="mb-4 inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900"
        >
          <ArrowLeft size={16} />
          Back to hotel details
        </button>

        <h1 className="text-2xl font-semibold text-gray-900">Edit hotel</h1>
        <p className="mt-1 text-sm text-gray-500">
          Update the property information for {hotel.name}.
        </p>
      </div>

      {saved && (
        <div className="rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
          Changes validated successfully. Backend saving is not connected yet.
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <section className="rounded-xl border border-gray-200 bg-white">
          <div className="flex items-center gap-3 border-b border-gray-100 px-5 py-4">
            <Building2 size={19} className="text-gray-500" />
            <div>
              <h2 className="text-sm font-semibold text-gray-900">Basic information</h2>
              <p className="mt-1 text-xs text-gray-500">Property name and description.</p>
            </div>
          </div>

          <div className="grid gap-5 p-5 md:grid-cols-2">
            <div>
              <label className={labelClass}>Hotel name *</label>
              <input name="name" value={form.name} onChange={updateField} required className={fieldClass} />
            </div>

            <div>
              <label className={labelClass}>Property type *</label>
              <select name="propertyType" value={form.propertyType} onChange={updateField} required className={fieldClass}>
                <option value="">Select property type</option>
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
              <label className={labelClass}>Description</label>
              <textarea name="description" value={form.description} onChange={updateField} rows={4} className={fieldClass} />
            </div>
          </div>
        </section>

        <section className="rounded-xl border border-gray-200 bg-white">
          <div className="flex items-center gap-3 border-b border-gray-100 px-5 py-4">
            <MapPin size={19} className="text-gray-500" />
            <div>
              <h2 className="text-sm font-semibold text-gray-900">Location and address</h2>
              <p className="mt-1 text-xs text-gray-500">Property's registered location.</p>
            </div>
          </div>

          <div className="grid gap-5 p-5 md:grid-cols-2">
            <div className="md:col-span-2">
              <label className={labelClass}>Street address *</label>
              <input name="address" value={form.address} onChange={updateField} required className={fieldClass} />
            </div>

            {([
              ['city', 'City'],
              ['state', 'State / Province'],
              ['country', 'Country'],
              ['postalCode', 'Postal code'],
            ] as const).map(([name, label]) => (
              <div key={name}>
                <label className={labelClass}>{label} *</label>
                <input name={name} value={form[name]} onChange={updateField} required className={fieldClass} />
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-xl border border-gray-200 bg-white">
          <div className="flex items-center gap-3 border-b border-gray-100 px-5 py-4">
            <Phone size={19} className="text-gray-500" />
            <div>
              <h2 className="text-sm font-semibold text-gray-900">Contact information</h2>
              <p className="mt-1 text-xs text-gray-500">Official property contact details.</p>
            </div>
          </div>

          <div className="grid gap-5 p-5 md:grid-cols-2">
            <div>
              <label className={labelClass}>Contact email *</label>
              <input type="email" name="email" value={form.email} onChange={updateField} required className={fieldClass} />
            </div>
            <div>
              <label className={labelClass}>Contact phone *</label>
              <input type="tel" name="phone" value={form.phone} onChange={updateField} required className={fieldClass} />
            </div>
            <div>
              <label className={labelClass}>Website</label>
              <input type="url" name="website" value={form.website} onChange={updateField} className={fieldClass} />
            </div>
          </div>
        </section>

        <section className="rounded-xl border border-gray-200 bg-white">
          <div className="border-b border-gray-100 px-5 py-4">
            <h2 className="text-sm font-semibold text-gray-900">Property details</h2>
            <p className="mt-1 text-xs text-gray-500">Rooms, rating, and available facilities.</p>
          </div>

          <div className="space-y-5 p-5">
            <div className="grid gap-5 md:grid-cols-2">
              <div>
                <label className={labelClass}>Total rooms *</label>
                <input type="number" name="rooms" value={form.rooms} onChange={updateField} min="1" required className={fieldClass} />
              </div>
              <div>
                <label className={labelClass}>Star rating</label>
                <select name="rating" value={form.rating} onChange={updateField} className={fieldClass}>
                  <option value="">Select rating</option>
                  {[1, 2, 3, 4, 5].map((rating) => (
                    <option key={rating} value={rating}>{rating} Star{rating > 1 ? 's' : ''}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <p className="mb-3 text-sm font-medium text-gray-700">Amenities</p>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {amenitiesList.map((amenity) => (
                  <label key={amenity} className="flex cursor-pointer items-center gap-2 text-sm text-gray-600">
                    <input
                      type="checkbox"
                      checked={amenities.includes(amenity)}
                      onChange={() => toggleAmenity(amenity)}
                      className="h-4 w-4 accent-gray-900"
                    />
                    {amenity}
                  </label>
                ))}
              </div>
            </div>
          </div>
        </section>

        <div className="flex flex-col-reverse justify-end gap-3 sm:flex-row">
          <button type="button" onClick={backToDetails} className="rounded-lg border border-gray-200 px-5 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50">
            Cancel
          </button>
          <button type="submit" className="inline-flex items-center justify-center gap-2 rounded-lg bg-gray-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-gray-800">
            <Save size={16} />
            Save changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditHotel;
