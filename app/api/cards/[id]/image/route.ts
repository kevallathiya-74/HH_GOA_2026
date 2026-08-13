import { NextResponse } from "next/server";
import { getCardBlobUrl } from "@/lib/blob";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    if (!id) {
      return new NextResponse("Missing card ID", { status: 400 });
    }

    const blobUrl = await getCardBlobUrl(id);
    if (blobUrl) {
      return NextResponse.redirect(blobUrl, { status: 307 });
    }

    return new NextResponse("Card image not found", { status: 404 });
  } catch (error) {
    console.error("[image-route] Error retrieving card image:", error);
    return new NextResponse("Failed to load card image", { status: 500 });
  }
}
