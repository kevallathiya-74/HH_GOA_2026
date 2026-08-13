import type { Metadata } from "next";
import Image from "next/image";
import { buildXIntent } from "@/lib/share";

interface Props {
  params: Promise<{ id: string }>;
}

// Decode blob URL from base64 id param
function decodeId(id: string): string {
  try {
    return atob(decodeURIComponent(id));
  } catch {
    return id;
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const imageUrl = decodeId(id);

  return {
    title: "HH Goa 2026 Builder ID Card",
    description: "Check out my HH Goa 2026 Builder ID Card! #FrameInGoa",
    openGraph: {
      title: "HH Goa 2026 Builder ID Card",
      description: "Check out my HH Goa 2026 Builder ID Card! #FrameInGoa",
      images: [{ url: imageUrl, width: 1200, height: 900, alt: "HH Goa 2026 Builder ID Card" }],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "HH Goa 2026 Builder ID Card",
      description: "#FrameInGoa",
      images: [imageUrl],
    },
  };
}

export default async function CardPage({ params }: Props) {
  const { id } = await params;
  const imageUrl = decodeId(id);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-margin-mobile py-12 gap-8">
      <h1 className="font-display text-display-lg-mobile md:text-display-lg text-primary text-center">
        HH Goa 2026 Builder ID
      </h1>

      <div className="w-full max-w-xl card-ambient-shadow rounded-2xl overflow-hidden" style={{ border: "10px solid #003527" }}>
        <Image
          src={imageUrl}
          alt="HH Goa 2026 Builder ID Card"
          width={1200}
          height={900}
          className="w-full h-auto"
          priority
        />
      </div>

      <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
        <a
          href={imageUrl}
          download="hh-goa-builder-id.png"
          className="flex-1 bg-primary text-on-primary font-body text-button-text py-3 rounded-full btn-shadow hover:-translate-y-0.5 transition-transform flex items-center justify-center gap-2 text-center"
        >
          <span className="material-symbols-outlined">download</span>
          Download
        </a>
        <a
          href={buildXIntent(imageUrl, "Builder")}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 bg-secondary text-on-secondary font-body text-button-text py-3 rounded-full btn-shadow-secondary hover:-translate-y-0.5 transition-transform flex items-center justify-center gap-2 text-center"
        >
          <span className="material-symbols-outlined">share</span>
          Share on X
        </a>
      </div>

      <a
        href="/"
        className="font-label text-label-caps text-outline uppercase tracking-widest hover:text-primary transition-colors"
      >
        ← Create your own
      </a>
    </div>
  );
}
