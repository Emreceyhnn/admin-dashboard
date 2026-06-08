import React from 'react';
import { Box, Tooltip, Drawer } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';

/* ─── SVG icons matching Figma sidebar icons ─── */
const DashboardIcon = ({ active }) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
    <rect x="3" y="3" width="7" height="7" rx="1" stroke={active ? '#fff' : '#1D1E21'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <rect x="14" y="3" width="7" height="7" rx="1" stroke={active ? '#fff' : '#1D1E21'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <rect x="3" y="14" width="7" height="7" rx="1" stroke={active ? '#fff' : '#1D1E21'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <rect x="14" y="14" width="7" height="7" rx="1" stroke={active ? '#fff' : '#1D1E21'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const OrdersIcon = ({ active }) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
    <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" stroke={active ? '#fff' : '#1D1E21'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <line x1="3" y1="6" x2="21" y2="6" stroke={active ? '#fff' : '#1D1E21'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M16 10a4 4 0 0 1-8 0" stroke={active ? '#fff' : '#1D1E21'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ProductsIcon = ({ active }) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
    <path d="M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v18m0 0h10a2 2 0 0 0 2-2V9M9 21H5a2 2 0 0 1-2-2V9m0 0h18" stroke={active ? '#fff' : '#1D1E21'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const SuppliersIcon = ({ active }) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
    <rect x="1" y="3" width="15" height="13" rx="1" stroke={active ? '#fff' : '#1D1E21'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M16 8h4l3 3v5h-7V8z" stroke={active ? '#fff' : '#1D1E21'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="5.5" cy="18.5" r="2.5" stroke={active ? '#fff' : '#1D1E21'} strokeWidth="2" />
    <circle cx="18.5" cy="18.5" r="2.5" stroke={active ? '#fff' : '#1D1E21'} strokeWidth="2" />
  </svg>
);

const CustomersIcon = ({ active }) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" stroke={active ? '#fff' : '#1D1E21'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="9" cy="7" r="4" stroke={active ? '#fff' : '#1D1E21'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" stroke={active ? '#fff' : '#1D1E21'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" stroke={active ? '#fff' : '#1D1E21'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const menuItems = [
  { label: 'Dashboard', icon: DashboardIcon, path: '/dashboard' },
  { label: 'Orders',    icon: OrdersIcon,    path: '/orders' },
  { label: 'Products',  icon: ProductsIcon,  path: '/products' },
  { label: 'Suppliers', icon: SuppliersIcon, path: '/suppliers' },
  { label: 'Customers', icon: CustomersIcon, path: '/customers' },
];

const Sidebar = ({ mobileOpen, onClose, isMobile }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigate = (path) => {
    navigate(path);
    if (isMobile) {
      onClose();
    }
  };

  const drawerContent = (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        pt: '20px',
        gap: '8px',
        width: 'var(--sidebar-width)',
        height: '100%',
        backgroundColor: '#fff',
      }}
    >
      {menuItems.map(({ label, icon: Icon, path }) => {
        const isActive = location.pathname === path;
        return (
          <Tooltip title={label} placement="right" key={path}>
            <Box
              onClick={() => handleNavigate(path)}
              sx={{
                width: 40,
                height: 40,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '50%',
                cursor: 'pointer',
                backgroundColor: isActive ? '#59B17A' : 'transparent',
                transition: 'background-color 0.2s ease',
                '&:hover': {
                  backgroundColor: isActive ? '#4a9566' : 'rgba(89,177,122,0.10)',
                },
              }}
            >
              <Icon active={isActive} />
            </Box>
          </Tooltip>
        );
      })}
    </Box>
  );

  return (
    <Box component="nav" sx={{ width: { md: 'var(--sidebar-width)' }, flexShrink: { md: 0 } }}>
      {/* Mobile drawer */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={onClose}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { 
            boxSizing: 'border-box', 
            width: 'var(--sidebar-width)',
            top: 'var(--header-height)',
            height: 'calc(100vh - var(--header-height))',
            borderRight: '1px solid rgba(29,30,33,0.10)',
          },
        }}
      >
        {drawerContent}
      </Drawer>
      {/* Desktop drawer */}
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', md: 'block' },
          '& .MuiDrawer-paper': { 
            boxSizing: 'border-box', 
            width: 'var(--sidebar-width)',
            top: 'var(--header-height)',
            height: 'calc(100vh - var(--header-height))',
            borderRight: '1px solid rgba(29,30,33,0.10)',
          },
        }}
        open
      >
        {drawerContent}
      </Drawer>
    </Box>
  );
};

export default Sidebar;
