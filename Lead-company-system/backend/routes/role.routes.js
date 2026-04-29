const express = require("express");
const router = express.Router();

const {
  createRole,
  getRoles,
  updateRole,
  deleteRole,
  restoreRole   // ✅ ADD THIS
} = require("../controllers/role");

const authMiddleware = require("../middlewares/auth.middleware");
const permissionMiddleware = require("../middlewares/permission.middleware");
const cache = require("../middlewares/cache.middleware");

// 🔐 Permission based role management

router.post(
  "/",
  authMiddleware,
  permissionMiddleware("CREATE_ROLE"),
  createRole
);

router.get(
  "/",
  authMiddleware,
  permissionMiddleware("VIEW_ROLE"),
  cache(300, "roles"),
  getRoles
);

router.patch(
  "/:id",
  authMiddleware,
  permissionMiddleware("UPDATE_ROLE"),
  updateRole
);

router.delete(
  "/:id",
  authMiddleware,
  permissionMiddleware("DELETE_ROLE"),
  deleteRole
);

// ♻️ Restore route
router.patch(
  "/restore/:id",
  authMiddleware,
  permissionMiddleware("UPDATE_ROLE"),
  restoreRole
);

module.exports = router;