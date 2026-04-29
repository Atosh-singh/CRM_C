const { Team } = require("../../models/Team");
const { clearCache } = require("../../utils/cacheInvalidator");

const restoreTeam = async (req, res) => {
  try {
    const team = await Team.findById(req.params.id);

    if (!team) {
      return res.status(404).json({ message: "Team not found" });
    }

    team.removed = false;
    team.enabled = true;

    await team.save();

    await clearCache("teams");

    res.json({
      success: true,
      message: "Team restored"
    });
  } catch (err) {
    console.error("Restore Team Error:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { restoreTeam };