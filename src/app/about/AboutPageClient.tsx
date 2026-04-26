"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Brain,
  Dumbbell,
  Flame,
  Sparkles,
  Trophy,
} from "lucide-react";
import FadeInUp from "@/components/animations/FadeInUp";
import { StaggerChildren, StaggerItem } from "@/components/animations/StaggerChildren";

const INSIGHTS = [
  "People need clearer next steps, not just more charts.",
  "Workout logging must feel fast enough to use during a real session.",
  "Motivation works better when it feels personal, social, and achievable.",
];

const FOCUS_AREAS = [
  {
    icon: Brain,
    title: "Adaptive coaching",
    body:
      "WiseCoach turns workout history, fatigue signals, and progress data into simple guidance users can act on.",
    accent:
      "bg-[linear-gradient(135deg,rgba(99,102,241,0.10),rgba(168,85,247,0.08))] ring-indigo-100",
    iconStyle: "bg-indigo-100 text-indigo-600",
    layout: "lg:col-span-5",
  },
  {
    icon: Dumbbell,
    title: "Structured training",
    body:
      "Users receive sport-specific plans for gym training and running, with room to adapt as their goals and routines change.",
    accent:
      "bg-[linear-gradient(135deg,rgba(99,102,241,0.07),rgba(45,212,191,0.06))] ring-indigo-100",
    iconStyle: "bg-[#E8ECFF] text-indigo-600",
    layout: "lg:col-span-3",
  },
  {
    icon: Sparkles,
    title: "Low-friction tracking",
    body:
      "Workout logging is designed to be quick and practical, so users can record progress without breaking their training flow.",
    accent:
      "bg-[linear-gradient(135deg,rgba(255,255,255,0.95),rgba(238,240,255,0.95))] ring-indigo-100",
    iconStyle: "bg-indigo-50 text-indigo-500",
    layout: "lg:col-span-3",
  },
  {
    icon: Trophy,
    title: "Motivation that lasts",
    body:
      "Streaks, XP, badges, and optional friend-based challenges help users stay consistent without forcing competition on everyone.",
    accent:
      "bg-[linear-gradient(135deg,rgba(245,158,11,0.08),rgba(99,102,241,0.06))] ring-indigo-100",
    iconStyle: "bg-amber-100 text-amber-600",
    layout: "lg:col-span-5",
  },
];

const JOURNEY = [
  {
    title: "Project idea",
    body:
      "Identified the opportunity to combine AI coaching, structured workout plans, progress tracking, and motivation in one app.",
  },
  {
    title: "User research",
    body:
      "Conducted interviews and surveys to understand why users abandon fitness apps and what kind of guidance they actually need.",
  },
  {
    title: "Feature planning",
    body:
      "Defined the core experience around WiseCoach AI, workout plans, tracking, gamification, and optional social motivation.",
  },
  {
    title: "UI/UX prototype",
    body:
      "Designed the mobile app screens and website direction to create a calm, encouraging, and premium fitness experience.",
  },
  {
    title: "Development in progress",
    body:
      "The team is now turning the concept into a working prototype while documenting updates, decisions, and reflections.",
  },
];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.25 },
  transition: {
    duration: 0.55,
    delay,
    ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
  },
});

