
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  ArrowLeft,
  Building2,
  CalendarDays,
  CheckCircle2,
  Clock3,
  Hotel,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  UserRound,
  XCircle,
} from 'lucide-react';

type VendorStatus = 'APPROVED' | 'PENDING' | 'REJECTED' | 'SUSPENDED';

interface VendorDetail {
  id: string;
  name: string;
  owner: string;
  email: string;
  phone: string;
  status: VendorStatus;
  hotels: number;
  location: string;
  joinedAt: string;
  website: string;
  businessType: string;
  description: string;
}

const mockVendors: VendorDetail[] = [
  {
    id: 'VN-1001',
    name: 'The Grand Heritage',
    owner: 'Sanjay Sharma',
    email: 'sanjay@grandheritage.com',
    phone: '+91 98765 43210',
    status: 'APPROVED',
    hotels: 4,
    location: 'Jaipur, Rajasthan, India',
    joinedAt: '12 Aug 2026',
    website: 'www.grandheritage.com',
    businessType: 'Hotel Group',
    description:
      'A hospitality group offering premium heritage stays and luxury accommodation.',
  },
  {
    id: 'VN-1002',
    name: 'Mountain View Resorts',
    owner: 'Aarav Mehta',
    email: 'aarav@mountainview.com',
    phone: '+91 98765 12345',
    status: 'APPROVED',
    hotels: 3,
    location: 'Manali, Himachal Pradesh, India',
    joinedAt: '18 Aug 2026',
    website: 'www.mountainview.com',
    businessType: 'Resort Group',
    description:
      'A collection of mountain resorts focused on comfortable leisure stays.',
  },
  {
    id: 'VN-1003',
    name: 'Royal Orchid Hospitality',
    owner: 'Amit Sharma',
    email: 'amit@royalorchid.com',
    phone: '+91 98111 22334',
    status: 'PENDING',
    hotels: 0,
    location: 'New Delhi, India',
    joinedAt: '02 Sep 2026',
    website: 'Not provided',
    businessType: 'Hospitality Group',
    description: 'A hospitality business applying to join the Ikebana OTA platform.',
  },
  {
    id: 'VN-1004',
    name: 'Coastal Stay Group',
    owner: 'Rahul Mehta',
    email: 'rahul@coastalstay.com',
    phone: '+91 98222 33445',
    status: 'PENDING',
    hotels: 0,
    location: 'Goa, India',
    joinedAt: '05 Sep 2026',
    website: 'www.coastalstay.com',
    businessType: 'Hotel Group',
    description: 'A coastal accommodation group seeking platform onboarding.',
  },
  {
    id: 'VN-1005',
    name: 'Urban Living Hotels',
    owner: 'Priya Verma',
    email: 'priya@urbanliving.com',
    phone: '+91 98333 44556',
    status: 'REJECTED',
    hotels: 2,
    location: 'Mumbai, Maharashtra, India',
    joinedAt: '20 Aug 2026',
    website: 'www.urbanliving.com',
    businessType: 'Hotel Group',
    description: 'An urban hotel operator with properties in major cities.',
  },
  {
    id: 'VN-1006',
    name: 'Blue Horizon Stays',
    owner: 'Karan Malhotra',
    email: 'karan@bluehorizon.com',
    phone: '+91 98444 55667',
    status: 'SUSPENDED',
    hotels: 1,
    location: 'Udaipur, Rajasthan, India',
    joinedAt: '10 Jul 2026',
    website: 'www.bluehorizon.com',
    businessType: 'Boutique Hotels',
    description: 'A boutique accommodation provider.',
  },
  {
    id: 'VN-1007',
    name: 'City Comfort Properties',
    owner: 'Neha Kapoor',
    email: 'neha@citycomfort.com',
    phone: '+91 98555 66778',
    status: 'APPROVED',
    hotels: 5,
    location: 'Chandigarh, India',
    joinedAt: '25 Jul 2026',
    website: 'www.citycomfort.com',
    businessType: 'Hotel Group',
    description: 'A multi-property hotel operator offering city accommodation.',
  },
  {
    id: 'VN-1008',
    name: 'Pine Valley Retreats',
    owner: 'Rohan Verma',
    email: 'rohan@pinevalley.com',
    phone: '+91 98666 77889',
    status: 'PENDING',
    hotels: 0,
    location: 'Shimla, Himachal Pradesh, India',
    joinedAt: '08 Sep 2026',
    website: 'Not provided',
    businessType: 'Resort Group',
    description: 'A resort business applying for vendor onboarding.',
  },
];

const statusStyles: Record<VendorStatus, string> = {
  APPROVED: 'bg-emerald-50 text-emerald-700',
  PENDING: 'bg-amber-50 text-amber-700',
  REJECTED: 'bg-rose-50 text-rose-700',
  SUSPENDED: 'bg-slate-100 text-slate-700',
};

