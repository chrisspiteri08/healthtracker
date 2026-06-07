"use client";

import { HealthEntry } from "@/lib/redis";

interface Props {
  entries: HealthEntry[];
  loading: boolean;
}

export default function EntriesTable({ entries, loading }: Props) {
  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow p-6 text-center text-gray-500">
        Loading entries...
      </div>
    );
  }

  if (entries.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow p-6 text-center text-gray-400">
        No entries yet. Log your first metrics above!
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-100">
        <h2 className="text-lg font-semibold text-gray-800">History</h2>
        <p className="text-sm text-gray-400">{entries.length} {entries.length === 1 ? "entry" : "entries"}</p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-500 uppercase text-xs tracking-wide">
            <tr>
              <th className="px-6 py-3 text-left">Date</th>
              <th className="px-6 py-3 text-right">Weight (kg)</th>
              <th className="px-6 py-3 text-right">Fat %</th>
              <th className="px-6 py-3 text-right">Water %</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {entries.map((entry) => (
              <tr key={entry.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-3 font-medium text-gray-800">
                  {new Date(entry.date + "T00:00:00").toLocaleDateString("en-US", {
                    weekday: "short",
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </td>
                <td className="px-6 py-3 text-right text-gray-700">{entry.weight}</td>
                <td className="px-6 py-3 text-right text-orange-600">{entry.fatPercentage}%</td>
                <td className="px-6 py-3 text-right text-blue-600">{entry.waterPercentage}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
