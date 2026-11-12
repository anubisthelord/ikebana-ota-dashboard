
export type VendorRole = 'OWNER' | 'ADMIN' | 'STAFF';

export type VendorStatus =
    | 'PENDING'
    | 'APPROVED'
    | 'REJECTED'
    | 'SUSPENDED';

export interface Vendor {
    id: string;
    name: string;
    slug: string;
    status: VendorStatus;
    contactEmail: string;
    contactPhone: string | null;
    createdAt: string;
}
export interface VendorMembership {
    role: VendorRole;
    vendor: Vendor;
  }

export interface MyVendorsResponse {
    message: string;
    count: number;
    vendors: VendorMembership[];
}
