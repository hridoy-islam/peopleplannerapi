/* eslint-disable @typescript-eslint/no-explicit-any */
import express from "express";
import { InvoiceControllers } from "./invoice.controller";



const router = express.Router();
router.get(
  "/",
//   auth("admin", "company", "creator", "user", "director"),
  InvoiceControllers.getAllInvoice
);
router.get(
  "/:id",
//   auth("admin", "user", "director", "company", "creator"),
InvoiceControllers.getSingleInvoice
);
router.post(
  "/",
//   auth("admin", "user", "director", "company", "creator"),
InvoiceControllers.createInvoice
);

router.patch(
  "/:id",
//   auth("admin", "user", "creator", "company", "director"),
InvoiceControllers.updateInvoice
);



export const InvoiceRoutes = router;
