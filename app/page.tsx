import GeneratorForm from "@/components/generator/GeneratorForm";

export default function HomePage() {
  return (
    <>
      {/* Hero — Goa beach banner using Stitch reference illustration */}
      <div className="w-full bg-primary overflow-hidden relative" style={{ minHeight: 120 }}>
        {/* Retro-poster tropical header strip */}
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-8 flex items-center gap-6 relative z-10">
          <div className="flex-1">
            <p className="font-label text-label-caps text-inverse-primary uppercase tracking-widest mb-1">
              Hacker House Goa 2026
            </p>
            <p className="font-display text-on-primary text-display-lg-mobile md:text-display-lg leading-tight">
              BUILD SOMETHING<br />
              <span style={{ color: "#ffe08a" }}>LEGENDARY.</span>
            </p>
          </div>
          {/* Inline tropical palm illustration */}
          <svg
            aria-hidden
            className="hidden md:block flex-shrink-0 opacity-80"
            width="120"
            height="100"
            viewBox="0 0 120 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M60 100V50" stroke="#97d3bb" strokeWidth="2.5" strokeLinecap="round"/>
            <path d="M60 50C60 50 30 38 22 18C36 14 54 36 60 50Z" fill="#0b4d3b"/>
            <path d="M60 50C60 50 90 38 98 18C84 14 66 36 60 50Z" fill="#0b4d3b"/>
            <path d="M60 44C60 44 40 24 44 6C52 10 62 34 60 44Z" fill="#003527"/>
            <circle cx="90" cy="72" r="14" fill="#f0c116" opacity="0.9"/>
            <path d="M10 100 Q 20 80 35 100" stroke="#0b4d3b" strokeWidth="1.5" fill="none"/>
            <path d="M85 100 Q 95 85 108 100" stroke="#0b4d3b" strokeWidth="1.5" fill="none"/>
          </svg>
        </div>

        {/* Bottom wave */}
        <svg
          className="absolute bottom-0 left-0 w-full"
          viewBox="0 0 1200 30"
          preserveAspectRatio="none"
          fill="#F7EFD7"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M0 30 Q 300 0 600 20 Q 900 40 1200 10 L1200 30 Z" />
        </svg>
      </div>

      {/* Generator */}
      <GeneratorForm />
    </>
  );
}
