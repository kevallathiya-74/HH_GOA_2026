# ARCHITECTURE.md

## System Overview

```text
Browser
  │
  ├── Photo Upload
  ├── Name / Role / Skills Form
  ├── HEIC normalization
  └── Live ID Card Preview
          │
          ├──────────────► Gemini API
          │                   └── Builder Title
          │
          ▼
     Card Renderer
   HTML/CSS + html-to-image
          │
          ▼
     PNG/JPEG Blob
          │
      ┌───┴───────────────┐
      ▼                   ▼
  Download            Vercel Blob
                          │
                          ▼
                     Public Card URL
                          │
                          ▼
                     /card/[id]
                          │
                          ▼
                  Dynamic OG metadata
                          │
                          ▼
                       X Share
```

## Application Layers

### Presentation
Next.js App Router, React, Tailwind CSS, and selected shadcn/ui primitives.

### Form State
React Hook Form for the generator form and Zod for schema validation.

### Image Pipeline
1. Accept JPG/PNG/HEIC.
2. Convert HEIC to a browser-friendly image via `heic2any`.
3. Normalize image dimensions and fit the subject into the card's photo frame without manual cropping.
4. Render the final card from HTML/CSS.
5. Export a PNG/JPEG using `html-to-image`.

### AI
Gemini generates a concise builder title from role/stack/skills. AI is not used for image rendering.

### Storage and Sharing
Generated image is uploaded to Vercel Blob. A public card route exposes the generated image to crawlers/social link preview metadata.

### Persistence
No database is required for the super-MVP. The generated artifact and public Blob URL are the system of record for a shared card.

## Suggested Route Structure

```text
app/
├── page.tsx
├── api/
│   ├── builder-title/route.ts
│   └── cards/route.ts
└── card/
    └── [id]/page.tsx

components/
├── generator/
├── card/
└── ui/

lib/
├── validation.ts
├── image.ts
├── gemini.ts
├── blob.ts
└── share.ts

public/
└── hh-goa-assets/
```

## Security
- Keep Gemini and Vercel Blob credentials server-side.
- Restrict upload MIME types and maximum file size.
- Never interpolate raw user text into HTML strings without escaping.
- Rate-limit public generation/upload endpoints as needed on deployment.
- Do not store unnecessary personal data.
