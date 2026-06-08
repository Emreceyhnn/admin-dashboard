import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 375,
      md: 768,
      lg: 1440,
      xl: 1920,
    },
  },
  palette: {
    primary: { main: '#59B17A', contrastText: '#fff' },
    error:   { main: '#E55353' },
    warning: { main: '#F59E0B' },
    info:    { main: '#6366F1' },
    background: { default: '#F7F8FA', paper: '#FFFFFF' },
    text: { primary: '#1D1E21', secondary: '#686868' },
    divider: 'rgba(29, 30, 33, 0.10)',
  },
  typography: {
    fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, sans-serif',
    h1: { fontWeight: 600 },
    h2: { fontWeight: 600 },
    h3: { fontWeight: 600 },
    h4: { fontWeight: 600 },
    h5: { fontWeight: 600 },
    h6: { fontWeight: 600 },
    body1: { fontSize: 16, fontWeight: 400 },
    body2: { fontSize: 14, fontWeight: 400 },
    button: { textTransform: 'none', fontWeight: 600, fontSize: 14 },
  },
  shape: { borderRadius: 8 },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        * { box-sizing: border-box; }
        body { background: #F7F8FA; }
      `,
    },
    MuiButton: {
      defaultProps: { disableElevation: true, disableRipple: false },
      styleOverrides: {
        root: {
          borderRadius: 60,
          textTransform: 'none',
          fontWeight: 600,
          fontSize: 14,
          boxShadow: 'none',
          '&:hover': { boxShadow: 'none' },
        },
        containedPrimary: {
          backgroundColor: '#59B17A',
          '&:hover': { backgroundColor: '#4a9566' },
        },
        outlinedPrimary: {
          borderColor: '#59B17A',
          color: '#59B17A',
          '&:hover': { backgroundColor: 'rgba(89,177,122,0.08)' },
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          fontFamily: '"Inter", sans-serif',
          fontSize: 14,
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 60,
          backgroundColor: '#fff',
          '& fieldset': { borderColor: 'rgba(29,30,33,0.15)' },
          '&:hover fieldset': { borderColor: 'rgba(29,30,33,0.30)' },
          '&.Mui-focused fieldset': { borderColor: '#59B17A' },
        },
        input: {
          padding: '10px 18px',
          height: 'auto',
          '&::placeholder': { color: 'rgba(29,30,33,0.40)', opacity: 1 },
        },
      },
    },
    MuiTextField: {
      defaultProps: { variant: 'outlined', size: 'small' },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: 12,
          boxShadow: '0 4px 48px rgba(0,0,0,0.10)',
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          fontFamily: '"Inter", sans-serif',
          fontSize: 16,
          borderBottom: '1px solid rgba(29,30,33,0.08)',
          padding: '12px 20px',
        },
        head: {
          fontWeight: 500,
          fontSize: 14,
          color: 'rgba(29,30,33,0.40)',
          backgroundColor: '#fff',
        },
        body: {
          color: '#1D1E21',
          fontWeight: 400,
        },
      },
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          '&:last-child td': { borderBottom: 0 },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontSize: 12,
          fontWeight: 600,
          height: 25,
          borderRadius: 40,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: { backgroundImage: 'none' },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: { borderRadius: '50%' },
      },
    },
    MuiDataGrid: {
      styleOverrides: {
        root: {
          border: 'none',
          fontFamily: '"Inter", sans-serif',
          fontSize: 14,
          '--DataGrid-rowBorderColor': 'rgba(29,30,33,0.08)',
          '& .MuiDataGrid-withBorderColor': {
            borderColor: 'rgba(29,30,33,0.08)',
          },
        },
        columnHeaders: {
          backgroundColor: '#fff',
          borderBottom: '1px solid rgba(29,30,33,0.08)',
          minHeight: '48px !important',
          maxHeight: '48px !important',
        },
        columnHeader: {
          fontWeight: 500,
          color: 'rgba(29,30,33,0.40)',
          fontSize: 13,
          '&:focus, &:focus-within': { outline: 'none' },
        },
        columnHeaderTitle: {
          fontWeight: 500,
          color: 'rgba(29,30,33,0.40)',
          fontSize: 13,
        },
        cell: {
          color: '#1D1E21',
          fontWeight: 400,
          alignItems: 'center',
          borderBottom: '1px solid rgba(29,30,33,0.08)',
          '&:focus, &:focus-within': { outline: 'none' },
        },
        row: {
          '&:hover': { backgroundColor: 'rgba(89,177,122,0.04)' },
          '&.Mui-selected': { backgroundColor: 'rgba(89,177,122,0.08)' },
          '&.Mui-selected:hover': { backgroundColor: 'rgba(89,177,122,0.10)' },
        },
        footerContainer: {
          borderTop: '1px solid rgba(29,30,33,0.08)',
          minHeight: 52,
        },
        virtualScroller: {
          backgroundColor: '#fff',
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        select: {
          padding: '10px 18px',
          fontSize: 14,
        },
        icon: {
          right: 14,
        },
      },
    },
  },
});

export default theme;
