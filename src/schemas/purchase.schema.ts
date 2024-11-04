import * as mongoose from 'mongoose';

export const PurchaseSchema = new mongoose.Schema({
  from: String,
  to: String,
  amount: Number,
  created_at: Date,
});