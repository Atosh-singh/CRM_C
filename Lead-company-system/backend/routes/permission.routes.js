const express = require("express");
const router = express.Router();

const {
  createPermission,
  getPermissions,
  updatePermission,
  deletePermission,
  restorePermission
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


router.patch(
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

router.patch(
  "/restore/:id", 
  authMiddleware,
   adminMiddleware,
    restorePermission
  );
module.exports = router;