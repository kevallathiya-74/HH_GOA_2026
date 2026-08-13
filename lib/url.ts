export function getBaseUrl(): string {
  if (process.env.NEXT_PUBLIC_APP_URL) {
    return process.env.NEXT_PUBLIC_APP_URL.replace(/\/$/, "");
  }
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  }
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  if (
    typeof window !== "undefined" &&
    window.location.origin &&
    !window.location.origin.includes("localhost") &&
    !window.location.origin.includes("127.0.0.1")
  ) {
    return window.location.origin;
  }
  return "https://hh-goa-2026-Nexus.vercel.app";
}
