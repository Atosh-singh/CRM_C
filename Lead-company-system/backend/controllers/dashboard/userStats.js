const dashboardService = require("../../services/dashboard.service");
const redis = require("../../config/redis");

const userStats = async (req, res) => {
  try {
    const cacheKey = "dashboard:userStats";

    const cached = await redis.get(cacheKey);
    if (cached) {
      console.log("⚡ User stats from cache");
      return res.json(JSON.parse(cached));
    }

    const data = await dashboardService.getUserStats();
    await redis.set(cacheKey, JSON.stringify(data), "EX", 60);

    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { userStats };