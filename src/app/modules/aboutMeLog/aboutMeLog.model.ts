import mongoose, { model, Schema } from "mongoose";

import { string } from "zod";
import { TAboutMeLog } from "./aboutMeLog.interface";

const SectionSchema = new Schema(
  {
    description: {
      type: String,
      default: "",
    },
    supportedBy: {
      type: String,
      default: "", 
    },
  }
);

const AboutMeLogSchema = new Schema<TAboutMeLog>(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,

    },
    importantToMe: {
      type: SectionSchema,
      default: {},
    },
    importantPeople: {
      type: SectionSchema,
      default: {},
    },
    dailyRoutine: {
      type: SectionSchema,
      default: {},
    },
    communication: {
      type: SectionSchema,
      default: {},
    },
  },
  {
    timestamps: true,
  }
);

export const AboutMeLog = model<TAboutMeLog>("AboutMeLog", AboutMeLogSchema);
