# DATLA INFRA — Phase 4

Real project detail pages, replacing the Phase 3 reserved placeholder at `/projects/[slug]`. Everything from Phases 1–3 (header/footer, homepage, About/Projects/Communities/Customers/Media/Contact) is unchanged.

## What's new this phase

- **`/projects/[slug]`** is now a full detail page per project (Section 8 of the brief): a photo hero with the project name and status, an "About This Project" description, an amenities list, a 3-image gallery, and a "Project Facts" card (Status / Location / Total Flats / Project Area / Completed On — only the fields that were actually supplied for that project are shown; Sree Nivas Heights and Datla Enclave correctly omit the flats/area/completion fields that were never given rather than showing blanks or invented numbers).
- An **"Explore 3D Model"** button is present on every project's fact card, but disabled with a "coming in a later phase" note. The interactive building/floor/flat explorer itself has **not** been touched, per your explicit instruction — this button is inert scaffolding, not a real feature.
- An **"Enquire About This Project"** button links to `/contact`, satisfying the brief's enquiry-CTA requirement for this page.
- Unknown slugs still 404 (unchanged from Phase 3).

## Content

Each project's `description` paragraph was added to `data/preview-projects.json`. Per that file's `provenance` field: names/status/flats/location/area/completion dates are transcribed from the brief; the description copy is written in-brand since the brief didn't supply project-specific narrative text, matching the same approach already used for About's story/values copy in Phase 3.

Amenities on the detail page reuse the same 6 Communities features (Children's Play Area, Landscaped Gardens, etc.) via `getCommunitiesContent()` rather than duplicating that list into project data — single source of truth, consistent with the `PageHero`/`CtaBand`/`StatStrip` reuse pattern from Phase 3.

## Fixed while building this phase

The disabled "Explore 3D Model" button was initially unreadable — it used the `light-outline` button style (navy text, meant for light/cream backgrounds) inside the dark-navy "Project Facts" card, making the text and icon effectively invisible against the matching dark background. Caught during visual review and fixed by switching to `outline-button` (the light-text variant already used elsewhere on dark backgrounds, e.g. the header's nav). Confirmed visually after the fix — text and icon are now clearly legible.

## Review

Run `npm run dev` (or double-click `Start Preview.cmd`), then open any project's "View Details" from `/projects` — try all three (Subhadra Residency has the full fact set; Sree Nivas Heights and Datla Enclave show only Status/Location, correctly). Confirm the "Explore 3D Model" button is visibly labeled but disabled, and "Enquire About This Project" goes to `/contact`.

## Stop point

STOP after Phase 4 review. Do not start Phase 5 (interactive 3D explorer) without approval — the building/floor/flat model is still explicitly on hold for your separate plan.

Stack unchanged: React, TypeScript, Next-compatible Vinext/Vite starter, clean CSS. No Firebase, authentication, admin, or building explorer has been implemented yet.

## Verification completed

Production build and `tsc --noEmit` both pass with no errors. All three project detail routes return 200 with correct per-project content; an unknown slug still 404s. Every image referenced by each detail page (project photo + reused gallery images) returns 200 — no broken images, including the `hero`/`interior` wide-only assets used in the gallery. Checked at 375px mobile width with zero horizontal overflow. The `light-outline`/`outline-button` contrast bug above was the only defect found; a codebase-wide check confirmed no other component misuses `light-outline` on a dark background.

## Hosting

Live at **https://site-creator-vinext-starter.coderrorsolutions.workers.dev** (Cloudflare Workers — this project's build targets Workers, not Vercel; see git history for why). Source is on GitHub at [venkatnarayana7/DaltaInfra](https://github.com/venkatnarayana7/DaltaInfra).
