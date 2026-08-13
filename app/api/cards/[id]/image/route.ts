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
    const cleanId = decodeURIComponent(id).replace(/^cards\//, "").replace(/\.png$/, "");
    const pathname = `cards/${cleanId}.png`;

    if (token) {
      // 1. Try direct get() with private access (returns stream)
      try {
        const result = await get(pathname, { token, access: "private" });
        if (result && result.stream) {
          return new NextResponse(result.stream as unknown as BodyInit, {
            status: 200,
            headers: {
              "Content-Type": "image/png",
              "Cache-Control": "public, max-age=31536000, immutable",
            },
          });
        }
      } catch (getErr) {
        console.warn("[image-route] get private error:", getErr);
      }

      // 2. Try get() with public access
      try {
        const result = await get(pathname, { token, access: "public" });
        if (result && result.stream) {
          return new NextResponse(result.stream as unknown as BodyInit, {
            status: 200,
            headers: {
              "Content-Type": "image/png",
              "Cache-Control": "public, max-age=31536000, immutable",
            },
          });
        }
      } catch (getErr) {
        console.warn("[image-route] get public error:", getErr);
      }

      // 3. Fallback: Search blob by prefix and fetch stream
      try {
        const { blobs } = await list({
          prefix: `cards/${cleanId}`,
          token,
          limit: 1,
        });

        if (blobs.length > 0) {
          const res = await fetch(blobs[0].url, {
            headers: { Authorization: `Bearer ${token}` },
          });
          if (res.ok && res.body) {
            return new NextResponse(res.body as unknown as BodyInit, {
              status: 200,
              headers: {
                "Content-Type": "image/png",
                "Cache-Control": "public, max-age=31536000, immutable",
              },
            });
          }
        }
      } catch (listErr) {
        console.error("[image-route] list query error:", listErr);
      }
    }

    return new NextResponse("Card image not found", { status: 404 });
  } catch (error) {
    console.error("[image-route] Error retrieving card image:", error);
    return new NextResponse("Failed to load card image", { status: 500 });
  }
}
