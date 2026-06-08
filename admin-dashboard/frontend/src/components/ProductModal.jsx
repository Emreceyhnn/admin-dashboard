import React from 'react';
import {
  Dialog, DialogContent, Box, TextField,
  Button, Typography, IconButton, Select, MenuItem, FormControl,
} from '@mui/material';

/* ─── Close icon ─── */
const CloseIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <line x1="18" y1="6" x2="6" y2="18" stroke="#1D1E21" strokeWidth="2" strokeLinecap="round" />
    <line x1="6" y1="6" x2="18" y2="18" stroke="#1D1E21" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const CATEGORIES = [
  'Medicine', 'Head', 'Hand', 'Dental Care', 'Skin Care',
  'Eye Care', 'Vitamins & Supplements', 'Orthopedic Products', 'Baby Care',
];

const fieldSx = {
  '& .MuiOutlinedInput-root': {
    borderRadius: '60px',
    backgroundColor: 'transparent',
    height: 44,
    '& fieldset': { borderColor: 'rgba(29,30,33,0.15)' },
    '&:hover fieldset': { borderColor: 'rgba(29,30,33,0.30)' },
    '&.Mui-focused fieldset': { borderColor: '#59B17A', borderWidth: '2px' },
  },
  '& input': { padding: '0 18px', height: 44, fontSize: 14 },
};

const selectSx = {
  borderRadius: '60px',
  backgroundColor: 'transparent',
  height: 44,
  fontSize: 14,
  '& .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(29,30,33,0.15)' },
  '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(29,30,33,0.30)' },
  '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#59B17A', borderWidth: '2px' },
  '& .MuiSelect-select': {
    padding: '0 18px',
    display: 'flex',
    alignItems: 'center',
    height: '44px !important',
  },
};

const ProductModal = ({ open, handleClose, handleSave, editMode, currentProduct, setCurrentProduct }) => {
  const update = (field) => (e) => setCurrentProduct({ ...currentProduct, [field]: e.target.value });

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="xs"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: '12px',
          p: 0,
          overflow: 'hidden',
          boxShadow: '0 4px 48px rgba(0,0,0,0.10)',
        },
      }}
    >
      {/* Header */}
      <Box
        sx={{
          px: '24px',
          py: '20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '1px solid rgba(29,30,33,0.08)',
        }}
      >
        <Typography sx={{ fontSize: 18, fontWeight: 600, color: '#1D1E21' }}>
          {editMode ? 'Edit product' : 'Add a new product'}
        </Typography>
        <IconButton
          onClick={handleClose}
          size="small"
          sx={{
            width: 26,
            height: 26,
            borderRadius: '50%',
            '&:hover': { backgroundColor: 'rgba(29,30,33,0.06)' },
          }}
        >
          <CloseIcon />
        </IconButton>
      </Box>

      {/* Form */}
      <DialogContent sx={{ px: '24px', py: '20px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
        <TextField
          placeholder="Product Info"
          value={currentProduct.name || ''}
          onChange={update('name')}
          fullWidth
          sx={fieldSx}
        />

        <FormControl fullWidth>
          <Select
            value={currentProduct.category || ''}
            onChange={update('category')}
            displayEmpty
            sx={selectSx}
          >
            <MenuItem value="" disabled sx={{ color: '#686868' }}>Product category</MenuItem>
            {CATEGORIES.map(cat => (
              <MenuItem key={cat} value={cat}>{cat}</MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          placeholder="Stock"
          type="number"
          value={currentProduct.stock || ''}
          onChange={update('stock')}
          fullWidth
          sx={fieldSx}
        />
        <TextField
          placeholder="Suppliers"
          value={currentProduct.suppliers || ''}
          onChange={update('suppliers')}
          fullWidth
          sx={fieldSx}
        />
        <TextField
          placeholder="Price"
          type="number"
          value={currentProduct.price || ''}
          onChange={update('price')}
          fullWidth
          sx={fieldSx}
        />
      </DialogContent>

      {/* Actions */}
      <Box sx={{ px: '24px', pb: '24px', display: 'flex', gap: '8px' }}>
        <Button
          onClick={handleSave}
          variant="contained"
          fullWidth
          sx={{
            height: 44,
            borderRadius: '60px',
            fontWeight: 600,
            fontSize: 14,
            textTransform: 'none',
            boxShadow: 'none',
            '&:hover': { boxShadow: 'none' },
          }}
        >
          {editMode ? 'Save' : 'Add'}
        </Button>
        <Button
          onClick={handleClose}
          fullWidth
          sx={{
            height: 44,
            borderRadius: '60px',
            backgroundColor: 'rgba(29,30,33,0.06)',
            color: '#1D1E21',
            fontWeight: 600,
            fontSize: 14,
            textTransform: 'none',
            '&:hover': { backgroundColor: 'rgba(29,30,33,0.12)' },
          }}
        >
          Cancel
        </Button>
      </Box>
    </Dialog>
  );
};

export default ProductModal;
