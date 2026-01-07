/* eslint-disable @typescript-eslint/no-explicit-any */
import express from "express";
import { NeedControllers } from "./needs.controller";


const router = express.Router();
router.get(
  "/",
//   auth("admin", "company", "creator", "user", "director"),
  NeedControllers.getAllNeed
);
router.get(
  "/:id",
//   auth("admin", "user", "director", "company", "creator"),
NeedControllers.getSingleNeed
);
router.post(
  "/",
//   auth("admin", "user", "director", "company", "creator"),
NeedControllers.createNeed
);

router.patch(
  "/:id",
//   auth("admin", "user", "creator", "company", "director"),
NeedControllers.updateNeed
);



export const NeedRoutes = router;
