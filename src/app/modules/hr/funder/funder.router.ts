/* eslint-disable @typescript-eslint/no-explicit-any */
import express from "express";

import { FunderControllers } from "./funder.controller";


const router = express.Router();
router.get(
  "/",
//   auth("admin", "company", "creator", "user", "director"),
  FunderControllers.getAllFunder
);
router.get(
  "/:id",
//   auth("admin", "user", "director", "company", "creator"),
FunderControllers.getSingleFunder
);
router.post(
  "/",
//   auth("admin", "user", "director", "company", "creator"),
FunderControllers.createFunder
);

router.patch(
  "/:id",
//   auth("admin", "user", "creator", "company", "director"),
FunderControllers.updateFunder
);



export const FunderRoutes = router;
