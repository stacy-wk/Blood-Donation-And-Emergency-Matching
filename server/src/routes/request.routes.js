import express from "express";

import {
  createRequestController,
  getRequestsController,
  getRequestByIdController,
  updateRequestStatusController,
  addDonorResponseController
} from "../controllers/request.controller.js";

import { authMiddleware } from "../middleware/auth.middleware.js";
import { rbac } from "../middleware/rbac.middleware.js";

const router = express.Router();

router.post(
  "/",
  authMiddleware,
  rbac("CREATE_EMERGENCY_REQUEST"),
  createRequestController
);

router.get("/", authMiddleware, getRequestsController);

router.get("/:id", authMiddleware, getRequestByIdController);

router.patch(
  "/:id/status",
  authMiddleware,
  rbac("TRACK_REQUEST_STATUS"),
  updateRequestStatusController
);

router.post(
  "/:id/respond",
  authMiddleware,
  rbac("RESPOND_DONATION_REQUEST"),
  addDonorResponseController
);

export default router;