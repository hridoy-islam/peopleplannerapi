/* eslint-disable @typescript-eslint/no-explicit-any */
import express from "express";


import { ServiceTypeControllers } from "./serviceType.controller";


const router = express.Router();
router.get(
  "/",
//   auth("admin", "company", "creator", "user", "director"),
ServiceTypeControllers.getAllServiceType
);
// router.get(
//   "/:id",
// //   auth("admin", "user", "director", "company", "creator"),
// NoticeControllers.getSingleNotice
// );
router.post(
  "/",
//   auth("admin", "user", "director", "company", "creator"),
ServiceTypeControllers.createServiceType
);

router.patch(
  "/:id",
//   auth("admin", "user", "creator", "company", "director"),
ServiceTypeControllers.updateServiceType
);



export const ServiceTypeRoutes = router;
