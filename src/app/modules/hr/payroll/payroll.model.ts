import mongoose, { model, Schema } from "mongoose";
import { TPayroll, TServiceItem } from "./payroll.interface";

// 1. Define the Sub-schema for the service items
// This ensures each object in the array has a startDate and endDate
const ServiceItemSchema = new Schema<TServiceItem>(
  {
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
  },
  { _id: false }
); // _id: false prevents creating an extra ID for every array item

// 2. Define the Main Payroll Schema
const PayrollSchema: Schema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    serviceNumber: {
      type: Number,
      required: true,
    },
    period: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: ["due", "paid", "partial"],
      default: "due",
    },

    services: {
      type: [ServiceItemSchema],
      required: true,
     
    },
  },
  {
    timestamps: true, 
  }
);


export const Payroll = model<TPayroll>("Payroll", PayrollSchema);
