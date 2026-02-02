/* eslint-disable @typescript-eslint/no-this-alias */
import bcrypt from "bcrypt";
import { Schema, Types, model } from "mongoose";

import { TServiceType } from "./serviceType.interface";

const ServiceTypeSchema = new Schema<TServiceType>(
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

export const ServiceType = model<TServiceType>("ServiceType", ServiceTypeSchema);
