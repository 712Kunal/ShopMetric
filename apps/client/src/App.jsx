import { lazy, memo } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router';
import { ToastContainer } from 'react-toastify';

const LandingPage = lazy(
  () => import('@/features/landing/pages/LandingPage.jsx')
);

const AuthLayout = lazy(() => import('@/shared/Layouts/AuthLayout.wrapper'));
const AppLayout = lazy(() => import('@/shared/Layouts/AppLayout.wrapper.jsx'));
const PublicLayout = lazy(
  () => import('@/shared/Layouts/PublicLayout.wrapper.jsx')
);

const LoginPage = lazy(() => import('@/features/auth/pages/LoginPage.jsx'));
const RegisterPage = lazy(
  () => import('@/features/auth/pages/RegisterPage.jsx')
);

const NotFoundPage = lazy(() => import('@/shared/pages/NotFoundPage.jsx'));
const AccessDenied = lazy(() => import('@/shared/pages/AccessDeniedPage.jsx'));

// admin routes
const AdminDashboard = lazy(
  () => import('@/features/Roles/admin/pages/AdminDashboard')
);
const AdminUsers = lazy(
  () => import('@/features/Roles/admin/pages/AdminUsers')
);
const AdminCreateUser = lazy(
  () => import('@/features/Roles/admin/pages/AdminCreateUser')
);
const AdminUserDetail = lazy(
  () => import('@/features/Roles/admin/pages/AdminUserDetail')
);
const AdminStores = lazy(
  () => import('@/features/Roles/admin/pages/AdminStores')
);
const AdminCreateStore = lazy(
  () => import('@/features/Roles/admin/pages/AdminCreateStore')
);

// normal user routes
const StoresList = lazy(() => import('@/features/Roles/user/pages/StoresList'));
const StoreDetail = lazy(
  () => import('@/features/Roles/user/pages/StoreDetail')
);

// store owner routes
const OwnerDashboard = lazy(
  () => import('@/features/Roles/store owner/pages/OwnerDashboard')
);

function App() {
  return (
    <div className="w-screen h-screen flex flex-col bg-background overflow-hidden">
      <Router>
        <Routes>
          <Route element={<PublicLayout />}>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Route>

          <Route element={<AuthLayout />}>
            <Route path="/app" element={<AppLayout />}>
              {/* admin */}
              <Route path="admin/dashboard" element={<AdminDashboard />} />
              <Route path="admin/users" element={<AdminUsers />} />
              <Route path="admin/users/create" element={<AdminCreateUser />} />
              <Route path="admin/users/:id" element={<AdminUserDetail />} />
              <Route path="admin/stores" element={<AdminStores />} />
              <Route
                path="admin/stores/create"
                element={<AdminCreateStore />}
              />
              {/* <Route path="/update-password" element={<UpdatePassword />} /> */}

              {/* normal user */}
              <Route path="user/stores" element={<StoresList />} />
              <Route path="user/stores/:id" element={<StoreDetail />} />
              {/* <Route path="/update-password" element={<UpdatePassword />} /> */}

              {/* store owners */}
              <Route path="owner/dashboard" element={<OwnerDashboard />} />
              {/* <Route path="/update-password" element={<UpdatePassword />} /> */}
            </Route>
          </Route>

          <Route path="/unauthorized" element={<AccessDenied />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </Router>
    </div>
  );
}

export default memo(App);
