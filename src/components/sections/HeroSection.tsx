"use client";

import { motion } from "framer-motion";
import { useWaitlistModal } from "@/components/waitlist/WaitlistModalProvider";

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
});

function PhoneMockup() {
  // SVG calorie ring: r=26, circumference≈163.4, 420/600=70% → offset=163.4*0.30≈49
  const r = 26;
  const circ = 2 * Math.PI * r;
  const offset = circ * 0.30;

  return (
    <motion.div
      animate={{ y: [0, -14, 0] }}
      transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut" }}
      className="relative mx-auto w-[240px]"
    >
      {/* Phone frame */}
      <div className="relative rounded-[2.4rem] bg-gray-900 p-[3px] shadow-2xl shadow-indigo-500/25">
        {/* Dynamic island */}
        <div className="absolute top-3 left-1/2 -translate-x-1/2 z-10 h-[18px] w-[72px] rounded-full bg-gray-900" />

        {/* Screen */}
        <div className="overflow-hidden rounded-[2.2rem] bg-[#F7F8FF]">
          {/* Status bar */}
          <div className="flex items-center justify-between px-5 pt-9 pb-1">
            <span className="text-[9px] font-semibold text-[#3D3D5C]">9:41</span>
            <div className="flex items-center gap-1">
              <div className="h-[6px] w-[10px] rounded-sm bg-[#3D3D5C] opacity-60" />
              <div className="h-[6px] w-[6px] rounded-sm bg-[#3D3D5C] opacity-60" />
              <div className="h-[6px] w-[14px] rounded-sm border border-[#3D3D5C] opacity-60">
                <div className="h-full w-3/4 rounded-sm bg-[#3D3D5C]" />
              </div>
            </div>
          </div>

          {/* Greeting */}
          <div className="flex items-center justify-between px-4 py-2">
            <div>
              <p className="text-[9px] text-[#8A8A9E]">Good morning</p>
              <p className="text-[12px] font-bold text-[#3D3D5C]">Marcus</p>
            </div>
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#6C7EE8]">
              <span className="text-[9px] font-bold text-white">M</span>
            </div>
          </div>

          {/* WiseCoach banner */}
          <div className="mx-3 mb-2 rounded-xl border-l-[3px] border-[#9B84E8] bg-[#F0EEFE] p-2.5">
            <p className="mb-0.5 text-[8px] font-semibold text-[#7B5CB8]">✦ WiseCoach</p>
            <p className="text-[8px] leading-relaxed text-[#5B3F9E]">
              Strong session yesterday. Bench press volume up 12%. Consider a lighter session today.
            </p>
          </div>

          {/* Calorie ring card */}
          <div className="mx-3 mb-2 rounded-xl bg-white p-2.5 shadow-sm">
            <p className="mb-1.5 text-[9px] font-semibold text-[#3D3D5C]">Today&apos;s energy</p>
            <div className="flex items-center gap-3">
              <svg width="58" height="58" viewBox="0 0 60 60">
                <circle cx="30" cy="30" r={r} fill="none" stroke="#E6EAFE" strokeWidth="6" />
                <circle
                  cx="30" cy="30" r={r} fill="none"
                  stroke="#6C7EE8" strokeWidth="6"
                  strokeDasharray={circ}
                  strokeDashoffset={offset}
                  transform="rotate(-90 30 30)"
                  strokeLinecap="round"
                />
                <text x="30" y="27" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#3D3D5C">420</text>
                <text x="30" y="37" textAnchor="middle" fontSize="6" fill="#8A8A9E">kcal</text>
              </svg>
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-1">
                  <div className="h-2 w-2 rounded-full bg-[#6C7EE8]" />
                  <span className="text-[7px] text-[#8A8A9E]">Gym 280 kcal</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="h-2 w-2 rounded-full bg-[#4BB8CC]" />
                  <span className="text-[7px] text-[#8A8A9E]">Cardio 140 kcal</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="h-2 w-2 rounded-full bg-gray-200" />
                  <span className="text-[7px] text-[#8A8A9E]">Left 180 kcal</span>
                </div>
              </div>
            </div>
          </div>

          {/* Today's plan */}
          <div className="mx-3 mb-3 rounded-xl bg-white p-2.5 shadow-sm">
            <div className="mb-1.5 flex items-center justify-between">
              <p className="text-[9px] font-semibold text-[#3D3D5C]">Today · Push A</p>
              <span className="text-[8px] text-[#6C7EE8]">›</span>
            </div>
            {[
              { n: "1", name: "Bench Press", sets: "4×8" },
              { n: "2", name: "Overhead Press", sets: "3×10" },
              { n: "3", name: "Tricep Pushdown", sets: "3×12" },
            ].map((ex) => (
              <div key={ex.n} className="flex items-center gap-2 border-b border-[#F2F2F7] py-1 last:border-0">
                <span className="flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full bg-[#E6EAFE] text-[7px] font-bold text-[#6C7EE8]">
                  {ex.n}
                </span>
                <span className="flex-1 text-[8px] text-[#3D3D5C]">{ex.name}</span>
                <span className="text-[7px] text-[#8A8A9E]">{ex.sets}</span>
              </div>
            ))}
            <button className="mt-2 w-full rounded-[10px] bg-[#6C7EE8] py-1.5 text-[8px] font-semibold text-white">
              ▶ Start workout
            </button>
          </div>

          {/* Streak bar */}
          <div className="mx-3 mb-4 flex items-center gap-2 rounded-xl bg-white p-2.5 shadow-sm">
            <span className="text-[10px]">🔥</span>
            <span className="text-[8px] font-semibold text-[#3D3D5C]">7-day streak</span>
            <div className="ml-auto flex gap-0.5">
              {Array.from({ length: 7 }).map((_, i) => (
                <div
                  key={i}
                  className={`h-2 w-2 rounded-full ${i < 6 ? "bg-[#4BB8CC]" : "border border-[#C8C8D8] bg-white"}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Glow under phone */}
      <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 h-12 w-48 rounded-full bg-indigo-400/20 blur-2xl" />
    </motion.div>
  );
}

export default function HeroSection() {
  const { openModal } = useWaitlistModal();

  return (
    <section
      className="relative flex min-h-screen items-center overflow-hidden bg-[#F8F7FF] pt-20"
      style={{
        backgroundImage: `
          radial-gradient(ellipse at 75% 25%, rgba(99,102,241,0.12) 0%, transparent 55%),
          radial-gradient(ellipse at 20% 80%, rgba(139,92,246,0.07) 0%, transparent 50%),
          linear-gradient(rgba(99,102,241,0.035) 1px, transparent 1px),
          linear-gradient(90deg, rgba(99,102,241,0.035) 1px, transparent 1px)
        `,
        backgroundSize: "auto, auto, 44px 44px, 44px 44px",
      }}
    >
      <div className="mx-auto w-full max-w-7xl px-6 py-20 lg:py-28">
        <div className="flex flex-col items-center gap-16 lg:flex-row lg:gap-12">
          {/* Left — text */}
          <div className="flex flex-1 flex-col items-center text-center lg:items-start lg:text-left">
            {/* Pill badge */}
            <motion.div {...fadeUp(0)}>
              <span className="inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50 px-4 py-1.5 text-xs font-medium text-indigo-600">
                ✦ AI guidance for real training decisions
              </span>
            </motion.div>

            {/* H1 */}
            <motion.h1
              {...fadeUp(0.1)}
              className="mt-6 text-5xl font-extrabold leading-tight text-[#1E1B4B] md:text-6xl lg:text-7xl"
            >
              Stop guessing
              <br />
              <span className="bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent">
                your workouts.
              </span>
            </motion.h1>

            {/* Subheading */}
            <motion.p
              {...fadeUp(0.2)}
              className="mt-6 max-w-lg text-lg leading-relaxed text-gray-600"
            >
              Most fitness apps give you numbers and leave you to figure out the next move.
              WiseWorkout turns your workout data into clear coaching, personalised plans, and
              practical guidance so you know exactly what to do next.
            </motion.p>

            {/* CTAs */}
            <motion.div {...fadeUp(0.3)} className="mt-8 flex flex-wrap items-center gap-4">
              <motion.button
                type="button"
                onClick={openModal}
                className="rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 px-7 py-3.5 text-sm font-semibold text-white shadow-md shadow-indigo-200"
                whileHover={{ scale: 1.04, opacity: 0.95 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
              >
                Join the waitlist →
              </motion.button>
              <motion.a
                href="#how-it-works"
                className="rounded-full border border-indigo-200 bg-white px-7 py-3.5 text-sm font-semibold text-indigo-600 shadow-sm"
                whileHover={{ scale: 1.04, borderColor: "#6366F1" }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
              >
                See how it works
              </motion.a>
            </motion.div>

            {/* Benefit bullets */}
            <motion.div
              {...fadeUp(0.4)}
              className="mt-8 flex flex-col items-center gap-3 text-sm text-gray-500 sm:items-start"
            >
              {[
                "Know what to do after every workout",
                "Log training without breaking your flow",
                "Stay consistent with friends, squads, and streaks",
              ].map((benefit) => (
                <div key={benefit} className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-[#6C7EE8]" />
                  <span className="font-medium text-gray-600">{benefit}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right — phone mockup */}
          <motion.div
            {...fadeUp(0.25)}
            className="flex w-full flex-shrink-0 justify-center lg:w-auto"
          >
            <PhoneMockup />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
