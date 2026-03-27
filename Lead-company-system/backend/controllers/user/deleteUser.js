const { User } = require("../../models/User");
const { clearCache } = require("../../utils/cacheInvalidator");

const deleteUser = async (req, res) => {

  await User.findByIdAndUpdate(req.params.id, {
    removed: true,
    enabled: false
  });

  await clearCache("users"); // ✅ ADD

  res.json({ message: "User deleted" });
};

module.exports = { deleteUser };