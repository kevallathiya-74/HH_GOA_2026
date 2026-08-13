export function buildXIntent(sharePageUrl: string, name?: string): string {
  const params = new URLSearchParams({
    text: "Just generated my HH Goa 2026 Builder ID! 🌴",
    url: sharePageUrl,
    hashtags: "FrameInGoa,HackerHouseGoa",
  });
  return `https://x.com/intent/tweet?${params.toString()}`;
}

export function getShareCaption(sharePageUrl: string): string {
  return `Just generated my HH Goa 2026 Builder ID! 🌴\n\n#FrameInGoa #HackerHouseGoa\n\n${sharePageUrl}`;
}
