const { Team } = require("../../models/Team");
const { CarType } = require("../../models/CarType");
const { User } = require("../../models/User");
const { clearCache } = require("../../utils/cacheInvalidator");

const createTeam = async (req, res) => {
  try {
    const {
      name,
      description,
      carTypes,
      lead,
      assignmentType,
      maxLeadsPerUser,
      priority
    } = req.body;

    if (!name || !Array.isArray(carTypes) || carTypes.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Name and carTypes are required"
      });
    }

    // 🔹 Validate CarTypes
    const validCarTypes = await CarType.find({
      _id: { $in: carTypes },
      enabled: true
    });

    if (validCarTypes.length !== carTypes.length) {
      return res.status(400).json({
        success: false,
        message: "Invalid carTypes"
      });
    }

    // 🔹 Validate Lead (if provided)
    if (lead) {
      const userExists = await User.findById(lead);
      if (!userExists) {
        return res.status(400).json({
          success: false,
          message: "Invalid team lead"
        });
      }
    }

    // 🔹 Duplicate check
    const existing = await Team.findOne({
      name: name.trim(),
      removed: false
    });

    if (existing) {
      return res.status(409).json({
        success: false,
        message: "Team already exists"
      });
    }

    const team = await Team.create({
      name: name.trim(),
      description,
      carTypes,
      lead: lead || null,
      assignmentType,
      maxLeadsPerUser,
      priority,
      createdBy: req.user?._id || null
    });

    await clearCache("teams");
    await clearCache("users");

    res.status(201).json({
      success: true,
      data: team
    });

  } catch (error) {
    console.error("Create Team Error:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error"
    });
  }
};

module.exports = { createTeam };