import mongoose, { model, Schema } from "mongoose";

import { string } from "zod";
import { TContingencyPlan, TScenario } from "./contingencyPlan.interface";



// 1. Define the Scenario Sub-schema
const ScenarioSchema = new Schema<TScenario>(
  {
    triggerFactor: { type: String },
    whatShouldHappen: { type: String },
    whoShouldBeContacted: { type: String },
    role: { type: String },
    anticipatoryMedicationsEquipment: { type: String },
  }
);


const ContingencyPlanSchema = new Schema<TContingencyPlan>(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    planName: {
      type: String,
      
    },
    scenarios: {
      type: [ScenarioSchema],
      default: [],
    },
    agreedWithPerson: {
      type: String,
      enum: ["Service User", "Legitimate Representative"],
      
    },
    nextReview: {
      type: String,
      enum: ["1 months", "3 months", "6 months", "12 months"],
      
    },
  },
  {
    timestamps: true,
  }
);



export const ContingencyPlan = model<TContingencyPlan>(
  "ContingencyPlan",
  ContingencyPlanSchema
);