function MissionVisual() {
  return (
    <motion.div
      className="relative mx-auto w-full max-w-[32rem]"
      animate={{ y: [0, -8, 0] }}
      transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
    >
      <div className="absolute -left-6 top-8 h-24 w-24 rounded-full bg-indigo-200/30 blur-3xl" />
      <div className="absolute -right-4 bottom-6 h-28 w-28 rounded-full bg-purple-200/35 blur-3xl" />

      <div className="relative overflow-hidden rounded-[2rem] border border-indigo-100/80 bg-white/90 p-5 shadow-[0_24px_70px_rgba(99,102,241,0.12)] backdrop-blur-sm">
        <div className="rounded-[1.5rem] bg-[linear-gradient(180deg,#F7F5FF_0%,#FFFFFF_100%)] p-5 ring-1 ring-indigo-100/70">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-indigo-400">
                WiseCoach
              </p>
              <p className="mt-2 text-lg font-bold text-[#1E1B4B]">
                Guidance that adapts with you
              </p>
            </div>
            <div className="rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold text-indigo-600">
              AI coaching
            </div>
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-[1.1fr_0.9fr]">
            <div className="rounded-[1.4rem] bg-white p-4 shadow-sm ring-1 ring-indigo-100/70">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-indigo-100 text-indigo-600">
                  <Brain className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#1E1B4B]">
                    Session insight
                  </p>
                  <p className="text-xs text-gray-500">
                    Volume rose 15% this week
                  </p>
                </div>
              </div>
              <div className="mt-4 rounded-2xl bg-[linear-gradient(135deg,#EEF2FF_0%,#F8FAFF_100%)] p-4">
                <p className="text-sm leading-7 text-[#312E81]">
                  Recovery looks lighter today. Adjust your upper-body session
                  and keep your streak moving.
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="rounded-[1.4rem] bg-white p-4 shadow-sm ring-1 ring-indigo-100/70">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-400">
                  Plan
                </p>
                <p className="mt-2 text-sm font-semibold text-[#1E1B4B]">
                  Push day · 45 min
                </p>
                <div className="mt-3 space-y-2">
                  {["Bench Press", "Shoulder Press", "Lateral Raise"].map((item) => (
                    <div
                      key={item}
                      className="rounded-xl bg-[#F8F7FF] px-3 py-2 text-sm text-gray-600"
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-[1.4rem] bg-[linear-gradient(135deg,#4F46E5_0%,#7C3AED_100%)] p-4 text-white shadow-[0_18px_40px_rgba(99,102,241,0.24)]">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold">Momentum</span>
                  <Flame className="h-4 w-4 text-amber-300" />
                </div>
                <p className="mt-3 text-3xl font-bold">7-day streak</p>
                <p className="mt-1 text-sm text-indigo-100">
                  Progress feels clearer when the system guides the next step.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function AboutPageClient() {
  return (
    <div className="min-h-screen bg-[#F8F7FF]">
      <section className="overflow-hidden bg-indigo-50/80 py-24 pt-32 md:py-28 md:pt-36">
        <div className="mx-auto grid max-w-6xl items-center gap-14 px-6 lg:grid-cols-[0.92fr_1.08fr]">
          <div>
            <FadeInUp>
              <span className="inline-flex items-center rounded-full border border-indigo-200 bg-white px-4 py-1.5 text-xs font-semibold text-indigo-600">
                About WiseWorkout
              </span>
            </FadeInUp>
            <FadeInUp delay={0.08}>
              <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-[#1E1B4B] md:text-5xl lg:text-6xl">
                We&apos;re building a smarter way to train
              </h1>
            </FadeInUp>
            <FadeInUp delay={0.16}>
              <p className="mt-6 max-w-xl text-lg leading-8 text-gray-600">
                WiseWorkout is a Final Year Project by SIM CSIT321 students,
                created to explore how fitness apps can go beyond simple
                tracking and give users clearer coaching, personalised plans,
                and motivation that fits real life.
              </p>
            </FadeInUp>
          </div>

          <FadeInUp delay={0.14}>
            <MissionVisual />
          </FadeInUp>
        </div>
      </section>

      <section className="bg-white py-28 md:py-32">
        <div className="mx-auto max-w-6xl px-6">
          <FadeInUp className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-widest text-indigo-500">
              Why we started
            </p>
            <h2 className="mt-3 text-3xl font-extrabold text-[#1E1B4B] md:text-4xl">
              Why we started
            </h2>
            <p className="mt-5 text-lg leading-8 text-gray-600">
              During our early research, we noticed a common pattern: many
              fitness apps are good at recording workouts, but weaker at helping
              users understand what to do next. Users still rely on YouTube,
              TikTok, notes, or even ChatGPT for guidance, while logging apps
              only store the numbers.
            </p>
          </FadeInUp>

          <StaggerChildren className="mt-12 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
            <StaggerItem>
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
                className="rounded-[2rem] bg-[linear-gradient(135deg,rgba(99,102,241,0.10),rgba(168,85,247,0.08))] p-8 shadow-[0_18px_50px_rgba(99,102,241,0.08)] ring-1 ring-indigo-100/70"
              >
                <p className="text-2xl font-bold leading-tight text-[#1E1B4B] md:text-3xl">
                  {INSIGHTS[0]}
                </p>
              </motion.div>
            </StaggerItem>

            <div className="grid gap-6">
              {INSIGHTS.slice(1).map((insight, index) => (
                <StaggerItem key={insight}>
                  <motion.div
                    whileHover={{ y: -4 }}
                    transition={{ duration: 0.2 }}
                    className={`rounded-[1.75rem] p-7 shadow-[0_14px_40px_rgba(99,102,241,0.07)] ring-1 ring-indigo-100/70 ${
                      index === 0
                        ? "bg-[linear-gradient(135deg,rgba(255,255,255,0.98),rgba(238,240,255,0.94))]"
                        : "bg-[linear-gradient(135deg,rgba(245,247,255,0.96),rgba(255,255,255,0.98))]"
                    }`}
                  >
                    <p className="text-xl font-bold leading-tight text-[#1E1B4B]">
                      {insight}
                    </p>
                  </motion.div>
                </StaggerItem>
              ))}
            </div>
          </StaggerChildren>
        </div>
      </section>

      <section
        className="py-28 md:py-32"
        style={{ backgroundColor: "rgba(124, 58, 237, 0.04)" }}
      >
        <div className="mx-auto max-w-6xl px-6">
          <FadeInUp className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-indigo-500">
              Focus areas
            </p>
            <h2 className="mt-3 text-3xl font-extrabold text-[#1E1B4B] md:text-4xl">
              What WiseWorkout focuses on
            </h2>
            <p className="mt-5 text-lg leading-8 text-gray-600">
              We designed WiseWorkout around four connected ideas that work
              together as one coaching system.
            </p>
          </FadeInUp>

          <StaggerChildren className="mt-14 grid gap-6 lg:grid-cols-8">
            {FOCUS_AREAS.map((item) => {
              const Icon = item.icon;
              return (
                <StaggerItem key={item.title} className={item.layout}>
                  <motion.div
                    whileHover={{ y: -4 }}
                    transition={{ duration: 0.2 }}
                    className={`h-full rounded-[2rem] p-7 shadow-[0_18px_50px_rgba(99,102,241,0.08)] ring-1 ${item.accent}`}
                  >
                    <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${item.iconStyle}`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="mt-6 text-2xl font-bold text-[#1E1B4B]">
                      {item.title}
                    </h3>
                    <p className="mt-4 text-base leading-8 text-gray-600">
                      {item.body}
                    </p>
                  </motion.div>
                </StaggerItem>
              );
            })}
          </StaggerChildren>
        </div>
      </section>

      <section className="bg-white py-28 md:py-32">
        <div className="mx-auto max-w-6xl px-6">
          <FadeInUp className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-indigo-500">
              Project journey
            </p>
            <h2 className="mt-3 text-3xl font-extrabold text-[#1E1B4B] md:text-4xl">
              Our journey so far
            </h2>
            <p className="mt-5 text-lg leading-8 text-gray-600">
              WiseWorkout is being shaped through research, prototyping,
              feedback, and weekly project progress.
            </p>
          </FadeInUp>

          <div className="relative mx-auto mt-16 max-w-5xl">
            <div className="absolute bottom-0 left-[1.05rem] top-0 w-px bg-indigo-100 md:left-1/2 md:-translate-x-1/2" />

            <div className="space-y-8">
              {JOURNEY.map((item, index) => (
                <motion.div
                  key={item.title}
                  {...fadeUp(index * 0.06)}
                  className={`relative md:grid md:grid-cols-2 md:gap-10 ${
                    index % 2 === 0 ? "" : ""
                  }`}
                >
                  <div
                    className={`pl-12 md:pl-0 ${
                      index % 2 === 0
                        ? "md:pr-12 md:text-right"
                        : "md:col-start-2 md:pl-12"
                    }`}
                  >
                    <div className="rounded-[1.75rem] bg-[linear-gradient(135deg,rgba(255,255,255,0.98),rgba(245,247,255,0.95))] p-6 shadow-[0_16px_40px_rgba(99,102,241,0.07)] ring-1 ring-indigo-100/70">
                      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-indigo-400">
                        Step {index + 1}
                      </p>
                      <h3 className="mt-3 text-2xl font-bold text-[#1E1B4B]">
                        {item.title}
                      </h3>
                      <p className="mt-4 text-base leading-8 text-gray-600">
                        {item.body}
                      </p>
                    </div>
                  </div>

                  <div className="absolute left-[1.05rem] top-8 flex h-9 w-9 -translate-x-1/2 items-center justify-center rounded-full border-4 border-[#F8F7FF] bg-indigo-500 text-white md:left-1/2">
                    <span className="text-xs font-bold">{index + 1}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section
        className="py-24 md:py-28"
        style={{ backgroundColor: "rgba(124, 58, 237, 0.04)" }}
      >
        <div className="mx-auto max-w-4xl px-6">
          <FadeInUp>
            <div className="rounded-[2rem] border border-indigo-100 bg-[linear-gradient(135deg,rgba(255,255,255,0.96),rgba(247,244,255,0.98))] p-8 text-center shadow-[0_18px_50px_rgba(99,102,241,0.08)] md:p-10">
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-indigo-500">
                Keep following
              </p>
              <h2 className="mt-4 text-3xl font-extrabold text-[#1E1B4B] md:text-4xl">
                Follow the WiseWorkout journey
              </h2>
              <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-gray-600">
                We are continuing to build, test, and refine WiseWorkout
                throughout our Final Year Project. Explore our team, weekly
                updates, and product progress to see how the project develops.
              </p>

              <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Link
                  href="/team"
                  className="inline-flex items-center gap-2 rounded-full bg-[linear-gradient(135deg,#4F46E5_0%,#7C3AED_100%)] px-7 py-3.5 text-sm font-semibold text-white shadow-md shadow-indigo-200 transition hover:opacity-95"
                >
                  Meet the Team
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/updates"
                  className="inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-white px-7 py-3.5 text-sm font-semibold text-indigo-600 shadow-sm transition hover:border-indigo-300 hover:bg-indigo-50"
                >
                  View Updates
                </Link>
              </div>
            </div>
          </FadeInUp>
        </div>
      </section>
    </div>
  );
}
