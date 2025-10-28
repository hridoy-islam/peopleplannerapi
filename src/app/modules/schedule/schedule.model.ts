import mongoose, { model, Schema, Types } from "mongoose";
import { TSchedule } from "./schedule.interface";

// Sub-schemas for nested arrays
const ExpenseSchema = new Schema(
  {
    expenseType: { type: String },
    distance: { type: String },
    payEmployee: { type: Boolean },
    invoiceCustomer: { type: Boolean },
    payAmount: { type: Number, default: null },
    invoiceAmount: { type: Number, default: null },
    notes: { type: String },
  },
 
);

const TagSchema = new Schema(
  {
    tag: { type: String },
    message: { type: String },
    deliveryDuration: { type: Number, default: null },
    deliveryOption: { type: String },
  },
 
);

const NoteItemSchema = new Schema(
  {
    note: { type: String },
  },
 
);

const BreakSchema = new Schema(
  {
    startDate: { type: Date },
    startTime: { type: Date },
    endTime: { type: Date },
    type: { type: String },
  },
 
);

// Main Schedule Schema
const ScheduleSchema = new Schema<TSchedule>(
  {
    // Date & Time (General Info)
    date: { type: Date },
    startTime: { type: String },
    endTime: { type: String },
    timeInMinutes: { type: Number },
    travelTime: { type: Number },

    // Service User & Funder
    branch: { type: String },
    area: { type: String },
    serviceUser: { type: Schema.Types.ObjectId, ref: 'User' },
    serviceFunder: { type: Schema.Types.ObjectId, ref: 'User' },

    // Employee
    employeeBranch: { type: String },
    employeeArea: { type: String },
    employee: { type: Schema.Types.ObjectId, ref: 'User' },

    // Service & Rates
    serviceType: { type: String },
    visitType: { type: String },
    payRate: { type: String },
    invoiceRate: { type: String },

    // Summary
    cancellation: { type: String },

    // Equipment
    glovesAprons: { type: Boolean },
    uniform: { type: Boolean },
    idBadge: { type: Boolean },

    // Dynamic arrays
    expenses: [ExpenseSchema],
    tags: [TagSchema],
    notes: [NoteItemSchema],
    breaks: [BreakSchema],

    // Day On/Off (as strings, per your interface)
    plannedDate: { type: String },
    actualDate: { type: String },
    plannedStartTime: { type: String },
    actualEndTime: { type: String },
    duration: { type: String },

    bookOnMethod: { type: String },
    bookOnDate: { type: String },
    bookOnTime: { type: String },
    bookOnNotes: { type: String },

    bookOffMethod: { type: String },
    bookOffDate: { type: String },
    bookOffTime: { type: String },
    bookOffNotes: { type: String },

    // Purchase Order
    purchaseOrder: { type: Boolean },
  },
  {
    timestamps: true,
  }
);

export const Schedule = model<TSchedule>("Schedule", ScheduleSchema);