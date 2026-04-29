const { getCampaignAnalytics } = require("../../services/googleAds.service");
const Lead = require("../../models/Lead");

exports.getAdsDashboard = async (req, res) => {
  try {
    const adsData = await getCampaignAnalytics();

    const totalLeads = await Lead.countDocuments();
    const convertedLeads = await Lead.countDocuments({ status: "converted" });

    const totalSpend = adsData.reduce((sum, c) => sum + c.cost, 0);

    const cpl = totalLeads ? totalSpend / totalLeads : 0;
    const conversionRate = totalLeads
      ? (convertedLeads / totalLeads) * 100
      : 0;

    res.json({
      totalSpend,
      totalLeads,
      convertedLeads,
      cpl,
      conversionRate,
      campaigns: adsData,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Ads analytics error" });
  }
};