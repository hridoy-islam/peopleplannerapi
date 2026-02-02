import { Schema, model, Types } from "mongoose";
import { TAttendanceLog, TInvoice } from "./invoice.interface";

const AttendanceLog = new Schema<TAttendanceLog>({
  
  scheduleId: { type: Schema.Types.ObjectId, ref: "Schedule" },
  startDate: {
    type: String,
  },
  startTime: {
    type: String,
  },
  endDate: {
    type: String,
  },
  endTime: {
    type: String,
  },
  payRate: { type: Number, default:0 },
  invoiceRate: { type: Number, default:0 },
  note: { type: String },
});

const InvoiceSchema = new Schema<TInvoice>(
  {
    serviceUserId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    companyId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    fromDate: {
      type: Date,
      required: true,
    },
    toDate: {
      type: Date,
      required: true,
    },
    note: { type: String },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
    totalHour: { type: Number },
    approvedBy: {
      type: Types.ObjectId,
      ref: "User",
    },
    totalAmount: {
      type: Number,
      default: 0,
    },
    attendanceList: [AttendanceLog],
  },
  {
    timestamps: true,
  },
);

export const Invoice = model<TInvoice>("Invoice", InvoiceSchema);
