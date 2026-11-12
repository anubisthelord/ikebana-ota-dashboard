
import React, { useState } from 'react';
import {
  Building2,
  MapPin,
  Globe2,
  Bell,
  Mail,
  Phone,
  Save,
  RotateCcw,
  CheckCircle2,
} from 'lucide-react';

interface SettingsForm {
  businessName: string;
  legalName: string;
  description: string;
  email: string;
  phone: string;
  website: string;
  address: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
  currency: string;
  timezone: string;
  language: string;
  dateFormat: string;
  emailNotifications: boolean;
  bookingNotifications: boolean;
  marketingNotifications: boolean;
}

const initialSettings: SettingsForm = {
  businessName: 'The Grand Heritage',
  legalName: 'The Grand Heritage Hospitality Pvt. Ltd.',
  description: 'Premium hospitality and accommodation services.',
  email: 'contact@grandheritage.com',
  phone: '+91 98765 43210',
  website: 'https://grandheritage.com',
  address: '12 Heritage Road',
  city: 'Jaipur',
  state: 'Rajasthan',
  country: 'India',
  postalCode: '302001',
  currency: 'INR',
  timezone: 'Asia/Kolkata',
  language: 'English',
  dateFormat: 'DD/MM/YYYY',
  emailNotifications: true,
  bookingNotifications: true,
  marketingNotifications: false,
};

const inputClass =
  'w-full rounded-lg border border-[#E8E7ED] bg-white px-3.5 py-2.5 text-sm text-[#292735] outline-none transition placeholder:text-[#A6A4B0] focus:border-[#A78BFA]';

const labelClass = 'mb-1.5 block text-sm font-medium text-[#464451]';

