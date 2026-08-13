import type { Metadata } from "next";
import Image from "next/image";
import { buildXIntent } from "@/lib/share";
import { getBaseUrl } from "@/lib/url";
import { getCardBlobUrl } from "@/lib/blob";

interface Props {
  params: Promise<{ id: string }>;
}

async function resolveImageUrl(id: string): Promise<string> {
  if (id.startsWith("http://") || id.startsWith("https://") || id.startsWith("data:")) {
    return id;
  }
  try {
    const decoded = atob(decodeURIComponent(id));
    if (decoded.startsWith("http://") || decoded.startsWith("https://") || decoded.startsWith("data:")) {
      return decoded;
    }
  } catch {}

  const blobUrl = await getCardBlobUrl(id);
  if (blobUrl) {
    return blobUrl;
  }

  return `${getBaseUrl()}/api/cards/${id}/image`;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const imageUrl = await resolveImageUrl(id);
  const canonicalUrl = `${getBaseUrl()}/card/${id}`;

  const rawName = decodeURIComponent(id)
    .replace(/^cards\//, "")
    .replace(/\.png$/, "")
    .split("-")
    .slice(0, -1)
    .join(" ");

  const displayName = rawName
    ? rawName
        .split(" ")
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(" ")
    : "Builder";

  const title = `${displayName} — HH Goa 2026 Builder ID`;
  const description = `HH Goa 2026 Builder ID for ${displayName}. Built in Goa for the world. #FrameInGoa`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 857,
          alt: `HH Goa 2026 Builder ID — ${displayName}`,
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
  };
}

export default async function CardPage({ params }: Props) {
  const { id } = await params;
  const imageUrl = await resolveImageUrl(id);
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
