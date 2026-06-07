"use client";

import { useState } from "react";

interface Props {
  onSuccess: () => void;
}

export default function EntryForm({ onSuccess }: Props) {
  const today = new Date().toISOString().split("T")[0];
  const [form, setForm] = useState({
    date: today,
    weight: "",
    fatPercentage: "",
    waterPercentage: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/entries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          date: form.date,
          weight: parseFloat(form.weight),
          fatPercentage: parseFloat(form.fatPercentage),
          waterPercentage: parseFloat(form.waterPercentage),
        }),
      });
      if (!res.ok) throw new Error("Failed to save entry");
      setForm({ date: today, weight: "", fatPercentage: "", waterPercentage: "" });
      onSuccess();
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-xl shadow p-6 space-y-4"
    >
      <h2 className="text-lg font-semibold text-gray-800">Log Today&apos;s Metrics</h2>

      {error && (
        <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded px-3 py-2">
          {error}
        </p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
          <input
            type="date"
            required
            value={form.date}
            onChange={(e) => setForm({ ...form, date: e.target.value })}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Weight (kg)
          </label>
          <input
            type="number"
            step="0.1"
            min="0"
            required
            placeholder="e.g. 75.5"
            value={form.weight}
            onChange={(e) => setForm({ ...form, weight: e.target.value })}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Fat Percentage (%)
          </label>
          <input
            type="number"
            step="0.1"
            min="0"
            max="100"
            required
            placeholder="e.g. 18.5"
            value={form.fatPercentage}
            onChange={(e) => setForm({ ...form, fatPercentage: e.target.value })}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Water Percentage (%)
          </label>
          <input
            type="number"
            step="0.1"
            min="0"
            max="100"
            required
            placeholder="e.g. 60.0"
            value={form.waterPercentage}
            onChange={(e) => setForm({ ...form, waterPercentage: e.target.value })}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
      >
        {loading ? "Saving..." : "Save Entry"}
      </button>
    </form>
  );
}
