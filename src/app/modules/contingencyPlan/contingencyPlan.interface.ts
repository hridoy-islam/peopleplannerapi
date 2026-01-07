import { Types } from "mongoose";


export interface TScenario {
  triggerFactor: string;
  whatShouldHappen: string;
  whoShouldBeContacted: string;
  role: string;
  anticipatoryMedicationsEquipment: string;
}

export interface TContingencyPlan {
  userId?: Types.ObjectId;
  planName: string;
  scenarios: TScenario[];
  agreedWithPerson: "Service User" | "Legitimate Representative";
  nextReview: "1 months" | "3 months" | "6 months" | "12 months";
}