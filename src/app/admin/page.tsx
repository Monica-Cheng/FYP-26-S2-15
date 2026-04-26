import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin — WiseWorkout",
};

export default function AdminPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-indigo-950 px-6 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-600 shadow-lg shadow-indigo-500/30">
        <span className="text-2xl font-extrabold text-white">W</span>
      </div>

      <h1 className="mt-6 text-xl font-bold text-white">WiseWorkout Admin</h1>
      <p className="mt-3 max-w-xs text-sm leading-relaxed text-indigo-300">
        Admin access is available via the Updates page.
      </p>

      <Link
        href="/updates"
        className="mt-8 inline-flex items-center rounded-full bg-indigo-500 px-7 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-indigo-400"
      >
        Go to Updates →
      </Link>
    </div>
  );
}
