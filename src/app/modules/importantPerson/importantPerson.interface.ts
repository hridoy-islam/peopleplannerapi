import { Types } from "mongoose";


export interface TImportantPerson {
  // --- Discriminator ---
  type: "professional" | "personal";

  // --- General Information ---
  userId: Types.ObjectId;
  firstName: string;
  lastName: string;
  lastingPowerOfAttorney?: string[];
  observation?: string;

  // --- Professional Specific ---
  role?: string;
  organization?: string;
  specialty?: string;

  // --- Personal Specific ---
  relationshipRole?: string;
  nextOfKin?: boolean; // Updated to boolean

  // --- Contact Details ---
  postcode?: string;
  telephone1?: string;
  telephone2?: string;
  email?: string;
  contactStatus?: "Priority" | "Secondary" | "Do not contact";
  contactableTimes?: string;

  // --- Family Portal Status ---
  access?: boolean; // Updated to boolean
  justification?: string;
}
