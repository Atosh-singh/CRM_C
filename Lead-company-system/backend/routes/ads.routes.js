const express = require("express");
const router = express.Router();

const { getAdsDashboard } = require("../controllers/ads/ads.controller");
const authMiddleware = require("../middlewares/auth.middleware");

router.get("/dashboard", authMiddleware, getAdsDashboard);

module.exports = router;