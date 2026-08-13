# TASKS.md

## P0 — Submission Critical

- [x] Initialize Next.js App Router + TypeScript project.
- [x] Configure Tailwind CSS.
- [ ] Add shadcn/ui selectively. *(skipped — not needed, ponytail: native inputs + custom Tailwind sufficient)*
- [x] Add React Hook Form + Zod.
- [ ] Add official HH Goa assets to `public/` and inventory them. *(pending — add official artwork files if provided)*
- [x] Build official-themed header.
- [x] Build Goa beach hero section using supplied official visual.
- [x] Build photo upload with JPG/PNG/HEIC validation.
- [x] Implement HEIC conversion with `heic2any`.
- [x] Build name, stack/role and skills inputs.
- [x] Implement robust photo fit/crop positioning without manual user crop.
- [x] Build Builder ID Card template using official HH Goa visual language.
- [x] Implement Gemini builder-title generation.
- [x] Implement title regeneration.
- [x] Render/export card using `html-to-image`.
- [x] Implement real PNG/JPEG download.
- [x] Upload generated image to Vercel Blob.
- [x] Build `/card/[id]` public route.
- [x] Implement dynamic OG metadata using the generated image.
- [x] Implement X Web Intent with prefilled caption and `#FrameInGoa`.
- [ ] Verify shared link preview shows the generated card. *(needs live deployment to verify)*
- [x] Add loading, error and retry states.
- [ ] Test mobile layout. *(needs manual browser test)*

## P1 — Polish

- [x] Add subtle transitions. *(hover translate, color transitions on all interactive elements)*
- [ ] Improve photo focal-point handling. *(object-position: center is current default; upgrade when needed)*
- [x] Add generated-card success state. *(download + share CTAs appear after generation)*
- [x] Improve download filename generation. *(name-based + timestamp)*
- [ ] Add copy-caption fallback. *(optional; X intent covers the main flow)*
- [ ] Optimize asset/image sizes. *(after deployment)*
- [ ] Add accessibility pass. *(labels + keyboard nav in place; full audit pending)*
- [ ] Add client/server boundary checks and rate limiting where needed. *(add at deployment stage)*

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
