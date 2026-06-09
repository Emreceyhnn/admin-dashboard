import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Avatar,
  Chip,
} from '@mui/material';
import api from '../api/axios';


const ProductsIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path
      d="M2.5 6.25L10 1.875L17.5 6.25V13.75L10 18.125L2.5 13.75V6.25Z"
      stroke="#59B17A"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path d="M10 18.125V10" stroke="#59B17A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M17.5 6.25L10 10L2.5 6.25" stroke="#59B17A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const SuppliersIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path
      d="M13.3333 16.6667V15C13.3333 14.1159 12.9821 13.2681 12.357 12.6430C11.7319 12.0179 10.8841 11.6667 10 11.6667H5C4.11594 11.6667 3.26810 12.0179 2.64298 12.6430C2.01786 13.2681 1.66667 14.1159 1.66667 15V16.6667"
      stroke="#8B5CF6"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M7.5 8.33333C9.34095 8.33333 10.8333 6.84095 10.8333 5C10.8333 3.15905 9.34095 1.66667 7.5 1.66667C5.65905 1.66667 4.16667 3.15905 4.16667 5C4.16667 6.84095 5.65905 8.33333 7.5 8.33333Z"
      stroke="#8B5CF6"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path d="M16.6667 7.5V12.5" stroke="#8B5CF6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M14.1667 10H19.1667" stroke="#8B5CF6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const CustomersIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path
      d="M14.1667 17.5V15.8333C14.1667 14.9493 13.8155 14.1014 13.1904 13.4763C12.5652 12.8512 11.7174 12.5 10.8333 12.5H4.16667C3.28261 12.5 2.43476 12.8512 1.80964 13.4763C1.18452 14.1014 0.833334 14.9493 0.833334 15.8333V17.5"
      stroke="#F59E0B"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M7.5 9.16667C9.34095 9.16667 10.8333 7.67428 10.8333 5.83333C10.8333 3.99238 9.34095 2.5 7.5 2.5C5.65905 2.5 4.16667 3.99238 4.16667 5.83333C4.16667 7.67428 5.65905 9.16667 7.5 9.16667Z"
      stroke="#F59E0B"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M19.1667 17.5V15.8333C19.1661 15.0948 18.9203 14.3773 18.4678 13.7936C18.0154 13.2099 17.3818 12.793 16.6667 12.6083"
      stroke="#F59E0B"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M13.3333 2.60833C14.0503 2.79192 14.6858 3.20892 15.1397 3.79359C15.5935 4.37827 15.8399 5.09736 15.8399 5.8375C15.8399 6.57764 15.5935 7.29673 15.1397 7.88141C14.6858 8.46608 14.0503 8.88308 13.3333 9.06667"
      stroke="#F59E0B"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);


