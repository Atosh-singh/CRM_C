const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth.middleware");
const permissionMiddleware = require("../middlewares/permission.middleware");
const cache = require("../middlewares/cache.middleware"); // ✅ ADD THIS

const {
  overview,
  teamStats,
  userStats,
  todayLeads,
  monthLeads
} = require("../controllers/dashboard/index");

router.use(authMiddleware);

router.get(
  "/overview",
  permissionMiddleware("VIEW_DASHBOARD"),
  cache(60, "dashboard"), // ✅ ADD
  overview
);

router.get(
  "/team-stats",
  permissionMiddleware("VIEW_DASHBOARD"),
  cache(60, "dashboard"), // ✅ ADD
  teamStats
);

router.get(
  "/user-stats",
  permissionMiddleware("VIEW_DASHBOARD"),
  cache(60, "dashboard"), // ✅ ADD
  userStats
);

router.get(
  "/today-leads",
  permissionMiddleware("VIEW_DASHBOARD"),
  cache(60, "dashboard"), // ✅ ADD
  todayLeads
);

router.get(
  "/month-leads",
  permissionMiddleware("VIEW_DASHBOARD"),
  cache(60, "dashboard"), // ✅ ADD
  monthLeads
);

module.exports = router;