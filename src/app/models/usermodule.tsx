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
  }
});

// Ensure that 'User' model is only created once
const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;
