/* eslint-disable @typescript-eslint/no-this-alias */
import bcrypt from "bcrypt";
import { Schema, Types, model } from "mongoose";

import { TVisitType } from "./visitType.interface";

const VisitTypeSchema = new Schema<TVisitType>(
  {
    title: {
      type: String,
      required: true,
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

export const VisitType = model<TVisitType>("VisitType", VisitTypeSchema);
