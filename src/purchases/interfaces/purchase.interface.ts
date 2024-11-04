import { Document } from 'mongoose';

export interface Purchase extends Document {
  readonly do: string;
  readonly to: string;
  readonly amount: number;
}