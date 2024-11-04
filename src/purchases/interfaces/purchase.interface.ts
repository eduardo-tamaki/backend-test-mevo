import { Document } from 'mongoose';

export interface Purchase extends Document {
  readonly String: string;
  readonly to: string;
  readonly amount: number;
}