import mongoose, { model, Schema } from "mongoose";

import { string } from "zod";
import { TNeed } from "./needs.interface";

const NeedSchema = new Schema<TNeed>(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
   
  },
  {
    timestamps: true,
  }
);

export const Need = model<TNeed>(
  "Need",
  NeedSchema
);
