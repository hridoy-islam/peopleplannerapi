import mongoose, { model, Schema } from "mongoose";
import { TServiceUserSchedule, TVisit, TDaySchedule } from "./serviceUserSchedule.interface";

// 1. Sub-schema for a single Visit
const VisitSchema = new Schema<TVisit>({
  startTime: { 
    type: String, 
    required: true 
  },
  endTime: { 
    type: String, 
    required: true 
  },
  employeeId: { 
    type: Schema.Types.ObjectId, 
    ref: "User", 

  },
  shiftId: { 
    type: Schema.Types.ObjectId, 
    ref: "Shift", 

  },
  employmentRateId: { 
    type: Schema.Types.ObjectId, 
    ref: "EmployeeRate", 
 
  },
  payRate: { 
    type: Number, 
    default: 0 
  },
  invoiceRate: { 
    type: Number, 
    required: true,
    default:0
  },
  
}, { _id: true }); 


const DayScheduleSchema = new Schema<TDaySchedule>({
  day: {
    type: String,
    enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    required: true
  },
  visits: {
    type: [VisitSchema],
    default: []
  }
});


const ServiceUserScheduleSchema = new Schema<TServiceUserSchedule>(
  {
    serviceUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
   
    schedule: {
      type: [DayScheduleSchema],
      default: []
    }
  },
  {
    timestamps: true,
  }
);

export const ServiceUserSchedule = model<TServiceUserSchedule>(
  "ServiceUserSchedule",
  ServiceUserScheduleSchema
);