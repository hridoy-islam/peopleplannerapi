/* eslint-disable @typescript-eslint/no-explicit-any */
import express from "express";


import { VisitTypeControllers } from "./visitType.controller";


const router = express.Router();
router.get(
  "/",
//   auth("admin", "company", "creator", "user", "director"),
VisitTypeControllers.getAllVisitType
);
// router.get(
//   "/:id",
// //   auth("admin", "user", "director", "company", "creator"),
// NoticeControllers.getSingleNotice
// );
router.post(
  "/",
//   auth("admin", "user", "director", "company", "creator"),
VisitTypeControllers.createVisitType
);

router.patch(
  "/:id",
//   auth("admin", "user", "creator", "company", "director"),
VisitTypeControllers.updateVisitType
);



export const VisitTypeRoutes = router;
