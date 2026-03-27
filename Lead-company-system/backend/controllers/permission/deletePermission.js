const { Permission } = require("../../models/Permission");
const { clearCache } = require("../../utils/cacheInvalidator");

// Delete Permission (Hard Delete)
const deletePermission = async (req, res) => {
  try {
    const permission = await Permission.findByIdAndDelete(req.params.id);

    if (!permission) {
      return res.status(404).json({ message: "Permission not found" });
    }

    // Clear relevant caches
    await clearCache("permissions");
    await clearCache("roles");

    res.json({ message: "Permission deleted successfully" });
  } catch (err) {
    console.error("Delete Permission Error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  deletePermission,
};