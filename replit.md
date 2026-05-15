# Forecity Construction Phase

Monorepo for the FCC Fore-City Construction project — a real estate and construction company website with an API backend.

## Run & Operate

- `npm run dev --workspace=@workspace/api-server` — run the API server (port 5000)
- `npm run typecheck` — full typecheck across all packages
- `npm run build` — typecheck + build all packages
- `npm run codegen --workspace=@workspace/api-spec` — regenerate API hooks and Zod schemas from the OpenAPI spec
- `npm run push --workspace=@workspace/db` — push DB schema changes (dev only)
- Required env: `DATABASE_URL` — Postgres connection string

## Stack

- npm workspaces, Node.js 24, TypeScript 5.9
- API: Express 5
- DB: PostgreSQL + Drizzle ORM
- Validation: Zod
- API codegen: Orval (from OpenAPI spec)
- Build: esbuild (CJS bundle)
- Frontend: Vite + React 19 + Tailwind v4 + shadcn/ui
- State: TanStack React Query
- Animation: Framer Motion

## Where things live

| Directory | Package | Purpose |
|-----------|---------|---------|
| `fcc-website/` | `@workspace/fcc-website` | Main company website (Vite + React) |
| `mockup-sandbox/` | `@workspace/mockup-sandbox` | UI component preview/sandbox |
| `api-server/` | `@workspace/api-server` | Express 5 API server |
| `lib/db/` | `@workspace/db` | Drizzle ORM schema & DB client |
| `lib/api-client-react/` | `@workspace/api-client-react` | Generated React API hooks |
| `lib/api-zod/` | `@workspace/api-zod` | Generated Zod validation schemas |
| `lib/api-spec/` | `@workspace/api-spec` | OpenAPI spec + Orval codegen config |
| `scripts/` | `@workspace/scripts` | Utility scripts |

## Architecture decisions

- pnpm was replaced with npm workspaces for broader compatibility
- All packages use TypeScript project references for type checking
- DB schema is the single source of truth — Drizzle ORM generates types
- API contracts defined in OpenAPI 3.0 → code-generated Zod schemas + React Query hooks via Orval

## Product

Company website and public API for FCC Fore-City Construction, featuring:
- Property listings and project showcases
- Company services, about, and contact pages
- Construction cost calculator
- Multi-language support (English/Amharic)
- Dark/light theme

## Pointers

- Root `tsconfig.json` has project references to all `lib/*` packages
- Each workspace package has its own `tsconfig.json` extending `tsconfig.base.json`
