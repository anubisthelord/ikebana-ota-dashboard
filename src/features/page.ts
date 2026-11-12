// 4. features/ — Actual business functionality
// Most important folder
// This is where most of our dashboard development will happen.

// Instead of grouping everything by file type, we group code by business functionality.
// features/
// ├── auth/
// ├── vendor/
// ├── team/
// ├── admin/
// └── users/


// Let's understand each feature.
// A. auth/ — Authentication
// Handles login, registration and authentication-related functionality.
// auth/
// ├── pages/
// │   ├── LoginPage.tsx
// │   └── RegisterPage.tsx
// │
// ├── components/
// │   └── LoginForm.tsx
// │
// ├── services/
// │   └── auth.service.ts
// │
// └── types/
//     └── auth.types.ts


// Our existing backend provides:
// - POST /api/v1/auth/register
// - POST /api/v1/auth/login
// - Refresh-token endpoint.
// - Logout endpoint.
// We'll connect these APIs here.
// B. vendor/ — Vendor management
// This will be one of the largest modules.
// vendor/
// ├── pages/
// │   ├── VendorDashboardPage.tsx
// │   ├── VendorListPage.tsx
// │   ├── CreateVendorPage.tsx
// │   └── VendorProfilePage.tsx
// │
// ├── components/
// │   ├── VendorCard.tsx
// │   ├── VendorForm.tsx
// │   └── VendorStatus.tsx
// │
// ├── services/
// │   └── vendor.service.ts
// │
// └── types/
//     └── vendor.types.ts


// What will happen here?
// 1. User registers or logs in.
// 2. User creates a vendor.
// 3. Backend saves the vendor.
// 4. Vendor appears in My Vendors.
// 5. OWNER and ADMIN can update vendor information.
// 6. Dashboard displays approval status.
// This connects directly to the vendor APIs we already implemented.
// C. team/ — Team management
// team/
// ├── pages/
// │   └── TeamPage.tsx
// │
// ├── components/
// │   ├── TeamTable.tsx
// │   ├── InviteMemberModal.tsx
// │   └── MemberRoleSelect.tsx
// │
// └── services/
//     └── team.service.ts


// Responsibilities:
// - View team members.
// - Invite existing users.
// - Accept invitations.
// - Change member roles.
// - Remove team members.
// - Display invitation status.
// We'll integrate your existing team APIs.
// D. admin/ — Super-admin functionality
// admin/
// ├── pages/
// │   ├── AdminDashboardPage.tsx
// │   ├── VendorApprovalsPage.tsx
// │   └── AllVendorsPage.tsx
// │
// ├── components/
// │   ├── ApprovalTable.tsx
// │   ├── VendorReviewModal.tsx
// │   └── RejectionModal.tsx
// │
// └── services/
//     └── admin.service.ts


// Responsibilities:
// - View platform overview.
// - See pending vendor applications.
// - Review vendor information.
// - Approve applications.
// - Reject applications with a reason.
// - View vendor records.
// This module will only be accessible to SUPER_ADMIN accounts.
// E. users/ — User management
// users/
// ├── pages/
// │   └── ProfilePage.tsx
// │
// ├── components/
// │   └── ProfileForm.tsx
// │
// └── services/
//     └── user.service.ts


// Responsibilities:
// - Display logged-in user details.
// - Edit profile if we add the corresponding backend API later.
// - Display account information.
// Our existing /users/me endpoint will be used to fetch the profile.