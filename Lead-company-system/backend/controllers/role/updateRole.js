const mongoose = require("mongoose");
const { Role } = require("../../models/Role");
const { Permission } = require("../../models/Permission");
const { clearCache } = require("../../utils/cacheInvalidator");

const updateRole = async (req, res) => {
  try {
    let { name, description, permissions } = req.body;

    const role = await Role.findById(req.params.id);

    if (!role) {
      return res.status(404).json({ message: "Role not found" });
    }

    // 🔒 Protect system roles
    if (["ADMIN", "SUPER_ADMIN"].includes(role.name)) {
      return res.status(403).json({
        message: "System role cannot be modified"
      });
    }


    if (role.removed) {
  return res.status(400).json({
    message: "Cannot update a deleted role"
  });
}
    // ===============================
    // ✅ UPDATE NAME (FIXED PROPERLY)
    // ===============================
    if (name !== undefined) {
      const normalizedName = name.trim().toUpperCase();

      if (normalizedName !== role.name) {
        const existing = await Role.findOne({
          name: normalizedName,
          removed: false, // 🔥 IMPORTANT FIX
          _id: { $ne: role._id }
        });

        if (existing) {
          return res.status(409).json({
            message: "Role already exists"
          });
        }

        role.name = normalizedName;
      }
    }

    // ===============================
    // ✅ UPDATE PERMISSIONS
    // ===============================
    if (permissions !== undefined) {

      if (!Array.isArray(permissions)) {
        return res.status(400).json({
          message: "Permissions must be an array"
        });
      }

      const invalidIds = permissions.filter(
        (id) => !mongoose.Types.ObjectId.isValid(id)
      );

      if (invalidIds.length > 0) {
        return res.status(400).json({
          message: "Invalid permission IDs detected"
        });
      }

      const validPermissions = await Permission.find({
        _id: { $in: permissions }
      });

      if (validPermissions.length !== permissions.length) {
        return res.status(400).json({
          message: "Some permissions not found"
        });
      }

      role.permissions = validPermissions.map(p => p.name);
    }

    // ===============================
    // ✅ UPDATE DESCRIPTION
    // ===============================
    if (description !== undefined) {
      role.description = description;
    }

    await role.save();

    await clearCache("roles");
    await clearCache("users");

    return res.json({
      success: true,
      data: role
    });

  } catch (error) {
    console.error("Update Role Error:", error);
    return res.status(500).json({
      message: "Internal Server Error"
    });
  }
};

module.exports = { updateRole };