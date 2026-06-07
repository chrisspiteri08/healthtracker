import { NextRequest, NextResponse } from "next/server";
import { redis, HealthEntry } from "@/lib/redis";

export async function DELETE(req: NextRequest) {
  try {
    const { id } = await req.json();
    if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });
    await redis.del(`entry:${id}`);
    return NextResponse.json({ ok: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function GET() {
  try {
    const keys = await redis.keys("entry:*");
    if (keys.length === 0) return NextResponse.json([]);
    const raw = await Promise.all(keys.map((key) => redis.get(key)));
    const entries = raw
      .filter(Boolean)
      .map((v) => JSON.parse(v as string) as HealthEntry);
    const sorted = entries.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
    return NextResponse.json(sorted);
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
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

    await redis.set(`entry:${id}`, JSON.stringify(entry));
    return NextResponse.json(entry, { status: 201 });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
