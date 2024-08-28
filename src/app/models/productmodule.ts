
import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  productName: String,
  price: String,
  image: String,
  productDescription: String,
  department: String,
  id: String 
});

const Product = mongoose.models.Product || mongoose.model('Product', productSchema);

export default Product;
