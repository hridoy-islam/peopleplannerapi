import mongoose, { Schema, Document, model } from "mongoose";
import { TReport } from "./report.interface";

const ReportSchema = new Schema<TReport & Document>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },

    action: {
      type: String,
      enum: ["clockIn", "clockOut", "break"],
      default: "login",
    },


    breaks: [
      {
        breakStart: { type: Date },
        breakEnd: { type: Date },
      },
    ],

    clockIn: { type: Date },
    clockOut: { type: Date },
  },
  {
    timestamps: true,
  }
);

export const Report = model<TReport & Document>("Report", ReportSchema);

