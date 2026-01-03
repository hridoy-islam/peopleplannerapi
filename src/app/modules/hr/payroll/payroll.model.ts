import mongoose, { model, Schema } from "mongoose";
import { TPayroll, TServiceItem } from "./payroll.interface";


const ServiceItemSchema = new Schema<TServiceItem>(
  {
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
  },
 
); 


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
     amountPaid: {
      type: Number,
      default: 0,
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
