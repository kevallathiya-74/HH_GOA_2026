export function buildXIntent(publicCardUrl: string): string {
  const params = new URLSearchParams({
    text: `Just generated my HH Goa 2026 Builder ID! 🌴\n\nCreate yours and join the builders.\n\n#FrameInGoa`,
    url: publicCardUrl,
  });

  return `https://x.com/intent/tweet?${params.toString()}`;
}

export function getShareCaption(publicCardUrl: string): string {
  return `Just generated my HH Goa 2026 Builder ID! 🌴\n\nCreate yours and join the builders.\n\n#FrameInGoa\n\n${publicCardUrl}`;
}
