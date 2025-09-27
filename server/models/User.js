import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  fullName: {           // changed from 'name' to 'fullName'
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  }
}, { timestamps: true });

const User = mongoose.model("User", userSchema); // collection: "users"
export default User;
