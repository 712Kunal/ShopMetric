import { useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { AppSidebar } from '@/shared/core/AppSidebar.jsx';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { useIsMobile } from '../../hooks/use-mobile';
import { useSelector } from 'react-redux';
import {
  selectAccessToken,
  selectCurrentUser,
} from '@/features/auth/state/slices/userSlice';

function AppWrapper() {
  const isMobile = useIsMobile();
  const location = useLocation();
  const navigate = useNavigate();

  const userToken = useSelector(selectAccessToken);
  const user = useSelector(selectCurrentUser);

  const userRole = user?.role;

  useEffect(() => {
    if (
      (location.pathname === '/app' || location.pathname === '/app/') &&
      userToken
    ) {
      switch (userRole?.trim().toLowerCase()) {
        case 'admin':
          navigate('/app/admin/dashboard', { replace: true });
          break;
        case 'store_owner':
          navigate('/app/owner/dashboard', { replace: true });
          break;
        case 'user':
          navigate('/app/USER_STORE_LIST', { replace: true });
          break;
        default:
          navigate('/', { replace: true });
          break;
      }
    }
  }, [location.pathname, navigate, userRole, userToken]);

  return (
    <div className="w-full h-full flex overflow-hidden bg-background">
      <aside className="h-full">
        <SidebarProvider defaultOpen={false}>
          {isMobile && <SidebarTrigger />}
          <AppSidebar role={userRole} />
        </SidebarProvider>
      </aside>
      <main className="w-full h-full flex-grow overflow-hidden">
        <div className="w-full h-full rounded-lg bg-background p-10 overflow-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default AppWrapper;
