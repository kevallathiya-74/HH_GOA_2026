import { NextResponse } from "next/server";
import { builderTitleSchema } from "@/lib/validation";
import { generateBuilderTitle } from "@/lib/gemini";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = builderTitleSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    }
    const { name, role, skills } = parsed.data;
    const title = await generateBuilderTitle(name, role, skills);
    return NextResponse.json({ title });
  } catch (e) {
    console.error("[builder-title]", e);
    return NextResponse.json({ error: "Title generation failed" }, { status: 500 });
  }
}
