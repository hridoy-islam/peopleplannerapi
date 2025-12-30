import { Types } from "mongoose";

export interface TBreak {
  breakStart: Date;
  breakEnd?: Date;
}
export interface TReport {
  userId: Types.ObjectId;
  action: string;
  description: { type: String };
  clockIn: { type: Date };
  clockOut: { type: Date };
  breaks: TBreak[];
}
