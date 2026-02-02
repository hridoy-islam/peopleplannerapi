/* eslint-disable @typescript-eslint/no-explicit-any */
import express from "express";
import { ShiftControllers } from "./shift.controller";
import auth from "../../../middlewares/auth";


const router = express.Router();
router.get(
  "/",
  auth("admin", "user", "director","company","staff","serviceUser"),
  ShiftControllers.getAllShift
);
router.get(
  "/:id",
  auth("admin", "user", "director","company","staff","serviceUser"),
ShiftControllers.getSingleShift
);
router.post(
  "/",
  auth("admin", "user", "director","company","staff","serviceUser"),
ShiftControllers.createShift
);

router.patch(
  "/:id",
  auth("admin", "user", "director","company","staff","serviceUser"),
ShiftControllers.updateShift
);

router.delete(
  "/:id",
  auth("admin", "user", "director","company","staff","serviceUser"),
  ShiftControllers.deleteShift
);



export const ShiftRoutes = router;
