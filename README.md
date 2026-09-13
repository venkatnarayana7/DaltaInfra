# DATLA INFRA — Phase 5 (non-3D building explorer)

Building → Floor → Flat exploration, exactly as laid out in the brief's Section 11–13 UX flow, but built as a **CSS-drawn architectural schematic instead of a 3D model** — per your explicit instruction not to touch the 3D building experience yet. Everything from Phases 1–4 is unchanged.

## What's new this phase

- **`/projects/[slug]/explore`** — a new route with:
  - A **floor selector** (Terrace decorative + 4th/3rd/2nd/1st/Ground Floor) as pill buttons.
  - A **building elevation** — a vertical stack of CSS bars representing each floor. Selecting a floor highlights its bar in gold and dims the others, echoing the brief's "isolate the selected floor" behavior without any WebGL/Three.js.
  - A **flat grid** for the selected floor, each tile color-coded by status dot (green = Available, grey = Occupied, gold = Booked), matching the reference's legend.
  - A **flat detail panel** on selecting a flat — "3rd Floor · Flat 302", "3 BHK", Status/Owner/Purchased On, and Back to Floor / Back to Building / Enquire About This Flat actions. This reproduces the reference image's flat detail card almost exactly.
- The **"Explore 3D Model"** button on the project detail page is now labeled **"Explore Building"** (see "why the rename" below) and is a real, working link for projects that have explorer data.
- **Scoping decision:** only **Subhadra Residency** got real floor/flat data. Sree Nivas Heights and Datla Enclave are Under Construction / Upcoming, so their floor plans aren't real yet — inventing a 50-unit layout for Sree Nivas Heights would mean fabricating data with zero basis. Both their project-detail buttons and their `/explore` URLs (if visited directly) show an honest "floor plans aren't finalized yet" message instead of fake data. This can be revisited once those projects' real unit plans exist.

## Where Subhadra Residency's flat data came from

Not invented: 5 floors × 4 flats = 20 total flats matches the already-supplied "Total Flats: 20". The flat numbers 101, 302, and 401 — and their occupied status, owner names, and purchase dates — are pulled directly from the real Customers page seed records (Ramesh Babu/302, Suresh Kumar/401, Anita Devi/101); every other flat has no real record, so it's marked **available** rather than assigning a fake owner. This was verified programmatically: a script cross-checked every "occupied" flat in the explorer data against the Customers JSON before this was built, confirming an exact match.

One inference, clearly flagged in the data file's `provenance`: the brief's Section 13 example gives Flat 302 as "3 BHK" — that's the only configuration ever specified, so it was applied as the building's uniform unit type. That's a reasonable extrapolation from real data, not a fabrication, but it's flagged for you to confirm before launch.

## Why "Explore Building" instead of "Explore 3D Model"

The button now does something real — it just isn't 3D. Keeping the literal words "3D Model" on a feature that is deliberately a 2D/CSS schematic would be a mislabel. The explorer page itself also states upfront: "An interactive architectural schematic — floor and unit layout, not a photorealistic 3D render." When the real Phase 6+ 3D explorer is eventually built (on your separate plan), the label and route can change without disrupting anything else, since this is an isolated route (`/projects/[slug]/explore`) and an isolated data adapter (`lib/explorer-content.ts`).

## Architecture note for the future 3D phase

`getBuildingExplorer(slug)` in `lib/explorer-content.ts` is the single seam where a real Firestore-backed 3D data source would plug in later, matching the brief's Section 14 projects/floors/flats shape. The `BuildingExplorer` component's props (`floors`, `flats` keyed by flat number with `status`/`owner`/`purchasedOn`/`bhk`) are shaped so a future 3D renderer could consume the same data without a schema rewrite — this phase does not paint you into a corner for the real 3D work later.

## Review

Run `npm run dev` (or double-click `Start Preview.cmd`), open `/projects/subhadra-residency`, click "Explore Building", pick a floor, click flat 302 (should show Ramesh Babu, Occupied, 12 Jan 2023) or flat 101 (Anita Devi, Occupied, 05 Mar 2023). Try "Back to Floor" and "Back to Building". Then check `/projects/sree-nivas-heights` — its explore button should be disabled with the "not finalized" note.

## Stop point

STOP after Phase 5 review. The real 3D building/floor/flat experience (Three.js/GLB or otherwise) is still on hold for your separate plan — nothing 3D was built or touched this phase.

## Verification completed

Production build and `tsc --noEmit` both pass with no errors. All three `/projects/[slug]/explore` routes return 200 (Subhadra Residency shows the real explorer; the other two show the honest fallback); an unknown slug's explore URL 404s. Checked at 375px mobile — floor pills wrap, the elevation stack and flat grid both reflow correctly, and the detail-panel action buttons stack without overflow. Every occupied flat shown in the explorer was cross-checked programmatically against the real Customers seed data before and after building the UI.

## Hosting

Live at **https://site-creator-vinext-starter.coderrorsolutions.workers.dev** (Cloudflare Workers). Source on GitHub at [venkatnarayana7/DaltaInfra](https://github.com/venkatnarayana7/DaltaInfra). No server-side caching is configured, so the live URL always reflects the latest deploy — a stale view is a browser-cache issue, not a deployment issue (hard refresh with Ctrl+Shift+R).

## Critical fix: clicking any link did nothing in production

After Phase 5 shipped, clicking "View Details," header nav links, or anything else stopped navigating anywhere — on both the live Cloudflare site and a locally-served copy of the exact same production build. This turned out to be a **pre-existing bug going back to Phase 1**, not something Phase 4/5 introduced — it only went unnoticed because every phase's verification used `npm run dev` (dev mode), which doesn't hit the broken code path. The very first "About Us" header link, unchanged since Phase 1, failed the same way once actually tested against a production build.

**Root cause:** this project is built on `vinext` (Cloudflare's beta "Next.js on Vite" framework, pinned at `1.0.0-beta.5`). Its client-side `<Link>` component calls a `navigateClientSide` function pulled from a dynamically-loaded chunk — in this build, that import resolves to `undefined`, so every click throws `TypeError: e is not a function` inside the click handler after `preventDefault()` has already fired, silently swallowing the navigation. Confirmed by reading the built (minified) chunk source directly.

**What was tried and rejected:** upgrading `vinext` to the latest beta (1.0.0-beta.9, which requires bumping `@vitejs/plugin-rsc` to 0.5.34) was tested first, since it's the most direct fix. It made the build hang indefinitely in an infinite loop (confirmed via CPU usage — over 1300 CPU-seconds burned with zero progress past the first transform step) rather than fixing anything. This was reverted immediately; the working `1.0.0-beta.5` / `0.5.26` pair is back in `package.json`.

**Actual fix:** every internal link in the app used Next's `<Link>` from `next/link`. Since every route already renders correctly and completely on a full page load (verified extensively via direct fetches throughout every phase), the broken client-side "soft navigation" machinery isn't actually needed for a site like this. All 11 files that imported `next/link`'s `Link` now import a tiny drop-in replacement at `components/datla/link.tsx` — a plain `<a href>` with no client-side interception at all. This completely bypasses the buggy framework code. Clicking now works instantly everywhere, confirmed via real clicks (not just fetch checks) on the header nav, project cards, "Explore Building," and the building explorer's internal links, against a locally-served copy of the actual production build.

This is a workaround, not a framework patch — `lib/explorer-content.ts`-style "single seam" thinking applies here too: if a future `vinext` release fixes `navigateClientSide` properly, reverting `components/datla/link.tsx`'s 11 import sites back to `next/link` is a one-line-per-file change, isolated from everything else.
