# DECISIONS.md

## ADR-001 — Choose Format B
**Decision:** Build the Builder ID Card format.

**Reason:** It better supports personalization, a generated builder title, shareability and a more compelling hackathon demo than a simple PFP frame.

## ADR-002 — Next.js App Router
**Decision:** Use Next.js with App Router.

**Reason:** It combines the client generator, server endpoints, and dynamic public share/OG route in one deployable project.

## ADR-003 — No Database
**Decision:** Do not add a database for the MVP.

**Reason:** The task does not require persistent accounts or history. A generated asset stored in Vercel Blob plus a public card route is sufficient.

## ADR-004 — No Auth
**Decision:** No authentication or signup.

**Reason:** The task explicitly requires a one-pass flow with no login wall.

## ADR-005 — Client Card Rendering
**Decision:** Use HTML/CSS + `html-to-image` for final card generation.

**Reason:** The card is a deterministic visual template; client-side rendering is fast and avoids unnecessary server-side image composition infrastructure.

## ADR-006 — Gemini Only for Builder Title
**Decision:** Use Gemini for a short generated builder title.

**Reason:** It adds meaningful personalization without introducing fragile AI dependencies into the critical image-generation path.

## ADR-007 — Official HH Goa Design as Source of Truth
**Decision:** Follow the supplied official HH Goa visual reference/assets rather than the previous dark neon SaaS aesthetic.

**Reason:** The hackathon task explicitly calls for an unmistakable event identity. Visual consistency with official branding improves authenticity and recognizability.

## ADR-008 — X Web Intent + Public OG Image
**Decision:** Use X Web Intent for prefilled sharing and a public generated image URL for the preview.

**Reason:** The task allows a direct image attachment or a link whose preview shows the actual graphic. A public OG image is the practical MVP-compatible path.
