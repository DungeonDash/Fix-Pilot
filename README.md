# Field Service Copilot

Multi-tenant Field Service Management platform powered by AI.

## Tech Stack

- Next.js
- Express
- MongoDB
- Clerk
- Tailwind CSS
- shadcn/ui
- TanStack Query

## Quick start

1. Copy `.env.example` to `.env` (set real secrets):

```bash
cp .env.example .env
```

2. Install dependencies (pnpm recommended):

```bash
pnpm install
```

3. Start both apps in development:

```bash
pnpm dev
```

4. Typecheck across the monorepo:

```bash
pnpm typecheck
```

5. Run lint or format:

```bash
pnpm lint
pnpm format
```

Notes:
- The frontend runs from `apps/web` and the API runs from `apps/api`.
- See `BUILD_PLAN.md` for the prioritized roadmap.