import type { AuthUser } from '../types/auth.types';
import type { VendorMembership } from '../../vendors/types/vendor.types';

export function getPostLoginPath(
  user: AuthUser,
  memberships: VendorMembership[],
): string {
  if (user.status !== 'ACTIVE') {
    return '/account-suspended';
  }

  if (user.globalRole === 'SUPER_ADMIN') {
    return '/super-admin';
  }

  const approvedVendors = memberships.filter(
    (membership) => membership.vendor.status === 'APPROVED',
  );

  if (approvedVendors.length === 1) {
    return `/vendor/${approvedVendors[0].vendor.id}`;
  }

  if (approvedVendors.length > 1) {
    return '/select-vendor';
  }

  const hasPendingApplication = memberships.some(
    (membership) => membership.vendor.status === 'PENDING',
  );

  if (hasPendingApplication) {
    return '/vendor-application/pending';
  }

  const hasRejectedApplication = memberships.some(
    (membership) => membership.vendor.status === 'REJECTED',
  );

  if (hasRejectedApplication) {
    return '/vendor-application/rejected';
  }

  return '/vendor-application';
}