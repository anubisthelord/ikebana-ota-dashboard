
import React, { useState } from 'react';
import {
  Settings,
  Building2,
  CalendarDays,
  Globe,
  Save,
  RotateCcw,
  ShieldCheck,
  Bell,
} from 'lucide-react';

interface PlatformSettingsState {
  platformName: string;
  supportEmail: string;
  supportPhone: string;
  defaultCurrency: string;
  timezone: string;
  defaultCommission: number;
  cancellationWindow: number;
  bookingReferencePrefix: string;
  requireVendorApproval: boolean;
  allowInstantBooking: boolean;
  sendBookingEmails: boolean;
  sendVendorEmails: boolean;
}

const defaultSettings: PlatformSettingsState = {
  platformName: 'Ikebana OTA',
  supportEmail: 'support@ikebana.com',
  supportPhone: '+91 98765 43210',
  defaultCurrency: 'INR',
  timezone: 'Asia/Kolkata',
  defaultCommission: 15,
  cancellationWindow: 24,
  bookingReferencePrefix: 'IKE',
  requireVendorApproval: true,
  allowInstantBooking: true,
  sendBookingEmails: true,
  sendVendorEmails: true,
};

const inputClass =
  'w-full rounded-xl border border-[#E9E7EF] bg-white px-4 py-3 text-sm text-[#272435] outline-none transition focus:border-[#9B8BC4] focus:ring-2 focus:ring-[#9B8BC4]/10';

const labelClass =
  'mb-2 block text-sm font-medium text-[#393548]';

