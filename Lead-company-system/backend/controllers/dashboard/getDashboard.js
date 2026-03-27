const dashboardService = require("../../services/dashboard.service");
const redis = require("../../config/redis");

const getDashboard = async (req, res) => {
  try {
    const cacheKey = "dashboard:main";

    const cachedData = await redis.get(cacheKey);
    if (cachedData) {
      console.log("⚡ Dashboard from cache");
      return res.json(JSON.parse(cachedData));
    }

    console.log("📦 Dashboard from DB");

    const overview = await dashboardService.getOverview();
    const todayLeads = await dashboardService.getTodayLeads();
    const monthLeads = await dashboardService.getMonthLeads();

    const result = { overview, todayLeads, monthLeads };

    await redis.set(cacheKey, JSON.stringify(result), "EX", 60);

    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getDashboard };