// Server-only
import { put } from "@vercel/blob";

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
    console.warn("[blob] BLOB_READ_WRITE_TOKEN is not set. Returning data URL.");
    return { url: dataUrl, pathname: `cards/${filename}` };
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
    console.warn("[blob] Public upload attempt note:", errorMsg);

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
        url: privateBlob.downloadUrl || privateBlob.url,
        pathname: privateBlob.pathname,
      };
    }

    // If other Vercel Blob error, return dataUrl as safe fallback so user flow is never blocked
    console.error("[blob] Vercel Blob upload failed, using data URL fallback:", errorMsg);
    return { url: dataUrl, pathname: `cards/${filename}` };
  }
}
