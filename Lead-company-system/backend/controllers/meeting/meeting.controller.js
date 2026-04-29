const Meeting = require("../../models/Meeting");
const { oauth2Client } = require("../../config/googleAuth");
const { createMeet } = require("../../services/googleMeetService");

// 🔥 CREATE MEETING
exports.createMeeting = async (req, res) => {
  try {
    const { title, startTime, endTime } = req.body;

    // ⚠️ IMPORTANT: must have tokens
    if (!global.googleTokens) {
      return res.status(400).json({
        message: "Google not connected. Please connect first.",
      });
    }

    oauth2Client.setCredentials(global.googleTokens);

    const meetLink = await createMeet(oauth2Client);

    const meeting = await Meeting.create({
      title,
      startTime,
      endTime,
      createdBy: req.user.id,
      meetLink,
    });

    res.json(meeting);
  } catch (err) {
    console.error("Create Meeting Error:", err);
    res.status(500).json({ message: "Error creating meeting" });
  }
};

// 🔥 GET MY MEETINGS
exports.getMyMeetings = async (req, res) => {
  try {
    const meetings = await Meeting.find({
      $or: [
        { createdBy: req.user.id },
        { participants: req.user.id },
      ],
    }).sort({ startTime: 1 });

    res.json(meetings);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching meetings" });
  }
};