/* eslint-disable @typescript-eslint/no-explicit-any */
import express from "express";
import { ServiceUserScheduleControllers } from "./serviceUserSchedule.controller";


const router = express.Router();
router.get(
  "/",
//   auth("admin", "company", "creator", "user", "director"),
  ServiceUserScheduleControllers.getAllServiceUserSchedule
);
router.get(
  "/:id",
//   auth("admin", "user", "director", "company", "creator"),
ServiceUserScheduleControllers.getSingleServiceUserSchedule
);
router.post(
  "/",
//   auth("admin", "user", "director", "company", "creator"),
ServiceUserScheduleControllers.createServiceUserSchedule
);

router.patch(
  "/:id",
//   auth("admin", "user", "creator", "company", "director"),
ServiceUserScheduleControllers.updateServiceUserSchedule
);
router.delete(
  "/:id",
//   auth("admin", "user", "creator", "company", "director"),
ServiceUserScheduleControllers.deleteSingleServiceUserSchedule
);



export const ServiceUserScheduleRoutes = router;
