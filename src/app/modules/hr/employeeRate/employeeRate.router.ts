/* eslint-disable @typescript-eslint/no-explicit-any */
import express from "express";
import { EmployeeRateControllers } from "./employeeRate.controller";
import auth from "../../../middlewares/auth";


const router = express.Router();
router.get(
  "/",
  auth("admin", "user", "director","company","staff","serviceUser"),
  EmployeeRateControllers.getAllEmployeeRate
);
router.get(
  "/:id",
  auth("admin", "user", "director","company","staff","serviceUser"),
EmployeeRateControllers.getSingleEmployeeRate
);
router.post(
  "/",
  auth("admin", "user", "director","company","staff","serviceUser"),
EmployeeRateControllers.createEmployeeRate
);

router.patch(
  "/:id",
  auth("admin", "user", "director","company","staff","serviceUser"),
EmployeeRateControllers.updateEmployeeRate
);

router.delete(
  "/:id",
  auth("admin", "user", "director","company","staff","serviceUser"),
  EmployeeRateControllers.deleteEmployeeRate
);



export const EmployeeRateRoutes = router;
