"use client";

import { useEffect, useState, useCallback } from "react";
import EntryForm from "@/components/EntryForm";
import EntriesTable from "@/components/EntriesTable";
import { HealthEntry } from "@/lib/redis";

export default function Home() {
  const [entries, setEntries] = useState<HealthEntry[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchEntries = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/entries");
      const data = await res.json();
      setEntries(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Failed to fetch entries", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchEntries();
  }, [fetchEntries]);

  return (
    <div className="space-y-8">
      <EntryForm onSuccess={fetchEntries} />

      {!loading && entries.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <StatCard
            label="Latest Weight"
            value={`${entries[0].weight} kg`}
            color="text-gray-800"
          />
          <StatCard
            label="Latest Fat %"
            value={`${entries[0].fatPercentage}%`}
            color="text-orange-600"
          />
          <StatCard
            label="Latest Water %"
            value={`${entries[0].waterPercentage}%`}
            color="text-blue-600"
          />
        </div>
      )}

      <EntriesTable entries={entries} loading={loading} />
    </div>
  );
}

function StatCard({
  label,
  value,
  color,
}: {
  label: string;
  value: string;
  color: string;
}) {
  return (
    <div className="bg-white rounded-xl shadow p-5">
      <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">{label}</p>
      <p className={`text-2xl font-bold ${color}`}>{value}</p>
    </div>
  );
}
