import type { Metadata } from "next";
import Image from "next/image";
import { buildXIntent } from "@/lib/share";
import { getBaseUrl } from "@/lib/url";

interface Props {
  params: Promise<{ id: string }>;
}

// Decode blob URL from base64 id param
function decodeId(id: string): string {
  try {
    const decoded = atob(decodeURIComponent(id));
    if (decoded.startsWith("http://") || decoded.startsWith("https://") || decoded.startsWith("data:")) {
      return decoded;
    }
    return decodeURIComponent(id);
  } catch {
    return decodeURIComponent(id);
  }
}

function getImageUrl(id: string): string {
  const decoded = decodeId(id);
  if (decoded.startsWith("http://") || decoded.startsWith("https://") || decoded.startsWith("data:")) {
    return decoded;
  }
  return `${getBaseUrl()}/api/cards/${id}/image`;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const imageUrl = getImageUrl(id);
  const canonicalUrl = `${getBaseUrl()}/card/${id}`;

  return {
    title: "HH Goa 2026 Builder ID Card",
    description: "Check out my HH Goa 2026 Builder ID Card! #FrameInGoa",
    openGraph: {
      title: "HH Goa 2026 Builder ID Card",
      description: "Check out my HH Goa 2026 Builder ID Card! #FrameInGoa",
      url: canonicalUrl,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: "HH Goa 2026 Builder ID Card",
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "HH Goa 2026 Builder ID Card",
      description: "Check out my HH Goa 2026 Builder ID Card! #FrameInGoa",
      images: [imageUrl],
    },
  };
}

export default async function CardPage({ params }: Props) {
  const { id } = await params;
  const imageUrl = getImageUrl(id);
  const cardPageUrl = `${getBaseUrl()}/card/${id}`;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-margin-mobile py-12 gap-8">
      <h1 className="font-display text-display-lg-mobile md:text-display-lg text-primary text-center">
        HH Goa 2026 Builder ID
      </h1>

      <div
        className="w-full max-w-xl card-ambient-shadow rounded-2xl overflow-hidden bg-paper-white"
        style={{ border: "10px solid #003527" }}
      >
        <Image
          src={imageUrl}
          alt="HH Goa 2026 Builder ID Card"
          width={1200}
          height={900}
          className="w-full h-auto"
          priority
          unoptimized
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
          href={buildXIntent(cardPageUrl)}
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
        className="font-label text-label-caps text-outline uppercase tracking-widest hover:text-primary transition-colors text-xs"
      >
        ← Create your own
      </a>
    </div>
  );
}
