import { Types } from "mongoose";

export type TVisit = {
  startTime: string; // e.g., "09:00"
  endTime: string;   // e.g., "17:00"
  employeeId?: Types.ObjectId; // Reference to the User/Employee
  shiftId?: Types.ObjectId; 
  employmentRateId:Types.ObjectId;
  payRate?: number;
  invoiceRate: number;
};

export type TDaySchedule = {
  day: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';
  visits: TVisit[];
};

export type TServiceUserSchedule = {
  serviceUserId: Types.ObjectId; 
  title: string;
  description?: string;
  schedule: TDaySchedule[]; 
};