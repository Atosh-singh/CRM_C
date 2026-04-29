const { GoogleAdsApi } = require("google-ads-api");

const client = new GoogleAdsApi({
  client_id: process.env.GOOGLE_ADS_CLIENT_ID,
  client_secret: process.env.GOOGLE_ADS_CLIENT_SECRET,
  developer_token: process.env.GOOGLE_ADS_DEVELOPER_TOKEN,
});

const customer = client.Customer({
  customer_id: process.env.GOOGLE_ADS_CUSTOMER_ID,
  refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
});

exports.getCampaignAnalytics = async () => {
  const result = await customer.query(`
    SELECT
      campaign.name,
      metrics.clicks,
      metrics.impressions,
      metrics.cost_micros
    FROM campaign
    WHERE segments.date DURING LAST_30_DAYS
  `);

  return result.map((row) => ({
    name: row.campaign.name,
    clicks: row.metrics.clicks,
    impressions: row.metrics.impressions,
    cost: row.metrics.cost_micros / 1_000_000,
  }));
};