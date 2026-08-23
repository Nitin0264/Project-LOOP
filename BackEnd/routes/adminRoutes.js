import express from "express";

import {
  getAdminStats,
  getAllUsers,
  updateUserRole,
  deleteUser,
} from "../controller/admin.controller.js";

import { authMiddleware } from "../middleware/authMiddleware.js";
import adminMiddleware  from "../middleware/adminMiddleware.js";

const router = express.Router();

// =====================================================
// ADMIN AUTHENTICATION
// =====================================================

router.use(authMiddleware);
router.use(adminMiddleware);

// =====================================================
// ADMIN STATS
// =====================================================

router.get(
  "/stats",
  getAdminStats
);

// =====================================================
// GET ALL USERS
// =====================================================

router.get(
  "/users",
  getAllUsers
);

// =====================================================
// UPDATE USER ROLE
// =====================================================

router.put(
  "/users/:id/role",
  updateUserRole
);

// =====================================================
// DELETE USER
// =====================================================

router.delete(
  "/users/:id",
  deleteUser
);

export default router;