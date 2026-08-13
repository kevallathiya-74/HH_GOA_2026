// Client-only — uses html-to-image
import { toPng } from "html-to-image";

export async function exportCard(el: HTMLElement): Promise<string> {
  return toPng(el, {
    cacheBust: false,
    pixelRatio: 2,
    fontEmbedCSS: "", // Skips cross-origin CSS rule reading to prevent SecurityError on external fonts
  });
}
