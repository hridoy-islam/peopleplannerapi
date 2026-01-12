import mongoose, { model, Schema } from "mongoose";

import { string } from "zod";
import { TStatement } from "./statement.interface";

const StatementSchema = new Schema<TStatement>(
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
    type: {
      type: String,
      required: true,
      enum: ['consent', 'capacity'],
    },
   
  },
  {
    timestamps: true, 
  }
);

export const Statement = model<TStatement>(
  "Statement",
  StatementSchema
);
