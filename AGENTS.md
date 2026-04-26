# WiseWorkout Project Website — AGENTS.md

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.

<!-- END:nextjs-agent-rules -->

## Project Info

- FYP Group: FYP26S215
- School: Singapore Institute of Management (SIM)
- Course: CSIT321
- Academic Year: 2025/2026
- App name: WiseWorkout
- Tagline: Train smarter. Level up.

## Project Overview

This is the official FYP project website for **WiseWorkout** (FYP Group: FYP26S215).
WiseWorkout is an AI-powered fitness mobile app that helps users train smarter using
personalised workout plans, AI coaching (WiseCoach), gamification (XP, badges, streaks,
leaderboards), and progress tracking.

The website serves THREE purposes per teacher requirements:

1. **Marketing** — promote the app, showcase USP, features, competitive advantage
2. **Administrative** — host weekly meeting minutes + individual reflective diaries (updated weekly)
3. **Introduction** — team members, roles, project objectives

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS + Framer Motion (animations)
- **Backend/DB**: Supabase (PostgreSQL)
- **Language**: TypeScript
- **Icons**: Lucide React
- **Hosting target**: Vercel

## Design System — CRITICAL, follow exactly

The visual identity MUST match the WiseWorkout mobile app:

### Colors

- **Primary**: Indigo/Purple `#6366F1` (buttons, accents, highlights)
- **Primary Dark**: `#4F46E5`
- **Background**: Very light gray-lavender `#F8F7FF` or white
- **Card background**: `#FFFFFF` with subtle box-shadow
- **Text primary**: `#1E1B4B` (deep indigo-black)
- **Text secondary**: `#6B7280`
- **Accent teal**: `#2DD4BF` (for streaks, cardio elements)
- **Accent amber**: `#F59E0B` (for badges, gold)
- **Success green**: `#10B981`

### Typography

- Font: Inter (Google Fonts)
- Headings: Bold, deep indigo, large
- Body: Regular, gray-600

### UI Style

- Soft, clean, iOS-inspired
- Cards with `rounded-2xl`, subtle `shadow-sm` to `shadow-md`
- Frosted glass effects where appropriate
- Pill-shaped buttons with `rounded-full`
- Gradient backgrounds: `from-indigo-600 to-purple-600`
- Everything feels "premium fitness app" not generic corporate

### Animations & Interactions (REQUIRED — use Framer Motion)

- Scroll-triggered fade-in + slide-up for every section
- Hover: cards lift with `scale(1.02)` + shadow deepening
- Buttons: subtle scale + color shift on hover
- Number counters animate up when scrolled into view
- Staggered list animations (children animate in sequence)
- Hero: floating phone mockup with gentle y-axis oscillation
- Navigation: blur backdrop, transparent → solid on scroll
- Page transitions between routes
- Smooth parallax on hero background

## Website Pages & Sections

### `/` — Home (Landing/Marketing)

- **Navbar**: Logo + nav links + "Get the App" CTA button (sticky, blur on scroll)
- **Hero**: Bold headline, subheading, CTA buttons, animated phone mockup showing app screens
- **Stats bar**: "47 Sessions tracked · 38.2km covered · 7-day streaks" style animated counters
- **Features**: 4 key features with icons — AI Coach (WiseCoach), Smart Workout Plans, Gamification (XP/Badges), Progress Analytics
- **How it works**: 3-step visual flow
- **Competitor comparison**: Visual table showing WiseWorkout vs MyFitnessPal vs Hevy vs Strong
- **App screenshots**: Scrollable carousel of actual app screens
- **Testimonials/USP callout**
- **Download CTA**: "Coming soon" with email waitlist signup (saves to Supabase)
- **Footer**

### `/team` — Team Page

- Grid of team member cards with: photo placeholder, name, role/responsibilities, fun fact
- Animated on scroll

### `/updates` — Project Updates (Admin section)

- **Meeting Minutes tab**: Chronological list of weekly meeting logs, newest first
- **Reflective Diaries tab**: Per-member weekly diary entries
- **Gantt/Schedule tab**: Link or embedded project timeline
- Admin can add new entries via a password-protected form (simple password, not full auth)
- All data stored in Supabase

### `/about` — About the Project

- Project objectives, problem statement, scope
- Development methodology (Agile)
- Tech stack visual

## Supabase Tables

-- Team members
create table team_members (
id uuid default gen_random_uuid() primary key,
name text not null,
role text not null,
bio text,
image_url text,
display_order int default 0
);

-- Weekly updates / reflective diaries
create table weekly_updates (
id uuid default gen_random_uuid() primary key,
week_label text not null, -- e.g. "Week 3"
title text not null,
summary text,
body text not null,
created_at timestamp default now()
);

-- Meeting minutes
create table meeting_minutes (
id uuid default gen_random_uuid() primary key,
week_label text not null,
meeting_date date not null,
attendees text[],
notes text not null,
action_items text[],
created_at timestamp default now()
);

-- Waitlist signups
create table waitlist (
id uuid default gen_random_uuid() primary key,
email text unique not null,
created_at timestamp default now()
);

## File Structure

src/
app/
page.tsx
about/page.tsx
team/page.tsx
updates/page.tsx
admin/page.tsx
layout.tsx
globals.css
components/
ui/
layout/
sections/
animations/
lib/
supabase/
client.ts ← browser/client components
server.ts ← server components (anon)
admin.ts ← server-only, uses SERVICE_ROLE_KEY, never in client
utils.ts
content/
site-config.ts ← static marketing copy, nav links, constants (not in DB)
types/
index.ts ← keep small; split into team.ts / updates.ts if grows

## Supabase Access Rules (IMPORTANT)

- Public pages → read using anon client (client.ts or server.ts)
- Admin create/update → server-side ONLY via admin.ts (SERVICE_ROLE_KEY)
- NEVER import admin.ts into any client component
- SUPABASE_SERVICE_ROLE_KEY must never appear in any "use client" file
- No public write access to any table

## Static Content (content/site-config.ts)

Marketing copy, nav links, feature descriptions, team page static labels —
anything that does NOT need to come from the database goes in site-config.ts.
This keeps DB queries minimal and makes copy edits easy without touching components.
Examples: site name, tagline, nav items, features list, stats bar numbers.

TYPOGRAPHY CONSISTENCY (VERY IMPORTANT):

Ensure the entire section follows consistent typography rules:

- Same font family as rest of site
- Clear hierarchy:
  - Problem text → slightly bold or medium weight
  - Value text → normal weight but clearer tone
- Consistent font sizes across items
- Consistent spacing between rows and columns
- Avoid mixing too many styles (no random bold/regular inconsistencies)

DO NOT introduce new font styles.
