"use client";

import Link from "next/link";
import { useState } from "react";

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-background sticky top-0 z-50 border-b border-primary/20">
      <div className="flex justify-between items-center w-full px-margin-mobile md:px-margin-desktop py-3.5 max-w-container-max mx-auto">
        {/* Brand with Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logo.jpg"
            alt="HH Goa Logo"
            className="w-10 h-10 rounded-full object-cover border-2 border-primary/30 shadow-sm group-hover:scale-105 transition-transform"
          />
          <span className="font-display text-xl md:text-2xl font-extrabold tracking-tight uppercase text-primary">
            Hacker House Goa
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-6">
          <a
            href="#generate"
            className="font-body text-button-text text-on-surface-variant hover:text-primary transition-colors px-3 py-2 rounded"
          >
            Generate
          </a>
          <a
            href="https://x.com/hashtag/FrameInGoa"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-primary text-on-primary font-body text-button-text px-6 py-2 rounded-full btn-shadow hover:-translate-y-0.5 transition-transform"
          >
            #FrameInGoa
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-primary p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span className="material-symbols-outlined" style={{ fontSize: 28 }}>
            {menuOpen ? "close" : "menu"}
          </span>
        </button>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div className="md:hidden px-margin-mobile pb-4 border-t border-primary/10 bg-background">
          <div className="flex flex-col gap-2 pt-3">
            <a
              href="#generate"
              onClick={() => setMenuOpen(false)}
              className="font-body text-button-text text-on-surface-variant py-2"
            >
              Generate
            </a>
            <a
              href="https://x.com/hashtag/FrameInGoa"
              target="_blank"
              rel="noopener noreferrer"
              className="text-secondary font-body text-button-text py-2"
            >
              #FrameInGoa
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
