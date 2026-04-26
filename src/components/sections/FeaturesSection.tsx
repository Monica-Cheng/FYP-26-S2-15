"use client";

import { motion } from "framer-motion";
import { ArrowRight, Brain, ChartColumn, Dumbbell, Flame, Sparkles, Trophy, Users } from "lucide-react";
import FadeInUp from "@/components/animations/FadeInUp";
import { siteConfig } from "@/content/site-config";

type FeatureAccent = "indigo" | "purple" | "amber" | "teal";
type VisualType = "coach" | "plans" | "social" | "analytics";

type FeatureStory = {
  eyebrow: string;
  title: string;
  hook: string;
  explanation: string;
  outcome: string;
  visualType: VisualType;
  accent: FeatureAccent;
};

const accentClasses: Record<
  FeatureAccent,
  {
    badge: string;
    chip: string;
    pill: string;
    glow: string;
    panel: string;
  }
> = {
  indigo: {
    badge: "bg-indigo-50 text-indigo-600",
    chip: "bg-indigo-100 text-indigo-600",
    pill: "bg-gradient-to-r from-indigo-500 to-purple-600 text-white",
    glow: "from-indigo-500/18 to-purple-500/10",
    panel: "border-indigo-100/80",
  },
  purple: {
    badge: "bg-purple-50 text-purple-600",
    chip: "bg-purple-100 text-purple-600",
    pill: "bg-gradient-to-r from-purple-500 to-indigo-500 text-white",
    glow: "from-purple-500/18 to-indigo-500/10",
    panel: "border-purple-100/80",
  },
  amber: {
    badge: "bg-amber-50 text-amber-600",
    chip: "bg-amber-100 text-amber-700",
    pill: "bg-gradient-to-r from-amber-400 to-orange-400 text-white",
    glow: "from-amber-300/22 to-orange-300/10",
    panel: "border-amber-100/80",
  },
  teal: {
    badge: "bg-teal-50 text-teal-600",
    chip: "bg-teal-100 text-teal-700",
    pill: "bg-gradient-to-r from-teal-400 to-cyan-500 text-white",
    glow: "from-teal-400/18 to-cyan-400/10",
    panel: "border-teal-100/80",
  },
};

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.25 },
  transition: {
    duration: 0.65,
    delay,
    ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
  },
});

