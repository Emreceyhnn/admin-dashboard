import React, { useEffect, useState } from 'react';
import {
  Box, Paper, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Avatar, IconButton, Pagination,
} from '@mui/material';
import FilterBar from '../components/FilterBar';
import TableSectionHeader from '../components/TableSectionHeader';
import CustomerModal from '../components/CustomerModal';
import api from '../api/axios';
import dayjs from 'dayjs';

const EditIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" stroke="#59B17A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" stroke="#59B17A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
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

const PAGE_SIZE = 5;

const CustomersDataPage = () => {
  const [customers, setCustomers] = useState([]);
  const [filterName, setFilterName] = useState('');
  const [page, setPage] = useState(1);
  const [openModal, setOpenModal] = useState(false);
  const [currentCustomer, setCurrentCustomer] = useState({});

  const fetchCustomers = (name = '') =>
    api.get(`/customers${name ? `?name=${encodeURIComponent(name)}` : ''}`)
      .then(r => { setCustomers(r.data); setPage(1); })
      .catch(console.error);

  useEffect(() => { fetchCustomers(); }, []);

  const handleOpenEdit = (row) => { setCurrentCustomer(row); setOpenModal(true); };
  const handleClose = () => setOpenModal(false);

  const handleSave = async () => {
    try {
      await api.put(`/customers/${currentCustomer._id}`, currentCustomer);
      handleClose();
      fetchCustomers();
    } catch (e) { console.error(e); }
  };

  const totalPages = Math.ceil(customers.length / PAGE_SIZE);
  const paginated = customers.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const columns = ['User Info', 'Email', 'Address', 'Phone', 'Register date', 'Action'];

  return (
    <Box>
      <FilterBar
        filterValue={filterName}
        onFilterChange={setFilterName}
        onFilter={() => fetchCustomers(filterName)}
        placeholder="User Name"
      />

      <TableSectionHeader title="Customers Data" />

      <Paper
        elevation={0}
        sx={{ border: '1px solid rgba(29,30,33,0.10)', borderTop: 'none', borderRadius: '0 0 8px 8px', overflow: 'hidden' }}
      >
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                {columns.map(c => <TableCell key={c} sx={headCellSx}>{c}</TableCell>)}
              </TableRow>
            </TableHead>
            <TableBody>
              {paginated.map(row => (
                <TableRow key={row._id} sx={{ '&:last-child td': { borderBottom: 0 } }}>
                  {}
                  <TableCell sx={bodyCellSx}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Avatar
                        src={row.photo}
                        alt={row.name}
                        sx={{
                          width: 36, height: 36, fontSize: 13,
                          bgcolor: 'rgba(89,177,122,0.12)', color: '#59B17A',
                          fontWeight: 600,
                        }}
                      >
                        {row.name?.[0]}
                      </Avatar>
                      <Box sx={{ fontSize: 16, fontWeight: 500, color: '#1D1E21' }}>{row.name}</Box>
                    </Box>
                  </TableCell>
                  <TableCell sx={{ ...bodyCellSx, color: 'rgba(29,30,33,0.40)' }}>{row.email}</TableCell>
                  <TableCell sx={{ ...bodyCellSx, color: 'rgba(29,30,33,0.40)' }}>{row.address}</TableCell>
                  <TableCell sx={{ ...bodyCellSx, color: 'rgba(29,30,33,0.40)', whiteSpace: 'nowrap' }}>{row.phone}</TableCell>
                  <TableCell sx={{ ...bodyCellSx, color: 'rgba(29,30,33,0.40)', whiteSpace: 'nowrap' }}>
                    {row.registerDate ? dayjs(row.registerDate).format('MMM D, YYYY') : '—'}
                  </TableCell>
                  <TableCell sx={bodyCellSx}>
                    <IconButton
                      size="small"
                      onClick={() => handleOpenEdit(row)}
                      sx={{
                        border: '1px solid rgba(89,177,122,0.25)',
                        borderRadius: '50%',
                        width: 32,
                        height: 32,
                        '&:hover': { backgroundColor: 'rgba(89,177,122,0.08)' },
                      }}
                    >
                      <EditIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
              {paginated.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} align="center" sx={{ py: 6, color: 'rgba(29,30,33,0.40)' }}>
                    No customers found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        {}
        {totalPages > 1 && (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: '12px', borderTop: '1px solid rgba(29,30,33,0.08)' }}>
            <Pagination
              count={totalPages}
              page={page}
              onChange={(_, val) => setPage(val)}
              size="small"
              sx={{
                '& .MuiPaginationItem-root': {
                  fontFamily: 'Inter',
                  fontSize: 13,
                  borderRadius: '50%',
                  minWidth: 28,
                  height: 28,
                },
                '& .Mui-selected': {
                  backgroundColor: '#59B17A !important',
                  color: '#fff',
                },
              }}
            />
          </Box>
        )}
      </Paper>

      <CustomerModal
        open={openModal}
        handleClose={handleClose}
        handleSave={handleSave}
        currentCustomer={currentCustomer}
        setCurrentCustomer={setCurrentCustomer}
      />
    </Box>
  );
};

export default CustomersDataPage;
