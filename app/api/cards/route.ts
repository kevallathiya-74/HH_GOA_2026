import { NextResponse } from "next/server";
import { cardUploadSchema } from "@/lib/validation";
import { uploadCard } from "@/lib/blob";
import { getBaseUrl } from "@/lib/url";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = cardUploadSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    }
    const { imageDataUrl, name } = parsed.data;

    // Sanitize name for filename: strip non-alphanumeric, lowercase
    const safeName = name.toLowerCase().replace(/[^a-z0-9]/g, "-").slice(0, 40) || "builder";
    const id = `${safeName}-${Date.now()}`;

    const { url, pathname } = await uploadCard(imageDataUrl, id);

    const baseUrl = getBaseUrl();
    const publicImageUrl = `${baseUrl}/api/cards/${id}/image`;
    const publicCardUrl = `${baseUrl}/card/${id}`;

    return NextResponse.json({
      id,
      pathname,
      blobUrl: url,
      imageUrl: publicImageUrl,
      url: publicImageUrl,
      publicUrl: publicCardUrl,
    });
  } catch (e) {
    console.error("[cards]", e);
    const msg = e instanceof Error ? e.message : "Card upload failed";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
