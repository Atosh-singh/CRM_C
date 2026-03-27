const dashboardService = require("../../services/dashboard.service");
const redis = require("../../config/redis");

const overview = async (req, res) => {
  try {
    const cacheKey = "dashboard:overview";

    const cached = await redis.get(cacheKey);
    if (cached) {
      console.log("⚡ Overview from cache");
      return res.json(JSON.parse(cached));
    }

    const data = await dashboardService.getOverview();
    await redis.set(cacheKey, JSON.stringify(data), "EX", 60);

    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { overview };