import { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Bot } from 'lucide-react';

// ==========================================
// LAZY LOADED COMPONENTS (CODE SPLITTING)
// ==========================================

const Header = lazy(() => import('./components/layout/header/Header'));

const Sidebar = lazy(() =>
  import('./components/layout/Sidebar').then((m) => ({
    default: m.Sidebar,
  }))
);

const Dashboard = lazy(() => import('./pages/Dashboard'));

const BackendStatus = lazy(
  () => import('./components/shared/BackendStatus')
);

const Login = lazy(() => import('./features/auth/pages/Login'));
const Hotels = lazy(() => import('./features/vendors/pages/Hotels'));
const ProtectedRoute = lazy(
  () => import('./features/auth/components/ProtectedRoute')
);

const RoleGuard = lazy(
  () => import('./features/auth/components/RoleGuard')
);

const SelectVendor = lazy(
  () => import('./features/vendors/pages/SelectVendor')
);

const PostLoginRedirect = lazy(
  () => import('./features/auth/components/PostLoginRedirect')
);

const VendorLayout = lazy(() => import('./layouts/VendorLayout'));

const VendorOverview = lazy(
  () => import('./features/vendors/pages/VendorOverview')
);

const AddHotel = lazy(() => import('./features/vendors/pages/AddHotel'));
const HotelDetails = lazy(
  () => import('./features/vendors/pages/HotelDetails'),
);

const EditHotel = lazy(
  () => import('./features/vendors/pages/EditHotel'),
);

const Rooms = lazy(() => import('./features/vendors/pages/Rooms'));

const AddRoomType = lazy(
  () => import('./features/vendors/pages/rooms/AddRoomType')
);

const RoomDetails = lazy(
  () => import('./features/vendors/pages/rooms/RoomDetails')
);

const EditRoomType = lazy(
  () => import('./features/vendors/pages/rooms/EditRoomType')
);

const Bookings = lazy(
  () => import('./features/vendors/pages/bookings/Bookings')
);

const BookingDetails = lazy(
  () => import('./features/vendors/pages/bookings/BookingDetails')
);

const Team = lazy(
  () => import('./features/vendors/pages/team/Team')
);

const Analytics = lazy(
  () => import('./features/vendors/pages/analytics/Analytics')
);
const Settings = lazy(() => import('./features/vendors/pages/control-management/Settings'));

const Notifications = lazy(
  () => import('./features/vendors/pages/control-management/Notifications'),
);

const SuperAdminLayout = lazy(
  () => import('./layouts/SuperAdminLayout')
);

const SuperAdminOverview = lazy(
  () => import('./features/super-admin/pages/SuperAdminOverview')
);

const VendorManagement = lazy(
  () => import('./features/super-admin/pages/VendorManagement')
);

const VendorDetails = lazy(
  () => import('./features/super-admin/pages/VendorDetails')
);

const SuperAdminHotels = lazy(
  () => import('./features/super-admin/pages/SuperAdminHotels')
);

const SuperAdminUsers = lazy(
  () => import('./features/super-admin/pages/SuperAdminUsers')
);

const SuperAdminBookings = lazy(
  () => import('./features/super-admin/pages/SuperAdminBookings')
);

const PlatformAnalytics = lazy(
  () => import('./features/super-admin/pages/PlatformAnalytics')
);
const PlatformSettings = lazy(
  () => import('./features/super-admin/pages/PlatformSettings')
);

const SuperAdminNotifications = lazy(
  () => import('./features/super-admin/pages/SuperAdminNotifications')
);

// ==========================================
// FALLBACK LOADER
// ==========================================

const PageLoader = () => (
  <div className="flex min-h-screen flex-col items-center justify-center bg-[#F8F7FC] font-sans select-none">
    <div className="relative flex flex-col items-center">
      <div className="absolute -top-2 inset-0 mx-auto h-16 w-16 rounded-full bg-purple-400 opacity-20 blur-2xl animate-pulse" />

      <div className="relative z-10 flex h-16 w-16 items-center justify-center rounded-2xl border border-purple-100 bg-white shadow-sm animate-bounce">
        <Bot className="h-8 w-8 text-purple-600" />
      </div>

      <div className="mt-4 h-2 w-10 rounded-[100%] bg-purple-900/10 animate-[ping_1.5s_ease-in-out_infinite]" />
    </div>

    <div className="mt-8 flex flex-col items-center gap-1">
      <p className="text-[14px] font-semibold tracking-tight text-slate-700">
        Loading module...
      </p>

      <div className="mt-1 flex gap-1">
        <span className="h-1.5 w-1.5 rounded-full bg-purple-400 animate-bounce [animation-delay:-0.3s]" />
        <span className="h-1.5 w-1.5 rounded-full bg-purple-500 animate-bounce [animation-delay:-0.15s]" />
        <span className="h-1.5 w-1.5 rounded-full bg-purple-600 animate-bounce" />
      </div>
    </div>
  </div>
);

// ==========================================
// PLACEHOLDER COMPONENT
// ==========================================

interface PlaceholderPageProps {
  title: string;
  description?: string;
}

function PlaceholderPage({
  title,
  description = 'This module is currently under development.',
}: PlaceholderPageProps) {
  return (
    <div className="flex min-h-full items-center justify-center bg-slate-50 p-6">
      <div className="w-full max-w-md rounded-xl border border-slate-200 bg-white p-8 text-center shadow-sm">
        <h1 className="text-xl font-semibold text-slate-800">
          {title}
        </h1>

        <p className="mt-2 text-sm text-slate-500">
          {description}
        </p>

        <p className="mt-5 text-xs font-medium text-slate-400">
          This module is under development.
        </p>
      </div>
    </div>
  );
}

