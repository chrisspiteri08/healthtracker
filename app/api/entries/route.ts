import { NextRequest, NextResponse } from "next/server";
import { redis, HealthEntry } from "@/lib/redis";

export async function GET() {
  const keys = await redis.keys("entry:*");
  if (keys.length === 0) {
    return NextResponse.json([]);
  }
  const entries = await Promise.all(
    keys.map((key) => redis.get<HealthEntry>(key))
  );
  const sorted = (entries.filter(Boolean) as HealthEntry[]).sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
  return NextResponse.json(sorted);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { date, weight, fatPercentage, waterPercentage } = body;

  if (!date || weight == null || fatPercentage == null || waterPercentage == null) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  const id = `${date}-${Date.now()}`;
  const entry: HealthEntry = {
    id,
    date,
    weight: Number(weight),
    fatPercentage: Number(fatPercentage),
    waterPercentage: Number(waterPercentage),
    createdAt: new Date().toISOString(),
  };

  await redis.set(`entry:${id}`, entry);
  return NextResponse.json(entry, { status: 201 });
}
