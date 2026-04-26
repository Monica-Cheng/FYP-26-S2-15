"use client";

import Image from "next/image";
import Link from "next/link";
import { GitBranch, Link2 } from "lucide-react";
import { siteConfig } from "@/content/site-config";

const productLinks = [
  { label: "Features", href: "/#features", comingSoon: false },
  { label: "How it Works", href: "/#how-it-works", comingSoon: false },
  { label: "Pricing", href: "/#pricing", comingSoon: true },
];

const projectLinks = [
  { label: "About", href: "/about", comingSoon: false },
  { label: "Team", href: "/team", comingSoon: false },
];

const resourceLinks = [
  { label: "Contact", href: "#", comingSoon: true },
  { label: "GitHub", href: "#", comingSoon: true },
  { label: "Documentation", href: "#", comingSoon: true },
];

function FooterLink({
  label,
  href,
  comingSoon,
}: {
  label: string;
  href: string;
  comingSoon?: boolean;
}) {
  if (comingSoon) {
    return (
      <span className="inline-flex items-center gap-2 text-sm text-[#A8A4C3]">
        {label}
        <span className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#C9C6E3]">
          Soon
        </span>
      </span>
    );
  }

  return (
    <Link
      href={href}
      className="inline-flex w-fit items-center gap-2 text-sm text-[#C9C6E3] transition hover:text-white"
    >
      {label}
    </Link>
  );
}

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[linear-gradient(180deg,#4A4375_0%,#3E3766_100%)] text-white">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-indigo-200/35 to-transparent" />
      <div className="pointer-events-none absolute -top-10 left-1/2 h-56 w-[42rem] -translate-x-1/2 rounded-full bg-indigo-200/16 blur-3xl" />
      <div className="pointer-events-none absolute right-[-8rem] bottom-16 text-[9rem] font-extrabold tracking-[-0.08em] text-white/[0.05] md:text-[13rem]">
        WiseWorkout
      </div>

      <div className="relative mx-auto max-w-7xl px-6 py-16 md:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.25fr_0.75fr_0.75fr_0.75fr]">
          <div className="max-w-sm">
            <Link href="/" className="inline-flex items-center gap-3">
              <Image
                src="/images/logo-mark.png"
                alt={`${siteConfig.name} logo`}
                width={80}
                height={80}
                unoptimized
                className="h-20 w-20 object-contain"
              />
              <div>
                <p className="text-xl font-bold tracking-tight text-white">
                  {siteConfig.name}
                </p>
                <p className="text-sm text-[#A8A4C3]">{siteConfig.tagline}</p>
              </div>
            </Link>

            <p className="mt-5 text-sm leading-7 text-[#CEC9E4]">
              An AI-powered fitness product that combines coaching, personalised plans,
              progress tracking, and social accountability into one guided training experience.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.22em] text-[#F3F1FF]">
              Product
            </h3>
            <ul className="mt-5 flex flex-col gap-3">
              {productLinks.map((link) => (
                <li key={link.label}>
                  <FooterLink {...link} />
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.22em] text-[#F3F1FF]">
              Project
            </h3>
            <ul className="mt-5 flex flex-col gap-3">
              {projectLinks.map((link) => (
                <li key={link.label}>
                  <FooterLink {...link} />
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.22em] text-[#F3F1FF]">
              Resources
            </h3>
            <ul className="mt-5 flex flex-col gap-3">
              {resourceLinks.map((link) => (
                <li key={link.label}>
                  <FooterLink {...link} />
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-5 border-t border-white/10 pt-6 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-col gap-2">
            <p className="text-sm text-[#C9C6E3]">
              © 2026 {siteConfig.name}
            </p>
            <p className="text-xs leading-6 text-[#8E88AF]">
              Built as a Final Year Project at SIM – University of Wollongong
            </p>
          </div>

          <div className="flex items-center gap-4">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-[#A8A4C3]">
              <GitBranch className="h-4 w-4" />
            </span>
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-[#A8A4C3]">
              <Link2 className="h-4 w-4" />
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
