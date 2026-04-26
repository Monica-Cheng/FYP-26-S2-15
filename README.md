# FYP-26-S2-15

Setup-only Next.js + Supabase foundation for the project website.

## Included in this pass

- Next.js App Router scaffold at repo root
- TypeScript, Tailwind CSS, and ESLint
- Minimal Supabase packages and helper files
- Environment templates for Supabase keys
- Initial SQL schema for project content tables

## Not included yet

- Website route structure beyond the default Next.js scaffold
- Team, updates, about, or admin pages
- UI components, animations, or content sections
- Project-specific Claude instructions

## Environment setup

Create or update `.env.local` with your real values:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
```

## Supabase helper files

- [client.ts](/Users/monicacheng/FYP-26-S2-15/src/lib/supabase/client.ts): browser-safe client
- [server.ts](/Users/monicacheng/FYP-26-S2-15/src/lib/supabase/server.ts): server-side client for App Router
- [admin.ts](/Users/monicacheng/FYP-26-S2-15/src/lib/supabase/admin.ts): server-only privileged client

Do not import `admin.ts` into client components.

## Database setup

Run [schema.sql](/Users/monicacheng/FYP-26-S2-15/supabase/schema.sql) in the Supabase SQL editor.

It creates:

- `team_members`
- `weekly_updates`
- `meeting_minutes`

## Local commands

```bash
npm install
npm run dev
npm run lint
npm run build
```
