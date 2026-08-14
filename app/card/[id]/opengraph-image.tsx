import { getCardBlobUrl } from "@/lib/blob";
import { getBaseUrl } from "@/lib/url";

export const alt = "HH Goa 2026 Builder ID";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const cleanId = decodeURIComponent(id)
    .replace(/^cards\//, "")
    .replace(/\.[a-zA-Z0-9]+$/i, "");

  const blobUrl = await getCardBlobUrl(cleanId);
  const targetUrl = blobUrl || `${getBaseUrl()}/api/cards/${cleanId}/image`;

  try {
    const res = await fetch(targetUrl);
    if (res.ok) {
      const buffer = await res.arrayBuffer();
      return new Response(buffer, {
        headers: {
          "Content-Type": "image/png",
          "Cache-Control": "public, max-age=31536000, immutable",
        },
      });
    }
  } catch (e) {
    console.error("[opengraph-image] Fetch error:", e);
  }

  return new Response("Card image not found", { status: 404 });
}
