const { Role } = require("../../models/Role");

const getRoles = async (req, res) => {
  try {
    const { includeDeleted } = req.query;

    const filter = includeDeleted === "true" ? {} : { removed: false };

    const roles = await Role.find(filter);

    return res.json({
      success: true,
      data: roles
    });

  } catch (error) {
    console.error("Get Roles Error:", error);
    return res.status(500).json({
      message: "Internal Server Error"
    });
  }
};

module.exports = { getRoles };