export function buildXIntent(sharePageUrl: string, name?: string): string {
  const text = `Just generated my HH Goa 2026 Builder ID! 🌴\n\n#FrameInGoa #HackerHouseGoa\n\n${sharePageUrl}`;
  // Use twitter.com/intent/tweet which is globally accessible across all networks/ISPs
  return `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`;
}

export function getShareCaption(sharePageUrl: string): string {
  return `Just generated my HH Goa 2026 Builder ID! 🌴\n\n#FrameInGoa #HackerHouseGoa\n\n${sharePageUrl}`;
}
