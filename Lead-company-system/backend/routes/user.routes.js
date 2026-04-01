const express = require("express");
const router = express.Router();
const upload = require("../middlewares/upload"); // ✅ ADD

const {
  createUser,
  getUsers,
  updateUser,
  deleteUser,
  changePassword,
  adminResetPassword,
  updateMyProfile
} = require("../controllers/user");

const authMiddleware = require("../middlewares/auth.middleware");
const adminMiddleware = require("../middlewares/admin.middleware");
const cache = require("../middlewares/cache.middleware");

router.use(authMiddleware);

// ✅ CREATE USER (WITH IMAGE)
router.post(
  "/",
  adminMiddleware,
  upload.single("image"), // ✅ ADD THIS
  createUser
);

// ✅ GET USERS (CACHED)
router.get(
  "/",
  adminMiddleware,
  cache(300, "users"),
  getUsers
);

// User update profile 
router.put(
  "/me",
  upload.single("image"),
  updateMyProfile
);

// ✅ UPDATE USER (WITH IMAGE REPLACE)
router.put(
  "/:id",
  adminMiddleware,
  upload.single("image"), // ✅ ADD THIS
  updateUser
);




// DELETE USER
router.delete("/:id", adminMiddleware, deleteUser);

// PASSWORD ROUTES (UNCHANGED)
router.post("/change-password", changePassword);
router.post("/admin-reset-password/:id", adminMiddleware, adminResetPassword);

module.exports = router;