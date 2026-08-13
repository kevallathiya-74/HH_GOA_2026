import type { Metadata } from "next";
import "./globals.css";
import Nav from "@/components/ui/Nav";
import Footer from "@/components/ui/Footer";
import { Analytics } from "@vercel/analytics/next";

export const metadata: Metadata = {
  title: "HH Goa 2026 — Builder ID Card Generator",
  description:
    "Create your official Hacker House Goa 2026 Builder ID Card. Upload your photo, personalize, and share with #FrameInGoa.",
  icons: {
    icon: [
      {
        url: "/favicon-for-public/web-app-manifest-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        url: "/favicon-for-public/web-app-manifest-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
    apple: [
      {
        url: "/favicon-for-public/web-app-manifest-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
    ],
  },
  openGraph: {
    title: "HH Goa 2026 — Builder ID Card Generator",
    description: "Create your official HH Goa 2026 Builder ID Card and share with #FrameInGoa.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link
          rel="icon"
          href="/favicon-for-public/web-app-manifest-192x192.png"
          type="image/png"
          sizes="192x192"
        />
        <link
          rel="apple-touch-icon"
          href="/favicon-for-public/web-app-manifest-192x192.png"
        />
        {/* Material Symbols for icons used in Stitch design */}
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen flex flex-col font-body text-on-surface antialiased">
        <Nav />
        <main className="flex-grow">{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
