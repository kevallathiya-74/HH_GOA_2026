import { get, list } from "@vercel/blob";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    if (!id) {
      return new NextResponse("Missing card ID", { status: 400 });
    }

    const token = process.env.BLOB_READ_WRITE_TOKEN;
    const cleanId = decodeURIComponent(id).replace(/^cards\//, "").replace(/\.[a-zA-Z0-9]+$/i, "");
    const pathname = `cards/${cleanId}.png`;

    if (token) {
      // 1. Primary: Search blob by prefix to detect exact format & content-type
      try {
        const { blobs } = await list({
          prefix: `cards/${cleanId}`,
          token,
          limit: 1,
        });

        if (blobs.length > 0) {
          const targetBlob = blobs[0];
          const res = await fetch(targetBlob.url, {
            headers: { Authorization: `Bearer ${token}` },
          });
          if (res.ok && res.body) {
            const contentType = res.headers.get("content-type") || "image/png";
            return new NextResponse(res.body as unknown as BodyInit, {
              status: 200,
              headers: {
                "Content-Type": contentType,
                "Cache-Control": "public, max-age=31536000, immutable",
                "Access-Control-Allow-Origin": "*",
              },
            });
          }
        }
      } catch (listErr) {
        console.error("[image-route] list query error:", listErr);
      }

      // 2. Direct get() fallback
      try {
        const result = await get(pathname, { token, access: "public" });
        if (result && result.stream) {
          return new NextResponse(result.stream as unknown as BodyInit, {
            status: 200,
            headers: {
              "Content-Type": "image/png",
              "Cache-Control": "public, max-age=31536000, immutable",
              "Access-Control-Allow-Origin": "*",
            },
          });
        }
      } catch (getErr) {
        console.warn("[image-route] get public error:", getErr);
      }
    }

    return new NextResponse("Card image not found", { status: 404 });
  } catch (error) {
    console.error("[image-route] Error retrieving card image:", error);
    return new NextResponse("Failed to load card image", { status: 500 });
  }
}
