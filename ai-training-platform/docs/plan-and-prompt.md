---
title: P LA N A ND P RO MP T
description: Documentation for P LA N A ND P RO MP T
last_updated: 2025-11-23
author: TBS Digital Labs
category: General
---
# TBS AI Training Platform — Implementation Plan and Handoff

## Objectives
- Apply brand-aligned, modern platform UI across all pages.
- Use semantic tokens and composition primitives consistently.
- Ensure legibility, contrast, and compact layout that fits one large viewport.
- Keep interactions smooth (no glitch), accessible, and performant.

## What’s Done (high level)
- Header navigation implemented globally with active-route highlighting.
- Homepage hero updated to deck gradient with inverse text and brand accents.
- Homepage sections refactored to use `Section`, `Container`, `Heading` primitives.
- Stats + CTA compacted into a 4-up grid; standardised card padding and CTA sizing.
- Contrast improvements and removal of parallax/glitch.

## What’s Next (remaining tasks)
1) Brand/token audit
- Review `C:\\Users\\ddahd\\Desktop\\Projects\\Brand-Assets` PDF and the PPTX
- Align `brand-guidelines/brand-tokens.css` and `src/app/globals.css` to canonical colours, typography, ramps
- Add missing ramps and alias any temporary token names; ensure dark-mode variants

2) Primitives finalisation
- Finalise `Section`, `Container`, `Heading` scales (sm/md/lg) per deck
- Create `StatsPanel` for reuse (extract from homepage)
- Optional: `HUDFrame`, `NeonDivider`, `HoloCard` if needed for other pages

3) Page refactors (apply design system site-wide)
- Class selection page: spacing, equal-height cards, consistent CTA
- Role pages (developers/designers/PM/content-creators/sales): header nav present, compact heroes, module cards with consistent padding and heights, normal CTA sizing
- Module pages: ensure `ModuleLayout` uses primitives, add compact progress header; remove any oversized elements

4) Components polish
- ThemeToggle visuals refined with tokens; maintain 44px hit target
- Button and Card variants: ensure they only use semantic tokens and sizes

5) Quality and accessibility
- Verify contrast and legibility across light/dark modes
- Keyboard navigation and focus states across all interactive elements
- Reduced motion respected; smooth animations (no layout shift)
- Performance: no heavy filters; CSS transforms preferred

6) Verification
- Browser test all pages both themes, record any console errors
- Ensure theme persistence and no hydration warnings
- Ensure on a large viewport, the key content fits without excessive scrolling

## Files and Areas to Focus
- Tokens: `brand-guidelines/brand-tokens.css`, `src/app/globals.css`
- App shell: `src/app/layout.tsx`, `src/components/HeaderNav.tsx`
- Homepage: `src/app/page.tsx` (reference for spacing/scale)
- Pages: `src/app/class-selection/page.tsx`, `src/app/*/page.tsx`, `src/app/*/module-*/page.tsx`
- Primitives/new: `src/components/{Section.tsx, Container.tsx, Heading.tsx, StatsPanel.tsx}`

## Open TODOs (condensed)
- brand-audit: Review Brand-Assets PDF/PPTX; align tokens and typography
- create-primitives: Finalise Section/Container/Heading; add StatsPanel
- class-selection-update: Equal-height cards; spacing; standard CTA
- role-pages-update: Refactor role pages (nav, cards, CTAs, spacing)
- module-pages-update: Apply ModuleLayout + Section; compact progress header
- theme-toggle-polish: Improve ThemeToggle with semantic tokens
- qa-pass: Breakpoints, reduced-motion, keyboard, theme persistence
- docs-update: Document token deltas and patterns in brand-guidelines

---

# New Chat Bootstrap Prompt (for Cursor)
You are an engineering copilot continuing a design-system refactor for a Next.js app.

Context
- Project path: `C:\\Users\\ddahd\\Desktop\\Projects\\Tools\\Documentation for TBS\\ai-training-platform`
- Use the built-in browser for visual checks; use a single terminal session; always `cd` to the project before commands.
- Brand sources are canonical: `C:\\Users\\ddahd\\Desktop\\Projects\\Brand-Assets` (PDF) and `[INTERNAL V2] TBSDL_Master Template File.pptx` in the repo root.
- No glitch effects. Smooth, accessible, compact UI that fits one large viewport.

Rules
- Follow brand tokens in `brand-guidelines/brand-tokens.css` and `src/app/globals.css`.
- Use composition primitives (`Section`, `Container`, `Heading`) and semantic tokens.
- Keep CTAs medium-sized, cards with consistent padding, equal heights in grids.
- Ensure high contrast and consistent spacing across light/dark themes.
- Use one terminal, kill prior dev server via PID before restarting.

Tasks
1) Audit tokens against Brand-Assets and PPTX; update tokens and document deltas
2) Finalise primitives (Section/Container/Heading) and extract `StatsPanel`
3) Apply design system to class selection and all role/module pages
4) Polish ThemeToggle and Buttons/Cards to use semantic tokens only
5) QA across themes/breakpoints/keyboard; ensure no hydration warnings; fit key content in one viewport on large screens

Deliverables
- Updated tokens and documented changes
- Refactored pages using primitives and consistent scales
- Verified legibility/contrast and modern platform look

Operational Guardrails
- Always run commands from the project folder; single dev server policy with PID file
- Use built-in browser for screenshots and verification
- Ask one concise question only when essential; otherwise proceed with competent defaults

