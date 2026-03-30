const { User } = require("../../models/User");
const { clearCache } = require("../../utils/cacheInvalidator");

const getUsers = async (req, res) => {
  try {
    console.log("📦 USERS FROM DATABASE");

    const users = await User.find({ removed: false })
      .populate("role")
      .populate("team");

    res.json(users);

  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Something went wrong"
    });
  }
};

module.exports = { getUsers };