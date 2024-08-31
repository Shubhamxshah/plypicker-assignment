
import mongoose from 'mongoose';

const ReviewRequestSchema = new mongoose.Schema({

  productName: String,
  price: String,
  image: String,
  productDescription: String,
  department: String,
  id: String ,

  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const ReviewRequestProduct = mongoose.models.ReviewRequestProduct || mongoose.model('ReviewRequestProduct', ReviewRequestSchema);

export default ReviewRequestProduct;
