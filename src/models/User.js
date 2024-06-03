import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  its: {
    type: Number,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    require: true,
    default: 'null'
  },
  phone: {
    type: Number,
    required: true,
  },
  Batch: {
    type: String,
    require: true,
  },
  profileImage: {
    type: String,
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
