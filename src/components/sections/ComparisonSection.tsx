"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Check, Sparkles } from "lucide-react";
import FadeInUp from "@/components/animations/FadeInUp";

type BillingCycle = "monthly" | "yearly";

const freeFeatures = [
  "Core tracking features",
  "Limited AI coaching",
  "Basic analytics",
  "Ads enabled",
];

const premiumFeatures = [
  "Unlimited AI coaching",
  "Advanced analytics & insights",
  "Full workout plan customisation",
  "Priority notifications",
  "Ad-free experience",
];

const premiumPricing = {
  monthly: {
    price: "$9.99",
    suffix: "/month",
    note: "Upgrade anytime for full coaching, deeper insights, and an ad-free experience.",
  },
  yearly: {
    price: "$79.99",
    suffix: "/year",
    note: "Best value for long-term consistency. Save 30% compared with monthly billing.",
  },
};

const cardMotion = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.25 },
  transition: {
    duration: 0.6,
    ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
  },
};

function FeatureList({ items }: { items: string[] }) {
  return (
    <ul className="mt-8 grid gap-3">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-3 text-sm leading-6 text-gray-600">
          <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-indigo-600">
            <Check className="h-3.5 w-3.5" />
          </span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export default function ComparisonSection() {
  const [billingCycle, setBillingCycle] = useState<BillingCycle>("yearly");

  const premiumPlan = useMemo(() => premiumPricing[billingCycle], [billingCycle]);

  return (
    <section className="bg-white py-28 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <FadeInUp className="mx-auto max-w-2xl text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-indigo-500">
            Pricing
          </p>
          <h2 className="text-3xl font-extrabold text-[#1E1B4B] md:text-4xl">
            Simple pricing for smarter training
          </h2>
          <p className="mt-4 text-lg text-gray-500">
            Start free. Upgrade when you&apos;re ready.
          </p>
        </FadeInUp>

        <FadeInUp delay={0.08} className="mt-10 flex justify-center">
          <div className="inline-flex items-center rounded-full border border-indigo-100 bg-[#F5F4FF] p-1.5 shadow-sm">
            <button
              type="button"
              onClick={() => setBillingCycle("monthly")}
              className={`rounded-full px-5 py-2.5 text-sm font-semibold transition ${
                billingCycle === "monthly"
                  ? "bg-white text-[#1E1B4B] shadow-sm"
                  : "text-gray-500 hover:text-[#1E1B4B]"
              }`}
            >
              Monthly
            </button>
            <button
              type="button"
              onClick={() => setBillingCycle("yearly")}
              className={`flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition ${
                billingCycle === "yearly"
                  ? "bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-md shadow-indigo-200"
                  : "text-gray-500 hover:text-[#1E1B4B]"
              }`}
            >
              Yearly
              <span
                className={`rounded-full px-2 py-0.5 text-[11px] font-bold ${
                  billingCycle === "yearly"
                    ? "bg-white/20 text-white"
                    : "bg-indigo-100 text-indigo-600"
                }`}
              >
                Save 30%
              </span>
            </button>
          </div>
        </FadeInUp>

        <div className="mt-14 grid gap-8 lg:grid-cols-[0.92fr_1.08fr]">
          {/* Free Plan */}
          <motion.article
            {...cardMotion}
            className="rounded-[2rem] border border-gray-100 bg-white p-8 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(99,102,241,0.10)]"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-gray-400">
                  Free Plan
                </p>
                <h3 className="mt-3 text-3xl font-bold text-[#1E1B4B]">Start strong</h3>
              </div>
              <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-500">
                No credit card
              </span>
            </div>

            <div className="mt-8 flex items-end gap-2">
              <span className="text-5xl font-extrabold tracking-tight text-[#1E1B4B]">$0</span>
              <span className="pb-1 text-sm font-medium text-gray-400">forever</span>
            </div>

            <p className="mt-4 max-w-sm text-sm leading-7 text-gray-500">
              A clean starting point for tracking workouts, building momentum, and getting a feel for the system.
            </p>

            <FeatureList items={freeFeatures} />

            <button
              type="button"
              className="mt-8 inline-flex w-full items-center justify-center rounded-full border border-indigo-100 bg-white px-6 py-3.5 text-sm font-semibold text-indigo-600 shadow-sm transition hover:-translate-y-0.5 hover:border-indigo-200 hover:bg-indigo-50"
            >
              Get Started
            </button>
          </motion.article>

          {/* Premium Plan */}
          <motion.article
            {...cardMotion}
            transition={{ ...cardMotion.transition, delay: 0.08 }}
            className="relative rounded-[2rem] border border-indigo-200/70 bg-gradient-to-br from-[#F9F7FF] via-white to-[#F5F4FF] p-8 shadow-[0_24px_70px_rgba(99,102,241,0.18)] ring-1 ring-indigo-100/70 transition duration-300 hover:-translate-y-1 hover:shadow-[0_30px_85px_rgba(99,102,241,0.24)] lg:scale-[1.02]"
          >
            <div className="absolute inset-x-10 top-4 h-24 rounded-full bg-indigo-400/10 blur-3xl" />

            <div className="relative flex items-start justify-between gap-4">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 px-3 py-1 text-xs font-semibold text-white shadow-md shadow-indigo-200/70">
                  <Sparkles className="h-3.5 w-3.5" />
                  Most Popular
                </div>
                <p className="mt-4 text-sm font-semibold uppercase tracking-[0.18em] text-indigo-500">
                  Premium Plan
                </p>
                <h3 className="mt-3 text-3xl font-bold text-[#1E1B4B]">
                  Train with the full system
                </h3>
              </div>
            </div>

            <div className="relative mt-8 flex flex-wrap items-end gap-x-3 gap-y-2">
              <span className="text-5xl font-extrabold tracking-tight text-[#1E1B4B]">
                {premiumPlan.price}
              </span>
              <span className="pb-1 text-sm font-medium text-gray-400">{premiumPlan.suffix}</span>
              {billingCycle === "yearly" ? (
                <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-600">
                  Save 30%
                </span>
              ) : null}
            </div>

            <p className="mt-4 max-w-lg text-sm leading-7 text-gray-500">
              {premiumPlan.note}
            </p>

            <div className="mt-5 rounded-[1.4rem] border border-indigo-100/70 bg-white/80 px-4 py-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-400">
                    Quarterly option
                  </p>
                  <p className="mt-1 text-sm font-medium text-[#1E1B4B]">$24.99 every 3 months</p>
                </div>
                <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-600">
                  ~$8.33/month
                </span>
              </div>
            </div>

            <FeatureList items={premiumFeatures} />

            <button
              type="button"
              className="mt-8 inline-flex w-full items-center justify-center rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-indigo-200 transition hover:-translate-y-0.5 hover:opacity-95"
            >
              Start 7-day free trial
            </button>
          </motion.article>
        </div>
      </div>
    </section>
  );
}
