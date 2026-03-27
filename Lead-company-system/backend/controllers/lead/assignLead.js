const mongoose = require("mongoose");
const { Lead } = require("../../models/Lead");
const { User } = require("../../models/User");
const { clearCache } = require("../../utils/cacheInvalidator");

const assignLead = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;

    if (
      !mongoose.Types.ObjectId.isValid(id) ||
      !mongoose.Types.ObjectId.isValid(userId)
    ) {
      return res.status(400).json({ message: "Invalid ID" });
    }

    const lead = await Lead.findById(id);
    if (!lead || lead.removed) {
      return res.status(404).json({ message: "Lead not found" });
    }

    const user = await User.findById(userId);
    if (!user || user.removed || !user.enabled) {
      return res.status(404).json({ message: "User not valid" });
    }

    lead.assignedTo = userId;
    lead.team = user.team;

    lead.assignmentHistory.push({ user: userId });

    if (lead.status === "New") {
      lead.statusHistory.push({
        from: "New",
        to: "Assigned",
        changedBy: req.user._id,
      });
      lead.status = "Assigned";
    }

    await lead.save();

    await clearCache("leads"); // ✅

    res.status(200).json({
      message: "Lead assigned successfully",
      data: lead,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { assignLead };