import { Types } from "mongoose";

export interface TAboutMeLog {
  _id: Types.ObjectId;
  title: string;
  userId: Types.ObjectId;
  description?: string;

  description2?: string;
  createdAt?: Date;
  updatedAt?: Date;
 
}
