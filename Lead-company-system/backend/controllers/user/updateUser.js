const cloudinary = require("../../config/cloudinary");
const { User } = require("../../models/User");
const { clearCache } = require("../../utils/cacheInvalidator");

const updateUser = async (req, res) => {
  try {
    const user = await User.findOne({
      _id: req.params.id,
      removed: false
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // ✅ IMAGE UPDATE
    if (req.file) {
      // delete old
      if (user.image_public_id) {
        await cloudinary.uploader.destroy(user.image_public_id);
      }

      user.image = req.file.path;
      user.image_public_id = req.file.filename;
    }

    // ✅ OTHER FIELDS
    Object.assign(user, req.body);

    await user.save();

    await clearCache("users");

    res.json(user);

  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Something went wrong"
    });
  }
};

module.exports = { updateUser };