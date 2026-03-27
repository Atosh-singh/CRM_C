const dashboardService = require("../../services/dashboard.service");
const redis = require("../../config/redis");

const monthLeads = async (req, res) => {
  try {
    const cacheKey = "dashboard:monthLeads";

    const cached = await redis.get(cacheKey);
    if (cached) {
      console.log("⚡ Month leads from cache");
      return res.json(JSON.parse(cached));
    }

    const count = await dashboardService.getMonthLeads();
    await redis.set(cacheKey, JSON.stringify(count), "EX", 60);

    res.json({ success: true, monthLeads: count });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { monthLeads };