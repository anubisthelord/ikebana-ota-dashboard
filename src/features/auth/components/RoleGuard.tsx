
import { Navigate, useParams } from 'react-router-dom';

import { useAuth } from '../context/AuthContext';
import { getPostLoginPath } from '../utils/getPostLoginPath';

import type { GlobalRole } from '../types/auth.types';
import type { VendorRole } from '../../vendors/types/vendor.types';

interface RoleGuardProps {
  children: React.ReactNode;
  allowedGlobalRoles?: GlobalRole[];
  allowedVendorRoles?: VendorRole[];
}

export default function RoleGuard({
  children,
  allowedGlobalRoles = [],
  allowedVendorRoles = [],
}: RoleGuardProps) {
  const { user, vendorMemberships, isLoading } = useAuth();
  const { vendorId } = useParams<{ vendorId: string }>();

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center text-slate-500">
        Checking permissions...
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const hasGlobalAccess =
    user.status === 'ACTIVE' &&
    allowedGlobalRoles.includes(user.globalRole);

  const hasVendorAccess = vendorMemberships.some(
    (membership) =>
        user.status === 'ACTIVE' &&
    membership.vendor.status === 'APPROVED' &&
      (!vendorId || membership.vendor.id === vendorId) &&
      allowedVendorRoles.includes(membership.role),
  );

  if (!hasGlobalAccess && !hasVendorAccess) {
    return (
      <Navigate
        to={getPostLoginPath(user, vendorMemberships)}
        replace
      />
    );
  }

  return <>{children}</>;
}
