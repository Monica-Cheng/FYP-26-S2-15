"use client";

import { Target, CalendarCheck, TrendingUp } from "lucide-react";
import FadeInUp from "@/components/animations/FadeInUp";
import { StaggerChildren, StaggerItem } from "@/components/animations/StaggerChildren";

const steps = [
  {
    number: "01",
    icon: Target,
    title: "Set your goals",
    description:
      "Tell WiseCoach your fitness goals, injuries, and available equipment during a quick onboarding survey.",
  },
  {
    number: "02",
    icon: CalendarCheck,
    title: "Follow your plan",
    description:
      "Get a personalised weekly workout schedule — gym or cardio — that adapts as you improve week over week.",
  },
  {
    number: "03",
    icon: TrendingUp,
    title: "Track & level up",
    description:
      "Log every session, earn XP, hit streaks, and watch your progress charts grow with WiseCoach insights.",
  },
];

export default function HowItWorksSection() {
  return (
    <section
      id="how-it-works"
      className="py-28 md:py-32"
      style={{ backgroundColor: "rgba(124, 58, 237, 0.04)" }}
    >
      <div className="mx-auto max-w-6xl px-6">
        {/* Header */}
        <FadeInUp className="mx-auto max-w-2xl text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-indigo-500">
            How it works
          </p>
          <h2 className="text-3xl font-extrabold text-[#1E1B4B] md:text-4xl">
            Three steps to train smarter
          </h2>
        </FadeInUp>

        {/* Steps */}
        <StaggerChildren className="relative mt-16 grid grid-cols-1 gap-10 md:grid-cols-3">
          {/* Connector lines — desktop only */}
          <div className="absolute top-10 hidden h-px w-full md:block">
            <div
              className="absolute left-[calc(33%+2rem)] right-[calc(33%+2rem)] top-0 border-t-2 border-dashed border-indigo-200"
            />
          </div>

          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <StaggerItem key={step.number}>
                <div className="flex flex-col items-center text-center">
                  {/* Number */}
                  <span className="mb-3 text-6xl font-black leading-none text-indigo-100 md:text-7xl">
                    {step.number}
                  </span>
                  {/* Icon circle */}
                  <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 shadow-md shadow-indigo-200">
                    <Icon className="h-7 w-7 text-white" strokeWidth={1.8} />
                  </div>
                  <h3 className="mb-3 text-lg font-bold text-[#1E1B4B]">{step.title}</h3>
                  <p className="text-sm leading-relaxed text-gray-500">{step.description}</p>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerChildren>
      </div>
    </section>
  );
}
