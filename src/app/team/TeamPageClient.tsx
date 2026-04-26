"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import FadeInUp from "@/components/animations/FadeInUp";
import { StaggerChildren, StaggerItem } from "@/components/animations/StaggerChildren";

const teamMembers = [
  {
    name: "Su Yi Maung",
    role: "Project Manager · Full-Stack",
    image: "/images/su_yi_maung.jpg",
    github: "https://github.com/Monica-Cheng",
    linkedin: "https://www.linkedin.com/in/monica-cheng-873512292/?skipRedirect=true",
    description: "Keeps the team on track while leading AI coaching integration and backend cloud functions.",
  },
  {
    name: "Meshchanov Iaroslav",
    role: "Researcher · UI/UX Designer",
    image: "/images/Iarlsaov.png",
    github: "https://github.com/infamous1000",
    linkedin: "https://www.linkedin.com/in/iaroslav-meshchanov-6777a7336/",
    description: "Conducts user research and competitor analysis while shaping wireframes and UI prototypes.",
  },
  {
    name: "Muhammad Imran bin Nassiruddin",
    role: "Backend Developer",
    image: "",
    github: "https://github.com/Imran4116",
    linkedin: "https://www.linkedin.com/in/imran-nassiruddin-337b26405/",
    description: "Sets up Firebase, structures Firestore, and handles wearable connection integrations.",
  },
  {
    name: "Phyu Sin Thant",
    role: "Frontend Developer",
    image: "/images/phyu.png",
    github: "https://github.com/HaTLoE",
    linkedin: "https://www.linkedin.com/in/phyusin-thant-17aab1405/",
    description: "Builds Flutter UI screens and implements navigation flows based on the Figma prototype.",
  },
  {
    name: "Soh Xin Yong David",
    role: "Backend Developer",
    image: "/images/david.png",
    github: "https://github.com/david37838",
    linkedin: "https://www.linkedin.com/in/david-soh-570519204/",
    description: "Implements Firestore security rules and supports backend logic, data handling, and the admin dashboard.",
  },
];

function GitHubIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 fill-current">
      <path d="M12 2C6.477 2 2 6.589 2 12.248c0 4.526 2.865 8.366 6.839 9.72.5.096.682-.222.682-.493 0-.243-.009-.889-.014-1.744-2.782.617-3.369-1.372-3.369-1.372-.455-1.176-1.11-1.49-1.11-1.49-.907-.636.069-.623.069-.623 1.003.072 1.53 1.056 1.53 1.056.892 1.565 2.341 1.113 2.91.851.091-.664.349-1.113.635-1.369-2.221-.258-4.556-1.139-4.556-5.07 0-1.12.389-2.036 1.028-2.754-.103-.259-.446-1.301.098-2.712 0 0 .839-.275 2.75 1.052A9.347 9.347 0 0 1 12 6.836c.85.004 1.706.117 2.505.344 1.91-1.327 2.748-1.052 2.748-1.052.546 1.411.203 2.453.1 2.712.64.718 1.026 1.634 1.026 2.754 0 3.941-2.339 4.809-4.566 5.063.359.319.679.95.679 1.915 0 1.382-.012 2.496-.012 2.835 0 .274.18.594.688.492C19.137 20.61 22 16.772 22 12.248 22 6.589 17.523 2 12 2Z" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 fill-current">
      <path d="M6.94 8.5H3.56V20h3.38V8.5ZM5.25 3C4.17 3 3.3 3.89 3.3 4.98c0 1.08.86 1.97 1.93 1.97h.02c1.1 0 1.98-.89 1.98-1.97C7.21 3.89 6.35 3 5.25 3ZM20.7 12.8c0-3.53-1.88-5.17-4.39-5.17-2.02 0-2.92 1.13-3.43 1.93V8.5H9.5c.04.7 0 11.5 0 11.5h3.38v-6.42c0-.34.02-.68.13-.92.27-.69.88-1.4 1.91-1.4 1.35 0 1.89 1.05 1.89 2.59V20h3.38v-7.2Z" />
    </svg>
  );
}

function SocialLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  if (!href) {
    return (
      <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-indigo-100 bg-white text-gray-300">
        {children}
      </span>
    );
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-indigo-100 bg-white text-[#6B7280] transition hover:-translate-y-0.5 hover:border-indigo-200 hover:text-indigo-600 hover:shadow-sm"
    >
      {children}
    </a>
  );
}

