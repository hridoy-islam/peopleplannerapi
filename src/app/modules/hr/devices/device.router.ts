/* eslint-disable @typescript-eslint/no-explicit-any */
import express from "express";
import { DeviceControllers } from "./device.controller";
import auth from "../../../middlewares/auth";


const router = express.Router();
router.get(
  "/",
  auth("admin", "user", "director"),
  DeviceControllers.getAllDevice
);
router.get(
  "/:id",
  auth("admin", "user", "director"),
DeviceControllers.getSingleDevice
);
router.post(
  "/",
  auth("admin", "user", "director", ),
DeviceControllers.createDevice
);

router.patch(
  "/:id",
  auth("admin", "user", "director"),
DeviceControllers.updateDevice
);

router.delete(
  "/:id",
  auth("admin", "user", "director"),
  DeviceControllers.deleteDevice
);



export const DeviceRoutes = router;
