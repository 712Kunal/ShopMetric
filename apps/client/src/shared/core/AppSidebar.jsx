import {
  LayoutDashboard,
  Store,
  Users,
  UserPlus,
  Star,
  KeyRound,
  ChevronRight,
  ShoppingBag,
  UserCog,
  BarChart3,
  PlusCircle,
} from 'lucide-react';

import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarFooter,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarTrigger,
  useSidebar,
} from '@/components/ui/sidebar';

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { NavUser } from '@/components/ui/nav-user';
import { ROUTES } from '@/shared/constants/routes.constants';

// import { clearCredentials, selectUser, selectRole } from '@/store/authSlice';

// ─── Menu definitions per role ────────────────────────────────────────────────

const AdminMenuItems = [
  {
    title: 'Dashboard',
    path: ROUTES.ADMIN_DASHBOARD,
    icon: <LayoutDashboard size={18} />,
  },
  {
    // Collapsible group
    title: 'User Management',
    icon: <Users size={18} />,
    items: [
      {
        title: 'All Users',
        path: ROUTES.ADMIN_USERS,
        icon: <UserCog size={18} />,
      },
      {
        title: 'Add User',
        path: ROUTES.ADMIN_CREATE_USER,
        icon: <UserPlus size={18} />,
      },
    ],
  },
  {
    // Collapsible group
    title: 'Store Management',
    icon: <ShoppingBag size={18} />,
    items: [
      {
        title: 'All Stores',
        path: ROUTES.ADMIN_STORES,
        icon: <Store size={18} />,
      },
      {
        title: 'Add Store',
        path: ROUTES.ADMIN_CREATE_STORE,
        icon: <PlusCircle size={18} />,
      },
    ],
  },
];

const UserMenuItems = [
  {
    title: 'Browse Stores',
    path: ROUTES.USER_STORE_LIST,
    icon: <Store size={18} />,
  },
  {
    title: 'My Ratings',
    path: ROUTES.USER_STORE_DETAIL,
    icon: <Star size={18} />,
  },
];

const OwnerMenuItems = [
  {
    title: 'My Store Dashboard',
    path: ROUTES.OWNER_DASHBOARD,
    icon: <BarChart3 size={18} />,
  },
];

const SharedMenuItems = [
  {
    title: 'Update Password',
    path: '/update-password',
    icon: <KeyRound size={18} />,
  },
];

const roleDisplay = {
  admin: { label: 'System Administrator', color: '#f59e0b' },
  user: { label: 'Normal User', color: '#34d399' },
  store_owner: { label: 'Store Owner', color: '#60a5fa' },
};

export function AppSidebar() {
  const { open } = useSidebar();
  const location = useLocation();

  // const user = useSelector(selectUser);
  // const role = useSelector(selectRole);

  const isActive = (path) => location.pathname === path;

  const renderItems = (items) =>
    items.map((item) => {
      // Collapsible group
      if (item.items?.length) {
        const isGroupActive = item.items.some((sub) =>
          location.pathname.startsWith(sub.path)
        );
        return (
          <Collapsible
            key={item.title}
            defaultOpen={isGroupActive}
            className="group/collapsible"
          >
            <SidebarMenuItem>
              <CollapsibleTrigger asChild>
                <SidebarMenuButton
                  className={`
                    flex items-center gap-3 w-full px-3 py-2 rounded-lg
                    text-sm font-medium transition-all duration-150
                    text-white/80 hover:text-white hover:bg-white/10
                    ${isGroupActive ? 'text-white bg-white/10' : ''}
                  `}
                >
                  <span className="text-white/70">{item.icon}</span>
                  {open && (
                    <>
                      <span className="flex-1 text-left">{item.title}</span>
                      <ChevronRight
                        size={14}
                        className="text-white/50 transition-transform duration-200
                                   group-data-[state=open]/collapsible:rotate-90"
                      />
                    </>
                  )}
                </SidebarMenuButton>
              </CollapsibleTrigger>

              <CollapsibleContent>
                <SidebarMenu className="ml-4 mt-1 border-l border-white/10 pl-3 space-y-0.5">
                  {item.items.map((sub) => (
                    <SidebarMenuItem key={sub.title}>
                      <SidebarMenuButton asChild>
                        <Link
                          to={sub.path}
                          className={`
                            flex items-center gap-3 px-3 py-2 rounded-lg
                            text-sm transition-all duration-150
                            ${
                              isActive(sub.path)
                                ? 'bg-white/20 text-white font-medium'
                                : 'text-white/60 hover:text-white hover:bg-white/10'
                            }
                          `}
                        >
                          <span>{sub.icon}</span>
                          {open && <span>{sub.title}</span>}
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </CollapsibleContent>
            </SidebarMenuItem>
          </Collapsible>
        );
      }

      // Regular item
      return (
        <SidebarMenuItem key={item.title}>
          <SidebarMenuButton asChild>
            <Link
              to={item.path}
              className={`
                flex items-center gap-3 px-3 py-2 rounded-lg
                text-sm font-medium transition-all duration-150
                ${
                  isActive(item.path)
                    ? 'bg-white/20 text-white shadow-sm'
                    : 'text-white/70 hover:text-white hover:bg-white/10'
                }
              `}
            >
              <span
                className={isActive(item.path) ? 'text-white' : 'text-white/60'}
              >
                {item.icon}
              </span>
              {open && <span>{item.title}</span>}
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      );
    });

  const primaryItems =
    {
      admin: AdminMenuItems,
      user: UserMenuItems,
      store_owner: OwnerMenuItems,
    }['store_owner'] ?? [];

  const { label: roleLabel, color: roleColor } = roleDisplay['store_owner'] ?? {
    label: 'Unknown',
    color: '#9ca3af',
  };

  return (
    <Sidebar side="left" variant="floating" collapsible="icon">
      {/* ── Header ── */}
      <SidebarHeader className="flex flex-row items-center justify-between px-4 py-4 border-b border-white/10">
        {open && (
          <div className="flex items-center gap-2">
            <div
              style={{
                background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
              }}
              className="w-8 h-8 rounded-lg flex items-center justify-center shadow-lg"
            >
              <ShoppingBag size={16} className="text-white" />
            </div>
            <span className="text-white font-semibold text-base tracking-tight">
              ShopMetric
            </span>
          </div>
        )}
        <SidebarTrigger className="text-white/60 hover:text-white" />
      </SidebarHeader>

      {/* ── Main nav ── */}
      <SidebarContent className="px-2 py-3">
        {/* Primary role-based items */}
        <SidebarGroup>
          {open && (
            <SidebarGroupLabel className="text-white/30 text-[10px] uppercase tracking-widest px-3 mb-1">
              Main Menu
            </SidebarGroupLabel>
          )}
          <SidebarGroupContent>
            <SidebarMenu className="space-y-0.5">
              {renderItems(primaryItems)}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Shared items (password update) */}
        <SidebarGroup className="mt-4">
          {open && (
            <SidebarGroupLabel className="text-white/30 text-[10px] uppercase tracking-widest px-3 mb-1">
              Account
            </SidebarGroupLabel>
          )}
          <SidebarGroupContent>
            <SidebarMenu className="space-y-0.5">
              {renderItems(SharedMenuItems)}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
