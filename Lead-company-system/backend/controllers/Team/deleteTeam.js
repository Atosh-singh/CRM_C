const { Team } = require("../../models/Team");
const { clearCache } = require("../../utils/cacheInvalidator");

const deleteTeam = async (req, res) => {
  try {
    const team = await Team.findById(req.params.id);

    if (!team) {
      return res.status(404).json({ message: "Team not found" });
    }

    team.removed = true;
    team.enabled = false;

    await team.save();

    await clearCache("teams");

    res.json({
      success: true,
      message: "Team moved to trash"
    });
  } catch (err) {
    console.error("Delete Team Error:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { deleteTeam };