const SettingsPage: React.FC = () => {
  const [form, setForm] = useState<SettingsForm>(initialSettings);
  const [saved, setSaved] = useState(false);

  const updateField = <K extends keyof SettingsForm>(
    field: K,
    value: SettingsForm[K],
  ) => {
    setForm((current) => ({ ...current, [field]: value }));
    setSaved(false);
  };

  const handleSave = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Frontend demonstration only. API integration will be added later.
    setSaved(true);
  };

  const handleReset = () => {
    setForm(initialSettings);
    setSaved(false);
  };

  return (
    <div className="mx-auto w-full max-w-6xl space-y-6 pb-8">
      {/* Page Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-[#292735]">
            Settings
          </h1>
          <p className="mt-1 text-sm text-[#858391]">
            Manage your business information and account preferences.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleReset}
            className="inline-flex items-center gap-2 rounded-lg border border-[#E8E7ED] bg-white px-4 py-2.5 text-sm font-medium text-[#555362] transition hover:bg-[#F8F7FC]"
          >
            <RotateCcw size={15} />
            Reset
          </button>

          <button
            type="submit"
            form="vendor-settings-form"
            className="inline-flex items-center gap-2 rounded-lg bg-[#292735] px-4 py-2.5 text-sm font-medium text-white transition hover:bg-[#403D50]"
          >
            <Save size={15} />
            Save Changes
          </button>
        </div>
      </div>

      {saved && (
        <div className="flex items-center gap-2 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
          <CheckCircle2 size={17} />
          Settings saved successfully. This is a local frontend preview.
        </div>
      )}

      <form
        id="vendor-settings-form"
        onSubmit={handleSave}
        className="space-y-6"
      >
        {/* Business Profile */}
        <section className="overflow-hidden rounded-xl border border-[#EAE9EF] bg-white">
          <div className="flex items-center gap-3 border-b border-[#F0EFF3] px-5 py-4">
            <div className="rounded-lg bg-[#F3F0FF] p-2 text-[#8065C9]">
              <Building2 size={19} />
            </div>
            <div>
              <h2 className="font-semibold text-[#292735]">
                Business Profile
              </h2>
              <p className="text-xs text-[#858391]">
                Basic information about your business.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-5 p-5 md:grid-cols-2">
            <div>
              <label className={labelClass}>Business Name *</label>
              <input
                required
                value={form.businessName}
                onChange={(e) => updateField('businessName', e.target.value)}
                className={inputClass}
                placeholder="Enter business name"
              />
            </div>

            <div>
              <label className={labelClass}>Legal Business Name</label>
              <input
                value={form.legalName}
                onChange={(e) => updateField('legalName', e.target.value)}
                className={inputClass}
                placeholder="Enter registered business name"
              />
            </div>

            <div className="md:col-span-2">
              <label className={labelClass}>Business Description</label>
              <textarea
                rows={3}
                value={form.description}
                onChange={(e) => updateField('description', e.target.value)}
                className={`${inputClass} resize-none`}
                placeholder="Describe your business"
              />
            </div>
          </div>
        </section>

        {/* Contact Information */}
        <section className="overflow-hidden rounded-xl border border-[#EAE9EF] bg-white">
          <div className="flex items-center gap-3 border-b border-[#F0EFF3] px-5 py-4">
            <div className="rounded-lg bg-[#EEF5FF] p-2 text-[#5485C9]">
              <Mail size={19} />
            </div>
            <div>
              <h2 className="font-semibold text-[#292735]">
                Contact Information
              </h2>
              <p className="text-xs text-[#858391]">
                How customers and partners can reach your business.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-5 p-5 md:grid-cols-2">
            <div>
              <label className={labelClass}>Business Email *</label>
              <div className="relative">
                <Mail
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-[#A6A4B0]"
                />
                <input
                  required
                  type="email"
                  value={form.email}
                  onChange={(e) => updateField('email', e.target.value)}
                  className={`${inputClass} pl-9`}
                  placeholder="business@example.com"
                />
              </div>
            </div>

            <div>
              <label className={labelClass}>Contact Number</label>
              <div className="relative">
                <Phone
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-[#A6A4B0]"
                />
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(e) => updateField('phone', e.target.value)}
                  className={`${inputClass} pl-9`}
                  placeholder="+91 00000 00000"
                />
              </div>
            </div>

            <div className="md:col-span-2">
              <label className={labelClass}>Website</label>
              <div className="relative">
                <Globe2
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-[#A6A4B0]"
                />
                <input
                  type="url"
                  value={form.website}
                  onChange={(e) => updateField('website', e.target.value)}
                  className={`${inputClass} pl-9`}
                  placeholder="https://example.com"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Business Address */}
        <section className="overflow-hidden rounded-xl border border-[#EAE9EF] bg-white">
          <div className="flex items-center gap-3 border-b border-[#F0EFF3] px-5 py-4">
            <div className="rounded-lg bg-[#EFF8F2] p-2 text-[#51976C]">
              <MapPin size={19} />
            </div>
            <div>
              <h2 className="font-semibold text-[#292735]">
                Business Address
              </h2>
              <p className="text-xs text-[#858391]">
                Your registered business location.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-5 p-5 md:grid-cols-2">
            <div className="md:col-span-2">
              <label className={labelClass}>Street Address</label>
              <input
                value={form.address}
                onChange={(e) => updateField('address', e.target.value)}
                className={inputClass}
                placeholder="Street address"
              />
            </div>

            <div>
              <label className={labelClass}>City</label>
              <input
                value={form.city}
                onChange={(e) => updateField('city', e.target.value)}
                className={inputClass}
                placeholder="City"
              />
            </div>

            <div>
              <label className={labelClass}>State / Province</label>
              <input
                value={form.state}
                onChange={(e) => updateField('state', e.target.value)}
                className={inputClass}
                placeholder="State"
              />
            </div>

            <div>
              <label className={labelClass}>Country</label>
              <input
                value={form.country}
                onChange={(e) => updateField('country', e.target.value)}
                className={inputClass}
                placeholder="Country"
              />
            </div>

            <div>
              <label className={labelClass}>Postal Code</label>
              <input
                value={form.postalCode}
                onChange={(e) => updateField('postalCode', e.target.value)}
                className={inputClass}
                placeholder="Postal code"
              />
            </div>
          </div>
        </section>

        {/* Preferences */}
        <section className="overflow-hidden rounded-xl border border-[#EAE9EF] bg-white">
          <div className="flex items-center gap-3 border-b border-[#F0EFF3] px-5 py-4">
            <div className="rounded-lg bg-[#FFF5EB] p-2 text-[#C58A4C]">
              <Globe2 size={19} />
            </div>
            <div>
              <h2 className="font-semibold text-[#292735]">
                Regional Preferences
              </h2>
              <p className="text-xs text-[#858391]">
                Configure how information is displayed in your dashboard.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-5 p-5 md:grid-cols-2">
            <div>
              <label className={labelClass}>Currency</label>
              <select
                value={form.currency}
                onChange={(e) => updateField('currency', e.target.value)}
                className={inputClass}
              >
                <option value="INR">INR – Indian Rupee</option>
                <option value="USD">USD – US Dollar</option>
                <option value="EUR">EUR – Euro</option>
                <option value="GBP">GBP – British Pound</option>
                <option value="AED">AED – UAE Dirham</option>
              </select>
            </div>

            <div>
              <label className={labelClass}>Timezone</label>
              <select
                value={form.timezone}
                onChange={(e) => updateField('timezone', e.target.value)}
                className={inputClass}
              >
                <option value="Asia/Kolkata">India (Asia/Kolkata)</option>
                <option value="UTC">UTC</option>
                <option value="Europe/London">London</option>
                <option value="America/New_York">New York</option>
                <option value="Asia/Dubai">Dubai</option>
              </select>
            </div>

            <div>
              <label className={labelClass}>Language</label>
              <select
                value={form.language}
                onChange={(e) => updateField('language', e.target.value)}
                className={inputClass}
              >
                <option value="English">English</option>
                <option value="Hindi">Hindi</option>
              </select>
            </div>

            <div>
              <label className={labelClass}>Date Format</label>
              <select
                value={form.dateFormat}
                onChange={(e) => updateField('dateFormat', e.target.value)}
                className={inputClass}
              >
                <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                <option value="YYYY-MM-DD">YYYY-MM-DD</option>
              </select>
            </div>
          </div>
        </section>

        {/* Notifications */}
        <section className="overflow-hidden rounded-xl border border-[#EAE9EF] bg-white">
          <div className="flex items-center gap-3 border-b border-[#F0EFF3] px-5 py-4">
            <div className="rounded-lg bg-[#FFF0F3] p-2 text-[#C76A83]">
              <Bell size={19} />
            </div>
            <div>
              <h2 className="font-semibold text-[#292735]">
                Notification Preferences
              </h2>
              <p className="text-xs text-[#858391]">
                Choose which email updates you want to receive.
              </p>
            </div>
          </div>

          <div className="divide-y divide-[#F0EFF3] px-5">
            {(
              [
                {
                  key: 'emailNotifications',
                  title: 'Email Notifications',
                  description: 'Receive important account and business updates.',
                },
                {
                  key: 'bookingNotifications',
                  title: 'Booking Updates',
                  description: 'Get notified about new and updated bookings.',
                },
                {
                  key: 'marketingNotifications',
                  title: 'Product Updates',
                  description: 'Receive platform news and product announcements.',
                },
              ] as const
            ).map((item) => (
              <div
                key={item.key}
                className="flex items-center justify-between gap-4 py-4"
              >
                <div>
                  <p className="text-sm font-medium text-[#393746]">
                    {item.title}
                  </p>
                  <p className="mt-0.5 text-xs text-[#858391]">
                    {item.description}
                  </p>
                </div>

                <button
                  type="button"
                  role="switch"
                  aria-checked={form[item.key]}
                  onClick={() => updateField(item.key, !form[item.key])}
                  className={`relative h-6 w-11 shrink-0 rounded-full transition ${
                    form[item.key] ? 'bg-[#292735]' : 'bg-[#D8D7DE]'
                  }`}
                >
                  <span
                    className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow-sm transition ${
                      form[item.key] ? 'left-[22px]' : 'left-0.5'
                    }`}
                  />
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Bottom Actions */}
        <div className="flex flex-col-reverse items-stretch justify-between gap-3 sm:flex-row sm:items-center">
          <p className="text-xs text-[#9694A0]">
            Changes are currently stored only in this page.
          </p>

          <button
            type="submit"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#292735] px-5 py-2.5 text-sm font-medium text-white transition hover:bg-[#403D50]"
          >
            <Save size={15} />
            Save Settings
          </button>
        </div>
      </form>
    </div>
  );
};

export default SettingsPage;
