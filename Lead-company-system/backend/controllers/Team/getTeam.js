const { Team } = require("../../models/Team");
const { CarType } = require("../../models/CarType");
const { User } = require("../../models/User");

const getTeams = async (req, res) => {
  try {
    const { name, carType, enabled } = req.query;

    let filter = { removed: false };

    // 🔹 Name filter
    if (name) {
      filter.name = { $regex: name, $options: "i" };
    }

    // 🔹 Enabled filter
    if (enabled !== undefined) {
      filter.enabled = enabled === "true";
    }

    // 🔹 CarType filter
    if (carType) {
      const type = await CarType.findOne({
        slug: carType.toLowerCase()
      });

      if (!type) {
        return res.status(400).json({
          success: false,
          message: "Invalid carType"
        });
      }

      filter.carTypes = type._id;
    }

    const teams = await Team.find(filter)
      .populate("carTypes", "name slug")
      .populate("lead", "name email image")
      .sort({ createdAt: -1 });

    // ✅ Attach members + load
    const teamsWithMembers = await Promise.all(
      teams.map(async (team) => {
        const members = await User.find({ team: team._id, removed: false })
          .select("name email activeLeads image");

        const totalActiveLeads = members.reduce(
          (sum, user) => sum + (user.activeLeads || 0),
          0
        );

        return {
          ...team.toObject(),
          members,
          membersCount: members.length,
          totalActiveLeads
        };
      })
    );

    res.status(200).json({
      success: true,
      count: teamsWithMembers.length,
      data: teamsWithMembers
    });

  } catch (error) {
    console.error("Get Teams Error:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error"
    });
  }
};

module.exports = { getTeams };