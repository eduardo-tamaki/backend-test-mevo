import * as mongoose from 'mongoose';

export const ImportSchema = new mongoose.Schema({
  document_name: String,
  valid_rows: Number,
  suspect_rows: Number,
  invalid_rows: Number,
  processed_rows: Number,
  created_at: Date,
});