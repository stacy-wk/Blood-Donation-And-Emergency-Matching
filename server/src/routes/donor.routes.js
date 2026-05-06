import express from "express";

import {
  getDonorsController,
  updateDonorController
} from "../controllers/donor.controller.js";

import { authMiddleware } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", authMiddleware, getDonorsController);
router.patch("/:id", authMiddleware, updateDonorController);

export default router;