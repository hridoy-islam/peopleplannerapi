import mongoose, { model, Schema } from "mongoose";

import { string } from "zod";
import { TConsentForm } from "./userErrorNotification.interface";

const ConsentFormSchema = new Schema<TConsentForm>(
  {
   userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },

    statementId: {
      type: Schema.Types.ObjectId,
      ref: 'Statement',
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

    signatureOption: {
      type: String,
      enum: ['now', 'later'],
    },

    signature: {
      type: String,
    },

    reviewPeriod: {
      type: String,
      enum: ['3months', '6months', '1year'],
    },

    nextReviewDate: {
      type: Date, 
    },
   
  },
  {
    timestamps: true, 
  }
);

export const ConsentForm = model<TConsentForm>(
  "ConsentForm",
  ConsentFormSchema
);
