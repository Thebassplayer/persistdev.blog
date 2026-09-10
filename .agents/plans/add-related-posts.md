# Implementation Plan: Add Related Posts

## Goal

Add a server-rendered Related Posts section to every published post page. It should offer up to three relevant, published posts selected automatically from the existing tag taxonomy.

## Context / Current Behavior

MDX posts are read at runtime by `src/content/generated.ts` and exposed as `Post` objects with title, publication state, publication date, URL, image, and optional tags. `getAllPosts()` returns the full content collection and `getPostBySlug()` resolves an individual post.

`src/app/post/[slug]/page.tsx` is an async Server Component that renders the post header, metadata, `PostDetails`, table of contents, and MDX body. It currently has no post-recommendation behavior.

The existing `src/utils/Post.ts` provides date-based sorting, while `PostLayoutThree` is the compact responsive post-card presentation used on the category and home pages. Cards currently display their content only when the post has a first tag, even though the image/link is rendered independently.

The repository-wide workflow refers to `docs/okf/`, but the checked-out OKF directory is `doc/okf/` and contains no knowledge files. There is therefore no relevant durable OKF document to validate or update for this feature.

## Confirmed Requirements

- Add a Related Posts section to individual post pages.
- Consider another post related when it shares at least one tag with the current post.
- Show no more than three related posts.
- Rank candidates by number of shared tags, then by newest publication date.
- Exclude the current post, unpublished posts, and posts with future publication dates.
- Omit the section entirely if no eligible related posts exist.

## Non-Goals

- No author-managed related-post lists or additional MDX front-matter fields.
- No database schema, API route, client-side fetching, or persistence changes.
- No semantic-content search or recommendations based on MDX body text.
- No redesign of existing homepage or category listings.
- No change to post URLs, metadata, or sitemap behavior.

## Resolved Decisions

- **Use shared tags as the relevance signal.** Tags are the established content taxonomy already exposed on every `Post`; this avoids adding a second categorization system.
- **Rank by shared-tag count, then recency.** More direct topical overlap wins; `publishedAt` descending makes equally related choices timely and deterministic.
- **Use a maximum of three cards.** This is enough discovery value without making the article page visually compete with its body.
- **Server-render the section.** The page already loads content on the server, so candidate selection can reuse `getAllPosts()` without client JavaScript or a network boundary.
- **Hide rather than render an empty state.** A post with no matching eligible candidates should retain its current article-page flow with no empty recommendation affordance.
- **Reuse the existing compact post-card component where it satisfies the section.** Do not create a near-duplicate card solely for this placement; adjust the shared card only if its current tag-dependent text rendering prevents valid related candidates from being useful.

## Relevant Files

### Expected modifications

- `src/utils/Post.ts` — add a focused, exported server-safe selector for eligible related posts, alongside the existing post-list utilities.
- `src/app/post/[slug]/page.tsx` — load the post collection, derive related posts for the resolved post, and place the section after the article content.
- `__tests__/utils/Post.test.ts` (new) — test the deterministic selection rules, including exclusions and ranking.

### Possible modifications

- `src/components/Post/PostLayoutThree.tsx` — only if needed to ensure a related post with no tags still exposes its title/date/link as a useful card.
- `__tests__/components/Post/PostLayoutThree.test.tsx` (new or existing equivalent) — add coverage if the shared card’s missing-tag behavior changes.
- `__tests__/app/post/[slug]/page.test.tsx` (new) — add page-level rendering coverage if the project’s Next App Router test setup can mock the route dependencies cleanly.

### New files

- `src/components/Post/RelatedPosts.tsx` — a small Server Component that owns the section markup, heading, responsive card grid, and empty-result omission. Create it if keeping that markup in the route would make the page less focused.

## Implementation Steps

### Step 1: Add deterministic related-post selection

**Files / areas**

`src/utils/Post.ts`

**Change**

Add an exported utility that receives the current `Post`, the complete `Post[]` collection, and optionally a limit (defaulting to three). It must:

- return an empty array immediately when the current post has no tags;
- normalize comparisons through the same `github-slugger` `slug` behavior used by category routing, so tags differing only by case or slug formatting are treated consistently;
- remove the current post using its stable `_id` or canonical `url`/flattened slug;
- retain only published posts whose `publishedAt` is not later than the evaluation time;
- retain candidates with one or more shared normalized tags;
- sort candidates by descending count of distinct shared tags, then by descending `publishedAt` timestamp;
- return at most the requested limit without mutating the supplied collection.

Use explicit types and concise JSDoc for the exported selector. Keep date filtering aligned with the existing `sortPosts` behavior and evaluate the current time once per call so candidates are assessed consistently.

**Why**

