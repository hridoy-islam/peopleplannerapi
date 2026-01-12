import { Types } from "mongoose";

export interface TServiceUserDocument {
  _id: Types.ObjectId;
  documentTitle: string;
  userId: Types.ObjectId;
  category?: string;
  document?: string;
  createdAt?: Date;
  updatedAt?: Date;
 
}
