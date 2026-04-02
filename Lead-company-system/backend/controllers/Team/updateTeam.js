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

    // 🔹 Name
    if (name) {
      const existing = await Team.findOne({
        _id: { $ne: id },
        name: name.trim(),
        removed: false
      });

      if (existing) {
        return res.status(409).json({
          success: false,
          message: "Team name already exists"
        });
      }

      team.name = name.trim();
    }

    // 🔹 Description
    if (description !== undefined) {
      team.description = description;
    }

    // 🔹 CarTypes
    if (carTypes) {
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

    // 🔹 Lead
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

    // 🔹 Other fields
    if (assignmentType) team.assignmentType = assignmentType;
    if (maxLeadsPerUser) team.maxLeadsPerUser = maxLeadsPerUser;
    if (priority !== undefined) team.priority = priority;
    if (enabled !== undefined) team.enabled = enabled;

    team.updatedBy = req.user?._id || null;

    await team.save();

    await clearCache("teams");
    await clearCache("users");

    res.status(200).json({
      success: true,
      data: team
    });

  } catch (error) {
    console.error("Update Team Error:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error"
    });
  }
};

module.exports = { updateTeam };