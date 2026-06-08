import mongoose from 'mongoose';

const orderSchema = mongoose.Schema({
  userInfo: { type: String, required: true }, // customer name essentially
  address: { type: String, required: true },
  products: { type: String, required: true }, // can be string for simplicity or array
  orderDate: { type: Date, default: Date.now },
  price: { type: Number, required: true },
  status: { type: String, required: true, enum: ['Completed', 'Pending', 'Cancelled', 'Confirmed', 'Processing', 'Shipped', 'Delivered'] }
}, { timestamps: true });

const Order = mongoose.model('Order', orderSchema);
export default Order;
