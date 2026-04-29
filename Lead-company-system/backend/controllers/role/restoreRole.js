const { Role } = require("../../models/Role");
const { clearCache } = require("../../utils/cacheInvalidator");

const restoreRole = async (req, res) => {
  try {
    const role = await Role.findById(req.params.id);

    if (!role) {
      return res.status(404).json({ message: "Role not found" });
    }

    role.enabled = true;
    role.removed = false;

    await role.save();

    await clearCache("roles");

    return res.json({
      success: true,
      message: "Role restored successfully"
    });

  } catch (error) {
    console.error("Restore Role Error:", error);
    return res.status(500).json({
      message: "Internal Server Error"
    });
  }
};

module.exports = { restoreRole };