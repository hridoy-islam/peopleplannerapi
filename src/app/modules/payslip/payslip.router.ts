/* eslint-disable @typescript-eslint/no-explicit-any */
import express from "express";
import { PayslipControllers } from "./payslip.controller";




const router = express.Router();
router.get(
  "/",
//   auth("admin", "company", "creator", "user", "director"),
PayslipControllers.getAllPayslip
);

router.get(
  "/:id",
//   auth("admin", "user", "director", "company", "creator"),
PayslipControllers.getSinglePayslip
);
router.post(
  "/",
//   auth("admin", "user", "director", "company", "creator"),
PayslipControllers.createPayslip
);

router.patch(
  "/:id",
//   auth("admin", "user", "creator", "company", "director"),
PayslipControllers.updatePayslip
);
router.get(
  "/regenerate/:id",
//   auth("admin", "user", "creator", "company", "director"),
PayslipControllers.regeneratePayslip
);





export const PayslipRoutes = router;
