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

    let uploadResult: { url: string; pathname: string } | null = null;
    try {
      uploadResult = await uploadCard(imageDataUrl, id);
    } catch (blobError) {
      console.warn("[cards] Storage not configured or upload failed:", blobError);
    }

    const baseUrl = getBaseUrl();
    const publicImageUrl = uploadResult ? `${baseUrl}/api/cards/${id}/image` : "";
    const publicCardUrl = uploadResult ? `${baseUrl}/card/${id}` : baseUrl;

    return NextResponse.json({
      id: uploadResult ? id : "",
      pathname: uploadResult?.pathname || "",
      blobUrl: uploadResult?.url || "",
      imageUrl: publicImageUrl,
      url: publicImageUrl,
      publicUrl: publicCardUrl,
    });
  } catch (e) {
    console.error("[cards]", e);
    const msg = e instanceof Error ? e.message : "Card generation failed";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
