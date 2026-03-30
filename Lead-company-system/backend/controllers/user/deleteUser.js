const cloudinary = require("../../config/cloudinary");
const { User } = require("../../models/User");
const { clearCache } = require("../../utils/cacheInvalidator");

const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (user && user.image_public_id) {
      await cloudinary.uploader.destroy(user.image_public_id);
    }

    await User.findByIdAndUpdate(req.params.id, {
      removed: true,
      enabled: false
    });

    await clearCache("users");

    res.json({ message: "User deleted" });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Something went wrong"
    });
  }
};

module.exports = { deleteUser };