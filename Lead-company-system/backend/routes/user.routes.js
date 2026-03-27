const express = require("express");
const router = express.Router();

const {
  createUser,
  getUsers,
  updateUser,
  deleteUser,
  changePassword,
  adminResetPassword,
} = require("../controllers/user");

const authMiddleware = require("../middlewares/auth.middleware");
const adminMiddleware = require("../middlewares/admin.middleware");
const cache = require("../middlewares/cache.middleware");

router.use(authMiddleware);

router.post("/", adminMiddleware, createUser);

// ✅ APPLY CACHE HERE
router.get(
  "/",
  adminMiddleware,
  cache(300, "users"), // ✅ important
  getUsers
);

router.put("/:id", adminMiddleware, updateUser);
router.delete("/:id", adminMiddleware, deleteUser);

router.post("/change-password", changePassword);
router.post("/admin-reset-password/:id", adminMiddleware, adminResetPassword);

module.exports = router;