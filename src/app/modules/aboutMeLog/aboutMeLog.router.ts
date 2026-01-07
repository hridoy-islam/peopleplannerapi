/* eslint-disable @typescript-eslint/no-explicit-any */
import express from "express";
import { AboutMeLogControllers } from "./aboutMeLog.controller";


const router = express.Router();
router.get(
  "/",
//   auth("admin", "company", "creator", "user", "director"),
  AboutMeLogControllers.getAllAboutMeLog
);
router.get(
  "/:id",
//   auth("admin", "user", "director", "company", "creator"),
AboutMeLogControllers.getSingleAboutMeLog
);
router.post(
  "/",
//   auth("admin", "user", "director", "company", "creator"),
AboutMeLogControllers.createAboutMeLog
);

router.patch(
  "/:id",
//   auth("admin", "user", "creator", "company", "director"),
AboutMeLogControllers.updateAboutMeLog
);



export const AboutMeLogRoutes = router;
