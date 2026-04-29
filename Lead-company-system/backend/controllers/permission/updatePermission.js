const { Permission } = require("../../models/Permission");
const { clearCache } = require("../../utils/cacheInvalidator");

const updatePermission = async (req, res) => {
  try {
    const { name, description, enabled } = req.body;

    const permission = await Permission.findById(req.params.id);

    if (!permission) {
      return res.status(404).json({ message: "Permission not found" });
    }

    // 🔒 Protect system permission (optional)
    if (permission.name === "SUPER_ADMIN") {
      return res.status(403).json({
        message: "This permission cannot be modified",
      });
    }

    // ❌ Prevent updating deleted permission
    if (permission.removed) {
      return res.status(400).json({
        message: "Cannot update deleted permission",
      });
    }

    // =========================
    // ✅ NAME UPDATE + DUPLICATE CHECK
    // =========================
    if (name !== undefined) {
      const normalizedName = name.trim().toUpperCase();

      if (!normalizedName) {
        return res.status(400).json({
          message: "Permission name cannot be empty",
        });
      }

      if (normalizedName !== permission.name) {
        const existing = await Permission.findOne({
          name: normalizedName,
          removed: false,
          _id: { $ne: permission._id },
        });

        if (existing) {
          return res.status(409).json({
            message: "Permission already exists",
          });
        }

        permission.name = normalizedName;
      }
    }


    // =========================
// ✅ ENABLE/DISABLE UPDATE
// =========================
// after description block

if (enabled !== undefined) {
  permission.enabled = enabled;
}

    // =========================
    // ✅ DESCRIPTION UPDATE
    // =========================
    if (description !== undefined) {
      permission.description = description || "";
    }

    await permission.save();

    await clearCache("permissions");
    await clearCache("roles");

    return res.json({
      success: true,
      data: permission,
    });

  } catch (err) {
    console.error("Update Permission Error:", err);

    if (err.code === 11000) {
      return res.status(409).json({
        message: "Permission already exists",
      });
    }

    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { updatePermission };