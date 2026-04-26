"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { Menu, X } from "lucide-react";
import { siteConfig } from "@/content/site-config";
import { useWaitlistModal } from "@/components/waitlist/WaitlistModalProvider";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { scrollY } = useScroll();
  const { openModal } = useWaitlistModal();

  useMotionValueEvent(scrollY, "change", (y) => {
    setScrolled(y > 20);
  });

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      <motion.header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        animate={{
          backgroundColor: scrolled
            ? "rgba(255,255,255,0.92)"
            : "rgba(248,247,255,0)",
          backdropFilter: scrolled ? "blur(12px)" : "blur(0px)",
          boxShadow: scrolled
            ? "0 1px 0 0 rgba(99,102,241,0.08)"
            : "none",
        }}
        transition={{ duration: 0.3 }}
      >
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          {/* Logo */}
          <Link href="/" className="group flex items-center">
            <Image
              src="/images/logo-full.png"
              alt={siteConfig.name}
              width={320}
              height={90}
              unoptimized
              className="h-14 w-auto transition-transform duration-300 group-hover:scale-[1.01] md:h-16"
              priority
            />
          </Link>

          {/* Desktop nav links */}
          <ul className="hidden md:flex items-center gap-8">
            {siteConfig.navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm font-medium text-[#6b7280] transition-colors hover:text-[#6366f1]"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <motion.button
              type="button"
              onClick={openModal}
              className="rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 px-5 py-2 text-sm font-semibold text-white shadow-sm"
              whileHover={{ scale: 1.04, opacity: 0.95 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
            >
              Get the App
            </motion.button>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 rounded-lg text-[#6b7280] hover:text-[#6366f1] transition-colors"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </nav>
      </motion.header>

      {/* Mobile menu */}
      <motion.div
        className="fixed inset-0 z-40 bg-white/95 backdrop-blur-lg md:hidden flex flex-col pt-20 px-6 pb-8 gap-6"
        initial={{ opacity: 0, y: -16 }}
        animate={mobileOpen ? { opacity: 1, y: 0 } : { opacity: 0, y: -16, pointerEvents: "none" }}
        transition={{ duration: 0.22, ease: "easeOut" }}
        style={{ pointerEvents: mobileOpen ? "auto" : "none" }}
      >
        <ul className="flex flex-col gap-4">
          {siteConfig.navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="block text-xl font-semibold text-[#1e1b4b] hover:text-[#6366f1] transition-colors py-2"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
        <button
          type="button"
          className="mt-4 block w-full rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 py-3.5 text-center text-base font-semibold text-white shadow-sm"
          onClick={() => {
            setMobileOpen(false);
            openModal();
          }}
        >
          Get the App
        </button>
      </motion.div>
    </>
  );
}
