import { Types } from "mongoose";

export interface TAttendanceLog {
  scheduleId?: Types.ObjectId;
  employementRateId?: Types.ObjectId;
  shiftId?: Types.ObjectId;
  startDate?: string;
  startTime?: string;
  endDate?: string;
  endTime?: string;
  payRate?: number;
  invoiceRate?: number;
  note?: string;
}

export interface TPayslip {
  userId: Types.ObjectId;
  companyId: Types.ObjectId;
  fromDate: Date;
  toDate: Date;
  note?: string;
  status: "pending" | "approved" | "rejected";
  reason?: string;
  totalHour?: number;
  approvedBy?: Types.ObjectId;
  totalAmount: number;
  netAmount: number; 
  attendanceList: TAttendanceLog[];
  createdAt?: Date;
  updatedAt?: Date;

}