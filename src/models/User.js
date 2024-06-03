import mongoose from "mongoose";

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

export default mongoose.models.User || mongoose.model("User", UserSchema);
