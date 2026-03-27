const bcrypt = require("bcrypt");
const { User } = require("../../models/User");
const { clearCache } = require("../../utils/cacheInvalidator"); // ✅ ADD

const adminResetPassword = async (req, res) => {

  const { newPassword } = req.body;

  const user = await User.findById(req.params.id);

  user.password = await bcrypt.hash(newPassword, 10);
  await user.save();

  await clearCache("users"); // ✅ ADD

  res.json({ message: "Password reset by admin" });
};

module.exports = { adminResetPassword };