function CoachVisual({ accent }: { accent: FeatureAccent }) {
  const style = accentClasses[accent];

  return (
    <motion.div
      initial={{ y: 0 }}
      whileInView={{ y: [0, -8, 0] }}
      viewport={{ once: true }}
      transition={{ duration: 4, ease: "easeInOut", repeat: Infinity }}
      className="relative mx-auto w-full max-w-[27rem]"
    >
      <div className={`absolute inset-x-8 bottom-0 top-10 rounded-[2rem] bg-gradient-to-br ${style.glow} blur-3xl`} />
      <div className={`relative overflow-hidden rounded-[2.2rem] border ${style.panel} bg-white/90 p-5 shadow-[0_24px_60px_rgba(99,102,241,0.14)] backdrop-blur-sm`}>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-gray-400">
              WiseCoach
            </p>
            <p className="mt-1 text-lg font-bold text-[#1E1B4B]">
              Your next move, explained.
            </p>
          </div>
          <div className={`rounded-full px-3 py-1 text-xs font-semibold ${style.badge}`}>
            Live guidance
          </div>
        </div>

        <div className="mt-5 space-y-3">
          <div className="max-w-[85%] rounded-[1.25rem] bg-[#F5F4FF] px-4 py-3 text-sm leading-6 text-[#4B4B6A]">
            Bench volume jumped 12% this week. You handled it well, but fatigue is building.
          </div>
          <div className={`ml-auto max-w-[82%] rounded-[1.25rem] px-4 py-3 text-sm leading-6 ${style.pill}`}>
            Try a slightly lighter upper-body session today and push harder again next workout.
          </div>
          <div className="flex flex-wrap gap-2 pt-2">
            {["Adjust today's plan", "Show my progress", "What should I eat?"].map((item) => (
              <span key={item} className={`rounded-full px-3 py-2 text-xs font-medium ${style.chip}`}>
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function PlansVisual({ accent }: { accent: FeatureAccent }) {
  const style = accentClasses[accent];

  const exercises = [
    { name: "Bench Press", detail: "4 x 8", tag: "Chest" },
    { name: "Overhead Press", detail: "3 x 10", tag: "Shoulders" },
    { name: "Lateral Raise", detail: "3 x 15", tag: "Accessory" },
  ];

  return (
    <motion.div
      initial={{ x: 0, y: 0 }}
      whileInView={{ x: [0, 6, 0], y: [0, -6, 0] }}
      viewport={{ once: true }}
      transition={{ duration: 4.2, ease: "easeInOut", repeat: Infinity }}
      className="relative mx-auto w-full max-w-[27rem]"
    >
      <div className={`absolute inset-x-10 bottom-0 top-12 rounded-[2rem] bg-gradient-to-br ${style.glow} blur-3xl`} />
      <div className={`relative overflow-hidden rounded-[2.2rem] border ${style.panel} bg-white/90 p-5 shadow-[0_24px_60px_rgba(99,102,241,0.14)]`}>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-gray-400">
              Smart Plans
            </p>
            <p className="mt-1 text-lg font-bold text-[#1E1B4B]">
              Push A · Week 4
            </p>
          </div>
          <span className={`rounded-full px-3 py-1 text-xs font-semibold ${style.badge}`}>
            Auto-adjusted
          </span>
        </div>

        <div className="mt-5 space-y-3">
          {exercises.map((exercise, index) => (
            <div
              key={exercise.name}
              className="flex items-center gap-3 rounded-[1.25rem] border border-gray-100 bg-[#FBFBFF] px-4 py-3"
            >
              <span className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold ${style.chip}`}>
                {index + 1}
              </span>
              <div className="flex-1">
                <p className="text-sm font-semibold text-[#1E1B4B]">{exercise.name}</p>
                <p className="text-xs text-gray-500">{exercise.detail}</p>
              </div>
              <span className="rounded-full bg-white px-2.5 py-1 text-[11px] font-medium text-gray-500 shadow-sm">
                {exercise.tag}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-5 rounded-[1.4rem] bg-[#F5F4FF] p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gray-400">
            Why this plan changed
          </p>
          <p className="mt-2 text-sm leading-6 text-[#4B4B6A]">
            Better shoulder recovery this week means your next push session can progress instead of repeating the same load.
          </p>
        </div>
      </div>
    </motion.div>
  );
}

function SocialVisual({ accent }: { accent: FeatureAccent }) {
  const style = accentClasses[accent];

  return (
    <motion.div
      initial={{ y: 0 }}
      whileInView={{ y: [0, -6, 0] }}
      viewport={{ once: true }}
      transition={{ duration: 4.4, ease: "easeInOut", repeat: Infinity }}
      className="relative mx-auto w-full max-w-[27rem]"
    >
      <div className={`absolute inset-x-8 bottom-0 top-12 rounded-[2rem] bg-gradient-to-br ${style.glow} blur-3xl`} />
      <div className={`relative overflow-hidden rounded-[2.2rem] border ${style.panel} bg-white/90 p-5 shadow-[0_24px_60px_rgba(99,102,241,0.14)]`}>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-gray-400">
              Squads and streaks
            </p>
            <p className="mt-1 text-lg font-bold text-[#1E1B4B]">
              Momentum feels visible
            </p>
          </div>
          <span className={`rounded-full px-3 py-1 text-xs font-semibold ${style.badge}`}>
            7-day streak
          </span>
        </div>

        <div className="mt-5 grid gap-3 sm:grid-cols-3">
          {[
            { icon: Flame, label: "Streak", value: "7 days" },
            { icon: Trophy, label: "XP", value: "+120 XP" },
            { icon: Users, label: "Squad rank", value: "#2 this week" },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.label} className="rounded-[1.2rem] bg-[#FBFBFF] px-4 py-4 text-center">
                <span className={`mx-auto flex h-10 w-10 items-center justify-center rounded-full ${style.chip}`}>
                  <Icon className="h-4 w-4" />
                </span>
                <p className="mt-3 text-xs font-medium uppercase tracking-[0.18em] text-gray-400">
                  {item.label}
                </p>
                <p className="mt-1 text-sm font-semibold text-[#1E1B4B]">{item.value}</p>
              </div>
            );
          })}
        </div>

        <div className="mt-5 rounded-[1.4rem] bg-[#F5F4FF] p-4">
          <p className="text-sm font-semibold text-[#1E1B4B]">
            Your squad completed 12 sessions this week.
          </p>
          <p className="mt-2 text-sm leading-6 text-[#4B4B6A]">
            Shared progress keeps training visible, even on weeks when motivation is harder to hold.
          </p>
        </div>
      </div>
    </motion.div>
  );
}

function AnalyticsVisual({ accent }: { accent: FeatureAccent }) {
  const style = accentClasses[accent];

  const bars = [48, 78, 58, 92, 70, 88, 62];

  return (
    <motion.div
      initial={{ x: 0, y: 0 }}
      whileInView={{ x: [0, -6, 0], y: [0, -5, 0] }}
      viewport={{ once: true }}
      transition={{ duration: 4.6, ease: "easeInOut", repeat: Infinity }}
      className="relative mx-auto w-full max-w-[27rem]"
    >
      <div className={`absolute inset-x-10 bottom-0 top-12 rounded-[2rem] bg-gradient-to-br ${style.glow} blur-3xl`} />
      <div className={`relative overflow-hidden rounded-[2.2rem] border ${style.panel} bg-white/90 p-5 shadow-[0_24px_60px_rgba(99,102,241,0.14)]`}>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-gray-400">
              Progress Analytics
            </p>
            <p className="mt-1 text-lg font-bold text-[#1E1B4B]">
              Insight tied to action
            </p>
          </div>
          <span className={`rounded-full px-3 py-1 text-xs font-semibold ${style.badge}`}>
            Weekly view
          </span>
        </div>

        <div className="mt-5 rounded-[1.5rem] bg-[#FBFBFF] p-4">
          <div className="flex items-end gap-2">
            {bars.map((height, index) => (
              <div key={index} className="flex flex-1 flex-col items-center gap-2">
                <motion.div
                  initial={{ height: 12 }}
                  whileInView={{ height }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.05 * index, ease: "easeOut" }}
                  className="w-full rounded-t-xl bg-gradient-to-t from-indigo-500 to-[#2DD4BF]"
                />
                <span className="text-[10px] font-medium text-gray-400">
                  {["M", "T", "W", "T", "F", "S", "S"][index]}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-5 rounded-[1.4rem] bg-[#F5F4FF] p-4">
          <div className="flex items-start gap-3">
            <span className={`flex h-10 w-10 items-center justify-center rounded-full ${style.chip}`}>
              <ChartColumn className="h-4 w-4" />
            </span>
            <div>
              <p className="text-sm font-semibold text-[#1E1B4B]">
                Your pace improved 5% this month.
              </p>
              <p className="mt-2 text-sm leading-6 text-[#4B4B6A]">
                WiseCoach connects that trend back to recovery and workload so you know whether to push, hold, or recover.
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function FeatureVisual({
  visualType,
  accent,
}: {
  visualType: VisualType;
  accent: FeatureAccent;
}) {
  switch (visualType) {
    case "coach":
      return <CoachVisual accent={accent} />;
    case "plans":
      return <PlansVisual accent={accent} />;
    case "social":
      return <SocialVisual accent={accent} />;
    case "analytics":
      return <AnalyticsVisual accent={accent} />;
    default:
      return null;
  }
}

function FeatureStoryBlock({
  feature,
  index,
}: {
  feature: FeatureStory;
  index: number;
}) {
  const reverse = index % 2 === 1;
  const style = accentClasses[feature.accent];
  const isPrimary = index === 0;

  return (
    <motion.article
      {...fadeUp(0.04 * index)}
      className={`grid items-center gap-10 ${reverse ? "lg:grid-cols-[1.05fr_0.95fr]" : "lg:grid-cols-[0.95fr_1.05fr]"} ${isPrimary ? "py-6" : "py-3"}`}
    >
      <div className={`order-2 ${reverse ? "lg:order-1" : "lg:order-2"}`}>
        <FeatureVisual visualType={feature.visualType} accent={feature.accent} />
      </div>

      <div className={`order-1 ${reverse ? "lg:order-2" : "lg:order-1"} max-w-xl`}>
        <span className={`inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold ${style.badge}`}>
          <Sparkles className="h-3.5 w-3.5" />
          {feature.eyebrow}
        </span>
        <h3 className={`${isPrimary ? "mt-6 text-4xl md:text-5xl" : "mt-5 text-3xl md:text-4xl"} font-extrabold leading-tight text-[#1E1B4B]`}>
          {feature.title}
        </h3>
        <p className="mt-5 text-lg leading-8 text-[#312E81]">
          {feature.hook}
        </p>
        <p className="mt-4 text-base leading-8 text-gray-500">
          {feature.explanation}
        </p>
        <div className="mt-6 flex items-start gap-3 rounded-[1.4rem] bg-white/75 p-4 shadow-sm ring-1 ring-indigo-100/60">
          <span className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${style.chip}`}>
            {feature.visualType === "coach" ? (
              <Brain className="h-4 w-4" />
            ) : feature.visualType === "plans" ? (
              <Dumbbell className="h-4 w-4" />
            ) : feature.visualType === "social" ? (
              <Users className="h-4 w-4" />
            ) : (
              <ChartColumn className="h-4 w-4" />
            )}
          </span>
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-gray-400">
              Outcome
            </p>
            <p className="mt-2 text-base leading-7 text-[#1E1B4B]">
              {feature.outcome}
            </p>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

export default function FeaturesSection() {
  const features = siteConfig.features as FeatureStory[];

  return (
    <section id="features" className="bg-white py-28 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <FadeInUp className="mx-auto max-w-2xl text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-indigo-500">
            Product experience
          </p>
          <h2 className="text-3xl font-extrabold text-[#1E1B4B] md:text-4xl">
            Four parts of one coaching system
          </h2>
          <p className="mt-4 text-lg text-gray-500">
            WiseWorkout is not a pile of fitness features. It is a connected system that helps you plan, train, stay consistent, and understand what your data means next.
          </p>
        </FadeInUp>

        <div className="mt-18 space-y-20 md:space-y-24">
          {features.map((feature, index) => (
            <FeatureStoryBlock
              key={feature.eyebrow}
              feature={feature}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
