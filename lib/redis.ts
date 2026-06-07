import { Redis } from "@upstash/redis";

let _redis: Redis | null = null;

export function getRedis(): Redis {
  if (_redis) return _redis;

  const restUrl = process.env.UPSTASH_REDIS_REST_URL;
  const restToken = process.env.UPSTASH_REDIS_REST_TOKEN;

  if (restUrl && restToken) {
    _redis = new Redis({ url: restUrl, token: restToken });
    return _redis;
  }

  const redisUrl = process.env.REDIS_URL;
  if (!redisUrl) {
    throw new Error(
      "Redis not configured. Set UPSTASH_REDIS_REST_URL + UPSTASH_REDIS_REST_TOKEN or REDIS_URL."
    );
  }

  // REDIS_URL format: rediss://default:<token>@<hostname>:<port>
  const parsed = new URL(redisUrl);
  _redis = new Redis({
    url: `https://${parsed.hostname}`,
    token: parsed.password,
  });
  return _redis;
}

export interface HealthEntry {
  id: string;
  date: string;
  weight: number;
  fatPercentage: number;
  waterPercentage: number;
  createdAt: string;
}
