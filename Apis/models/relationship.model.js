import mongoose from "mongoose";

const relationshipSchema = new mongoose.Schema({
  from: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  to: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  status: { type: String, enum: ['requested', 'accepted', 'blocked'], default: 'requested' },
});

export const Relationship = mongoose.model('Relationship', relationshipSchema);
