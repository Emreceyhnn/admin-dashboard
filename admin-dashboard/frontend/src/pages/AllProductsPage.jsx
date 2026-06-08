import React, { useEffect, useState } from 'react';
import {
  Box, Paper, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, IconButton, Button,
  Dialog, DialogTitle, DialogContent, DialogActions, Typography
} from '@mui/material';
import FilterBar from '../components/FilterBar';
import TableSectionHeader from '../components/TableSectionHeader';
import ProductModal from '../components/ProductModal';
import api from '../api/axios';

const EditIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" stroke="#59B17A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" stroke="#59B17A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const DeleteIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
    <polyline points="3 6 5 6 21 6" stroke="#E55353" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" stroke="#E55353" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M10 11v6M14 11v6" stroke="#E55353" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" stroke="#E55353" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
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

const AllProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [filterName, setFilterName] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentProduct, setCurrentProduct] = useState({});
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);

  const fetchProducts = (name = '') =>
    api.get(`/products${name ? `?name=${encodeURIComponent(name)}` : ''}`)
      .then(r => setProducts(r.data))
      .catch(console.error);

  useEffect(() => { fetchProducts(); }, []);

  const handleOpenAdd = () => { setEditMode(false); setCurrentProduct({}); setOpenModal(true); };
  const handleOpenEdit = (row) => { setEditMode(true); setCurrentProduct(row); setOpenModal(true); };
  const handleClose = () => setOpenModal(false);

  const handleSave = async () => {
    try {
      if (editMode) {
        await api.put(`/products/${currentProduct._id}`, currentProduct);
      } else {
        await api.post('/products', currentProduct);
      }
      handleClose();
      fetchProducts();
    } catch (e) { console.error(e); }
  };

  const handleDeleteClick = (id) => {
    setProductToDelete(id);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    try {
      await api.delete(`/products/${productToDelete}`);
      setDeleteDialogOpen(false);
      setProductToDelete(null);
      fetchProducts();
    } catch (e) { console.error(e); }
  };

  const columns = ['Product Info', 'Category', 'Stock', 'Suppliers', 'Price', 'Action'];

  return (
    <Box>
      <FilterBar
        filterValue={filterName}
        onFilterChange={setFilterName}
        onFilter={() => fetchProducts(filterName)}
        placeholder="Product Name"
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
            Add a new product
          </Button>
        }
      />

      <TableSectionHeader title="All products" />

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
              {products.map(row => (
                <TableRow key={row._id} sx={{ '&:last-child td': { borderBottom: 0 } }}>
                  <TableCell sx={{ ...bodyCellSx, fontWeight: 500 }}>{row.name}</TableCell>
                  <TableCell sx={{ ...bodyCellSx, color: 'rgba(29,30,33,0.40)' }}>{row.category}</TableCell>
                  <TableCell sx={{ ...bodyCellSx, color: '#1D1E21' }}>{row.stock}</TableCell>
                  <TableCell sx={{ ...bodyCellSx, color: 'rgba(29,30,33,0.40)' }}>{row.suppliers}</TableCell>
                  <TableCell sx={{ ...bodyCellSx, fontWeight: 600 }}>
                    {row.price != null ? `$${Number(row.price).toFixed(2)}` : '—'}
                  </TableCell>
                  <TableCell sx={bodyCellSx}>
                    <Box sx={{ display: 'flex', gap: '8px' }}>
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
                      <IconButton
                        size="small"
                        onClick={() => handleDeleteClick(row._id)}
                        sx={{
                          border: '1px solid rgba(229,83,83,0.25)',
                          borderRadius: '50%',
                          width: 32,
                          height: 32,
                          '&:hover': { backgroundColor: 'rgba(229,83,83,0.08)' },
                        }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
              {products.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} align="center" sx={{ py: 6, color: 'rgba(29,30,33,0.40)' }}>
                    No products found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      <ProductModal
        open={openModal}
        handleClose={handleClose}
        handleSave={handleSave}
        editMode={editMode}
        currentProduct={currentProduct}
        setCurrentProduct={setCurrentProduct}
      />

      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        PaperProps={{ sx: { borderRadius: '12px', p: 1 } }}
      >
        <DialogTitle sx={{ fontSize: 18, fontWeight: 600, color: '#1D1E21' }}>
          Confirm Delete
        </DialogTitle>
        <DialogContent>
          <Typography sx={{ color: 'rgba(29,30,33,0.7)', fontSize: 16 }}>
            Are you sure you want to delete this product? This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ px: '24px', pb: '16px' }}>
          <Button
            onClick={() => setDeleteDialogOpen(false)}
            sx={{ color: '#1D1E21', fontWeight: 600, borderRadius: '60px', px: 3 }}
          >
            Cancel
          </Button>
          <Button
            onClick={confirmDelete}
            variant="contained"
            color="error"
            sx={{ borderRadius: '60px', fontWeight: 600, px: 3, backgroundColor: '#E55353', '&:hover': { backgroundColor: '#c84444' } }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AllProductsPage;
