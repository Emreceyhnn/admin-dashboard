import React from 'react';
import { Box, Typography } from '@mui/material';


const TableSectionHeader = ({ title }) => (
  <Box
    sx={{
      px: '20px',
      py: '14px',
      backgroundColor: '#E7F1ED',
      borderRadius: '8px 8px 0 0',
    }}
  >
    <Typography sx={{ fontSize: 16, fontWeight: 600, color: '#1D1E21' }}>
      {title}
    </Typography>
  </Box>
);

export default TableSectionHeader;
