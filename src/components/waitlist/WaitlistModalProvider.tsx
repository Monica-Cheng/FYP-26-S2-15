"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type FormEvent,
  type ReactNode,
} from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Loader2, Sparkles, X } from "lucide-react";

type Status = "idle" | "loading" | "success" | "duplicate" | "error";

type WaitlistModalContextValue = {
  openModal: () => void;
  closeModal: () => void;
};

const WaitlistModalContext = createContext<WaitlistModalContextValue | null>(null);

export function useWaitlistModal() {
  const context = useContext(WaitlistModalContext);

  if (!context) {
    throw new Error("useWaitlistModal must be used within WaitlistModalProvider");
  }

  return context;
}

export default function WaitlistModalProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const inputRef = useRef<HTMLInputElement>(null);

  const closeModal = useCallback(() => {
    setIsOpen(false);
  }, []);

  const openModal = useCallback(() => {
    setIsOpen(true);
  }, []);

  useEffect(() => {
    if (!isOpen) {
      document.body.style.overflow = "";
      return;
    }

    document.body.style.overflow = "hidden";
    const timer = window.setTimeout(() => inputRef.current?.focus(), 120);

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && status !== "loading") {
        closeModal();
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [closeModal, isOpen, status]);

  useEffect(() => {
    if (!isOpen) {
      const timer = window.setTimeout(() => {
        setStatus("idle");
        setEmail("");
      }, 180);

      return () => window.clearTimeout(timer);
    }
  }, [isOpen]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");

    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setStatus("success");
        setEmail("");
        return;
      }

      if (response.status === 409) {
        setStatus("duplicate");
        return;
      }

      setStatus("error");
    } catch {
      setStatus("error");
    }
  }

  const contextValue = useMemo(
    () => ({
      openModal,
      closeModal,
    }),
    [closeModal, openModal],
  );

  return (
    <WaitlistModalContext.Provider value={contextValue}>
      {children}

      <AnimatePresence>
        {isOpen ? (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center px-4 py-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.button
              type="button"
              aria-label="Close waitlist modal"
              className="absolute inset-0 bg-[#1E1B4B]/35 backdrop-blur-md"
              onClick={() => {
                if (status !== "loading") closeModal();
              }}
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 18 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: 12 }}
              transition={{ duration: 0.24, ease: "easeOut" }}
              className="relative z-10 w-full max-w-xl overflow-hidden rounded-[2rem] border border-white/40 bg-white/92 p-8 shadow-[0_30px_80px_rgba(76,29,149,0.24)] backdrop-blur-xl md:p-9"
            >
              <div className="pointer-events-none absolute -top-14 -right-10 h-36 w-36 rounded-full bg-purple-300/30 blur-3xl" />
              <div className="pointer-events-none absolute -bottom-16 -left-10 h-40 w-40 rounded-full bg-indigo-300/25 blur-3xl" />

              <div className="relative">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <span className="inline-flex items-center gap-2 rounded-full bg-indigo-50 px-3.5 py-1.5 text-xs font-semibold text-indigo-600">
                      <Sparkles className="h-3.5 w-3.5" />
                      Early access
                    </span>
                    <h2 className="mt-5 text-3xl font-extrabold leading-tight text-[#1E1B4B] md:text-[2.1rem]">
                      Get early access to WiseWorkout
                    </h2>
                    <p className="mt-4 max-w-lg text-sm leading-7 text-gray-500 md:text-base">
                      Be the first to experience AI-powered training that actually
                      tells you what to do next.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={closeModal}
                    disabled={status === "loading"}
                    className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/80 text-gray-400 shadow-sm transition hover:bg-white hover:text-[#1E1B4B] disabled:cursor-not-allowed disabled:opacity-60"
                    aria-label="Close modal"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                <div className="mt-8">
                  {status === "success" ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="rounded-[1.6rem] border border-emerald-100 bg-emerald-50/80 px-5 py-5 text-center"
                    >
                      <p className="text-lg font-bold text-emerald-700">
                        You&apos;re on the list 🚀
                      </p>
                      <p className="mt-2 text-sm leading-6 text-emerald-700/80">
                        We&apos;ll let you know when early access opens.
                      </p>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <label className="block">
                        <span className="mb-2 block text-sm font-semibold text-[#1E1B4B]">
                          Email
                        </span>
                        <input
                          ref={inputRef}
                          type="email"
                          value={email}
                          onChange={(event) => setEmail(event.target.value)}
                          placeholder="you@example.com"
                          required
                          className="w-full rounded-[1.25rem] border border-indigo-100 bg-white/85 px-4 py-3.5 text-sm text-[#1E1B4B] shadow-sm outline-none transition placeholder:text-gray-400 focus:border-indigo-300 focus:ring-4 focus:ring-indigo-100/70"
                        />
                      </label>

                      <button
                        type="submit"
                        disabled={status === "loading"}
                        className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-indigo-200 transition hover:-translate-y-0.5 hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-70"
                      >
                        {status === "loading" ? (
                          <>
                            <Loader2 className="h-4 w-4 animate-spin" />
                            Sending...
                          </>
                        ) : (
                          "Get Early Access"
                        )}
                      </button>
                    </form>
                  )}

                  {status === "duplicate" ? (
                    <p className="mt-4 text-sm text-amber-600">
                      You&apos;re already on the list. We&apos;ll be in touch.
                    </p>
                  ) : null}

                  {status === "error" ? (
                    <p className="mt-4 text-sm text-red-500">
                      Something went wrong. Please try again.
                    </p>
                  ) : null}

                </div>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </WaitlistModalContext.Provider>
  );
}
