# AGENTS.md

## Project overview

PersistDev.Blog is a personal programming blog built with Next.js App Router, React, TypeScript, MDX, Tailwind CSS, Prisma/PostgreSQL, and SendGrid. Blog posts live in `content/<slug>/index.mdx`; the application reads and enriches them at runtime through `src/content/generated.ts`.

## Repository map

- `src/app/` — App Router pages, layouts, route handlers, and global styles.
- `src/components/` — reusable UI components, grouped by feature.
- `src/Hooks/` — client-side custom React hooks.
- `src/utils/`, `src/schemas/`, `src/types/`, and `src/constants/` — shared utilities, validation, types, and constants.
- `content/` — MDX blog posts and their front matter.
- `public/` — static assets; post images are normally stored in `public/posts/`.
- `prisma/schema.prisma` — database schema; `generated/prisma/` is generated client code and must not be edited manually.
- `__tests__/` — Jest component tests.

Use the `@/` alias for imports rooted at the repository root, following the existing codebase convention (for example, `@/src/components/...`).

## Setup and commands

Use npm and commit `package-lock.json` when dependencies change.

```bash
npm install                 # installs dependencies and runs prisma generate
npm run dev                 # starts the local Next.js development server
npm run lint                # runs ESLint, including Next.js Core Web Vitals rules
npm test                    # runs the Jest suite once
npm run test:watch          # runs Jest in watch mode
npx tsc --noEmit            # checks TypeScript without emitting files
npm run build               # production build; also generates the sitemap
npm run start               # serves an existing production build
```

For database changes, update `prisma/schema.prisma`, run the appropriate Prisma migration command, and regenerate the client with `npx prisma generate`. Never hand-edit `generated/prisma/`.

## Environment and security

Keep secrets only in local environment files; never commit values from `.env` or `.env.local`, and never print them in logs or documentation. Current server-side integrations require configuration such as:

- `DATABASE_URL` and `DIRECT_URL` for Prisma/PostgreSQL.
- `SENDGRID_API_KEY` and `SENDGRID_VERIFIED_SENDER` for subscriptions.
- `NEXT_PUBLIC_SITE_URL` for public site metadata.
- `VIEWS_PERSISTENCE_ENABLED=false` to intentionally use the views API fallback.

Validate request data at route boundaries with Zod. Treat database and email operations as server-only. Do not expose private environment variables in client components or use the `NEXT_PUBLIC_` prefix for secrets.

## Code and React conventions

- Prefer small, focused components and functions with a single clear responsibility. Reuse existing components, hooks, utilities, schemas, and constants before adding new abstractions.
- Use TypeScript types for component props, API payloads, and non-trivial return values. Avoid `any`, unsafe assertions, and duplicated types.
- Default to Server Components. Add `"use client"` only when a component needs browser APIs, state, effects, or event handlers; keep the client boundary as low in the tree as practical.
- Use Next.js primitives and conventions: App Router route files, `next/image` for images, `next/link` for internal navigation, `next/navigation` helpers, and `Metadata`/`generateMetadata` for page metadata.
- Keep API handlers explicit about validation, success status, and failure behaviour. Return safe error messages; never leak implementation details or secrets.
- Preserve accessibility: semantic HTML, useful image `alt` text, labels for form controls, keyboard-operable interactions, and clear focus states.
- Use Tailwind utility classes consistent with nearby components. Avoid inline styles and avoid introducing a styling library unless the task requires it.
- Do not refactor unrelated code, rename public routes, or change content URLs as part of a focused change.

### JSDoc

Write short, meaningful JSDoc for exported functions, custom hooks, non-obvious utilities, and code with important side effects or constraints. Explain intent, inputs/outputs when helpful, and noteworthy assumptions—not syntax already conveyed by TypeScript. Keep comments current; remove comments that no longer describe the code.

## Content workflow

Each post is `content/<slug>/index.mdx` with front matter. Maintain the existing fields: `title`, `description`, `image` (when used), `publishedAt`, `updatedAt`, `author`, `isPublished`, and `tags`.

- Use ISO dates (`YYYY-MM-DD`). Update `updatedAt` when materially revising a published post.
- Reference post images with a path that resolves to `public/`; add the asset under `public/posts/` when appropriate.
- Keep slugs stable because they define `/post/<slug>` URLs. If a slug must change, add a redirect in `next.config.js`.
- Ensure MDX code examples are valid, headings are meaningful, and front matter accurately represents the post.

## Tests and verification

Add or update Jest tests in `__tests__/` for changed user-visible component behavior, hooks, utilities, and route logic when practical. Follow the existing Testing Library style and test behavior rather than implementation details.

Before handing off a change, run the narrowest relevant checks, then run `npm run lint`, `npx tsc --noEmit`, and relevant Jest tests. Run `npm run build` for routing, content-pipeline, configuration, Prisma, or production-impacting changes. State any check that could not run and why.

## Documentation is part of every change

Update documentation in the same change whenever code affects setup, commands, environment variables, architecture, public behavior, routes, content authoring, dependencies, deployment, or contributor workflow.

- Update `README.md` for user- and contributor-facing changes.
- Update this file when agent workflow or repository conventions change.
- Add focused documentation near the relevant feature when the change cannot be explained clearly in the README.
- Document every new, renamed, or removed environment variable without including its value.

Do not claim documentation is current unless it was checked against the implemented change.
