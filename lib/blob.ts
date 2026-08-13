// Server-only
import { put, list } from "@vercel/blob";

export async function uploadCard(
  dataUrl: string,
  filename: string
): Promise<{ url: string; pathname: string }> {
  // dataUrl → Buffer
  const base64 = dataUrl.replace(/^data:image\/\w+;base64,/, "");
  const buffer = Buffer.from(base64, "base64");

  // Check if token exists
  const token = process.env.BLOB_READ_WRITE_TOKEN;

  if (!token) {
    throw new Error("BLOB_READ_WRITE_TOKEN is not configured.");
  }

  try {
    // Try public access first
    const blob = await put(`cards/${filename}.png`, buffer, {
      access: "public",
      contentType: "image/png",
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
      const privateBlob = await put(`cards/${filename}.png`, buffer, {
        access: "private",
        contentType: "image/png",
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
    const cleanId = id.replace(/^cards\//, "").replace(/\.png$/, "");
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
