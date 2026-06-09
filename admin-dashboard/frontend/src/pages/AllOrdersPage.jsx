import React, { useEffect, useState } from 'react';
import {
  Box, Paper, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Avatar, Chip,
} from '@mui/material';
import FilterBar from '../components/FilterBar';
import TableSectionHeader from '../components/TableSectionHeader';
import api from '../api/axios';
import dayjs from 'dayjs';

const STATUS_MAP = {
  completed: { label: 'Completed', color: '#59B17A', bg: 'rgba(89,177,122,0.12)' },
  delivered:  { label: 'Delivered',  color: '#59B17A', bg: 'rgba(89,177,122,0.12)' },
  confirmed:  { label: 'Confirmed',  color: '#6366F1', bg: 'rgba(99,102,241,0.12)' },
  pending:    { label: 'Pending',    color: '#F59E0B', bg: 'rgba(245,158,11,0.12)' },
  processing: { label: 'Processing', color: '#F59E0B', bg: 'rgba(245,158,11,0.12)' },
  shipped:    { label: 'Shipped',    color: '#6366F1', bg: 'rgba(99,102,241,0.12)' },
  cancelled:  { label: 'Cancelled',  color: '#E55353', bg: 'rgba(229,83,83,0.12)' },
};

const getStatus = (s = '') => STATUS_MAP[s.toLowerCase()] || { label: s, color: '#686868', bg: '#F0F0F0' };

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

const AllOrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [filterName, setFilterName] = useState('');

  const fetchOrders = (name = '') =>
    api.get(`/orders${name ? `?name=${encodeURIComponent(name)}` : ''}`)
      .then(r => setOrders(r.data))
      .catch(console.error);

  useEffect(() => { fetchOrders(); }, []);

  const columns = [
    { key: 'userInfo',   label: 'User Info' },
    { key: 'address',    label: 'Address' },
    { key: 'products',   label: 'Products' },
    { key: 'orderDate',  label: 'Order date' },
    { key: 'price',      label: 'Price' },
    { key: 'status',     label: 'Status' },
  ];

  return (
    <Box>
      <FilterBar
        filterValue={filterName}
        onFilterChange={setFilterName}
        onFilter={() => fetchOrders(filterName)}
        placeholder="User Name"
      />

      <TableSectionHeader title="All orders" />

      <Paper
        elevation={0}
        sx={{
          border: '1px solid rgba(29,30,33,0.10)',
          borderTop: 'none',
          borderRadius: '0 0 8px 8px',
          overflow: 'hidden',
        }}
      >
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                {columns.map(c => (
                  <TableCell key={c.key} sx={headCellSx}>{c.label}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.map(row => {
                const st = getStatus(row.status);
                return (
                  <TableRow key={row._id} sx={{ '&:last-child td': { borderBottom: 0 } }}>
                    {}
                    <TableCell sx={bodyCellSx}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Avatar
                          src={row.photo}
                          alt={row.userInfo}
                          sx={{
                            width: 36, height: 36, fontSize: 13,
                            bgcolor: 'rgba(89,177,122,0.12)', color: '#59B17A',
                            fontWeight: 600,
                          }}
                        >
                          {row.userInfo?.[0]}
                        </Avatar>
                        <Box sx={{ fontSize: 16, fontWeight: 500, color: '#1D1E21' }}>{row.userInfo}</Box>
                      </Box>
                    </TableCell>
                    {}
                    <TableCell sx={{ ...bodyCellSx, maxWidth: 160, color: 'rgba(29,30,33,0.40)' }}>{row.address}</TableCell>
                    {}
                    <TableCell sx={{ ...bodyCellSx, color: '#1D1E21' }}>{row.products}</TableCell>
                    {}
                    <TableCell sx={{ ...bodyCellSx, whiteSpace: 'nowrap', color: 'rgba(29,30,33,0.40)' }}>
                      {row.orderDate ? dayjs(row.orderDate).format('MMM D, YYYY') : '—'}
                    </TableCell>
                    {}
                    <TableCell sx={{ ...bodyCellSx, fontWeight: 600, color: '#1D1E21' }}>
                      {row.price != null ? `$${Number(row.price).toFixed(2)}` : '—'}
                    </TableCell>
                    {}
                    <TableCell sx={bodyCellSx}>
                      <Chip
                        label={st.label}
                        size="small"
                        sx={{
                          color: st.color,
                          backgroundColor: st.bg,
                          fontWeight: 600,
                          fontSize: 12,
                          height: 25,
                          borderRadius: '40px',
                          border: 'none',
                          '& .MuiChip-label': { px: '10px' },
                        }}
                      />
                    </TableCell>
                  </TableRow>
                );
              })}
              {orders.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} align="center" sx={{ py: 6, color: 'rgba(29,30,33,0.40)' }}>
                    No orders found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
};

export default AllOrdersPage;
