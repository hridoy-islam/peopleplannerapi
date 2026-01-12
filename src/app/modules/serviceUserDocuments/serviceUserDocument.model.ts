import mongoose, { model, Schema } from "mongoose";

import { string } from "zod";
import { TServiceUserDocument } from "./serviceUserDocument.interface";

const ServiceUserDocumentSchema = new Schema<TServiceUserDocument>(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    documentTitle: {
      type: String,
      required: true,
    },
    category: {
      type: String,
    },
    document: {
      type: String,
    },
   
  },
  {
    timestamps: true,
  }
);

export const ServiceUserDocument = model<TServiceUserDocument>(
  "ServiceUserDocument",
  ServiceUserDocumentSchema
);
