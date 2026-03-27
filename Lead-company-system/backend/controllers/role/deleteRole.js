const { Role } = require("../../models/Role");
const { clearCache } = require("../../utils/cacheInvalidator"); // ✅ ADD

const deleteRole = async (req, res) => {

  await Role.findByIdAndUpdate(req.params.id, {
    removed: true,
    enabled: false
  });

  await clearCache("roles"); // ✅ ADD
  await clearCache("users"); // ✅ ADD

  res.json({ message: "Role deleted" });
};

module.exports = { deleteRole };