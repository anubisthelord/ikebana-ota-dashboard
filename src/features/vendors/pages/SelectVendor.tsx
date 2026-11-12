
import { Navigate, useNavigate } from 'react-router-dom';
import { Building2, ArrowRight, LogOut } from 'lucide-react';

import { useAuth } from '../../auth/context/AuthContext';

export default function SelectVendor() {
  const { user, vendorMemberships, logout } = useAuth();
  const navigate = useNavigate();

  const approvedVendors = vendorMemberships.filter(
    (membership) =>
     membership.vendor.status === 'APPROVED'
  );

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (approvedVendors.length === 0) {
    return <Navigate to="/vendor-application" replace />;
  }

  if (approvedVendors.length === 1) {
    return (
      <Navigate
        to={`/vendor/${approvedVendors[0].vendor.id}`}
        replace
      />
    );
  }

  const handleLogout = async () => {
    await logout();
    navigate('/login', { replace: true });
  };

  return (
    <div className="min-h-screen bg-slate-50 px-5 py-12">
      <div className="mx-auto max-w-4xl">

        <div className="mb-10 flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold text-purple-600">
              IKEBANA OTA
            </p>

            <h1 className="mt-2 text-2xl font-semibold text-slate-900">
              Select your workspace
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              Choose the vendor account you want to manage.
            </p>
          </div>

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 rounded-md border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100"
          >
            <LogOut size={16} />
            Sign out
          </button>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {approvedVendors.map((membership) => (
            <button
              key={membership.vendor.id}
              onClick={() =>
                navigate(`/vendor/${membership.vendor.id}`)
              }
              className="group rounded-xl border border-slate-200 bg-white p-5 text-left shadow-sm transition hover:border-purple-300 hover:shadow-md"
            >
              <div className="flex items-start justify-between">
                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-purple-50 text-purple-600">
                  <Building2 size={22} />
                </div>

                <ArrowRight
                  size={18}
                  className="text-slate-400 transition group-hover:translate-x-1 group-hover:text-purple-600"
                />
              </div>

              <h2 className="mt-5 text-base font-semibold text-slate-800">
                {membership.vendor.name}
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                {membership.vendor.contactEmail}
              </p>

              <div className="mt-5 border-t border-slate-100 pt-4">
                <span className="text-xs font-medium uppercase tracking-wide text-slate-400">
                  Your role
                </span>

                <p className="mt-1 text-sm font-semibold text-slate-700">
                  {membership.role}
                </p>
              </div>
            </button>
          ))}
        </div>

        <p className="mt-8 text-center text-xs text-slate-400">
          Signed in as {user.email}
        </p>
      </div>
    </div>
  );
}
