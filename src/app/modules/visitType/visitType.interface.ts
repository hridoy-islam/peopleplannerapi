/* eslint-disable no-unused-vars */
import {  Types } from "mongoose";


export interface TVisitType {
  _id: Types.ObjectId;
  title: string;  
  companyId?:string;
  status: "inactive" | "active";
}
