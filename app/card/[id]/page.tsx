import type { Metadata } from "next";
import { buildXIntent } from "@/lib/share";
import { getBaseUrl } from "@/lib/url";

interface Props {
  params: Promise<{ id: string }>;
}

function getCardImageUrl(id: string): string {
  const cleanId = decodeURIComponent(id).replace(/^cards\//, "").replace(/\.png$/, "");
  return `${getBaseUrl()}/api/cards/${cleanId}/image`;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const cleanId = decodeURIComponent(id).replace(/^cards\//, "").replace(/\.png$/, "");
  const imageUrl = getCardImageUrl(cleanId);
  const canonicalUrl = `${getBaseUrl()}/card/${cleanId}`;

  const rawName = cleanId
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
  const cleanId = decodeURIComponent(id).replace(/^cards\//, "").replace(/\.png$/, "");
  const imageUrl = getCardImageUrl(cleanId);
  const cardPageUrl = `${getBaseUrl()}/card/${cleanId}`;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 md:px-8 py-12 gap-8">
      <h1 className="font-display text-3xl md:text-4xl font-black uppercase text-primary text-center">
        HH Goa 2026 Builder ID
      </h1>

      <div
        className="w-full max-w-2xl card-ambient-shadow rounded-2xl overflow-hidden bg-paper-white shadow-xl"
        style={{ border: "10px solid #003527" }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={imageUrl}
          alt="HH Goa 2026 Builder ID Card"
          className="w-full h-auto object-cover block"
        />
      </div>

      <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
        <a
          href={imageUrl}
          download={`hh-goa-builder-id-${cleanId}.png`}
          className="flex-1 bg-primary text-on-primary font-body font-bold py-3 rounded-full btn-shadow hover:-translate-y-0.5 transition-transform flex items-center justify-center gap-2 text-center text-sm cursor-pointer"
        >
          <span className="material-symbols-outlined text-lg">download</span>
          Download PNG
        </a>
        <a
          href={buildXIntent(cardPageUrl)}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 bg-[#E94F72] text-white font-body font-bold py-3 rounded-full hover:bg-[#d83a64] hover:-translate-y-0.5 transition-transform flex items-center justify-center gap-2 text-center text-sm shadow-sm"
        >
          <span className="material-symbols-outlined text-lg">share</span>
          Share on X
        </a>
      </div>

      <a
        href="/"
        className="font-label text-[11px] font-bold text-outline uppercase tracking-widest hover:text-primary transition-colors mt-2"
      >
        ← Create your own Builder ID
      </a>
    </div>
  );
}
