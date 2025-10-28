/* eslint-disable @typescript-eslint/no-explicit-any */
import express from "express";


import { PendingHiringControllers } from "./pendingHiring.controller";


const router = express.Router();
router.get(
  "/",
//   auth("admin", "company", "creator", "user", "director"),
PendingHiringControllers.getAllPendingHiring
);
router.get(
  "/:id",
//   auth("admin", "user", "director", "company", "creator"),
PendingHiringControllers.getSinglePendingHiring
);
router.post(
  "/",
//   auth("admin", "user", "director", "company", "creator"),
PendingHiringControllers.createPendingHiring
);

router.patch(
  "/:id",
//   auth("admin", "user", "creator", "company", "director"),
PendingHiringControllers.updatePendingHiring
);



export const PendingHiringRoutes = router;
