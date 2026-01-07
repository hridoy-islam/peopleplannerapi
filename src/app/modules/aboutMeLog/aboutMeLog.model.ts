import mongoose, { model, Schema } from "mongoose";

import { string } from "zod";
import { TAboutMeLog } from "./aboutMeLog.interface";

const AboutMeLogSchema = new Schema<TAboutMeLog>(
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
    description2: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export const AboutMeLog = model<TAboutMeLog>("AboutMeLog", AboutMeLogSchema);
