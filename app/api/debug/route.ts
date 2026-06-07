import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    REDIS_URL: process.env.REDIS_URL ? `set (starts with: ${process.env.REDIS_URL.slice(0, 12)}...)` : "NOT SET",
    UPSTASH_REDIS_REST_URL: process.env.UPSTASH_REDIS_REST_URL ? "set" : "NOT SET",
    UPSTASH_REDIS_REST_TOKEN: process.env.UPSTASH_REDIS_REST_TOKEN ? "set" : "NOT SET",
    NODE_ENV: process.env.NODE_ENV,
  });
}
