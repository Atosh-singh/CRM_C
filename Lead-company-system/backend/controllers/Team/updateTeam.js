const { Team } = require("../../models/Team");
const { CarType } = require("../../models/CarType");
const { User } = require("../../models/User");
const { clearCache } = require("../../utils/cacheInvalidator");

const updateTeam = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      name,
      description,
      carTypes,
      lead,
      assignmentType,
      maxLeadsPerUser,
      priority,
      enabled
    } = req.body;

    const team = await Team.findById(id);

    if (!team) {
      return res.status(404).json({
        success: false,
        message: "Team not found"
      });
    }

    // =========================
    // ✅ NAME UPDATE
    // =========================
    if (name !== undefined) {
      const trimmed = name.trim();

      if (!trimmed) {
        return res.status(400).json({
          success: false,
          message: "Team name cannot be empty"
        });
      }

      if (trimmed !== team.name) {
        const existing = await Team.findOne({
          _id: { $ne: id },
          name: trimmed,
          removed: false
        });

        if (existing) {
          return res.status(409).json({
            success: false,
            message: "Team name already exists"
          });
        }

        team.name = trimmed;
      }
    }

    // =========================
    // ✅ DESCRIPTION
    // =========================
    if (description !== undefined) {
      team.description = description || "";
    }

    // =========================
    // ✅ CARTYPES (ONLY IF SENT)
    // =========================
    if (carTypes !== undefined) {
      if (!Array.isArray(carTypes) || carTypes.length === 0) {
        return res.status(400).json({
          success: false,
          message: "carTypes must be a non-empty array"
        });
      }

      const valid = await CarType.find({
        _id: { $in: carTypes }
      });

      if (valid.length !== carTypes.length) {
        return res.status(400).json({
          success: false,
          message: "Invalid carTypes"
        });
      }

      team.carTypes = carTypes;
    }

    // =========================
    // ✅ LEAD
    // =========================
    if (lead !== undefined) {
      if (lead) {
        const user = await User.findById(lead);
        if (!user) {
          return res.status(400).json({
            success: false,
            message: "Invalid lead"
          });
        }
      }
      team.lead = lead;
    }

    // =========================
    // ✅ OTHER FIELDS
    // =========================
    if (assignmentType !== undefined) team.assignmentType = assignmentType;
    if (maxLeadsPerUser !== undefined) team.maxLeadsPerUser = maxLeadsPerUser;
    if (priority !== undefined) team.priority = priority;

    // 🔥 IMPORTANT FIX (your toggle)
    if (enabled !== undefined) {
      team.enabled = enabled;
    }

    team.updatedBy = req.user?._id || null;

    await team.save();

    await clearCache("teams");
    await clearCache("users");

    return res.status(200).json({
      success: true,
      data: team
    });

  } catch (error) {
    console.error("Update Team Error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error"
    });
  }
};

module.exports = { updateTeam };