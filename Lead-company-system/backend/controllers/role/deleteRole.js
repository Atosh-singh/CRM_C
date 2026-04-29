const { Role } = require("../../models/Role");
const { clearCache } = require("../../utils/cacheInvalidator");

const deleteRole = async (req, res) => {
  try {
    const role = await Role.findById(req.params.id);

    if (!role) {
      return res.status(404).json({ message: "Role not found" });
    }

    // 🔒 Protect system roles
    if (["ADMIN", "SUPER_ADMIN"].includes(role.name)) {
      return res.status(403).json({
        message: "System role cannot be deleted"
      });
    }

    // ✅ SOFT DELETE (IMPORTANT FIX)
    role.enabled = false;
    role.removed = true;

    await role.save();

    await clearCache("roles");
    await clearCache("users");

    return res.json({
      success: true,
      message: "Role moved to trash"
    });

  } catch (error) {
    console.error("Delete Role Error:", error);
    return res.status(500).json({
      message: "Internal Server Error"
    });
  }
};

module.exports = { deleteRole };