Centralizing selection prevents the route from owning business rules and makes ranking and eligibility directly testable.

**Expected result**

The application has one reusable, pure content-selection boundary that produces an ordered list of eligible related posts.

### Step 2: Render the Related Posts section on individual post pages

**Files / areas**

`src/app/post/[slug]/page.tsx`; `src/components/Post/RelatedPosts.tsx` if extracted; `src/components/Post/PostLayoutThree.tsx` only if the card requires a targeted robustness fix.

**Change**

In the post route, retrieve the full collection with the already-cached `getAllPosts()` after a valid post is resolved, derive the recommendations via the new utility, and render the related-posts component after the article’s primary content grid.

Give the section semantic structure: a `<section>` with an accessible heading such as “Related Posts,” and wrap each reusable card in an `<article>` with a stable `_id` key. Match the responsive spacing and grid conventions used by `RecentPosts` and the category listing; retain the current light/dark Tailwind styling vocabulary.

The related-posts component must return `null` when given no posts. Keep it server-only: no `"use client"`, effects, or request route is needed.

If `PostLayoutThree` currently suppresses its title/date solely because `tags` is missing or empty, refactor that narrow conditional so the linked post information remains visible for every valid `Post`, while rendering tag text only when a first tag exists. Preserve its existing image behavior and styling.

**Why**

The page stays responsible for content retrieval while the reusable section owns presentation. Reusing an established card preserves visual consistency and reduces maintenance.

**Expected result**

Eligible post pages display a compact, accessible related-post grid below the article. Posts without a tag match display no section and do not fetch recommendations in the browser.

### Step 3: Add focused automated coverage

**Files / areas**

`__tests__/utils/Post.test.ts`; conditional card/route test files from Relevant Files.

**Change**

Create utility tests using complete `Post` fixtures to verify:

- candidates sharing tags are selected and limited to three;
- a candidate with more shared tags ranks ahead of a newer candidate with fewer;
- equal-overlap candidates are ordered newest first;
- the current post, unpublished posts, future posts, and zero-overlap posts are excluded;
- source arrays remain unchanged;
- a post with no tags produces no recommendations.

If Step 2 changes `PostLayoutThree`, test that a tagless post still presents its title, date, and post link while no tag label is displayed. If route rendering tests are practical in the existing Jest configuration, test that the section appears for non-empty recommendations and is absent for an empty list; otherwise, cover that conditional directly in the extracted section component.

**Why**

The selection criteria are the feature’s core behavior and need regression protection independent of layout details.

**Expected result**

The ranking, eligibility, empty-state behavior, and any changed card behavior are verified by Jest.

## Tests & Verification

- Run the new related-post selection test file and any new section/card test files with `npm test -- --runInBand <test path>` (or the repository’s equivalent targeted Jest invocation).
- Confirm manually with a post having several tag overlaps that the three expected cards appear below the MDX content, are ordered by overlap then date, and link to their correct existing URLs.
- Confirm a post with no tags, a post with no matching tags, and a post whose only potential matches are unpublished or future-dated has no Related Posts heading or empty container.
- Confirm cards remain readable and keyboard-linkable in light and dark modes and across mobile through desktop breakpoints.
- Run `npm run lint`.
- Run `npx tsc --noEmit`.
- Run `npm test`.
- Run `npm run build`, since this changes an App Router page and its static content rendering.

## Documentation Impact

- **OKF:** No change. The `doc/okf/` bundle is empty, so there is no existing related-content concept to amend; this implementation detail does not by itself establish durable architecture beyond the code and tests.
- **README.md:** No change. This is an internal presentation enhancement with no setup, authoring, or user-facing workflow requirement.
- **AGENTS.md:** No change.
- **Other documentation:** No change.

## Risks & Edge Cases

- Tag comparisons must be normalized consistently or equivalent tag labels can fail to match.
- Recommendation selection must use only published, non-future posts; `getAllPosts()` deliberately includes all content.
- The current post must never recommend itself, even if it has duplicate tags.
- Duplicate tags on either post must not inflate the shared-tag score.
- Date comparisons should avoid changing server-rendered output unpredictably within one invocation; capture the evaluation time once.
- A related card cannot be useful if tagless posts hide their title and link; preserve information visibility independently from tag-label availability.
- Do not alter the current page’s JSON-LD, metadata, post URLs, MDX rendering, or client-side view counter boundary.

## Coder Handoff

Implement a small pure related-post selector from the existing `Post` collection, then render up to three matching published posts beneath an article using the existing post-card language. Keep all work server-rendered and limited to automatic tag-based recommendations. Cover overlap ranking, eligibility exclusions, empty omission, and any necessary tagless-card behavior before running the prescribed lint, type, test, and production-build checks.
