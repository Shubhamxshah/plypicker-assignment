// models/user.model.js
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Please provide an email'],
    unique: true
  },
  password: {
    type: String,
    required: [true, 'Please provide a password']
  },
  role: {
    type: String,
    required: [true, 'Please select a role']
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  // Statistics fields (optional)
  reviewRequests: {
    type: Number,
    default: 0
  },
  approvedRequests: {
    type: Number,
    default: 0
  },
  rejectedRequests: {
    type: Number,
    default: 0
  },
  editsDone: {
    type: Number,
    default: 0
  }
});

const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;
