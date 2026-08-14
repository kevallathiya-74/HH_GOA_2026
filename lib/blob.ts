// Server-only
import { put, list } from "@vercel/blob";

export async function uploadCard(
  dataUrl: string,
  filename: string
): Promise<{ url: string; pathname: string }> {
  // Extract contentType dynamically from dataUrl (supports png, jpeg, webp, gif, svg, etc.)
  const match = dataUrl.match(/^data:(image\/[a-zA-Z0-9\+\-\.]+);base64,/);
  const contentType = match ? match[1] : "image/png";
  const ext = contentType.split("/")[1]?.replace("+xml", "") || "png";
  const base64 = dataUrl.replace(/^data:image\/\w+;base64,/, "");
  const buffer = Buffer.from(base64, "base64");

  // Check if token exists
  const token = process.env.BLOB_READ_WRITE_TOKEN;

  if (!token) {
    throw new Error("BLOB_READ_WRITE_TOKEN is not configured.");
  }

  try {
    // Try public access first
    const blob = await put(`cards/${filename}.${ext}`, buffer, {
      access: "public",
      contentType,
      token,
    });
    return { url: blob.url, pathname: blob.pathname };
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : String(err);

    // If the store is configured with private access, use access: "private"
    if (
      errorMsg.includes("private store") ||
      errorMsg.includes("private access") ||
      errorMsg.includes("Cannot use public access")
    ) {
      const privateBlob = await put(`cards/${filename}.${ext}`, buffer, {
        access: "private",
        contentType,
        token,
      });
      return {
        url: privateBlob.url,
        pathname: privateBlob.pathname,
      };
    }

    console.error("[blob] Vercel Blob upload failed:", errorMsg);
    throw new Error(`Blob upload failed: ${errorMsg}`);
  }
}

export async function getCardBlobUrl(id: string): Promise<string | null> {
  const token = process.env.BLOB_READ_WRITE_TOKEN;
  if (!token) return null;

  try {
    const cleanId = id.replace(/^cards\//, "").replace(/\.[a-zA-Z0-9]+$/i, "");
    const { blobs } = await list({
      prefix: `cards/${cleanId}`,
      token,
      limit: 1,
    });
    if (blobs.length > 0) {
      return blobs[0].url;
    }
  } catch (err) {
    console.error("[blob] list error:", err);
  }
  return null;
}
