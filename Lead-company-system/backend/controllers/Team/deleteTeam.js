const { Team } = require("../../models/Team");
const { User } = require("../../models/User");
const { clearCache } = require("../../utils/cacheInvalidator");

const deleteTeam = async (req, res) => {
  try {
    const { id } = req.params;
    const { hard } = req.query;

    const team = await Team.findById(id);

    if (!team) {
      return res.status(404).json({
        success: false,
        message: "Team not found"
      });
    }

    // 🔥 Prevent delete if members exist
    const members = await User.find({ team: id });

    if (members.length > 0 && hard !== "true") {
      return res.status(400).json({
        success: false,
        message: "Cannot delete team with active members"
      });
    }

    if (hard === "true") {
      await Team.findByIdAndDelete(id);
    } else {
      team.removed = true;
      team.enabled = false;
      await team.save();
    }

    await clearCache("teams");
    await clearCache("users");

    res.status(200).json({
      success: true,
      message: hard === "true"
        ? "Team permanently deleted"
        : "Team soft deleted"
    });

  } catch (error) {
    console.error("Delete Team Error:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error"
    });
  }
};

module.exports = { deleteTeam };