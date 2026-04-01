const cloudinary = require("../../config/cloudinary");
const { User } = require("../../models/User");
const { clearCache } = require("../../utils/cacheInvalidator");

const updateMyProfile = async (req, res) => {
  try {
    const userId = req.user._id;

    // ✅ POPULATE ROLE & TEAM
    let user = await User.findById(userId)
      .populate("role")
      .populate("team");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // ✅ IMAGE UPDATE
    if (req.file) {
      if (user.image_public_id) {
        await cloudinary.uploader.destroy(user.image_public_id);
      }

      user.image = req.file.path;
      user.image_public_id = req.file.filename;
    }

    // ✅ SAFE FIELDS ONLY
    const allowedFields = ["name", "email"];
    allowedFields.forEach((field) => {
      if (req.body[field]) {
        user[field] = req.body[field];
      }
    });

    await user.save();

    // ✅ RE-FETCH UPDATED USER WITH POPULATE (VERY IMPORTANT)
    user = await User.findById(userId)
      .populate("role")
      .populate("team");

    await clearCache("users");

    // ✅ REMOVE SENSITIVE DATA
    const userObj = user.toObject();
    delete userObj.password;

    res.json({
      success: true,
      message: "Profile updated successfully",
      data: userObj
    });

    console.log("FILE:", req.file);
console.log("BODY:", req.body);

  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Something went wrong"
    });
  }
};

module.exports = { updateMyProfile };