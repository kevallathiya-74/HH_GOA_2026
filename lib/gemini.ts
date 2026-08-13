// Server-only — do not import from client components
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function generateBuilderTitle(
  name: string,
  role: string,
  skills?: string
): Promise<string> {
  const model = genAI.getGenerativeModel({ model: "gemini-3.6-flash" });

  const prompt = `You are a creative title generator for a tech hackathon.
Generate a short, punchy builder title (2-5 words, ALL CAPS) for:
- Name: ${name}
- Role: ${role}
- Top Skills: ${skills || "not provided"}

Examples: "THE AI PRODUCT BUILDER", "THE FULL-STACK VISIONARY", "THE SYSTEMS ARCHITECT".
Return ONLY the title text, nothing else.`;

  const result = await model.generateContent(prompt);
  const text = result.response.text().trim().replace(/^["']|["']$/g, "");
  return text || "THE BUILDER";
}
