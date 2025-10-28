import { Types } from "mongoose";

interface Expense {
  expenseType: string;
  distance: string;
  payEmployee: boolean;
  invoiceCustomer: boolean;
  payAmount: number | null;
  invoiceAmount: number | null;
  notes: string;
}

interface Tag {
  tag: string;
  message: string;
  deliveryDuration: number | null;
  deliveryOption: string;
}

interface NoteItem {
  note: string;
}

interface Break {
  startDate: Date;
  startTime: Date;
  endTime: Date;
  type: string;
}

// Main form data interface
export interface TSchedule {
  // Date & Time (General Info)
  date: Date;
  startTime: string;
  endTime: string;
  timeInMinutes: number;
  travelTime: number;

  // Service User & Funder
  branch: string;
  area: string;
  serviceUser: Types.ObjectId;
  serviceFunder: Types.ObjectId;

  // Employee
  employeeBranch: string;
  employeeArea: string;
  employee: Types.ObjectId;

  // Service & Rates
  serviceType: string;
  visitType: string;
  payRate: string;
  invoiceRate: string;

  // Summary
  cancellation: string;

  // Equipment
  glovesAprons: boolean;
  uniform: boolean;
  idBadge: boolean;

  // Dynamic arrays
  expenses: Expense[];
  tags: Tag[];
  notes: NoteItem[];
  breaks: Break[];

  // Day On/Off
  plannedDate: string;
  actualDate: string;
  plannedStartTime: string;
  actualEndTime: string;
  duration: string;

  bookOnMethod: string;
  bookOnDate: string;
  bookOnTime: string;
  bookOnNotes: string;
  
  bookOffMethod: string;
  bookOffDate: string;
  bookOffTime: string;
  bookOffNotes: string;

  // Purchase Order
  purchaseOrder: boolean;
}