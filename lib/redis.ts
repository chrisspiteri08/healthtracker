import Redis from "ioredis";

declare global {
  // eslint-disable-next-line no-var
  var _redis: Redis | undefined;
}

function createClient(): Redis {
  const url = process.env.REDIS_URL;
  if (!url) throw new Error("REDIS_URL is not set");

  return new Redis(url, {
    maxRetriesPerRequest: 3,
    enableReadyCheck: false,
    lazyConnect: false,
  });
}

// Reuse connection across hot reloads in dev; create fresh in prod per instance
export const redis: Redis =
  process.env.NODE_ENV === "production"
    ? createClient()
    : (global._redis ?? (global._redis = createClient()));

export interface HealthEntry {
  id: string;
  date: string;
  weight: number;
  fatPercentage: number;
  waterPercentage: number;
  createdAt: string;
}
