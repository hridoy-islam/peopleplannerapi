import { Types } from "mongoose";

export interface TNeed {
  _id: Types.ObjectId;
  title: string;
  userId: Types.ObjectId;
  description?: string;
  createdAt?: Date;
  updatedAt?: Date;
 
}
