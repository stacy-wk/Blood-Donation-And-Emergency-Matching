import express from "express";

import {
  getInventoryController,
  getStockController,
  addStockController,
  useStockController,
  alertsController
} from "../controllers/inventory.controller.js";

import { authMiddleware } from "../middleware/auth.middleware.js";
import { rbac } from "../middleware/rbac.middleware.js";

const router = express.Router();

router.get("/", authMiddleware, getInventoryController);

router.get("/:type", authMiddleware, getStockController);

router.post(
  "/:type/add",
  authMiddleware,
  rbac("UPDATE_INVENTORY"),
  addStockController
);

router.post(
  "/:type/use",
  authMiddleware,
  rbac("UPDATE_INVENTORY"),
  useStockController
);

router.get(
  "/alerts/low-stock",
  authMiddleware,
  rbac("VIEW_STOCK"),
  alertsController
);

export default router;