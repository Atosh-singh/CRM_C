const express = require("express");
const router = express.Router();

const {
  createMeeting,
  getMyMeetings,
} = require("../controllers/meeting/meeting.controller");

const authMiddleware = require("../middlewares/auth.middleware");

router.post("/", authMiddleware, createMeeting);
router.get("/my", authMiddleware, getMyMeetings);

module.exports = router;