// ==========================================
// MAIN APP
// ==========================================

export default function App() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>

        {/* ==================================
            PUBLIC LOGIN
        ================================== */}

        <Route
          path="/login"
          element={<Login />}
        />

        {/* ==================================
            CENTRAL POST-LOGIN REDIRECT
        ================================== */}

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <PostLoginRedirect />
            </ProtectedRoute>
          }
        />

        {/* ==================================
            OLD DASHBOARD PROTOTYPE
        ================================== */}

        <Route
          path="/dashboard-preview"
          element={
            <ProtectedRoute>
              <div className="flex h-screen w-screen overflow-hidden bg-slate-50 font-sans">
                <Sidebar />

                <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
                  <Header
                    onSearch={(q) => console.log('Searching:', q)}
                  />

                  <main className="flex-1 overflow-y-auto">
                    <Dashboard />
                  </main>
                </div>

                <BackendStatus />
              </div>
            </ProtectedRoute>
          }
        />

        {/* ==================================
            SUPER ADMIN PORTAL
        ================================== */}

        <Route
          path="/super-admin"
          element={
            <ProtectedRoute>
              <RoleGuard allowedGlobalRoles={['SUPER_ADMIN']}>
                <SuperAdminLayout />
              </RoleGuard>
            </ProtectedRoute>
          }
        >
          <Route
            index
            element={<Navigate to="overview" replace />}
          />

          <Route
            path="overview"
            element={<SuperAdminOverview />}
          />

          <Route
            path="vendors"
            element={<VendorManagement />}
          />
          <Route path="vendors/:vendorId" element={<VendorDetails />} />
          <Route path="hotels" element={<SuperAdminHotels />} />
          <Route path="users" element={<SuperAdminUsers />} />
          <Route path="bookings" element={<SuperAdminBookings />} />
          <Route path="analytics" element={<PlatformAnalytics />} />
          <Route path="settings" element={<PlatformSettings />} />
          <Route
            path="notifications"
            element={<SuperAdminNotifications />}
          />

          {/* Unknown super-admin routes — must be LAST */}
          <Route
            path="*"
            element={
              <Navigate to="/super-admin/overview" replace />
            }
          />
        </Route>

        {/* ==================================
            VENDOR PORTAL
        ================================== */}

        <Route
          path="/vendor/:vendorId"
          element={
            <ProtectedRoute>
              <RoleGuard allowedVendorRoles={['OWNER', 'ADMIN', 'STAFF']}>
                <VendorLayout />
              </RoleGuard>
            </ProtectedRoute>
          }
        >
          {/* Default vendor route */}

          <Route
            index
            element={<Navigate to="overview" replace />}
          />

          {/* Vendor overview */}

          <Route
            path="overview"
            element={<VendorOverview />}
          />

          {/* Hotel management */}
          <Route path="hotels" element={<Hotels />} />
          <Route path="hotels/new" element={<AddHotel />} />
          <Route path="hotels/:hotelId/edit" element={<EditHotel />} />
          <Route path="hotels/:hotelId" element={<HotelDetails />} />

          {/* Room management */}
          <Route path="rooms" element={<Rooms />} />
          <Route path="rooms/new" element={<AddRoomType />} />
          <Route path="rooms/:roomId" element={<RoomDetails />} />
          <Route path="rooms/:roomId/edit" element={<EditRoomType />} />

          {/* Booking management (single definition — real component) */}
          <Route path="bookings" element={<Bookings />} />
          <Route path="bookings/:bookingId" element={<BookingDetails />} />

          {/* Team management (single definition — real component) */}
          <Route path="team" element={<Team />} />

          {/* Analytics (single definition — real component) */}
          <Route path="analytics" element={<Analytics />} />

          {/* Settings (single definition — real component) */}
          <Route path="settings" element={<Settings />} />

          {/* Notifications (single definition — real component) */}
          <Route path="notifications" element={<Notifications />} />

          {/* Unknown vendor routes — must be LAST */}
          <Route
            path="*"
            element={<Navigate to="overview" replace />}
          />
        </Route>

        {/* ==================================
            VENDOR SELECTION
        ================================== */}

        <Route
          path="/select-vendor"
          element={
            <ProtectedRoute>
              <SelectVendor />
            </ProtectedRoute>
          }
        />

        {/* ==================================
            VENDOR APPLICATION
        ================================== */}

        <Route
          path="/vendor-application"
          element={
            <ProtectedRoute>
              <PlaceholderPage
                title="Become a Vendor"
                description="Submit your application to join Ikebana OTA."
              />
            </ProtectedRoute>
          }
        />

        {/* ==================================
            PENDING APPLICATION
        ================================== */}

        <Route
          path="/vendor-application/pending"
          element={
            <ProtectedRoute>
              <PlaceholderPage
                title="Application Under Review"
                description="Your vendor application is waiting for Super Admin approval."
              />
            </ProtectedRoute>
          }
        />

        {/* ==================================
            REJECTED APPLICATION
        ================================== */}

        <Route
          path="/vendor-application/rejected"
          element={
            <ProtectedRoute>
              <PlaceholderPage
                title="Application Rejected"
                description="Your vendor application was not approved."
              />
            </ProtectedRoute>
          }
        />

        {/* ==================================
            SUSPENDED ACCOUNT
        ================================== */}

        <Route
          path="/account-suspended"
          element={
            <ProtectedRoute>
              <PlaceholderPage
                title="Account Suspended"
                description="Your account is currently suspended. Please contact support."
              />
            </ProtectedRoute>
          }
        />

        {/* ==================================
            UNKNOWN ROUTES
        ================================== */}

        <Route
          path="*"
          element={<Navigate to="/" replace />}
        />

      </Routes>
    </Suspense>
  );
}