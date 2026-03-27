const express = require("express");
const router = express.Router();

const {
  createPermission,
  getPermissions,
  updatePermission,
  deletePermission
} = require("../controllers/permission");

const authMiddleware = require("../middlewares/auth.middleware");
const adminMiddleware = require("../middlewares/admin.middleware");
const cache = require("../middlewares/cache.middleware");

router.post(
  "/",
  authMiddleware,
  adminMiddleware,
  createPermission
);

router.get(
  "/",
  authMiddleware,
  adminMiddleware,
  cache(300, "permissions"),
  getPermissions
);


router.put(
  "/:id",
  authMiddleware,
  adminMiddleware,
  updatePermission
);

router.delete(
  "/:id",
  authMiddleware,
  adminMiddleware,
  deletePermission
);
module.exports = router;