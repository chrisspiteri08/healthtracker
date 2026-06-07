"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { HealthEntry } from "@/lib/redis";

interface Props {
  entries: HealthEntry[];
}

export default function MetricsChart({ entries }: Props) {
  if (entries.length === 0) return null;

  const data = [...entries]
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .map((e) => ({
      date: new Date(e.date + "T00:00:00").toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      }),
      Weight: e.weight,
      "Fat %": e.fatPercentage,
      "Water %": e.waterPercentage,
    }));

  return (
    <div className="bg-white rounded-xl shadow p-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-6">Trends</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data} margin={{ top: 4, right: 16, left: 0, bottom: 4 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis dataKey="date" tick={{ fontSize: 12 }} />
          <YAxis tick={{ fontSize: 12 }} />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="Weight" stroke="#1d4ed8" strokeWidth={2} dot={{ r: 3 }} />
          <Line type="monotone" dataKey="Fat %" stroke="#ea580c" strokeWidth={2} dot={{ r: 3 }} />
          <Line type="monotone" dataKey="Water %" stroke="#0891b2" strokeWidth={2} dot={{ r: 3 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