const PlatformSettings: React.FC = () => {
  const [settings, setSettings] =
    useState<PlatformSettingsState>(defaultSettings);

  const [saved, setSaved] = useState(false);

  const updateSetting = <K extends keyof PlatformSettingsState>(
    key: K,
    value: PlatformSettingsState[K]
  ) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
    setSaved(false);
  };

  const handleSave = () => {
    // Frontend demonstration only. No backend persistence.
    setSaved(true);
  };

  const handleReset = () => {
    setSettings(defaultSettings);
    setSaved(false);
  };

  const Toggle = ({
    label,
    description,
    checked,
    onChange,
  }: {
    label: string;
    description: string;
    checked: boolean;
    onChange: (value: boolean) => void;
  }) => (
    <div className="flex items-center justify-between gap-4 py-4">
      <div>
        <p className="text-sm font-medium text-[#302D40]">{label}</p>
        <p className="mt-1 text-xs text-[#9692A3]">{description}</p>
      </div>

      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={`relative h-6 w-11 shrink-0 rounded-full transition ${
          checked ? 'bg-[#8068B3]' : 'bg-[#D8D5E0]'
        }`}
      >
        <span
          className={`absolute top-1 h-4 w-4 rounded-full bg-white shadow-sm transition ${
            checked ? 'left-6' : 'left-1'
          }`}
        />
      </button>
    </div>
  );

  return (
    <div className="mx-auto max-w-[1500px] space-y-6 pb-8">
      {/* Page heading */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <div className="mb-2 flex items-center gap-2 text-xs text-[#9995A6]">
            <Settings size={14} />
            <span>Super Admin</span>
            <span>/</span>
            <span>Platform Settings</span>
          </div>

          <h1 className="text-2xl font-semibold tracking-tight text-[#272435]">
            Platform Settings
          </h1>

          <p className="mt-1 text-sm text-[#9290A0]">
            Manage your OTA platform configuration and default policies.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleReset}
            className="flex items-center gap-2 rounded-xl border border-[#E9E7EF] bg-white px-4 py-2.5 text-sm font-medium text-[#666174] transition hover:bg-[#F8F7FC]"
          >
            <RotateCcw size={15} />
            Reset
          </button>

          <button
            type="button"
            onClick={handleSave}
            className="flex items-center gap-2 rounded-xl bg-[#8068B3] px-5 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-[#7058A3]"
          >
            <Save size={15} />
            Save Changes
          </button>
        </div>
      </div>

      {saved && (
        <div className="rounded-xl border border-[#D7EBDD] bg-[#F1F8F3] px-4 py-3 text-sm text-[#39764A]">
          Settings saved in this session. They will reset when the page is refreshed.
        </div>
      )}

      {/* Platform identity */}
      <section className="rounded-2xl border border-[#ECEAF1] bg-white p-5 sm:p-6">
        <div className="mb-6 flex items-center gap-3">
          <div className="rounded-xl bg-[#F1EDF8] p-2.5 text-[#8068B3]">
            <Building2 size={19} />
          </div>
          <div>
            <h2 className="font-semibold text-[#302D40]">Platform Identity</h2>
            <p className="mt-0.5 text-xs text-[#9995A6]">
              Basic information about your OTA platform.
            </p>
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <label className={labelClass}>Platform Name</label>
            <input
              className={inputClass}
              value={settings.platformName}
              onChange={(e) => updateSetting('platformName', e.target.value)}
            />
          </div>

          <div>
            <label className={labelClass}>Support Email</label>
            <input
              type="email"
              className={inputClass}
              value={settings.supportEmail}
              onChange={(e) => updateSetting('supportEmail', e.target.value)}
            />
          </div>

          <div>
            <label className={labelClass}>Support Phone</label>
            <input
              className={inputClass}
              value={settings.supportPhone}
              onChange={(e) => updateSetting('supportPhone', e.target.value)}
            />
          </div>

          <div>
            <label className={labelClass}>Booking Reference Prefix</label>
            <input
              className={inputClass}
              value={settings.bookingReferencePrefix}
              onChange={(e) =>
                updateSetting('bookingReferencePrefix', e.target.value.toUpperCase())
              }
            />
          </div>
        </div>
      </section>

      {/* Regional settings */}
      <section className="rounded-2xl border border-[#ECEAF1] bg-white p-5 sm:p-6">
        <div className="mb-6 flex items-center gap-3">
          <div className="rounded-xl bg-[#EDF3FA] p-2.5 text-[#5C83B5]">
            <Globe size={19} />
          </div>
          <div>
            <h2 className="font-semibold text-[#302D40]">Regional Preferences</h2>
            <p className="mt-0.5 text-xs text-[#9995A6]">
              Configure the default currency and timezone.
            </p>
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <label className={labelClass}>Default Currency</label>
            <select
              className={inputClass}
              value={settings.defaultCurrency}
              onChange={(e) => updateSetting('defaultCurrency', e.target.value)}
            >
              <option value="INR">INR – Indian Rupee</option>
              <option value="USD">USD – US Dollar</option>
              <option value="EUR">EUR – Euro</option>
              <option value="GBP">GBP – British Pound</option>
              <option value="AED">AED – UAE Dirham</option>
            </select>
          </div>

          <div>
            <label className={labelClass}>Platform Timezone</label>
            <select
              className={inputClass}
              value={settings.timezone}
              onChange={(e) => updateSetting('timezone', e.target.value)}
            >
              <option value="Asia/Kolkata">India Standard Time (IST)</option>
              <option value="Asia/Dubai">Gulf Standard Time (GST)</option>
              <option value="Europe/London">Greenwich Mean Time (GMT)</option>
              <option value="America/New_York">Eastern Time (ET)</option>
              <option value="UTC">Coordinated Universal Time (UTC)</option>
            </select>
          </div>
        </div>
      </section>

      {/* Booking policies */}
      <section className="rounded-2xl border border-[#ECEAF1] bg-white p-5 sm:p-6">
        <div className="mb-6 flex items-center gap-3">
          <div className="rounded-xl bg-[#FDF2E9] p-2.5 text-[#C48A50]">
            <CalendarDays size={19} />
          </div>
          <div>
            <h2 className="font-semibold text-[#302D40]">Booking Policies</h2>
            <p className="mt-0.5 text-xs text-[#9995A6]">
              Set default booking behaviour across the platform.
            </p>
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <label className={labelClass}>Default Cancellation Window</label>
            <div className="relative">
              <input
                type="number"
                min={0}
                max={720}
                className={inputClass}
                value={settings.cancellationWindow}
                onChange={(e) =>
                  updateSetting('cancellationWindow', Number(e.target.value))
                }
              />
              <span className="absolute right-4 top-3 text-sm text-[#9995A6]">
                Hours
              </span>
            </div>
            <p className="mt-2 text-xs text-[#9995A6]">
              Default policy value. Individual hotel policies may override it.
            </p>
          </div>

          <div>
            <label className={labelClass}>Default Vendor Commission</label>
            <div className="relative">
              <input
                type="number"
                min={0}
                max={100}
                step={0.5}
                className={inputClass}
                value={settings.defaultCommission}
                onChange={(e) =>
                  updateSetting('defaultCommission', Number(e.target.value))
                }
              />
              <span className="absolute right-4 top-3 text-sm text-[#9995A6]">
                %
              </span>
            </div>
            <p className="mt-2 text-xs text-[#9995A6]">
              Default commission for newly onboarded vendors.
            </p>
          </div>
        </div>

        <div className="mt-5 divide-y divide-[#F0EEF4] border-t border-[#F0EEF4]">
          <Toggle
            label="Allow Instant Booking"
            description="Allow guests to confirm eligible bookings immediately."
            checked={settings.allowInstantBooking}
            onChange={(value) => updateSetting('allowInstantBooking', value)}
          />

          <Toggle
            label="Require Vendor Approval"
            description="New vendor applications must be reviewed by a Super Admin."
            checked={settings.requireVendorApproval}
            onChange={(value) => updateSetting('requireVendorApproval', value)}
          />
        </div>
      </section>

      {/* Notifications */}
      <section className="rounded-2xl border border-[#ECEAF1] bg-white p-5 sm:p-6">
        <div className="mb-4 flex items-center gap-3">
          <div className="rounded-xl bg-[#FCEEF2] p-2.5 text-[#C16D8A]">
            <Bell size={19} />
          </div>
          <div>
            <h2 className="font-semibold text-[#302D40]">Email Notifications</h2>
            <p className="mt-0.5 text-xs text-[#9995A6]">
              Configure platform email notification preferences.
            </p>
          </div>
        </div>

        <div className="divide-y divide-[#F0EEF4]">
          <Toggle
            label="Booking Notifications"
            description="Send email notifications for booking-related events."
            checked={settings.sendBookingEmails}
            onChange={(value) => updateSetting('sendBookingEmails', value)}
          />

          <Toggle
            label="Vendor Notifications"
            description="Send emails for vendor applications and account updates."
            checked={settings.sendVendorEmails}
            onChange={(value) => updateSetting('sendVendorEmails', value)}
          />
        </div>
      </section>

      {/* Security note */}
      <div className="flex items-start gap-3 rounded-2xl border border-[#ECEAF1] bg-[#F8F7FC] p-4">
        <ShieldCheck size={19} className="mt-0.5 shrink-0 text-[#8068B3]" />
        <div>
          <p className="text-sm font-medium text-[#393548]">
            Platform-wide configuration
          </p>
          <p className="mt-1 text-xs leading-5 text-[#9290A0]">
            These are default platform preferences. Vendor-specific settings,
            hotel policies, payment gateway credentials, and access permissions
            should be managed separately.
          </p>
        </div>
      </div>

      {/* Bottom actions */}
      <div className="flex justify-end gap-3">
        <button
          type="button"
          onClick={handleReset}
          className="rounded-xl border border-[#E9E7EF] bg-white px-4 py-2.5 text-sm font-medium text-[#666174] hover:bg-[#F8F7FC]"
        >
          Reset
        </button>
        <button
          type="button"
          onClick={handleSave}
          className="flex items-center gap-2 rounded-xl bg-[#8068B3] px-5 py-2.5 text-sm font-medium text-white hover:bg-[#7058A3]"
        >
          <Save size={15} />
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default PlatformSettings;
