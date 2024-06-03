import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  its: {
    type: Number,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    default: 'null'
  },
  phone: {
    type: Number,
  },
  address: {
    type: String,
  },
  userRole: {
    type: String,
    enum: ['admin', 'user'],
    default: 'user',
  },
  isLoggedIn: {
    type: Boolean,
    default: false,
  },
  multipleLogin: {
    type: Boolean,
    default: false,
  }
});

export default mongoose.models.User || mongoose.model('User', UserSchema);
