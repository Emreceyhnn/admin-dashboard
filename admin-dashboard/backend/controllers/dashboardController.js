import Product from '../models/Product.js';
import Supplier from '../models/Supplier.js';
import Customer from '../models/Customer.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const getDashboardStats = async (req, res) => {
  try {
    const productsCount = await Product.countDocuments();
    const suppliersCount = await Supplier.countDocuments();
    const customersCount = await Customer.countDocuments();

    const recentCustomers = await Customer.find().sort({ createdAt: -1 }).limit(5);

    
    const incomeExpensesRaw = JSON.parse(
      fs.readFileSync(path.join(__dirname, '..', 'seed', 'Income-Expenses.json'), 'utf-8')
    );

    const incomeExpenses = incomeExpensesRaw.map((item) => ({
      name: item.name,
      amount: parseFloat(item.amount.replace(/,/g, '')),
      type: item.type,
    }));

    res.json({
      stats: { products: productsCount, suppliers: suppliersCount, customers: customersCount },
      recentCustomers,
      incomeExpenses,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
