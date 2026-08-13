import GeneratorForm from "@/components/generator/GeneratorForm";

export default function HomePage() {
  return (
    <div className="w-full flex flex-col items-center">
      {/* ── Compact Official HH Goa Hero Banner ── */}
      <section className="w-full bg-primary text-on-primary relative overflow-hidden border-b-2 border-primary-container">
        {/* Background Tropical Wave Texture */}
        <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#ffe08a_1px,transparent_1px)] [background-size:16px_16px]" />
        
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-6 md:py-8 flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
          <div className="flex flex-col items-start text-left max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-[#002117] border border-[#81bda6]/30 px-3 py-1 rounded-full mb-2.5">
              <span className="text-secondary font-bold">🌴</span>
              <span className="font-label text-[11px] md:text-xs text-inverse-primary uppercase tracking-widest font-bold">
                Hacker House Goa 2026
              </span>
            </div>

            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-white leading-none mb-2">
              BUILD SOMETHING <span className="text-[#ffe08a]">LEGENDARY.</span>
            </h1>

            <p className="font-body text-sm sm:text-base text-[#97d3bb] max-w-xl">
              Turn your photo into your official HH Goa 2026 Builder ID in seconds.<br/> Share it with the community on X with <span className="text-white font-semibold">#FrameInGoa</span>.
            </p>
          </div>

          {/* Right side compact Goa visual badge */}
          <div className="hidden lg:flex items-center gap-4 bg-primary-container/60 border border-[#81bda6]/25 rounded-2xl p-3.5 shadow-sm">
            <div className="flex flex-col text-right">
              <span className="font-serif italic text-xs text-[#ffe08a]">Baga • Anjuna • Morjim</span>
              <span className="font-display text-sm font-black text-white uppercase tracking-wider">HACKATHON EDITION</span>
            </div>
            <a
              href="#generate"
              className="bg-[#ffe08a] text-primary font-display text-xs font-black px-4 py-2.5 rounded-full hover:bg-white transition-colors uppercase tracking-wider shadow-sm"
            >
              Start Creating ↓
            </a>
          </div>
        </div>
      </section>

      {/* ── Main Builder Generator ── */}
      <GeneratorForm />

      {/* ── Official Goa Decorative Strip Before Footer ── */}
      <section className="w-full max-w-7xl mx-auto px-4 md:px-8 py-6 my-4">
        <div className="w-full bg-[#FBF6EA] border-2 border-primary/20 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden shadow-xs">
          {/* Subtle background decoration */}
          <div className="flex flex-col gap-1 z-10">
            <div className="flex items-center gap-2">
              <span className="font-serif text-lg text-primary font-black">🌴 HACKER HOUSE GOA</span>
              <span className="bg-secondary text-white font-mono text-[10px] font-bold px-2 py-0.5 rounded uppercase">2026</span>
            </div>
            <p className="font-body text-xs md:text-sm text-on-surface-variant max-w-md">
              Connecting builders, designers, and founders under the Goan sun. Frame your journey and tag #FrameInGoa.
            </p>
          </div>

          {/* Goan Houses & Palm Silhouette Art */}
          <div className="flex items-center gap-4 text-xs font-mono text-primary font-bold">
            <span className="inline-flex items-center gap-1 bg-white border border-primary/20 px-3 py-1.5 rounded-lg shadow-2xs">
              📍 Goa, India
            </span>
            <span className="inline-flex items-center gap-1 bg-white border border-primary/20 px-3 py-1.5 rounded-lg shadow-2xs">
              🚀 Built for Builders
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}
