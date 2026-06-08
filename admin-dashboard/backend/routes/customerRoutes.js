import express from 'express';
import { getCustomers, getCustomerById, updateCustomer } from '../controllers/customerController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/', protect, getCustomers);
router.get('/:customerId', protect, getCustomerById);
router.put('/:customerId', protect, updateCustomer);

export default router;
