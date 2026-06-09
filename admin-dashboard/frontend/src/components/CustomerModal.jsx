import React from 'react';
import {
  Dialog, DialogContent, Box, TextField,
  Button, Typography, IconButton,
} from '@mui/material';


const CloseIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <line x1="18" y1="6" x2="6" y2="18" stroke="#1D1E21" strokeWidth="2" strokeLinecap="round" />
    <line x1="6" y1="6" x2="18" y2="18" stroke="#1D1E21" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

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

const CustomerModal = ({ open, handleClose, handleSave, currentCustomer, setCurrentCustomer }) => {
  const update = (field) => (e) => setCurrentCustomer({ ...currentCustomer, [field]: e.target.value });

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
      {}
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
          Edit Customer
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

      {}
      <DialogContent sx={{ px: '24px', py: '20px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
        <TextField
          placeholder="Name"
          value={currentCustomer.name || ''}
          onChange={update('name')}
          fullWidth
          sx={fieldSx}
        />
        <TextField
          placeholder="Email"
          value={currentCustomer.email || ''}
          onChange={update('email')}
          fullWidth
          sx={fieldSx}
        />
        <TextField
          placeholder="Address"
          value={currentCustomer.address || ''}
          onChange={update('address')}
          fullWidth
          sx={fieldSx}
        />
        <TextField
          placeholder="Phone"
          value={currentCustomer.phone || ''}
          onChange={update('phone')}
          fullWidth
          sx={fieldSx}
        />
      </DialogContent>

      {}
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
          Save
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

export default CustomerModal;
