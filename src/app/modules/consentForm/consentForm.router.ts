/* eslint-disable @typescript-eslint/no-explicit-any */
import express from "express";
import { ConsentFormControllers } from "./consentForm.controller";


const router = express.Router();
router.get(
  "/",
//   auth("admin", "company", "creator", "user", "director"),
  ConsentFormControllers.getAllConsentForm
);
router.get(
  "/:id",
//   auth("admin", "user", "director", "company", "creator"),
ConsentFormControllers.getSingleConsentForm
);
router.post(
  "/",
//   auth("admin", "user", "director", "company", "creator"),
ConsentFormControllers.createConsentForm
);

router.patch(
  "/:id",
//   auth("admin", "user", "creator", "company", "director"),
ConsentFormControllers.updateConsentForm
);
router.delete(
  "/:id",
//   auth("admin", "user", "creator", "company", "director"),
ConsentFormControllers.deleteSingleConsentForm
);



export const ConsentFormRoutes = router;
