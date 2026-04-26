"use client";

import { useState, useEffect, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import {
  ChevronDown,
  Lock,
  Plus,
  X,
  Pencil,
  Trash2,
  CheckCircle2,
  Calendar,
  Users,
  BookOpen,
  ClipboardList,
  AlertCircle,
} from "lucide-react";
import FadeInUp from "@/components/animations/FadeInUp";
import { StaggerChildren, StaggerItem } from "@/components/animations/StaggerChildren";
import { normalizeWeekLabel } from "@/lib/week-label";
import type { MeetingMinute, DiaryEntry } from "./page";

type ActiveTab = "minutes" | "diaries";
type AdminFormTab = "minutes" | "diary";
type Toast = { type: "success" | "error"; message: string } | null;

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-SG", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function AccordionMinute({
  minute,
  onEdit,
  onDelete,
}: {
  minute: MeetingMinute;
  onEdit: (minute: MeetingMinute) => void;
  onDelete: (minute: MeetingMinute) => void;
}) {
  const [open, setOpen] = useState(false);

  const detailSections = [
    {
      title: "Meeting Objectives",
      items: minute.meeting_objectives ?? [],
    },
    {
      title: "Agenda",
      items: minute.agenda ?? [],
    },
    {
      title: "Meeting Notes",
      body: minute.notes,
    },
    {
      title: "Key Decisions Made",
      items: minute.key_decisions ?? [],
    },
    {
      title: "Action Items",
      items: minute.action_items ?? [],
    },
  ];

  return (
    <motion.div
      className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm"
      whileHover={{ boxShadow: "0 8px 28px rgba(99,102,241,0.09)" }}
      transition={{ duration: 0.2 }}
    >
      <div className="flex items-center justify-between gap-4 px-6 py-5">
        <div className="flex flex-col gap-1.5">
          <div className="flex flex-wrap items-center gap-2">
            <span className="flex items-center gap-1 text-xs text-gray-400">
              <Calendar className="h-3 w-3" />
              {formatDate(minute.meeting_date)}
            </span>
            {minute.meeting_time && (
              <span className="rounded-full bg-indigo-100 px-3 py-0.5 text-xs font-semibold text-indigo-600">
                {minute.meeting_time}
              </span>
            )}
          </div>
          {minute.attendees?.length > 0 && (
            <p className="flex items-center gap-1.5 text-sm text-gray-600">
              <Users className="h-3.5 w-3.5 text-gray-400" />
              {minute.attendees.join(", ")}
            </p>
          )}
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => onEdit(minute)}
            className="rounded-full p-2 text-gray-400 transition hover:bg-indigo-50 hover:text-indigo-600"
            title="Edit meeting minutes"
            aria-label={`Edit ${minute.week_label} meeting minutes`}
          >
            <Pencil className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => onDelete(minute)}
            className="rounded-full p-2 text-gray-400 transition hover:bg-red-50 hover:text-red-500"
            title="Delete meeting minutes"
            aria-label={`Delete ${minute.week_label} meeting minutes`}
          >
            <Trash2 className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => setOpen(!open)}
            className="rounded-full p-1 text-gray-400 transition hover:bg-gray-50 hover:text-gray-600"
            aria-label={open ? "Collapse meeting minutes" : "Expand meeting minutes"}
          >
            <motion.div
              animate={{ rotate: open ? 180 : 0 }}
              transition={{ duration: 0.2 }}
              className="flex-shrink-0"
            >
              <ChevronDown className="h-5 w-5" />
            </motion.div>
          </button>
        </div>
      </div>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            style={{ overflow: "hidden" }}
          >
            <div className="space-y-4 border-t border-gray-100 px-6 py-5">
              {detailSections.map((section) => {
                if (section.items && section.items.length > 0) {
                  return (
                    <div key={section.title}>
                      <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-gray-400">
                        {section.title}
                      </h4>
                      <ul className="space-y-2">
                        {section.items.map((item, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                            <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-indigo-400" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  );
                }

                if (section.body) {
                  return (
                    <div key={section.title}>
                      <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-gray-400">
                        {section.title}
                      </h4>
                      <p className="whitespace-pre-line text-sm leading-relaxed text-gray-700">
                        {section.body}
                      </p>
                    </div>
                  );
                }

                return null;
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function DiaryCard({
  entry,
  onEdit,
  onDelete,
}: {
  entry: DiaryEntry;
  onEdit: (entry: DiaryEntry) => void;
  onDelete: (entry: DiaryEntry) => void;
}) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm"
      whileHover={{ boxShadow: "0 8px 28px rgba(99,102,241,0.09)" }}
      transition={{ duration: 0.2 }}
    >
      <div className="flex items-center justify-between gap-4 px-6 py-5">
        <div className="flex flex-col gap-0.5">
          <h4 className="text-sm font-semibold text-gray-800">{entry.title}</h4>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => onEdit(entry)}
            className="rounded-full p-2 text-gray-400 transition hover:bg-indigo-50 hover:text-indigo-600"
            title="Edit entry"
            aria-label={`Edit ${entry.title}`}
          >
            <Pencil className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => onDelete(entry)}
            className="rounded-full p-2 text-gray-400 transition hover:bg-red-50 hover:text-red-500"
            title="Delete entry"
            aria-label={`Delete ${entry.title}`}
          >
            <Trash2 className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => setOpen(!open)}
            className="rounded-full p-1 text-gray-400 transition hover:bg-gray-50 hover:text-gray-600"
            aria-label={open ? "Collapse diary entry" : "Expand diary entry"}
          >
            <motion.div
              animate={{ rotate: open ? 180 : 0 }}
              transition={{ duration: 0.2 }}
              className="flex-shrink-0"
            >
              <ChevronDown className="h-5 w-5" />
            </motion.div>
          </button>
        </div>
      </div>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            style={{ overflow: "hidden" }}
          >
            <div className="border-t border-gray-100 px-6 py-5">
              <p className="whitespace-pre-line text-sm leading-relaxed text-gray-700">
                {entry.body}
              </p>
              <p className="mt-3 text-xs text-gray-400">{formatDate(entry.created_at)}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function EmptyState({ icon: Icon, label }: { icon: React.ElementType; label: string }) {
  return (
    <div className="flex flex-col items-center gap-3 py-16 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-indigo-50">
        <Icon className="h-6 w-6 text-indigo-300" />
      </div>
      <p className="text-sm text-gray-400">{label}</p>
    </div>
  );
}

export default function UpdatesPageClient({
  meetingMinutes,
  diaryEntries,
}: {
  meetingMinutes: MeetingMinute[];
  diaryEntries: DiaryEntry[];
}) {
  const router = useRouter();

  const [activeTab, setActiveTab] = useState<ActiveTab>("minutes");
  const [showAdminModal, setShowAdminModal] = useState(false);
  const [adminUnlocked, setAdminUnlocked] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [adminFormTab, setAdminFormTab] = useState<AdminFormTab>("minutes");
  const [submitting, setSubmitting] = useState(false);
  const [toast, setToast] = useState<Toast>(null);

  // Meeting minutes form
  const [mmWeek, setMmWeek] = useState("");
  const [mmDate, setMmDate] = useState("");
  const [mmTime, setMmTime] = useState("");
  const [mmAttendees, setMmAttendees] = useState("");
  const [mmObjectives, setMmObjectives] = useState("");
  const [mmAgenda, setMmAgenda] = useState("");
  const [mmNotes, setMmNotes] = useState("");
  const [mmKeyDecisions, setMmKeyDecisions] = useState("");
  const [mmActions, setMmActions] = useState("");
  const [editingMinuteId, setEditingMinuteId] = useState<string | null>(null);

  // Diary entry form
  const [deWeek, setDeWeek] = useState("");
  const [deName, setDeName] = useState("");
  const [deBody, setDeBody] = useState("");
  const [editingDiaryId, setEditingDiaryId] = useState<string | null>(null);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 3500);
    return () => clearTimeout(t);
  }, [toast]);

  function resetDiaryForm() {
    setDeWeek("");
    setDeName("");
    setDeBody("");
    setEditingDiaryId(null);
  }

  function resetMinutesForm() {
    setMmWeek("");
    setMmDate("");
    setMmTime("");
    setMmAttendees("");
    setMmObjectives("");
    setMmAgenda("");
    setMmNotes("");
    setMmKeyDecisions("");
    setMmActions("");
    setEditingMinuteId(null);
  }

  function openEditDiaryModal(entry: DiaryEntry) {
    setEditingDiaryId(entry.id);
    setDeWeek(entry.week_label);
    setDeName(entry.title);
    setDeBody(entry.body);
    setAdminFormTab("diary");
    setShowAdminModal(true);
  }

  function openNewDiaryModal() {
    resetDiaryForm();
    setAdminFormTab("diary");
    setShowAdminModal(true);
  }

  function openEditMinuteModal(minute: MeetingMinute) {
    setEditingMinuteId(minute.id);
    setMmWeek(minute.week_label);
    setMmDate(minute.meeting_date);
    setMmTime(minute.meeting_time ?? "");
    setMmAttendees((minute.attendees ?? []).join(", "));
    setMmObjectives((minute.meeting_objectives ?? []).join("\n"));
    setMmAgenda((minute.agenda ?? []).join("\n"));
    setMmNotes(minute.notes);
    setMmKeyDecisions((minute.key_decisions ?? []).join("\n"));
    setMmActions((minute.action_items ?? []).join("\n"));
    setAdminFormTab("minutes");
    setShowAdminModal(true);
  }

  function openNewMinutesModal() {
    resetMinutesForm();
    setAdminFormTab("minutes");
    setShowAdminModal(true);
  }

  function closeAdminModal() {
    setShowAdminModal(false);
    setAdminUnlocked(false);
    setPasswordInput("");
    setPasswordError("");
    resetMinutesForm();
    resetDiaryForm();
  }

  function handlePasswordSubmit(e: FormEvent) {
    e.preventDefault();
    const correct = process.env.NEXT_PUBLIC_ADMIN_PASSWORD ?? "wiseworkout2025";
    if (passwordInput === correct) {
      setAdminUnlocked(true);
      setPasswordError("");
    } else {
      setPasswordError("Incorrect password. Try again.");
    }
  }

  async function handleMinutesSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    try {
      const isEditing = Boolean(editingMinuteId);
      const res = await fetch("/api/admin/meeting-minutes", {
        method: isEditing ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: editingMinuteId,
          password: process.env.NEXT_PUBLIC_ADMIN_PASSWORD ?? "wiseworkout2025",
          week_label: mmWeek,
          meeting_date: mmDate,
          meeting_time: mmTime,
          attendees: mmAttendees,
          meeting_objectives: mmObjectives,
          agenda: mmAgenda,
          notes: mmNotes,
          key_decisions: mmKeyDecisions,
          action_items: mmActions,
        }),
      });
      if (res.ok) {
        setToast({
          type: "success",
          message: isEditing ? "Meeting minutes updated!" : "Meeting minutes saved!",
        });
        closeAdminModal();
        router.refresh();
      } else {
        const d = (await res.json()) as { error?: string };
        setToast({ type: "error", message: d.error ?? "Failed to save." });
      }
    } catch {
      setToast({ type: "error", message: "Network error. Please try again." });
    } finally {
      setSubmitting(false);
    }
  }

  async function handleDeleteDiary(entry: DiaryEntry) {
    if (!window.confirm(`Delete ${entry.title}'s diary entry? This cannot be undone.`)) {
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/admin/diary-entry", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: entry.id,
          password: process.env.NEXT_PUBLIC_ADMIN_PASSWORD ?? "wiseworkout2025",
        }),
      });

      if (res.ok) {
        setToast({ type: "success", message: "Diary entry deleted." });
        router.refresh();
      } else {
        const d = (await res.json()) as { error?: string };
        setToast({ type: "error", message: d.error ?? "Failed to delete." });
      }
    } catch {
      setToast({ type: "error", message: "Network error. Please try again." });
    } finally {
      setSubmitting(false);
    }
  }

  async function handleDeleteMinute(minute: MeetingMinute) {
    if (!window.confirm(`Delete meeting minutes for ${minute.week_label} on ${formatDate(minute.meeting_date)}? This cannot be undone.`)) {
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/admin/meeting-minutes", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: minute.id,
          password: process.env.NEXT_PUBLIC_ADMIN_PASSWORD ?? "wiseworkout2025",
        }),
      });

      if (res.ok) {
        setToast({ type: "success", message: "Meeting minutes deleted." });
        router.refresh();
      } else {
        const d = (await res.json()) as { error?: string };
        setToast({ type: "error", message: d.error ?? "Failed to delete." });
      }
    } catch {
      setToast({ type: "error", message: "Network error. Please try again." });
    } finally {
      setSubmitting(false);
    }
  }

  async function handleDiarySubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    try {
      const isEditing = Boolean(editingDiaryId);
      const res = await fetch("/api/admin/diary-entry", {
        method: isEditing ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: editingDiaryId,
          password: process.env.NEXT_PUBLIC_ADMIN_PASSWORD ?? "wiseworkout2025",
          week_label: deWeek,
          name: deName,
          body: deBody,
        }),
      });
      if (res.ok) {
        setToast({
          type: "success",
          message: isEditing ? "Diary entry updated!" : "Diary entry saved!",
        });
        closeAdminModal();
        router.refresh();
      } else {
        const d = (await res.json()) as { error?: string };
        setToast({ type: "error", message: d.error ?? "Failed to save." });
      }
    } catch {
      setToast({ type: "error", message: "Network error. Please try again." });
    } finally {
      setSubmitting(false);
    }
  }

  // Group diary entries by week_label, newest weeks first
  const groupedDiaries = diaryEntries.reduce<Record<string, DiaryEntry[]>>((acc, entry) => {
    const normalizedWeek = normalizeWeekLabel(entry.week_label);
    if (!acc[normalizedWeek]) acc[normalizedWeek] = [];
    acc[normalizedWeek].push({
      ...entry,
      week_label: normalizedWeek,
    });
    return acc;
  }, {});
  const sortedWeeks = Object.keys(groupedDiaries).sort((a, b) => {
    const na = parseInt(a.replace(/\D/g, "")) || 0;
    const nb = parseInt(b.replace(/\D/g, "")) || 0;
    return nb - na;
  });

  const groupedMinutes = meetingMinutes.reduce<Record<string, MeetingMinute[]>>((acc, minute) => {
    const normalizedWeek = normalizeWeekLabel(minute.week_label);
    if (!acc[normalizedWeek]) acc[normalizedWeek] = [];
    acc[normalizedWeek].push({
      ...minute,
      week_label: normalizedWeek,
    });
    return acc;
  }, {});
  const sortedMinuteWeeks = Object.keys(groupedMinutes).sort((a, b) => {
    const na = parseInt(a.replace(/\D/g, "")) || 0;
    const nb = parseInt(b.replace(/\D/g, "")) || 0;
    return nb - na;
  });

  const inputCls =
    "w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-gray-800 placeholder-gray-400 focus:border-indigo-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-100 transition";
  const labelCls = "block text-xs font-semibold text-gray-600 mb-1";

  return (
    <div className="min-h-screen bg-[#F8F7FF]">
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="bg-indigo-50 py-20 pt-32">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <FadeInUp>
            <span className="inline-flex items-center rounded-full border border-indigo-200 bg-white px-4 py-1.5 text-xs font-semibold text-indigo-600">
              Project Updates
            </span>
          </FadeInUp>
          <FadeInUp delay={0.1}>
            <h1 className="mt-6 text-4xl font-extrabold text-[#1E1B4B] md:text-5xl">
              Weekly progress log
            </h1>
          </FadeInUp>
          <FadeInUp delay={0.2}>
            <p className="mt-5 text-lg leading-relaxed text-gray-600">
              Meeting minutes and individual reflective diaries, updated throughout the project.
            </p>
          </FadeInUp>
          <FadeInUp delay={0.3}>
            <p className="mt-4 text-sm font-medium text-indigo-400">
              FYP Group FYP26S215 · Singapore Institute of Management · AY 2025/2026
            </p>
          </FadeInUp>
        </div>
      </section>

      {/* ── Tab switcher ─────────────────────────────────────── */}
      <section className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-5xl px-6">
          <div className="flex gap-1">
            {(
              [
                { id: "minutes", label: "Meeting Minutes", icon: ClipboardList },
                { id: "diaries", label: "Diary Entries", icon: BookOpen },
              ] as const
            ).map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`relative flex items-center gap-2 px-5 py-4 text-sm font-semibold transition-colors ${
                  activeTab === id ? "text-indigo-600" : "text-gray-500 hover:text-gray-700"
                }`}
              >
                <Icon className="h-4 w-4" />
                {label}
                {activeTab === id && (
                  <motion.div
                    layoutId="tab-underline"
                    className="absolute bottom-0 left-0 right-0 h-0.5 rounded-t-full bg-indigo-600"
                  />
                )}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── Tab content ──────────────────────────────────────── */}
      <section className="py-14">
        <div className="mx-auto max-w-5xl px-6">
          <AnimatePresence mode="wait">
            {activeTab === "minutes" && (
              <motion.div
                key="minutes"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
              >
                {meetingMinutes.length === 0 ? (
                  <EmptyState
                    icon={ClipboardList}
                    label="No meeting minutes yet. Check back after the next team meeting."
                  />
                ) : (
                  <div className="space-y-10">
                    {sortedMinuteWeeks.map((week) => (
                      <div key={week}>
                        <h2 className="mb-4 flex items-center gap-2 text-sm font-semibold text-indigo-500 uppercase tracking-wider">
                          <span className="h-px flex-1 bg-indigo-100" />
                          {week}
                          <span className="h-px flex-1 bg-indigo-100" />
                        </h2>
                        <StaggerChildren className="flex flex-col gap-4">
                          {groupedMinutes[week].map((m) => (
                            <StaggerItem key={m.id}>
                              <AccordionMinute
                                minute={m}
                                onEdit={openEditMinuteModal}
                                onDelete={handleDeleteMinute}
                              />
                            </StaggerItem>
                          ))}
                        </StaggerChildren>
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            )}

            {activeTab === "diaries" && (
              <motion.div
                key="diaries"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
              >
                {sortedWeeks.length === 0 ? (
                  <EmptyState
                    icon={BookOpen}
                    label="No diary entries yet. Team members will post reflections weekly."
                  />
                ) : (
                  <div className="space-y-10">
                    {sortedWeeks.map((week) => (
                      <div key={week}>
                        <h2 className="mb-4 flex items-center gap-2 text-sm font-semibold text-indigo-500 uppercase tracking-wider">
                          <span className="h-px flex-1 bg-indigo-100" />
                          {week}
                          <span className="h-px flex-1 bg-indigo-100" />
                        </h2>
                        <StaggerChildren className="flex flex-col gap-4">
                          {groupedDiaries[week].map((entry) => (
                            <StaggerItem key={entry.id}>
                              <DiaryCard
                                entry={entry}
                                onEdit={openEditDiaryModal}
                                onDelete={handleDeleteDiary}
                              />
                            </StaggerItem>
                          ))}
                        </StaggerChildren>
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* ── Floating admin button ─────────────────────────────── */}
      <motion.button
        onClick={() => {
          if (activeTab === "diaries") {
            openNewDiaryModal();
            return;
          }
          openNewMinutesModal();
        }}
        className="fixed bottom-8 right-8 flex h-14 w-14 items-center justify-center rounded-full bg-indigo-600 text-white shadow-lg shadow-indigo-500/30 hover:bg-indigo-700"
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        title="Admin"
      >
        <Plus className="h-6 w-6" />
      </motion.button>

      {/* ── Admin modal ──────────────────────────────────────── */}
      <AnimatePresence>
        {showAdminModal && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeAdminModal}
            />

            {/* Panel */}
            <motion.div
              key="panel"
              className="fixed inset-x-4 bottom-4 top-4 z-50 mx-auto flex max-w-lg flex-col overflow-hidden rounded-2xl bg-white shadow-2xl sm:inset-x-auto sm:left-1/2 sm:w-full sm:-translate-x-1/2"
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Modal header */}
              <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
                <div className="flex items-center gap-2">
                  <Lock className="h-4 w-4 text-indigo-500" />
                  <span className="text-sm font-semibold text-gray-800">Admin Access</span>
                </div>
                <button
                  onClick={closeAdminModal}
                  className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto px-6 py-6">
                {!adminUnlocked ? (
                  /* Password gate */
                  <form onSubmit={handlePasswordSubmit} className="flex flex-col gap-4">
                    <div className="flex flex-col items-center gap-3 pb-2 text-center">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-indigo-50">
                        <Lock className="h-5 w-5 text-indigo-500" />
                      </div>
                      <p className="text-sm text-gray-500">
                        Enter the admin password to add or update entries.
                      </p>
                    </div>
                    <div>
                      <label className={labelCls} htmlFor="admin-pw">
                        Password
                      </label>
                      <input
                        id="admin-pw"
                        type="password"
                        value={passwordInput}
                        onChange={(e) => setPasswordInput(e.target.value)}
                        placeholder="Admin password"
                        required
                        autoFocus
                        className={inputCls}
                      />
                      {passwordError && (
                        <p className="mt-1.5 flex items-center gap-1 text-xs text-red-500">
                          <AlertCircle className="h-3.5 w-3.5" />
                          {passwordError}
                        </p>
                      )}
                    </div>
                    <motion.button
                      type="submit"
                      className="rounded-full bg-indigo-600 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700 disabled:opacity-60"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Unlock
                    </motion.button>
                  </form>
                ) : (
                  /* Admin forms */
                  <div className="flex flex-col gap-5">
                    {/* Form tab switcher */}
                    <div className="flex rounded-xl bg-gray-100 p-1">
                      {(
                        [
                          { id: "minutes", label: "Meeting Minutes" },
                          { id: "diary", label: "Diary Entry" },
                        ] as const
                      ).map(({ id, label }) => (
                        <button
                          key={id}
                          onClick={() => setAdminFormTab(id)}
                          className={`flex-1 rounded-lg py-2 text-xs font-semibold transition-all ${
                            adminFormTab === id
                              ? "bg-white text-indigo-600 shadow-sm"
                              : "text-gray-500 hover:text-gray-700"
                          }`}
                        >
                          {label}
                        </button>
                      ))}
                    </div>

                    <AnimatePresence mode="wait">
                      {adminFormTab === "minutes" ? (
                        <motion.form
                          key="mm-form"
                          onSubmit={handleMinutesSubmit}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 10 }}
                          transition={{ duration: 0.2 }}
                          className="flex flex-col gap-4"
                        >
                          <div className="rounded-xl border border-indigo-100 bg-indigo-50/60 px-4 py-3 text-xs leading-6 text-indigo-700">
                            {editingMinuteId
                              ? "You are editing an existing set of meeting minutes. Update the fields below and save your changes."
                              : "Create a new set of meeting minutes for the selected week."}
                          </div>
                          <div className="grid grid-cols-2 gap-3">
                            <div>
                              <label className={labelCls}>Week label</label>
                              <input
                                value={mmWeek}
                                onChange={(e) => setMmWeek(e.target.value)}
                                placeholder="e.g. Week 3"
                                required
                                className={inputCls}
                              />
                            </div>
                            <div>
                              <label className={labelCls}>Meeting date</label>
                              <input
                                type="date"
                                value={mmDate}
                                onChange={(e) => setMmDate(e.target.value)}
                                required
                                className={inputCls}
                              />
                            </div>
                          </div>
                          <div>
                            <label className={labelCls}>Meeting time</label>
                            <input
                              value={mmTime}
                              onChange={(e) => setMmTime(e.target.value)}
                              placeholder="e.g. 2:00 PM - 2:45 PM"
                              className={inputCls}
                            />
                          </div>
                          <div>
                            <label className={labelCls}>
                              Attendees{" "}
                              <span className="font-normal text-gray-400">(comma-separated)</span>
                            </label>
                            <input
                              value={mmAttendees}
                              onChange={(e) => setMmAttendees(e.target.value)}
                              placeholder="Alice, Bob, Carol"
                              className={inputCls}
                            />
                          </div>
                          <div>
                            <label className={labelCls}>
                              Meeting objectives{" "}
                              <span className="font-normal text-gray-400">(one per line)</span>
                            </label>
                            <textarea
                              value={mmObjectives}
                              onChange={(e) => setMmObjectives(e.target.value)}
                              placeholder={"Confirm weekly priorities\nReview outstanding blockers"}
                              rows={3}
                              className={`${inputCls} resize-none`}
                            />
                          </div>
                          <div>
                            <label className={labelCls}>
                              Agenda{" "}
                              <span className="font-normal text-gray-400">(one per line)</span>
                            </label>
                            <textarea
                              value={mmAgenda}
                              onChange={(e) => setMmAgenda(e.target.value)}
                              placeholder={"Project status updates\nFeature discussion\nNext-step alignment"}
                              rows={3}
                              className={`${inputCls} resize-none`}
                            />
                          </div>
                          <div>
                            <label className={labelCls}>Meeting notes</label>
                            <textarea
                              value={mmNotes}
                              onChange={(e) => setMmNotes(e.target.value)}
                              placeholder="Discussed sprint goals, assigned tasks..."
                              required
                              rows={5}
                              className={`${inputCls} resize-none`}
                            />
                          </div>
                          <div>
                            <label className={labelCls}>
                              Key decisions made{" "}
                              <span className="font-normal text-gray-400">(one per line)</span>
                            </label>
                            <textarea
                              value={mmKeyDecisions}
                              onChange={(e) => setMmKeyDecisions(e.target.value)}
                              placeholder={"Use Supabase for content storage\nKeep diary editing inside the website"}
                              rows={3}
                              className={`${inputCls} resize-none`}
                            />
                          </div>
                          <div>
                            <label className={labelCls}>
                              Action items{" "}
                              <span className="font-normal text-gray-400">(one per line)</span>
                            </label>
                            <textarea
                              value={mmActions}
                              onChange={(e) => setMmActions(e.target.value)}
                              placeholder={"Complete login screen\nSet up Supabase tables"}
                              rows={3}
                              className={`${inputCls} resize-none`}
                            />
                          </div>
                          <motion.button
                            type="submit"
                            disabled={submitting}
                            className="rounded-full bg-indigo-600 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700 disabled:opacity-60"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            {submitting
                              ? editingMinuteId
                                ? "Saving changes…"
                                : "Saving…"
                              : editingMinuteId
                                ? "Save Changes"
                                : "Save Meeting Minutes"}
                          </motion.button>
                        </motion.form>
                      ) : (
                        <motion.form
                          key="diary-form"
                          onSubmit={handleDiarySubmit}
                          initial={{ opacity: 0, x: 10 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -10 }}
                          transition={{ duration: 0.2 }}
                          className="flex flex-col gap-4"
                        >
                          <div className="rounded-xl border border-indigo-100 bg-indigo-50/60 px-4 py-3 text-xs leading-6 text-indigo-700">
                            {editingDiaryId
                              ? "You are editing an existing diary entry. Update the fields below and save your changes."
                              : "Create a new diary entry for the selected week and team member."}
                          </div>
                          <div className="grid grid-cols-2 gap-3">
                            <div>
                              <label className={labelCls}>Week label</label>
                              <input
                                value={deWeek}
                                onChange={(e) => setDeWeek(e.target.value)}
                                placeholder="e.g. Week 3"
                                required
                                className={inputCls}
                              />
                            </div>
                            <div>
                              <label className={labelCls}>Name</label>
                              <input
                                value={deName}
                                onChange={(e) => setDeName(e.target.value)}
                                placeholder="Name"
                                required
                                className={inputCls}
                              />
                            </div>
                          </div>
                          <div>
                            <label className={labelCls}>Diary Entry</label>
                            <textarea
                              value={deBody}
                              onChange={(e) => setDeBody(e.target.value)}
                              placeholder={`a) Describe the tasks you are currently working on
b) Update the completion status for each task
c) Describe any obstacles encountered that causes delay
d) Describe the work-around solution to avoid or mitigate the impact of the risks or obstacles encountered`}
                              required
                              rows={9}
                              className={`${inputCls} resize-none`}
                            />
                          </div>
                          <motion.button
                            type="submit"
                            disabled={submitting}
                            className="rounded-full bg-indigo-600 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700 disabled:opacity-60"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            {submitting
                              ? editingDiaryId
                                ? "Saving changes…"
                                : "Saving…"
                              : editingDiaryId
                                ? "Save Changes"
                                : "Save Diary Entry"}
                          </motion.button>
                        </motion.form>
                      )}
                    </AnimatePresence>
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ── Toast ─────────────────────────────────────────────── */}
      <AnimatePresence>
        {toast && (
          <motion.div
            key="toast"
            className={`fixed bottom-28 right-8 z-50 flex items-center gap-2 rounded-full px-5 py-3 text-sm font-medium text-white shadow-lg ${
              toast.type === "success" ? "bg-emerald-500" : "bg-red-500"
            }`}
            initial={{ opacity: 0, y: 16, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.95 }}
            transition={{ duration: 0.25 }}
          >
            {toast.type === "success" ? (
              <CheckCircle2 className="h-4 w-4" />
            ) : (
              <AlertCircle className="h-4 w-4" />
            )}
            {toast.message}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
