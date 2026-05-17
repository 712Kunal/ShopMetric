import { useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { AppSidebar } from '@/shared/core/AppSidebar.jsx';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { useIsMobile } from '../../hooks/use-mobile';
import { useSelector } from 'react-redux';
// import {
//   selectUserRole,
//   selectUserToken,
// } from '../../redux/Features/auth/userSlice';

function AppWrapper() {
  const isMobile = useIsMobile();
  const location = useLocation();
  const navigate = useNavigate();
  // const userRole = useSelector(selectUserRole);
  // const userToken = useSelector(selectUserToken);

  // useEffect(() => {
  //   if (
  //     (location.pathname === '/app' || location.pathname === '/app/') &&
  //     userToken
  //   ) {
  //     switch (userRole?.trim().toLowerCase()) {
  //       case 'hr':
  //         navigate('/app/HrDashboard', { replace: true });
  //         break;
  //       case 'admin':
  //         navigate('/app/admindashboard', { replace: true });
  //         break;
  //       case 'employee':
  //         navigate('/app/employeeDashboard', { replace: true });
  //         break;
  //       case 'team leader':
  //       case 'teamleader':
  //         navigate('/app/TLDashBoard', { replace: true });
  //         break;
  //       case 'projectmanager':
  //         navigate('/app/PMDashboard', { replace: true });
  //         break;
  //       default:
  //         navigate('/', { replace: true });
  //         break;
  //     }
  //   }
  // }, [location.pathname, navigate, userRole, userToken]);

  return (
    <div className="w-full h-full flex overflow-hidden bg-background">
      <aside className="h-full">
        <SidebarProvider defaultOpen={false}>
          {isMobile && <SidebarTrigger />}
          {/* <AppSidebar role={userRole} /> */}
          <AppSidebar  />
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
