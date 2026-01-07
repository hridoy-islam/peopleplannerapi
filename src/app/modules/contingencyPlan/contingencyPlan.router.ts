/* eslint-disable @typescript-eslint/no-explicit-any */
import express from "express";
import { ContingencyPlanControllers } from "./contingencyPlan.controller";


const router = express.Router();
router.get(
  "/",
//   auth("admin", "company", "creator", "user", "director"),
  ContingencyPlanControllers.getAllContingencyPlan
);
router.get(
  "/:id",
//   auth("admin", "user", "director", "company", "creator"),
ContingencyPlanControllers.getSingleContingencyPlan
);
router.post(
  "/",
//   auth("admin", "user", "director", "company", "creator"),
ContingencyPlanControllers.createContingencyPlan
);

router.patch(
  "/:id",
//   auth("admin", "user", "creator", "company", "director"),
ContingencyPlanControllers.updateContingencyPlan
);



export const ContingencyPlanRoutes = router;
