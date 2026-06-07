import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Health Tracker",
  description: "Track your daily body metrics",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50 text-gray-900">
        <header className="bg-white border-b border-gray-200 shadow-sm">
          <div className="max-w-4xl mx-auto px-4 py-4">
            <h1 className="text-2xl font-bold text-blue-600">Health Tracker</h1>
            <p className="text-sm text-gray-500">Track your daily body metrics</p>
          </div>
        </header>
        <main className="max-w-4xl mx-auto px-4 py-8">{children}</main>
      </body>
    </html>
  );
}
