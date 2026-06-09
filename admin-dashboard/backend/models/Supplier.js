import mongoose from 'mongoose';

const supplierSchema = mongoose.Schema({
  name: { type: String, required: true }, 
  address: { type: String, required: true },
  company: { type: String, required: true },
  deliveryDate: { type: Date, required: true },
  amount: { type: Number, required: true },
  status: { type: String, required: true, enum: ['Active', 'Deactive'] }
}, { timestamps: true });

const Supplier = mongoose.model('Supplier', supplierSchema);
export default Supplier;
