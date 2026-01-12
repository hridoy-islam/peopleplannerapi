import { Types } from "mongoose";


export interface TAboutMeAnswer {
  description: string;
  supportedBy: string; 
}


export interface TAboutMeLog {
  _id: string;
  userId: Types.ObjectId;
  
 
  importantToMe: TAboutMeAnswer;
  importantPeople: TAboutMeAnswer;
  dailyRoutine: TAboutMeAnswer;
  communication: TAboutMeAnswer;

  updatedAt?: Date;
}