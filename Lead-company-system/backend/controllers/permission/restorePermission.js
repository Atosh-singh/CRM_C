const { Permission } = require("../../models/Permission");
const { clearCache } = require("../../utils/cacheInvalidator");

const restorePermission = async (req, res) => {
  const permission = await Permission.findById(req.params.id);

  if (!permission) {
    return res.status(404).json({ message: "Not found" });
  }

  permission.removed = false;
  permission.enabled = true;

  await permission.save();

  await clearCache("permissions");

  res.json({ success: true });
};


module.exports = { restorePermission };