import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Box, useMediaQuery, useTheme } from '@mui/material';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';

const SharedLayout = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: '#F7F8FA', display: 'flex' }}>
      <Header onMenuClick={handleDrawerToggle} isMobile={isMobile} />
      
      <Sidebar 
        mobileOpen={mobileOpen} 
        onClose={handleDrawerToggle} 
        isMobile={isMobile} 
      />
      
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          marginTop: 'var(--header-height)',
          p: { xs: '16px', sm: '20px', md: '40px' },
          width: { xs: '100%', md: 'calc(100% - var(--sidebar-width))' },
          maxWidth: '100%',
          overflow: 'hidden',
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};

export default SharedLayout;
