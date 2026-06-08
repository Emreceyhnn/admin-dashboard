import React from 'react';
import { Box, TextField, Button } from '@mui/material';

/* ─── Filter icon SVG (funnel) ─── */
const FilterIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
    <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" fill="#fff" stroke="#fff" strokeWidth="0.5" />
  </svg>
);

/**
 * Reusable filter bar used across Orders, Products, Suppliers, Customers pages.
 */
const FilterBar = ({ filterValue, onFilterChange, onFilter, placeholder = 'User Name', actionButton }) => {
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') onFilter();
  };

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        mb: '20px',
        gap: '12px',
        flexWrap: 'wrap',
      }}
    >
      {/* Left: Input + Filter button */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <TextField
          value={filterValue}
          onChange={(e) => onFilterChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          size="small"
          sx={{
            width: { xs: 160, sm: 224 },
            '& .MuiOutlinedInput-root': {
              borderRadius: '60px',
              backgroundColor: '#fff',
              height: 40,
              '& fieldset': { borderColor: 'rgba(29,30,33,0.15)' },
              '&:hover fieldset': { borderColor: 'rgba(29,30,33,0.30)' },
              '&.Mui-focused fieldset': { borderColor: '#59B17A', borderWidth: '2px' },
            },
            '& input': { padding: '0 18px', height: 40, fontSize: 14 },
          }}
        />
        <Button
          variant="contained"
          onClick={onFilter}
          startIcon={<FilterIcon />}
          sx={{
            height: 40,
            px: '28px',
            borderRadius: '60px',
            fontSize: 14,
            fontWeight: 600,
            gap: '4px',
            textTransform: 'none',
            boxShadow: 'none',
            '&:hover': { boxShadow: 'none' },
          }}
        >
          Filter
        </Button>
      </Box>

      {/* Right: Action button (optional) */}
      {actionButton && <Box>{actionButton}</Box>}
    </Box>
  );
};

export default FilterBar;
