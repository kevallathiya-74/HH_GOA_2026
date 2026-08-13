import { get } from "@vercel/blob";
import { NextResponse } from "next/server";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    if (!id) {
      return new NextResponse("Missing card ID", { status: 400 });
    }

    const cleanId = decodeURIComponent(id).replace(/^cards\//, "");
    const filename = cleanId.endsWith(".png") ? cleanId : `${cleanId}.png`;
    const pathname = `cards/${filename}`;
    const token = process.env.BLOB_READ_WRITE_TOKEN;

    let result = null;
    try {
      result = await get(pathname, { token, access: "private" });
    } catch {
      try {
        result = await get(pathname, { token, access: "public" });
      } catch (err) {
        console.error("[image-route] Blob get error:", err);
      }
    }

    if (!result || !result.stream) {
      return new NextResponse("Card image not found", { status: 404 });
    }

    return new NextResponse(result.stream as unknown as BodyInit, {
      status: 200,
      headers: {
        "Content-Type": "image/png",
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch (error) {
    console.error("[image-route] Error retrieving card image:", error);
    return new NextResponse("Failed to load card image", { status: 500 });
  }
}
