# AGENTS.md

## Project
HH Goa 2026 — Format B Builder ID Card Generator.

## Mission
Build a fast, mobile-first, no-login web tool that converts a user's photo and a few identity fields into an official-looking HH Goa 2026 Builder ID Card that can be downloaded and shared to X with `#FrameInGoa`.

## Product Principles
1. Optimize the complete flow: upload → personalize → generate → download/share.
2. Use the official HH Goa visual language from the supplied reference/assets as the source of truth.
3. Keep the MVP lean. Do not add authentication, database, dashboard, payments, chat, or a general-purpose image editor.
4. Treat mobile UX as first-class because the task explicitly expects phone usage.
5. Never replace real integrations with fake/mock behavior in the final flow.

## Technical Rules
- Next.js App Router + TypeScript.
- Tailwind CSS; shadcn/ui only where useful.
- React Hook Form + Zod for inputs and validation.
- `heic2any` for HEIC normalization.
- `html-to-image` for client-side card rendering/export.
- Gemini API for short builder-title generation only.
- Vercel Blob for public generated-image storage.
- X Web Intent for sharing.
- Next.js dynamic metadata for OG previews.
- No database and no authentication.

## UX Rules
- No login/signup gate.
- Support JPG, PNG and HEIC.
- Handle portrait, landscape, square and off-center photos without asking the user to crop first.
- Generation should feel near-instant; avoid long artificial loading states.
- The primary CTA is the single generation action.
- Download must produce a real image file.
- Share flow must include `#FrameInGoa` and must resolve to the generated card or a public link whose OG image is the generated card.

## Visual Rules
- Official HH Goa green/cream/pink/yellow/orange palette.
- Use the supplied official Goa beach hero visual at the top of the page.
- Reuse official palms, beach, houses, signs, event illustrations and branding assets from the project assets folder wherever appropriate.
- Avoid the previous dark-neon SaaS dashboard aesthetic.
- The product should look like an official HH Goa experience, not a generic badge generator.

## Coding Standards
- Keep components small and responsibility-focused.
- Avoid hardcoded secrets and environment-specific values.
- Validate file type and size on the client and server where applicable.
- Sanitize user-generated text before rendering into share metadata or HTML.
- Handle failed uploads, HEIC conversion, AI generation, image export and Blob upload gracefully.
- Prefer progressive enhancement and accessible controls.
