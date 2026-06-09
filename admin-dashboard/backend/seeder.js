import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

import User from './models/User.js';
import Customer from './models/Customer.js';
import Product from './models/Product.js';
import Supplier from './models/Supplier.js';
import Order from './models/Order.js';
import connectDB from './config/db.js';

dotenv.config();
connectDB();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const importData = async () => {
  try {
    await User.deleteMany();
    await Customer.deleteMany();
    await Product.deleteMany();
    await Supplier.deleteMany();
    await Order.deleteMany();

    const hashedPassword = await bcrypt.hash('admin123', 10);
    const adminUser = await User.create({
      name: 'Clayton Santos',
      email: 'vendor@gmail.com',
      password: hashedPassword,
    });

    
    const customersData = JSON.parse(fs.readFileSync(path.join(__dirname, 'seed', 'customers.json'), 'utf-8'));
    const ordersData = JSON.parse(fs.readFileSync(path.join(__dirname, 'seed', 'orders.json'), 'utf-8'));
    const productsData = JSON.parse(fs.readFileSync(path.join(__dirname, 'seed', 'products.json'), 'utf-8'));
    const suppliersData = JSON.parse(fs.readFileSync(path.join(__dirname, 'seed', 'suppliers.json'), 'utf-8'));

    const mappedCustomers = customersData.map(c => ({
      name: c.name,
      email: c.email,
      address: c.address,
      phone: c.phone,
      registerDate: new Date(c.register_date),
      spent: Number(c.spent.replace(/,/g, '')),
      country: ''
    }));

    const mappedProducts = productsData.map(p => ({
      name: p.name,
      category: p.category,
      stock: Number(p.stock),
      suppliers: p.suppliers,
      price: Number(p.price)
    }));

    const mappedSuppliers = suppliersData.map(s => ({
      name: s.name,
      address: s.address,
      company: s.suppliers,
      deliveryDate: new Date(s.date),
      amount: Number(s.amount.replace(/[^0-9.-]+/g, '')),
      status: s.status
    }));

    const mappedOrders = ordersData.map(o => ({
      userInfo: o.name,
      address: o.address,
      products: o.products,
      orderDate: new Date(o.order_date),
      price: Number(o.price),
      status: o.status
    }));

    await Customer.create(mappedCustomers);
    await Product.create(mappedProducts);
    await Supplier.create(mappedSuppliers);
    await Order.create(mappedOrders);

    console.log('Data Imported successfully from JSON files!');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

importData();
