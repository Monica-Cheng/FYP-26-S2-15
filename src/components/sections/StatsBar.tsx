"use client";

import { motion } from "framer-motion";

const comparisonRows = [
  {
    problem: "Apps surface charts, streaks, and numbers, but the next decision is still on you.",
    solution: "WiseWorkout turns performance data into clear next-step coaching after each session.",
  },
  {
    problem: "People bounce between YouTube, notes, and multiple apps just to plan and track training.",
    solution: "One guided system brings planning, logging, progress, and coaching into the same flow.",
  },
  {
    problem: "Consistency breaks when guidance feels generic and workout logging adds extra friction.",
    solution: "Built for real routines, with lower-friction tracking and social accountability that keeps you showing up.",
  },
];

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.3 },
  transition: {
    duration: 0.55,
    delay,
    ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
  },
});

function ComparisonRow({
  problem,
  solution,
  delay,
}: {
  problem: string;
  solution: string;
  delay: number;
}) {
  return (
    <motion.div
      {...fadeUp(delay)}
      className="group grid gap-4 rounded-[1.75rem] bg-white/65 p-5 transition duration-300 hover:-translate-y-0.5 hover:bg-white/80 hover:shadow-[0_14px_40px_rgba(99,102,241,0.10)] md:grid-cols-[1fr_auto_1fr] md:items-center md:gap-6 md:p-6"
    >
      <div className="rounded-2xl bg-white/55 px-4 py-4 transition duration-300 group-hover:bg-white/75">
        <p className="mb-2 text-sm font-medium text-gray-500">Problem</p>
        <p className="text-sm leading-6 font-semibold text-[#1E1B4B]">{problem}</p>
      </div>

      <div className="flex items-center justify-center">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 text-sm font-semibold text-white shadow-md shadow-indigo-200/50 transition duration-300 group-hover:scale-105">
          →
        </div>
      </div>

      <div className="rounded-2xl bg-gradient-to-r from-indigo-50/90 to-purple-50/90 px-4 py-4 transition duration-300 group-hover:from-indigo-100/90 group-hover:to-purple-100/90">
        <p className="mb-2 text-sm font-medium text-indigo-500">WiseWorkout</p>
        <p className="text-sm leading-6 font-medium text-[#312E81]">{solution}</p>
      </div>
    </motion.div>
  );
}

export default function StatsBar() {
  return (
    <section
      className="py-28"
      style={{ backgroundColor: "rgba(124, 58, 237, 0.04)" }}
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="rounded-[2rem] border border-indigo-100/70 bg-white/55 p-6 shadow-[0_20px_60px_rgba(99,102,241,0.08)] backdrop-blur-sm md:p-8">
          <motion.div {...fadeUp(0)} className="max-w-3xl">
            <p className="text-sm font-medium text-indigo-500">
              Why most fitness apps stop short
            </p>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-[#1E1B4B] md:text-3xl">
              The gap is not more data. It&apos;s better guidance.
            </h2>
            <p className="mt-3 text-sm leading-7 text-gray-600 md:text-base">
              Existing fitness tools are strong at recording activity, but weaker at
              helping people decide what to do next. WiseWorkout closes that gap by
              pairing each friction point with a clearer, more guided experience.
            </p>
          </motion.div>

          <div className="mt-8 space-y-4">
            {comparisonRows.map((row, index) => (
              <ComparisonRow
                key={row.problem}
                problem={row.problem}
                solution={row.solution}
                delay={0.06 + index * 0.08}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
