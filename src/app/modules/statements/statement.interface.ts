import { Types } from "mongoose";

export interface TStatement {
  _id: Types.ObjectId;
  title: string; 
  userId: Types.ObjectId;
  type: string;
  createdAt?: Date;
  updatedAt?: Date;

}


// export interface TStatement {
//   _id: Types.ObjectId;
//   title: string; 
//   type: string;  
//   userId: Types.ObjectId;
//   signatureOption?: 'now' | 'later';
//   signature?: string;    
//   reviewPeriod?: '3months' | '6months' | '1year';
//   nextReviewDate?: string;
//   createdAt?: Date;
//   updatedAt?: Date;

// }
