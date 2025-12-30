import { Types } from "mongoose";


export interface TDevice {
  userId: Types.ObjectId;
  device: string;
  deviceType: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}
