import mongoose, { model, Schema } from "mongoose";

import { string } from "zod";
import { TImportantPerson } from "./importantPerson.interface";

const ImportantPersonSchema = new Schema<TImportantPerson>(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    type: {
      type: String,
      enum: ["professional", "personal"],
      required: true,
    },
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    lastingPowerOfAttorney: {
      type: [String], // Array of strings for checkbox values
      default: [],
    },
    observation: {
      type: String,
    },

    // Professional Specific Fields
    role: {
      type: String,
    },
    organization: {
      type: String,
    },
    specialty: {
      type: String,
    },

    // Personal Specific Fields
    relationshipRole: {
      type: String,
    },
    nextOfKin: {
      type: Boolean, // Converted to Boolean
      default: false,
    },

    // Contact Details
    postcode: {
      type: String,
    },
    telephone1: {
      type: String,
    },
    telephone2: {
      type: String,
    },
    email: {
      type: String,
    },
    contactStatus: {
      type: String,
      enum: ["Priority", "Secondary", "Do not contact"],
    },
    contactableTimes: {
      type: String,
    },

    // Family Portal Status
    access: {
      type: Boolean, // Converted to Boolean
      default: false,
    },
    justification: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export const ImportantPerson = model<TImportantPerson>("ImportantPerson", ImportantPersonSchema);
