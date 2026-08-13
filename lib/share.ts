export function buildXIntent(cardUrl: string, name: string): string {
  const text = `Just generated my HH Goa 2026 Builder ID! 🌴\n\n#FrameInGoa #HackerHouseGoa\n\n${cardUrl}`;
  return `https://x.com/intent/tweet?text=${encodeURIComponent(text)}`;
}
