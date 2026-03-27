const dashboardService = require("../../services/dashboard.service");
const redis = require("../../config/redis");

const todayLeads = async (req, res) => {
  try {
    const cacheKey = "dashboard:todayLeads";

    const cached = await redis.get(cacheKey);
    if (cached) {
      console.log("⚡ Today leads from cache");
      return res.json(JSON.parse(cached));
    }

    const count = await dashboardService.getTodayLeads();
    await redis.set(cacheKey, JSON.stringify(count), "EX", 60);

    res.json({ success: true, todayLeads: count });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { todayLeads };