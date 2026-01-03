/* eslint-disable @typescript-eslint/no-explicit-any */
import express from "express";


import { ScheduleControllers } from "./schedule.controller";


const router = express.Router();
router.get(
  "/",
//   auth("admin", "company", "creator", "user", "director"),
ScheduleControllers.getAllSchedule
);
router.get(
  "/upcoming",
//   auth("admin", "company", "creator", "user", "director"),
ScheduleControllers.getAllUpcomingSchedule
);
router.get(
  "/:id",
//   auth("admin", "user", "director", "company", "creator"),
ScheduleControllers.getSingleSchedule
);
router.post(
  "/",
//   auth("admin", "user", "director", "company", "creator"),
ScheduleControllers.createSchedule
);

router.patch(
  "/:id",
//   auth("admin", "user", "creator", "company", "director"),
ScheduleControllers.updateSchedule
);
router.delete(
  "/:id",
//   auth("admin", "user", "creator", "company", "director"),
ScheduleControllers.deleteSingleSchedule 
);



export const ScheduleRoutes = router;
