export function buildXIntent(publicCardUrl: string): string {
  const text = `Just generated my official HH Goa 2026 Builder ID! 🚀🌴\n\nBuild. Ship. Impact. Create yours & join the hackers:\n${publicCardUrl}\n\n#FrameInGoa #HHGoa2026`;
  const params = new URLSearchParams({ text });
  return `https://x.com/intent/post?${params.toString()}`;
}

export function getShareCaption(publicCardUrl: string): string {
  return `Just generated my official HH Goa 2026 Builder ID! 🚀🌴\n\nBuild. Ship. Impact. Create yours & join the hackers:\n${publicCardUrl}\n\n#FrameInGoa #HHGoa2026`;
}
