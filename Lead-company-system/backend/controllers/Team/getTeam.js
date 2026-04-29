const { Team } = require("../../models/Team");
const { CarType } = require("../../models/CarType");
const { User } = require("../../models/User");

const getTeams = async (req, res) => {
  try {
    const {
      name,
      carType,
      enabled,
      showDeleted,
      page = 1,
      limit = 10
    } = req.query;

    const pageNumber = parseInt(page);
    const limitNumber = parseInt(limit);

    // =========================
    // ✅ BASE FILTER
    // =========================
    let filter = showDeleted === "true"
      ? { removed: true }
      : { removed: false };

    // =========================
    // 🔍 NAME FILTER
    // =========================
    if (name) {
      filter.name = { $regex: name, $options: "i" };
    }

    // =========================
    // 🔍 ENABLED FILTER
    // =========================
    if (enabled !== undefined) {
      filter.enabled = enabled === "true";
    }

    // =========================
    // 🔍 CAR TYPE FILTER
    // =========================
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

    // =========================
    // 📊 TOTAL COUNT (for pagination)
    // =========================
    const total = await Team.countDocuments(filter);

    // =========================
    // 📦 FETCH TEAMS (PAGINATED)
    // =========================
    const teams = await Team.find(filter)
      .populate("carTypes", "name slug")
      .populate("lead", "name email image")
      .sort({ createdAt: -1 })
      .skip((pageNumber - 1) * limitNumber)
      .limit(limitNumber);

    // =========================
    // 👥 FETCH MEMBERS (OPTIMIZED)
    // =========================
    const teamIds = teams.map(t => t._id);

    const allMembers = await User.find({
      team: { $in: teamIds },
      removed: false
    }).select("name email activeLeads image team");

    const membersMap = {};
    allMembers.forEach(user => {
      if (!membersMap[user.team]) {
        membersMap[user.team] = [];
      }
      membersMap[user.team].push(user);
    });

    // =========================
    // 📊 ATTACH MEMBERS
    // =========================
    const teamsWithMembers = teams.map(team => {
      const members = membersMap[team._id] || [];

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
    });

    // =========================
    // ✅ FINAL RESPONSE
    // =========================
    res.status(200).json({
      success: true,
      page: pageNumber,
      limit: limitNumber,
      total,
      totalPages: Math.ceil(total / limitNumber),
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