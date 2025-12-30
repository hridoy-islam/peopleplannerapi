import mongoose, { Schema, Document, model } from "mongoose";
import { TDevice } from "./device.interface";

const DeviceSchema = new Schema<TDevice & Document>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },

    
    

    device: { type: String, required: true },
    deviceType: { type: String, required: true },
    status: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export const Device = model<TDevice & Document>("Device", DeviceSchema);
