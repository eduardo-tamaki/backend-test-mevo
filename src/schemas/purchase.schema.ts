import * as mongoose from 'mongoose';

export const PurchaseSchema = new mongoose.Schema({
  do: String,
  to: Number,
  amount: Number,
});