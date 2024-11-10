import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  friends: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
},{timestamps:true});

export const User = mongoose.model('User', userSchema);
