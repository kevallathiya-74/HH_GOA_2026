// Server-only
import { put } from "@vercel/blob";

export async function uploadCard(
  dataUrl: string,
  filename: string
): Promise<{ url: string; pathname: string }> {
  // dataUrl → Buffer
  const base64 = dataUrl.replace(/^data:image\/\w+;base64,/, "");
  const buffer = Buffer.from(base64, "base64");

  const blob = await put(`cards/${filename}.png`, buffer, {
    access: "public",
    contentType: "image/png",
  });

  return { url: blob.url, pathname: blob.pathname };
}