const VendorDetails: React.FC = () => {
  const navigate = useNavigate();
  const { vendorId } = useParams<{ vendorId: string }>();

  const vendor = mockVendors.find((item) => item.id === vendorId);

  if (!vendor) {
    return (
      <div className="rounded-2xl border border-gray-200 bg-white p-10 text-center">
        <Building2 className="mx-auto mb-3 h-10 w-10 text-gray-400" />
        <h2 className="text-lg font-semibold text-gray-900">Vendor not found</h2>
        <p className="mt-1 text-sm text-gray-500">
          The vendor you're looking for doesn't exist in the mock data.
        </p>
        <button
          onClick={() => navigate('/super-admin/vendors')}
          className="mt-5 rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white"
        >
          Back to Vendors
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Page heading */}
      <div>
        <button
          onClick={() => navigate('/super-admin/vendors')}
          className="mb-4 inline-flex items-center gap-2 text-sm font-medium text-gray-500 transition hover:text-gray-900"
        >
          <ArrowLeft size={16} />
          Back to Vendors
        </button>

        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="text-2xl font-semibold tracking-tight text-gray-900">
                {vendor.name}
              </h1>
              <span
                className={`rounded-full px-3 py-1 text-xs font-medium ${statusStyles[vendor.status]}`}
              >
                {vendor.status}
              </span>
            </div>
            <p className="mt-1 text-sm text-gray-500">
              Vendor ID: {vendor.id}
            </p>
          </div>

          {vendor.status === 'PENDING' && (
            <div className="flex gap-2">
              <button className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
                <XCircle size={16} />
                Reject
              </button>
              <button className="inline-flex items-center gap-2 rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800">
                <CheckCircle2 size={16} />
                Approve Vendor
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-gray-200 bg-white p-5">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-500">Registered Hotels</p>
            <Hotel size={18} className="text-gray-400" />
          </div>
          <p className="mt-3 text-2xl font-semibold text-gray-900">
            {vendor.hotels}
          </p>
          <p className="mt-1 text-xs text-gray-500">Properties under this vendor</p>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-5">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-500">Vendor Status</p>
            <ShieldCheck size={18} className="text-gray-400" />
          </div>
          <p className="mt-3 text-lg font-semibold text-gray-900">
            {vendor.status}
          </p>
          <p className="mt-1 text-xs text-gray-500">Current platform access status</p>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-5">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-500">Registration Date</p>
            <CalendarDays size={18} className="text-gray-400" />
          </div>
          <p className="mt-3 text-lg font-semibold text-gray-900">
            {vendor.joinedAt}
          </p>
          <p className="mt-1 text-xs text-gray-500">Vendor application date</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        {/* Business information */}
        <section className="space-y-5 rounded-xl border border-gray-200 bg-white p-6 xl:col-span-2">
          <div>
            <h2 className="text-base font-semibold text-gray-900">
              Business Information
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Registered vendor and business details
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <p className="text-xs text-gray-400">Business Name</p>
              <p className="mt-1 text-sm font-medium text-gray-900">{vendor.name}</p>
            </div>
            <div>
              <p className="text-xs text-gray-400">Business Type</p>
              <p className="mt-1 text-sm font-medium text-gray-900">
                {vendor.businessType}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-400">Website</p>
              <p className="mt-1 text-sm font-medium text-gray-900">
                {vendor.website}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-400">Location</p>
              <p className="mt-1 flex items-center gap-2 text-sm font-medium text-gray-900">
                <MapPin size={15} className="text-gray-400" />
                {vendor.location}
              </p>
            </div>
          </div>

          <div className="border-t border-gray-100 pt-5">
            <p className="text-xs text-gray-400">Business Description</p>
            <p className="mt-2 text-sm leading-6 text-gray-600">
              {vendor.description}
            </p>
          </div>
        </section>

        {/* Owner information */}
        <section className="rounded-xl border border-gray-200 bg-white p-6">
          <div>
            <h2 className="text-base font-semibold text-gray-900">
              Primary Contact
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Vendor owner information
            </p>
          </div>

          <div className="mt-6 flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gray-100">
              <UserRound size={20} className="text-gray-600" />
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-900">{vendor.owner}</p>
              <p className="text-xs text-gray-500">Vendor Owner</p>
            </div>
          </div>

          <div className="mt-6 space-y-5">
            <div className="flex items-start gap-3">
              <Mail size={17} className="mt-0.5 text-gray-400" />
              <div className="min-w-0">
                <p className="text-xs text-gray-400">Email Address</p>
                <p className="mt-1 break-all text-sm text-gray-800">{vendor.email}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Phone size={17} className="mt-0.5 text-gray-400" />
              <div>
                <p className="text-xs text-gray-400">Phone Number</p>
                <p className="mt-1 text-sm text-gray-800">{vendor.phone}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Clock3 size={17} className="mt-0.5 text-gray-400" />
              <div>
                <p className="text-xs text-gray-400">Joined Platform</p>
                <p className="mt-1 text-sm text-gray-800">{vendor.joinedAt}</p>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Hotel overview */}
      <section className="rounded-xl border border-gray-200 bg-white p-6">
        <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
          <div>
            <h2 className="text-base font-semibold text-gray-900">
              Hotel Portfolio
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Hotels registered under this vendor
            </p>
          </div>
          <span className="text-sm font-medium text-gray-600">
            {vendor.hotels} {vendor.hotels === 1 ? 'property' : 'properties'}
          </span>
        </div>

        {vendor.hotels > 0 ? (
          <div className="mt-5 flex items-center gap-3 rounded-lg border border-gray-100 bg-gray-50 p-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white">
              <Hotel size={19} className="text-gray-500" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">
                {vendor.hotels} registered properties |
              </p>
              <p className="mt-1 text-xs text-gray-500">
                Hotel-level details will be available in the hotel management module.
              </p>
            </div>
          </div>
        ) : (
          <div className="mt-5 rounded-lg border border-dashed border-gray-200 py-10 text-center">
            <Building2 className="mx-auto h-8 w-8 text-gray-300" />
            <p className="mt-3 text-sm font-medium text-gray-700">
              No hotels registered yet
            </p>
            <p className="mt-1 text-xs text-gray-500">
              Hotels will appear here after the vendor adds properties.
            </p>
          </div>
        )}
      </section>
    </div>
  );
};

export default VendorDetails;
