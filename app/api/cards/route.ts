import { NextResponse } from "next/server";
import { cardUploadSchema } from "@/lib/validation";
import { uploadCard } from "@/lib/blob";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = cardUploadSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    }
    const { imageDataUrl, name } = parsed.data;

    // Sanitize name for filename: strip non-alphanumeric, lowercase
    const safeName = name.toLowerCase().replace(/[^a-z0-9]/g, "-").slice(0, 40);
    const filename = `${safeName}-${Date.now()}`;

    const { url, pathname } = await uploadCard(imageDataUrl, filename);

    return NextResponse.json({ url, id: pathname });
  } catch (e) {
    console.error("[cards]", e);
    return NextResponse.json({ error: "Card upload failed" }, { status: 500 });
  }
}
