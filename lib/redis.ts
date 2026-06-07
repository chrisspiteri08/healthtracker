import { Redis } from "@upstash/redis";

// Vercel's Upstash integration injects REDIS_URL in the format:
// rediss://default:<token>@<hostname>:<port>
// @upstash/redis needs the REST API URL and token, which we derive from it.
function createRedisClient(): Redis {
  const restUrl = process.env.UPSTASH_REDIS_REST_URL;
  const restToken = process.env.UPSTASH_REDIS_REST_TOKEN;

  if (restUrl && restToken) {
    return new Redis({ url: restUrl, token: restToken });
  }

  const redisUrl = process.env.REDIS_URL;
  if (!redisUrl) throw new Error("No Redis connection env vars found");

  const parsed = new URL(redisUrl);
  const token = parsed.password;
  const hostname = parsed.hostname;

  return new Redis({
    url: `https://${hostname}`,
    token,
  });
}

export const redis = createRedisClient();

export interface HealthEntry {
  id: string;
  date: string;
  weight: number;
  fatPercentage: number;
  waterPercentage: number;
  createdAt: string;
}
