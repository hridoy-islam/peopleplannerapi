import mongoose, { model, Schema, Types } from "mongoose";

import { string } from "zod";
import { TBankHoliday } from "./bank-holiday.interface";

const BankHolidaySchema = new Schema<TBankHoliday>({
  title: {
    type: String,
  },
  date: {
    type: Date,
  },
 companyId: { type: Types.ObjectId, ref: "User" },

  year: {
    type: Number,
  },
});

export const BankHoliday = model<TBankHoliday>(
  "BankHoliday",
  BankHolidaySchema
);
