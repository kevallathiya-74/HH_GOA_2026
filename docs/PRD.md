# PRD.md — HH Goa 2026 Builder ID Card Generator

## 1. Product Summary
A mobile-first, no-login web tool that turns a user's uploaded photo plus a few developer identity details into a branded HH Goa 2026 Builder ID Card, then lets the user download it and share it to X with `#FrameInGoa`.

## 2. Target Users
Hackathon participants, developers, builders, AI/ML enthusiasts, creators and attendees who want a shareable HH Goa 2026 identity graphic.

## 3. Core Problem
Participants need a fast way to create an event-branded identity graphic from their own photo without learning a design tool or manually cropping/formatting the image.

## 4. Value Proposition
In one pass, users get a polished official-looking HH Goa Builder ID with personalized identity data and a social-sharing flow.

## 5. Success Criteria
- User can complete the full flow without login.
- JPG, PNG and HEIC uploads work.
- Portrait, landscape and off-center images render acceptably without manual cropping.
- Builder title is generated quickly and reliably.
- Final output is a real downloadable image.
- X share flow opens with a prefilled caption containing `#FrameInGoa`.
- Shared card URL exposes the generated image as its OG preview.
- Mobile UX is fully usable.
- Typical upload-to-result flow feels like a few seconds rather than a long processing job.

## 6. Required User Flow
1. Land on generator.
2. See official HH Goa hero and branding.
3. Upload photo.
4. Enter name.
5. Enter stack/role.
6. Optionally enter top skills.
7. Generate builder title.
8. Generate Builder ID Card.
9. Preview card.
10. Download card.
11. Share to X with `#FrameInGoa`.

## 7. Primary Screens
### Generator
Official HH Goa hero followed by compact generator form and live result area.

### Generated Result
Builder card preview plus download/share CTAs and optional title regeneration.

### Public Share Route
A generated card page designed for OG/social preview and direct viewing of the card.

## 8. Fields
- Photo — required, JPG/PNG/HEIC, maximum implementation-defined size.
- Name — required.
- Stack / Role — required.
- Top Skills — optional.

## 9. UX Requirements
- Single-purpose flow.
- No signup.
- No manual photo crop requirement.
- Clear upload/change state.
- Clear generation state.
- Strong primary CTA.
- Accessible labels and keyboard support.
- Mobile-first layout.

## 10. Visual Direction
Use official HH Goa 2026 visual language from the supplied reference/assets:
- deep green
- cream/off-white
- yellow
- orange
- pink/magenta
- illustrated Goa beach scene
- palms
- houses
- directional signs
- official HH Goa logo/wordmark treatment
- playful editorial/event typography

## 11. Out of Scope for MVP
- Auth
- Accounts/profiles
- Database
- Payments
- Chat
- Analytics dashboard
- General-purpose image editor
- Advanced template marketplace

## 12. Secondary Feature
Team combined card may be added after the individual generator is stable.
