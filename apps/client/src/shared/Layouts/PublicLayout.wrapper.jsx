import { Outlet, Navigate } from 'react-router';
import { useSelector } from 'react-redux';

import {
  selectIsAuthenticated,
  selectAccessToken,
  selectCurrentUser,
} from '@/features/auth/state/slices/userSlice';

import { ROUTES } from '@/shared/constants/routes.constants';

function PublicLayout() {
  const isUserAuthenticated = useSelector(selectIsAuthenticated);
  const userAccessToken = useSelector(selectAccessToken);
  const user = useSelector(selectCurrentUser);

  if (isUserAuthenticated && userAccessToken) {
    const role = user?.role;

    if (role === 'admin') {
      return <Navigate to={ROUTES.ADMIN_DASHBOARD} replace />;
    }

    if (role === 'store_owner') {
      return <Navigate to={ROUTES.OWNER_DASHBOARD} replace />;
    }

    if (role === 'user') {
      return <Navigate to={ROUTES.USER_STORE_LIST} replace />;
    }

  }

  return <Outlet />;
}

export default PublicLayout;
