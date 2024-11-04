import { Document } from 'mongoose';

export interface Import extends Document {
  readonly document_name: string;
  readonly valid_rows: number;
  readonly suspect_rows: number;
  readonly invalid_rows: number;
  readonly processed_rows: number;
}