/* eslint-disable @typescript-eslint/no-explicit-any */
import express from "express";
import { ServiceUserDocumentControllers } from "./serviceUserDocument.controller";


const router = express.Router();
router.get(
  "/",
//   auth("admin", "company", "creator", "user", "director"),
  ServiceUserDocumentControllers.getAllServiceUserDocument
);
router.get(
  "/:id",
//   auth("admin", "user", "director", "company", "creator"),
ServiceUserDocumentControllers.getSingleServiceUserDocument
);
router.post(
  "/",
//   auth("admin", "user", "director", "company", "creator"),
ServiceUserDocumentControllers.createServiceUserDocument
);

router.patch(
  "/:id",
//   auth("admin", "user", "creator", "company", "director"),
ServiceUserDocumentControllers.updateServiceUserDocument
);
router.delete(
  "/:id",
//   auth("admin", "user", "creator", "company", "director"),
ServiceUserDocumentControllers.deleteSingleServiceUserDocument
);



export const ServiceUserDocumentRoutes = router;
