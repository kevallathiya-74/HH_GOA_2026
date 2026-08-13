# TASKS.md

## P0 — Submission Critical

- [ ] Initialize Next.js App Router + TypeScript project.
- [ ] Configure Tailwind CSS.
- [ ] Add shadcn/ui selectively.
- [ ] Add React Hook Form + Zod.
- [ ] Add official HH Goa assets to `public/` and inventory them.
- [ ] Build official-themed header.
- [ ] Build Goa beach hero section using supplied official visual.
- [ ] Build photo upload with JPG/PNG/HEIC validation.
- [ ] Implement HEIC conversion with `heic2any`.
- [ ] Build name, stack/role and skills inputs.
- [ ] Implement robust photo fit/crop positioning without manual user crop.
- [ ] Build Builder ID Card template using official HH Goa visual language.
- [ ] Implement Gemini builder-title generation.
- [ ] Implement title regeneration.
- [ ] Render/export card using `html-to-image`.
- [ ] Implement real PNG/JPEG download.
- [ ] Upload generated image to Vercel Blob.
- [ ] Build `/card/[id]` public route.
- [ ] Implement dynamic OG metadata using the generated image.
- [ ] Implement X Web Intent with prefilled caption and `#FrameInGoa`.
- [ ] Verify shared link preview shows the generated card.
- [ ] Add loading, error and retry states.
- [ ] Test mobile layout.

## P1 — Polish

- [ ] Add subtle transitions.
- [ ] Improve photo focal-point handling.
- [ ] Add generated-card success state.
- [ ] Improve download filename generation.
- [ ] Add copy-caption fallback.
- [ ] Optimize asset/image sizes.
- [ ] Add accessibility pass.
- [ ] Add client/server boundary checks and rate limiting where needed.

## P2 — Optional

- [ ] Team combined card.
- [ ] Multiple builder-title variants.
- [ ] Additional official card variations.

## Submission Checklist

- [ ] Production deployment works.
- [ ] Live URL opens without authentication.
- [ ] Test JPG.
- [ ] Test PNG.
- [ ] Test HEIC from an iPhone.
- [ ] Test portrait photo.
- [ ] Test landscape photo.
- [ ] Test off-center photo.
- [ ] Downloaded image is valid.
- [ ] X prefilled text contains `#FrameInGoa`.
- [ ] X/shared link displays the generated card preview.
- [ ] Publish the required X post containing `#FrameInGoa`.
- [ ] Submit the live URL and X result through the hackathon form before the deadline.
