import express from 'express';
import { getSuppliers, createSupplier, updateSupplier } from '../controllers/supplierController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.route('/')
  .get(protect, getSuppliers)
  .post(protect, createSupplier);

router.route('/:supplierId')
  .put(protect, updateSupplier);

export default router;
