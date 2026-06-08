import mongoose from 'mongoose';

const productSchema = mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true }, // e.g. Medicine, Head, Hand, etc.
  stock: { type: Number, required: true },
  suppliers: { type: String, required: true },
  price: { type: Number, required: true }
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);
export default Product;
