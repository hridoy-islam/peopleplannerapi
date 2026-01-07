/* eslint-disable @typescript-eslint/no-explicit-any */
import express from "express";
import { ImportantPersonControllers } from "./importantPerson.controller";


const router = express.Router();
router.get(
  "/",
//   auth("admin", "company", "creator", "user", "director"),
  ImportantPersonControllers.getAllImportantPerson
);
router.get(
  "/:id",
//   auth("admin", "user", "director", "company", "creator"),
ImportantPersonControllers.getSingleImportantPerson
);
router.post(
  "/",
//   auth("admin", "user", "director", "company", "creator"),
ImportantPersonControllers.createImportantPerson
);

router.patch(
  "/:id",
//   auth("admin", "user", "creator", "company", "director"),
ImportantPersonControllers.updateImportantPerson
);



export const ImportantPersonRoutes = router;
