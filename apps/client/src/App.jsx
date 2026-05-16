import { lazy, memo } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router';
import { ToastContainer } from 'react-toastify';

const LandingPage = lazy(
  () => import('@/features/landing/pages/LandingPage.jsx')
);

const AuthLayout = lazy(
  () => import('@/shared/Layouts/AuthLayout.wrapper.jsx')
);
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

          <Route element={AuthLayout}>
            <Route path="/app" element={<AppLayout />}></Route>
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
