const redis = require("../config/redis");

const clearCache = async (tag) => {
  try {
    const tagKey = `tag:${tag}`;

    const keys = await redis.smembers(tagKey);

    if (keys.length) {
      await redis.del(keys);
    }

    await redis.del(tagKey);

    console.log(`🧹 Cleared cache for ${tag}`);
  } catch (err) {
    console.error("Cache clear error:", err);
  }
};

module.exports = { clearCache };