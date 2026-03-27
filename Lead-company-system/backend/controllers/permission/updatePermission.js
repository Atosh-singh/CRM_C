const { Permission } = require("../../models/Permission");
const { clearCache } = require("../../utils/cacheInvalidator"); // ✅ Redis cache clear

// Update Permission
const updatePermission = async (req, res) => {
  try {
    const { name, description } = req.body;

    const permission = await Permission.findById(req.params.id);

    if (!permission) {
      return res.status(404).json({ message: "Permission not found" });
    }

    // Optional: Prevent updating certain system permissions
    if (permission.name === "SUPER_ADMIN") {
      return res.status(403).json({
        message: "This permission cannot be modified",
      });
    }

    if (name) permission.name = name;
    if (description) permission.description = description;

    await permission.save();

    // Clear relevant caches
    await clearCache("permissions");
    await clearCache("roles"); // Roles may depend on permissions

    res.json(permission);
  } catch (err) {
    console.error("Update Permission Error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  updatePermission,
};