function TeamImage({
  image,
  name,
}: {
  image: string;
  name: string;
}) {
  if (image) {
    return (
      <div className="relative aspect-[4/4.6] overflow-hidden rounded-[1.5rem] bg-[#EEF0FF] shadow-[0_16px_40px_rgba(99,102,241,0.10)]">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
        />
      </div>
    );
  }

  return (
    <div className="relative aspect-[4/4.6] overflow-hidden rounded-[1.5rem] bg-gradient-to-br from-[#EEF0FF] via-white to-[#F6F2FF] shadow-[0_16px_40px_rgba(99,102,241,0.08)]">
      <div className="absolute inset-x-6 top-6 h-24 rounded-full bg-indigo-200/35 blur-2xl" />
      <div className="absolute inset-x-8 bottom-10 h-28 rounded-full bg-purple-200/30 blur-3xl" />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="rounded-[1.4rem] border border-white/60 bg-white/70 px-5 py-3 text-center shadow-sm backdrop-blur-sm">
          <p className="text-sm font-semibold text-[#1E1B4B]">{name}</p>
          <p className="mt-1 text-xs uppercase tracking-[0.2em] text-indigo-400">
            Photo placeholder
          </p>
        </div>
      </div>
    </div>
  );
}

function TeamMemberCard({
  member,
}: {
  member: (typeof teamMembers)[number];
}) {
  return (
    <motion.article
      className="group flex h-full flex-col rounded-[1.75rem] border border-indigo-100/80 bg-white p-5 shadow-[0_16px_40px_rgba(99,102,241,0.08)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_22px_50px_rgba(99,102,241,0.14)]"
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
    >
      <TeamImage image={member.image} name={member.name} />

      <div className="mt-5 flex flex-1 flex-col">
        <h3 className="text-xl font-bold tracking-tight text-[#1E1B4B]">
          {member.name}
        </h3>
        <p className="mt-1 text-sm font-medium text-indigo-500">{member.role}</p>
        <p className="mt-3 line-clamp-3 min-h-[5.75rem] text-sm leading-7 text-gray-500">
          {member.description}
        </p>
      </div>

      <div className="mt-5 flex items-center gap-3">
        <SocialLink href={member.github} label={`${member.name} GitHub`}>
          <GitHubIcon />
        </SocialLink>
        <SocialLink href={member.linkedin} label={`${member.name} LinkedIn`}>
          <LinkedInIcon />
        </SocialLink>
      </div>
    </motion.article>
  );
}

export default function TeamPageClient() {
  return (
    <div className="min-h-screen bg-[#F8F7FF]">
      <section className="border-b border-indigo-100/70 bg-white py-24 pt-32 md:py-28 md:pt-36">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <FadeInUp>
            <span className="inline-flex items-center rounded-full border border-indigo-200 bg-indigo-50 px-4 py-1.5 text-xs font-semibold text-indigo-600">
              Meet the team
            </span>
          </FadeInUp>

          <FadeInUp delay={0.08}>
            <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-[#1E1B4B] md:text-5xl">
              Meet the team behind WiseWorkout
            </h1>
          </FadeInUp>

        </div>
      </section>

      <section
        className="py-20 md:py-24"
        style={{ backgroundColor: "rgba(124, 58, 237, 0.04)" }}
      >
        <div className="mx-auto max-w-7xl px-6">
          <StaggerChildren className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-6">
            {teamMembers.map((member, index) => (
              <StaggerItem
                key={member.name}
                className={[
                  "xl:col-span-2",
                  index === 3 ? "xl:col-start-2" : "",
                  index === 4 ? "xl:col-start-4" : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
              >
                <TeamMemberCard member={member} />
              </StaggerItem>
            ))}
          </StaggerChildren>
        </div>
      </section>

      <section className="bg-white py-20 md:py-24">
        <div className="mx-auto max-w-4xl px-6">
          <FadeInUp>
            <div className="rounded-[2rem] border border-indigo-100 bg-gradient-to-r from-white via-[#FBFAFF] to-[#F7F4FF] p-8 text-center shadow-[0_18px_50px_rgba(99,102,241,0.08)] md:p-10">
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-indigo-500">
                Follow our progress
              </p>
              <h2 className="mt-4 text-3xl font-bold tracking-tight text-[#1E1B4B] md:text-4xl">
                See how WiseWorkout evolves week by week
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-gray-500 md:text-base">
                Explore our updates page for meeting minutes, reflective diaries,
                and the thinking behind each stage of the project.
              </p>
              <motion.div
                className="mt-8"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link
                  href="/updates"
                  className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 px-7 py-3.5 text-sm font-semibold text-white shadow-md shadow-indigo-200 transition hover:opacity-95"
                >
                  View weekly updates
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </motion.div>
            </div>
          </FadeInUp>
        </div>
      </section>
    </div>
  );
}
