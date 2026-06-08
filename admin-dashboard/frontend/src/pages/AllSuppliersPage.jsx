import React, { useEffect, useState } from 'react';
import {
  Box, Paper, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Chip, Button, IconButton,
} from '@mui/material';
import FilterBar from '../components/FilterBar';
import TableSectionHeader from '../components/TableSectionHeader';
import SupplierModal from '../components/SupplierModal';
import api from '../api/axios';
import dayjs from 'dayjs';

const EditIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" stroke="#59B17A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" stroke="#59B17A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const getStatusStyle = (status = '') => {
  const s = status.toLowerCase();
  if (s === 'active') return { label: 'Active', color: '#59B17A', bg: 'rgba(89,177,122,0.12)' };
  return { label: status || 'Deactive', color: '#E55353', bg: 'rgba(229,83,83,0.12)' };
};

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

const AllSuppliersPage = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [filterName, setFilterName] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentSupplier, setCurrentSupplier] = useState({});

  const fetchSuppliers = (name = '') =>
    api.get(`/suppliers${name ? `?name=${encodeURIComponent(name)}` : ''}`)
      .then(r => setSuppliers(r.data))
      .catch(console.error);

  useEffect(() => { fetchSuppliers(); }, []);

  const handleOpenAdd = () => { setEditMode(false); setCurrentSupplier({}); setOpenModal(true); };
  const handleOpenEdit = (row) => { setEditMode(true); setCurrentSupplier(row); setOpenModal(true); };
  const handleClose = () => setOpenModal(false);

  const handleSave = async () => {
    try {
      if (editMode) {
        await api.put(`/suppliers/${currentSupplier._id}`, currentSupplier);
      } else {
        await api.post('/suppliers', currentSupplier);
      }
      handleClose();
      fetchSuppliers();
    } catch (e) { console.error(e); }
  };

  const columns = ['Suppliers Info', 'Address', 'Company', 'Delivery date', 'Ammount', 'Status', 'Action'];

  return (
    <Box>
      <FilterBar
        filterValue={filterName}
        onFilterChange={setFilterName}
        onFilter={() => fetchSuppliers(filterName)}
        placeholder="User Name"
        actionButton={
          <Button
            variant="outlined"
            color="inherit"
            onClick={handleOpenAdd}
            sx={{
              height: 40,
              px: '24px',
              borderRadius: '60px',
              border: '1px solid rgba(29,30,33,0.15)',
              color: '#1D1E21',
              fontSize: 14,
              fontWeight: 600,
              textTransform: 'none',
              '&:hover': {
                borderColor: '#59B17A',
                color: '#59B17A',
                backgroundColor: 'rgba(89,177,122,0.06)',
              },
            }}
          >
            Add a new suppliers
          </Button>
        }
      />

      <TableSectionHeader title="All suppliers" />

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
              {suppliers.map(row => {
                const st = getStatusStyle(row.status);
                return (
                  <TableRow key={row._id} sx={{ '&:last-child td': { borderBottom: 0 } }}>
                    <TableCell sx={{ ...bodyCellSx, fontWeight: 500 }}>{row.name}</TableCell>
                    <TableCell sx={{ ...bodyCellSx, color: 'rgba(29,30,33,0.40)' }}>{row.address}</TableCell>
                    <TableCell sx={{ ...bodyCellSx, color: 'rgba(29,30,33,0.40)' }}>{row.company}</TableCell>
                    <TableCell sx={{ ...bodyCellSx, color: 'rgba(29,30,33,0.40)', whiteSpace: 'nowrap' }}>
                      {row.deliveryDate ? dayjs(row.deliveryDate).format('MMMM D, YYYY') : '—'}
                    </TableCell>
                    <TableCell sx={{ ...bodyCellSx, fontWeight: 600 }}>
                      {row.amount != null ? Number(row.amount).toFixed(2) : '—'}
                    </TableCell>
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
                    <TableCell sx={bodyCellSx}>
                      <Button
                        size="small"
                        onClick={() => handleOpenEdit(row)}
                        startIcon={<EditIcon />}
                        sx={{
                          height: 30,
                          px: '16px',
                          borderRadius: '60px',
                          border: '1px solid rgba(89,177,122,0.25)',
                          color: '#59B17A',
                          fontSize: 12,
                          fontWeight: 600,
                          minWidth: 0,
                          textTransform: 'none',
                          '&:hover': { backgroundColor: 'rgba(89,177,122,0.08)' },
                        }}
                      >
                        Edit
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
              {suppliers.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7} align="center" sx={{ py: 6, color: 'rgba(29,30,33,0.40)' }}>
                    No suppliers found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      <SupplierModal
        open={openModal}
        handleClose={handleClose}
        handleSave={handleSave}
        editMode={editMode}
        currentSupplier={currentSupplier}
        setCurrentSupplier={setCurrentSupplier}
      />
    </Box>
  );
};

export default AllSuppliersPage;
