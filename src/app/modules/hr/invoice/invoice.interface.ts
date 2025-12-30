import mongoose, { Schema, Document } from "mongoose";

export interface TServiceItem {
 
  startDate: Date;
  endDate: Date;
}

export interface TInvoice extends Document {
  userId: mongoose.Types.ObjectId;
  serviceNumber: Number;
  period: String;
  amount: Number;
  status: String;
  services: TServiceItem[];
  createdAt: Date;
  updatedAt: Date;
}
