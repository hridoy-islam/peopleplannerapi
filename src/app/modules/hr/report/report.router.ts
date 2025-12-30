/* eslint-disable @typescript-eslint/no-explicit-any */
import express from "express";
import { ReportControllers } from "./report.controller";
import auth from "../../../middlewares/auth";


const router = express.Router();
router.get(
  "/",
  auth("admin", "user", "director"),
  ReportControllers.getAllReport
);
router.get(
  "/:id",
  auth("admin", "user", "director"),
ReportControllers.getSingleReport
);
router.post(
  "/",
  auth("admin", "user", "director", ),
ReportControllers.createReport
);

router.patch(
  "/:id",
  auth("admin", "user", "director"),
ReportControllers.updateReport
);

router.delete(
  "/:id",
  auth("admin", "user", "director"),
  ReportControllers.deleteReport
);



export const ReportRoutes = router;
