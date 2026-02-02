/* eslint-disable @typescript-eslint/no-this-alias */
import bcrypt from "bcrypt";
import { Schema, Types, model } from "mongoose";

import { TDepartment } from "./department.interface";

const departmentSchema = new Schema<TDepartment>(
  {
    departmentName: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    companyId: { type: Types.ObjectId, ref: "User" },

    status: {
      type: String,
      default: "active",
    },
  },
  {
    timestamps: true,
  },
);

export const Department = model<TDepartment>("Department", departmentSchema);
