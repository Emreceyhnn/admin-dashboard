import React from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate, useLocation } from 'react-router-dom';
import api from '../api/axios';


const LogoutIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <polyline points="16 17 21 12 16 7" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <line x1="21" y1="12" x2="9" y2="12" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const LogoIcon = () => (
  <Box
    component="img"
    src="/logo.png"
    alt="Logo"
    sx={{ height: 32, objectFit: 'contain' }}
  />
);

const PAGE_TITLES = {
  '/dashboard': 'Dashboard',
  '/orders': 'All orders',
  '/products': 'All products',
  '/suppliers': 'All suppliers',
  '/customers': 'All customers',
};

const Header = ({ onMenuClick, isMobile }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const userEmail = user.email || 'vendor@gmail.com';

  const handleLogout = async () => {
    try { await api.get('/user/logout'); } catch (e) {  }
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const pageTitle = PAGE_TITLES[location.pathname] || 'Dashboard';

  return (
    <Box
      component="header"
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: 'var(--header-height)',
        backgroundColor: '#fff',
        borderBottom: '1px solid var(--border)',
        display: 'flex',
        alignItems: 'center',
        px: { xs: '16px', md: '20px' },
        zIndex: 1200,
      }}
    >
      {}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1 }}>
        {isMobile && (
          <IconButton onClick={onMenuClick} edge="start" sx={{ mr: '4px' }}>
            <MenuIcon />
          </IconButton>
        )}
        <Box
          sx={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}
          onClick={() => navigate('/')}
        >
          <LogoIcon />
          <Box>
            <Typography
              sx={{
                fontSize: { xs: 14, md: 16 },
                fontWeight: 600,
                color: '#1D1E21',
                lineHeight: 1.25,
                letterSpacing: '-0.01em',
              }}
            >
              E-Pharmacy
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
              <Typography
                component="span"
                onClick={(e) => { e.stopPropagation(); navigate(location.pathname); }}
                sx={{
                  fontSize: 12,
                  fontWeight: 400,
                  color: '#59B17A',
                  cursor: 'pointer',
                  '&:hover': { textDecoration: 'underline' },
                }}
              >
                {pageTitle}
              </Typography>
              {!isMobile && (
                <>
                  <Typography component="span" sx={{ fontSize: 12, color: 'rgba(29,30,33,0.40)' }}>
                    |
                  </Typography>
                  <Typography component="span" sx={{ fontSize: 12, color: 'rgba(29,30,33,0.40)' }}>
                    {userEmail}
                  </Typography>
                </>
              )}
            </Box>
          </Box>
        </Box>
      </Box>

      {}
      <IconButton
        onClick={handleLogout}
        sx={{
          width: 44,
          height: 44,
          borderRadius: '50%',
          backgroundColor: '#59B17A',
          '&:hover': { backgroundColor: '#4a9566' },
        }}
      >
        <LogoutIcon />
      </IconButton>
    </Box>
  );
};

export default Header;
