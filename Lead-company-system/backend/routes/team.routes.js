const express = require("express");
const router = express.Router();

const {
  createTeam,
  getTeams,
  updateTeam,
  deleteTeam,
  restoreTeam
} = require("../controllers/Team");

const authMiddleware = require("../middlewares/auth.middleware");
const permissionMiddleware = require("../middlewares/permission.middleware");
const cache = require("../middlewares/cache.middleware");

router.post(
  "/",
  authMiddleware,
  permissionMiddleware("CREATE_TEAM"),
  createTeam
);

router.get(
  "/",
  authMiddleware,
  permissionMiddleware("VIEW_TEAM"),
  cache(300, "teams"), // ✅ REDIS ADDED (5 min cache)
  getTeams
);

router.patch(
  "/:id",
  authMiddleware,
  permissionMiddleware("UPDATE_TEAM"),
  updateTeam
);

router.delete(
  "/:id",
  authMiddleware,
  permissionMiddleware("DELETE_TEAM"),
  deleteTeam
);

router.patch(
  "/restore/:id",
  authMiddleware,
  permissionMiddleware("UPDATE_TEAM"),
  restoreTeam
);

module.exports = router;
