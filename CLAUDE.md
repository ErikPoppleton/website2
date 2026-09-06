# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```sh
npm run dev       # Start dev server at localhost:4321
npm run build     # Build to ./dist/
npm run preview   # Preview production build
```

No test suite is configured.

## Architecture

This is an **Astro 5** personal website (Erik Poppleton) using **Tailwind CSS v4** (via `@tailwindcss/vite`) with `@tailwindcss/typography` for blog prose styling. All Tailwind config lives in `src/styles/global.css` using the `@theme` directive — there is no `tailwind.config.js`.

**Pages** (`src/pages/`): `index.astro`, `about.astro`, `research.astro`, `blog/index.astro`, `blog/[...slug].astro`

**Layout**: `BaseLayout.astro` wraps all pages — it imports global CSS, renders the `Nav`, a `<slot />` for content, a footer, and a scroll-driven holographic border animation (updates `--holo-offset` CSS variable on scroll).

**Design system**: Dark-only theme with CSS custom properties (`--color-bg-*`, `--color-text-*`, `--color-accent`, `--color-border`) defined in `global.css`. The `.holo-card` class applies an animated viridis-palette gradient border using `::before`/`::after` pseudo-elements — used on ProjectCard, BlueskyFeed, PodcastFeed, and OxViewEmbed.

**Data-fetching components** (all fetch at build time in frontmatter):
- `BlueskyFeed.astro` — resolves a Bluesky handle to DID, then fetches from the AT Protocol public API
- `PodcastFeed.astro` — fetches and manually parses an RSS feed (no XML parser dependency)
- `OxViewEmbed.astro` — embeds oxView via iframe with `postMessage` to load `.top`/`.dat`/`.cam` structure files; communicates with `https://sulcgroup.github.io/oxdna-viewer/`

**Blog**: Content collections via `src/content/config.ts`. Posts are Markdown files in `src/content/blog/` with frontmatter: `title`, `description`, `pubDate`, `updatedDate?`, `heroImage?`, `tags[]`, `draft` (draft posts are included in the collection but not filtered — filtering must be done manually if needed).

**Static assets**: `public/images/` holds oxDNA structure files (`.top`, `.dat`, `.cam`) and `external-link.svg` used as a CSS mask icon in multiple components.
