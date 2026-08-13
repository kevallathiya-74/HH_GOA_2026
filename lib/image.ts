// Client-only — uses html-to-image
import { toPng } from "html-to-image";

export async function exportCard(el: HTMLElement): Promise<string> {
  return toPng(el, {
    cacheBust: true,
    pixelRatio: 2, // ponytail: 2x for retina; bump to 3x only if print quality needed
  });
}
