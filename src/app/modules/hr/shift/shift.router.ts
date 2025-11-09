/* eslint-disable @typescript-eslint/no-explicit-any */
import express from "express";
import { ShiftControllers } from "./shift.controller";
import auth from "../../../middlewares/auth";


const router = express.Router();
router.get(
  "/",
  auth("admin", "user", "director"),
  ShiftControllers.getAllShift
);
router.get(
  "/:id",
  auth("admin", "user", "director"),
ShiftControllers.getSingleShift
);
router.post(
  "/",
  auth("admin", "user", "director", ),
ShiftControllers.createShift
);

router.patch(
  "/:id",
  auth("admin", "user", "director"),
ShiftControllers.updateShift
);

router.delete(
  "/:id",
  auth("admin", "user", "director"),
  ShiftControllers.deleteShift
);



export const ShiftRoutes = router;
