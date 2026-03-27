const { Team } = require("../../models/Team");
const { CarType } = require("../../models/CarType");
const { clearCache } = require("../../utils/cacheInvalidator"); // ✅ ADD

const createTeam = async (req, res) => {
  try {
    const { name, carTypes } = req.body;

    if (!name || !Array.isArray(carTypes) || carTypes.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Name and carTypes are required"
      });
    }

    const validCarTypes = await CarType.find({
      _id: { $in: carTypes },
      enabled: true
    });

    if (validCarTypes.length !== carTypes.length) {
      return res.status(400).json({
        success: false,
        message: "One or more carTypes are invalid"
      });
    }

    const existingTeam = await Team.findOne({
      name: name.trim(),
      removed: false
    });

    if (existingTeam) {
      return res.status(409).json({
        success: false,
        message: "Team already exists"
      });
    }

    const team = await Team.create({
      name: name.trim(),
      carTypes
    });

    await clearCache("teams"); // ✅ ADD
    await clearCache("users"); // ✅ ADD

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