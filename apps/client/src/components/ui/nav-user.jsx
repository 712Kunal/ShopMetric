'use client';

import { ChevronsUpDown, LogOut } from 'lucide-react';

import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/shared/constants/routes.constants';

import { useLogoutMutation } from '@/features/auth/state/redux-api/Authentication.api';
import {
  selectCurrentUser,
  clearCredentials,
} from '@/features/auth/state/slices/userSlice';

export function NavUser() {
  const [logout] = useLogoutMutation();
  const { isMobile } = useSidebar();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const Currentuser = useSelector(selectCurrentUser);
  const role = Currentuser?.role;

  const handleLogout = async () => {
    try {
      await logout().unwrap();

      dispatch(clearCredentials());

      navigate(ROUTES.LANDING_PAGE);

      toast.success('User logged out successfully 🎉', {
        position: 'top-right',
        autoClose: 1000,
        theme: 'dark',
      });
    } catch (error) {
      console.error('Logout failed:', error);

      toast.error('Logout Failed 😕', {
        position: 'top-right',
        autoClose: 1000,
        theme: 'dark',
      });
    }
  };

  const getUserInitials = (name) => {
    if (!name) return 'U';
    return name
      .split(' ')
      .map((word) => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const formatRole = (role) => {
    if (!role) return 'User';
    return role
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-transparent data-[state=open]:text-sidebar-accent-foreground"
            >
              <>
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage
                    src={Currentuser?.avatar || 'https://github.com/shadcn.png'}
                    alt={Currentuser?.name || 'user'}
                  />
                  <AvatarFallback className="rounded-lg">
                    {getUserInitials(Currentuser?.name)}
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate text-white font-semibold">
                    {Currentuser?.name || 'User'}
                    {'User'}
                  </span>
                  <span className="truncate text-white text-xs">
                    {formatRole('admin')}
                  </span>
                </div>
              </>

              <ChevronsUpDown className="ml-auto size-4 text-white cursor-pointer" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg shadow-2xl shadow-black p-2"
            side={isMobile ? 'bottom' : 'right'}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm bg-background rounded-lg">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage
                    src={Currentuser?.avatar || 'https://github.com/shadcn.png'}
                    alt={Currentuser?.name || 'user'}
                  />
                  <AvatarFallback className="rounded-lg">
                    {getUserInitials(Currentuser?.name)}
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">
                    {Currentuser?.name || 'User'}
                  </span>
                  <span className="truncate text-xs">
                    {role || 'No designation'}
                  </span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer" onClick={handleLogout}>
              <LogOut />
              <span className="cursor-pointer">Logout</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
