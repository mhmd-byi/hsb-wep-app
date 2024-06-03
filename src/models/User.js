import mongoose from "mongoose";
import jwt from 'jsonwebtoken';

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  its: {
    type: Number,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    require: true,
    unique: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  batch: {
    type: Number,
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
    default: "member",
  }
});

// Method to generate a token
UserSchema.methods.generateAuthToken = function() {
  const token = jwt.sign({ _id: this._id }, 'asdfghjkL007', {
    expiresIn: '7d'
  });
  return token;
};

export default mongoose.models.User || mongoose.model("User", UserSchema);
