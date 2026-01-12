import { Types } from "mongoose";



export interface TConsentForm {
  _id: Types.ObjectId;
  title: string; 
  type: string;  
  userId: Types.ObjectId;
  statementId: Types.ObjectId;
  signatureOption?: 'now' | 'later';
  signature?: string;    
  reviewPeriod?: '3months' | '6months' | '1year';
  nextReviewDate?: string;
  createdAt?: Date;
  updatedAt?: Date;

}
