import Redis from "ioredis";

let redis: Redis;

// Reuse connection in dev (hot reload), create fresh in prod
if (process.env.NODE_ENV === "production") {
  redis = new Redis(process.env.REDIS_URL!);
} else {
  const globalWithRedis = global as typeof global & { redis?: Redis };
  if (!globalWithRedis.redis) {
    globalWithRedis.redis = new Redis(process.env.REDIS_URL!);
  }
  redis = globalWithRedis.redis;
}

export { redis };

export interface HealthEntry {
  id: string;
  date: string;
  weight: number;
  fatPercentage: number;
  waterPercentage: number;
  createdAt: string;
}