const StatCard = ({ title, value, icon: Icon, iconBg }) => (
  <Paper
    elevation={0}
    sx={{
      p: '14px 18px',
      border: '1px solid rgba(29, 30, 33, 0.10)',
      borderRadius: '8px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      backgroundColor: '#fff',
      width: { xs: '100%', md: 'auto' },
      minWidth: { md: 187 },
      flex: { xs: '1 1 100%', md: '0 0 auto' },
      gap: '8px',
    }}
  >
    <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <Box
        sx={{
          width: 40,
          height: 40,
          borderRadius: '50%',
          backgroundColor: iconBg,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}
      >
        <Icon />
      </Box>
      <Typography
        sx={{
          fontSize: 12,
          color: '#1D1E21',
          fontWeight: 400,
          opacity: 0.4,
          lineHeight: 1.5,
        }}
      >
        {title}
      </Typography>
    </Box>
    <Typography
      sx={{
        fontSize: 24,
        fontWeight: 600,
        color: '#1D1E21',
        lineHeight: 1.17,
        letterSpacing: '-0.02em',
      }}
    >
      {value?.toLocaleString() ?? '—'}
    </Typography>
  </Paper>
);


const SectionTable = ({ title, children }) => (
  <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
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
    <TableContainer
      component={Paper}
      elevation={0}
      sx={{
        border: '1px solid rgba(29, 30, 33, 0.10)',
        borderTop: 'none',
        borderRadius: '0 0 8px 8px',
        flexGrow: 1,
        overflowX: 'auto',
      }}
    >
      {children}
    </TableContainer>
  </Box>
);


const headCellSx = {
  color: 'rgba(29, 30, 33, 0.40)',
  fontWeight: 500,
  fontSize: 14,
  borderBottom: '1px solid rgba(29,30,33,0.08)',
  py: '14px',
  px: '20px',
  whiteSpace: 'nowrap',
};

const bodyCellSx = {
  borderBottom: '1px solid rgba(29,30,33,0.08)',
  py: '12px',
  px: '20px',
  fontSize: 16,
};


const DashboardPage = () => {
  const [data, setData] = useState({
    stats: null,
    recentCustomers: [],
    incomeExpenses: [],
  });

  useEffect(() => {
    api
      .get('/dashboard')
      .then((r) => setData(r.data))
      .catch(console.error);
  }, []);

  const getTypeStyle = (type) => {
    switch (type) {
      case 'Income':
        return { color: '#59B17A', bg: 'rgba(89,177,122,0.12)', label: 'Income' };
      case 'Expense':
        return { color: '#E55353', bg: 'rgba(229,83,83,0.12)', label: 'Expense' };
      case 'Error':
      default:
        return { color: '#686868', bg: '#F0F0F0', label: 'Error', strike: true };
    }
  };

  return (
    <Box>
      {}
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '20px',
          mb: '40px',
        }}
      >
        <StatCard
          title="All products"
          value={data.stats?.products}
          icon={ProductsIcon}
          iconBg="rgba(89, 177, 122, 0.10)"
        />
        <StatCard
          title="All suppliers"
          value={data.stats?.suppliers}
          icon={SuppliersIcon}
          iconBg="rgba(139, 92, 246, 0.10)"
        />
        <StatCard
          title="All customers"
          value={data.stats?.customers}
          icon={CustomersIcon}
          iconBg="rgba(245, 158, 11, 0.10)"
        />
      </Box>

      {}
      <Box
        sx={{
          display: 'flex',
          gap: '20px',
          flexDirection: { xs: 'column', lg: 'row' },
        }}
      >
        {}
        <Box sx={{ flex: { lg: '1 1 60%' }, minWidth: 0 }}>
          <SectionTable title="Recent Customers">
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={headCellSx}>Name</TableCell>
                  <TableCell sx={headCellSx}>Email</TableCell>
                  <TableCell align="right" sx={headCellSx}>
                    Spent
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.recentCustomers.map((c, i) => (
                  <TableRow key={c._id || i} sx={{ '&:last-child td': { borderBottom: 0 } }}>
                    <TableCell sx={bodyCellSx}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Avatar
                          src={c.photo}
                          alt={c.name}
                          sx={{
                            width: 36,
                            height: 36,
                            fontSize: 14,
                            bgcolor: 'rgba(89,177,122,0.15)',
                            color: '#59B17A',
                            fontWeight: 600,
                          }}
                        >
                          {c.name?.[0]}
                        </Avatar>
                        <Typography
                          sx={{
                            fontSize: 16,
                            fontWeight: 500,
                            color: '#1D1E21',
                            whiteSpace: 'nowrap',
                          }}
                        >
                          {c.name}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell sx={{ ...bodyCellSx, color: '#1D1E21' }}>{c.email}</TableCell>
                    <TableCell
                      align="right"
                      sx={{
                        ...bodyCellSx,
                        fontWeight: 500,
                        color: '#1D1E21',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {c.spent?.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </TableCell>
                  </TableRow>
                ))}
                {data.recentCustomers.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={3} align="center" sx={{ py: 4, color: '#686868' }}>
                      No recent customers
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </SectionTable>
        </Box>

        {}
        <Box sx={{ flex: { lg: '1 1 40%' }, minWidth: 0 }}>
          <SectionTable title="Income/Expenses">
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ ...headCellSx, width: 90 }}>Today</TableCell>
                  <TableCell sx={headCellSx}></TableCell>
                  <TableCell align="right" sx={headCellSx}></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.incomeExpenses.map((t, idx) => {
                  const style = getTypeStyle(t.type);
                  const isIncome = t.type === 'Income';
                  const isError = t.type === 'Error';

                  const sign = t.amount >= 0 ? '+' : '';
                  const displayAmount =
                    sign +
                    Math.abs(t.amount).toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    });

                  return (
                    <TableRow key={idx} sx={{ '&:last-child td': { borderBottom: 0 } }}>
                      <TableCell sx={{ ...bodyCellSx, width: 90 }}>
                        <Chip
                          label={style.label}
                          size="small"
                          sx={{
                            fontSize: 12,
                            fontWeight: 600,
                            color: style.color,
                            backgroundColor: style.bg,
                            border: 'none',
                            height: 25,
                            borderRadius: '40px',
                            '& .MuiChip-label': { px: '10px' },
                          }}
                        />
                      </TableCell>
                      <TableCell
                        sx={{
                          ...bodyCellSx,
                          color: '#1D1E21',
                          fontSize: 14,
                          maxWidth: 200,
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {t.name}
                      </TableCell>
                      <TableCell
                        align="right"
                        sx={{
                          ...bodyCellSx,
                          fontWeight: 500,
                          fontSize: 16,
                          color: isError
                            ? '#1D1E21'
                            : isIncome
                            ? '#59B17A'
                            : '#E55353',
                          textDecoration: isError ? 'line-through' : 'none',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {displayAmount}
                      </TableCell>
                    </TableRow>
                  );
                })}
                {data.incomeExpenses.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={3} align="center" sx={{ py: 4, color: '#686868' }}>
                      No recent transactions
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </SectionTable>
        </Box>
      </Box>
    </Box>
  );
};

export default DashboardPage;
