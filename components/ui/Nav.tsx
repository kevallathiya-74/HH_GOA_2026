"use client";

import Link from "next/link";
import { useState } from "react";

export default function Nav() {
  return (
    <header className="w-full bg-[#FBF6EA] border-b-2 border-primary/20 sticky top-0 z-40 shadow-xs">
      <div className="flex justify-between items-center w-full max-w-7xl mx-auto px-4 md:px-8 py-3">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-3 group">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logo.jpg"
            alt="HH Goa Logo"
            className="w-9 h-9 md:w-10 md:h-10 rounded-full object-cover border-2 border-primary shadow-xs group-hover:scale-105 transition-transform"
          />
          <div className="flex flex-col">
            <span className="font-display text-lg md:text-xl font-black tracking-tight uppercase text-primary leading-tight">
              HACKER HOUSE <span className="text-secondary font-bold">गोवा</span>
            </span>
            <span className="font-label text-[9px] md:text-[10px] text-primary/70 tracking-widest uppercase font-bold hidden sm:inline">
              Official Builder ID Generator
            </span>
          </div>
        </Link>

        {/* Center badge on desktop */}
        <div className="hidden md:flex items-center gap-2 bg-primary/10 border border-primary/20 px-3 py-1 rounded-full">
          <span className="w-2 h-2 rounded-full bg-stamp-red animate-pulse" />
          <span className="font-label text-xs font-bold text-primary tracking-widest uppercase">
            GOA 2026
          </span>
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-3">
          <a
            href="https://x.com/hashtag/FrameInGoa"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-primary text-on-primary font-label text-xs font-bold px-4 py-2 rounded-full btn-shadow hover:-translate-y-0.5 transition-transform flex items-center gap-1.5 shadow-sm"
          >
            <span>#FrameInGoa</span>
            <span className="material-symbols-outlined text-sm">open_in_new</span>
          </a>
        </div>
      </div>
    </header>
  );
}
