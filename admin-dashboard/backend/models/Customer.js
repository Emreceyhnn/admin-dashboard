import mongoose from 'mongoose';

const customerSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  address: { type: String, required: true },
  phone: { type: String, required: true },
  registerDate: { type: Date, default: Date.now },
  spent: { type: Number, default: 0 },
  country: { type: String, default: '' }
}, { timestamps: true });

const Customer = mongoose.model('Customer', customerSchema);
export default Customer;
