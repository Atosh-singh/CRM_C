const Redis = require("ioredis");

const redis = new Redis({
  host: process.env.REDIS_HOST || "127.0.0.1",
  port: process.env.REDIS_PORT || 6379,

  // 🔥 production-ready options
  maxRetriesPerRequest: 3,
  retryStrategy(times) {
    console.log(`🔁 Redis retry attempt: ${times}`);
    return Math.min(times * 50, 2000); // retry delay
  },
});

redis.on("connect", () => {
  console.log("✅ Redis connected");
});

redis.on("ready", () => {
  console.log("🚀 Redis ready to use");
});

redis.on("error", (err) => {
  console.error("❌ Redis error:", err);
});

redis.on("close", () => {
  console.warn("⚠️ Redis connection closed");
});

module.exports = redis;