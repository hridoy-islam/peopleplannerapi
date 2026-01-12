/* eslint-disable @typescript-eslint/no-explicit-any */
import express from "express";
import { StatementControllers } from "./statement.controller";


const router = express.Router();
router.get(
  "/",
//   auth("admin", "company", "creator", "user", "director"),
  StatementControllers.getAllStatement
);
router.get(
  "/:id",
//   auth("admin", "user", "director", "company", "creator"),
StatementControllers.getSingleStatement
);
router.post(
  "/",
//   auth("admin", "user", "director", "company", "creator"),
StatementControllers.createStatement
);

router.patch(
  "/:id",
//   auth("admin", "user", "creator", "company", "director"),
StatementControllers.updateStatement
);
router.delete(
  "/:id",
//   auth("admin", "user", "creator", "company", "director"),
StatementControllers.deleteSingleStatement
);



export const StatementRoutes = router;
