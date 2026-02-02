import { Schema, model, Types } from "mongoose";
import { TAttendanceLog, TPayslip } from "./payslip.interface";

const AttendanceLog = new Schema<TAttendanceLog>({
  employementRateId: { type: Schema.Types.ObjectId, ref: "EmployeeRate" },
  shiftId: { type: Schema.Types.ObjectId, ref: "Shift" },
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

const PayslipSchema = new Schema<TPayslip>(
  {
    userId: {
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

export const Payslip = model<TPayslip>("Payslip", PayslipSchema);
