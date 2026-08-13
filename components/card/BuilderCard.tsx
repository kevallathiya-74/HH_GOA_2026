import React from "react";

export interface CardData {
  name: string;
  role: string;
  skills: string;
  title: string;
  photoUrl: string;
}

interface Props {
  data: CardData;
  cardRef?: React.RefObject<HTMLDivElement | null>;
}

// Comprehensive real tech stack icon helper
function renderSkillIcon(skill: string) {
  const s = skill.toLowerCase().trim();

  // 1. React
  if (s.includes("react") && !s.includes("native")) {
    return (
      <svg className="w-4 h-4 text-[#61DAFB]" viewBox="0 0 115 100" fill="currentColor">
        <ellipse cx="57.5" cy="50" rx="10" ry="4.5" fill="currentColor" />
        <ellipse cx="57.5" cy="50" rx="55" ry="20" fill="none" stroke="currentColor" strokeWidth="5" />
        <ellipse cx="57.5" cy="50" rx="55" ry="20" fill="none" stroke="currentColor" strokeWidth="5" transform="rotate(60 57.5 50)" />
        <ellipse cx="57.5" cy="50" rx="55" ry="20" fill="none" stroke="currentColor" strokeWidth="5" transform="rotate(120 57.5 50)" />
      </svg>
    );
  }

  // 2. Next.js
  if (s.includes("next")) {
    return (
      <svg className="w-4 h-4 text-black" viewBox="0 0 180 180" fill="currentColor">
        <circle cx="90" cy="90" r="90" fill="black" />
        <path d="M149.508 157.438L69.1478 54H54V125.97H66.1136V69.3836L139.999 164.845C143.333 162.614 146.509 160.137 149.508 157.438Z" fill="white" />
        <rect x="115" y="54" width="12" height="72" fill="white" />
      </svg>
    );
  }

  // 3. TypeScript
  if (s === "ts" || s.includes("typescript")) {
    return (
      <svg className="w-4 h-4 rounded" viewBox="0 0 32 32">
        <rect width="32" height="32" rx="4" fill="#3178C6" />
        <text x="6" y="23" fill="white" fontSize="15" fontWeight="bold" fontFamily="sans-serif">TS</text>
      </svg>
    );
  }

  // 4. JavaScript
  if (s === "js" || s.includes("javascript")) {
    return (
      <svg className="w-4 h-4 rounded" viewBox="0 0 32 32">
        <rect width="32" height="32" rx="4" fill="#F7DF1E" />
        <text x="8" y="23" fill="#000" fontSize="15" fontWeight="bold" fontFamily="sans-serif">JS</text>
      </svg>
    );
  }

  // 5. Python
  if (s.includes("python") || s === "py") {
    return (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
        <path d="M11.91 0c-3.1 0-5.18.23-5.18 1.48v2.96h5.36v.74H4.37C1.4 5.18 0 6.96 0 10.15c0 3.32 1.63 4.96 4.63 4.96h1.48v-2.07c0-2.3 1.93-4.22 4.22-4.22h5.37V6.66c0-2.4-2.19-4.22-5.79-4.22v-2.44zm-2.07 1.48a.89.89 0 1 1 0 1.78.89.89 0 0 1 0-1.78z" fill="#3776AB"/>
        <path d="M12.09 24c3.1 0 5.18-.23 5.18-1.48v-2.96h-5.36v-.74h7.72c2.97 0 4.37-1.78 4.37-4.97 0-3.32-1.63-4.96-4.63-4.96h-1.48v2.07c0 2.3-1.93 4.22-4.22 4.22H8.3v2.16c0 2.4 2.19 4.22 5.79 4.22v2.44zm2.07-1.48a.89.89 0 1 1 0-1.78.89.89 0 0 1 0 1.78z" fill="#FFD43B"/>
      </svg>
    );
  }

  // 6. Solana
  if (s.includes("solana") || s.includes("sol")) {
    return (
      <svg className="w-4 h-4" viewBox="0 0 397 311" fill="none">
        <path d="M64.6 237.9c2.4-2.4 5.7-3.8 9.2-3.8h317.4c5.8 0 8.7 7 4.6 11.1l-62.7 62.7c-2.4 2.4-5.7 3.8-9.2 3.8H6.5c-5.8 0-8.7-7-4.6-11.1l62.7-62.7z" fill="#00FFA3"/>
        <path d="M64.6 3.8C67 1.4 70.3 0 73.8 0h317.4c5.8 0 8.7 7 4.6 11.1l-62.7 62.7c-2.4 2.4-5.7 3.8-9.2 3.8H6.5c-5.8 0-8.7-7-4.6-11.1L64.6 3.8z" fill="#00FFA3"/>
        <path d="M333.1 120.1c-2.4-2.4-5.7-3.8-9.2-3.8H6.5c-5.8 0-8.7 7-4.6 11.1l62.7 62.7c2.4 2.4 5.7 3.8 9.2 3.8h317.4c5.8 0 8.7-7 4.6-11.1l-62.7-62.7z" fill="#DC1FFF"/>
      </svg>
    );
  }

  // 7. Node.js
  if (s.includes("node")) {
    return (
      <svg className="w-4 h-4 text-[#539E43]" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2L2 7.8v11.4L12 25l10-5.8V7.8L12 2zm-1 16.5h-2v-7h2v7zm4 0h-2v-4.5c0-.8-.3-1.5-1.2-1.5s-1.3.7-1.3 1.5v4.5H9v-7h1.8v1c.5-.7 1.3-1.2 2.3-1.2 1.8 0 2.9 1.1 2.9 3.2v4z"/>
      </svg>
    );
  }

  // 8. Tailwind
  if (s.includes("tailwind")) {
    return (
      <svg className="w-4 h-4 text-[#38BDF8]" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.336 6.182 14.975 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.336 13.382 8.975 12 6.001 12z"/>
      </svg>
    );
  }

  // 9. AI / ML / Gemini
  if (s.includes("ai") || s.includes("ml") || s.includes("gemini") || s.includes("gpt") || s.includes("llm") || s.includes("claude")) {
    return (
      <svg className="w-4 h-4 text-[#9945FF]" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2L14.4 8.6L21 11L14.4 13.4L12 20L9.6 13.4L3 11L9.6 8.6L12 2Z" />
        <circle cx="19" cy="5" r="2" fill="#E94F72" />
      </svg>
    );
  }

  // 10. Rust
  if (s.includes("rust")) {
    return (
      <svg className="w-4 h-4 text-[#CE412B]" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 1a11 11 0 1 0 11 11A11 11 0 0 0 12 1zm0 2a9 9 0 1 1-9 9 9 9 0 0 1 9-9zm-3 4v10h2.5v-3.5h1.2l2.3 3.5H18l-2.7-4a3.3 3.3 0 0 0 2.2-3.1C17.5 8.2 16 7 14 7zm2.5 2.2h1.4c.8 0 1.3.4 1.3 1.1s-.5 1.1-1.3 1.1h-1.4z" />
      </svg>
    );
  }

  // 11. PostgreSQL / SQL / Database
  if (s.includes("postgres") || s.includes("sql") || s.includes("db") || s.includes("prisma")) {
    return (
      <svg className="w-4 h-4 text-[#336791]" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.48 2 2 4.02 2 6.5s4.48 4.5 10 4.5 10-2.02 10-4.5S17.52 2 12 2zm0 6.5C7.58 8.5 4 7.16 4 6.5S7.58 4.5 12 4.5s8 1.34 8 2-3.58 2-8 2zm8 3.5c-.75.76-2.3 1.4-4.22 1.76l.72 1.74c2.58-.5 4.46-1.46 5.5-2.6V12zm-16 0v.9c1.04 1.14 2.92 2.1 5.5 2.6l.72-1.74C8.3 13.4 6.75 12.76 6 12zm14 4.5c-.75.76-2.3 1.4-4.22 1.76l.72 1.74c2.58-.5 4.46-1.46 5.5-2.6v-.9zm-16 0v.9c1.04 1.14 2.92 2.1 5.5 2.6l.72-1.74C8.3 17.9 6.75 17.26 6 16.5z"/>
      </svg>
    );
  }

  // 12. MongoDB
  if (s.includes("mongo")) {
    return (
      <svg className="w-4 h-4 text-[#13AA52]" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 1.5C8 6 6.5 9.5 6.5 12.5c0 3.5 2.5 6.5 5.5 7.5 3-1 5.5-4 5.5-7.5C17.5 9.5 16 6 12 1.5zm0 17.5c-2.5-.8-4.5-3.2-4.5-6.5 0-2.3 1.2-5.2 4.5-9 3.3 3.8 4.5 6.7 4.5 9 0 3.3-2 5.7-4.5 6.5z"/>
      </svg>
    );
  }

  // 13. Docker
  if (s.includes("docker")) {
    return (
      <svg className="w-4 h-4 text-[#2496ED]" viewBox="0 0 24 24" fill="currentColor">
        <path d="M13.98 11.08h-2.12v2.13h2.12v-2.13zm-2.65 0H9.2v2.13h2.13v-2.13zm-2.66 0H6.55v2.13h2.12v-2.13zm5.31-2.65h-2.12v2.12h2.12V8.43zm-2.65 0H9.2v2.12h2.13V8.43zm-2.66 0H6.55v2.12h2.12V8.43zm7.97 0h-2.12v2.12h2.12V8.43zm-2.66-2.66h-2.12v2.13h2.12V5.77zm7.69 5.86c-.34-.23-1.1-.34-2.02-.13-.13-.74-.53-1.4-1.12-1.89l-.53-.41-.37.56c-.46.7-.62 1.55-.47 2.37-.47.26-1.2.32-1.85.32H1.54c-.33 0-.6.27-.6.6 0 3.32 1.77 5.77 4.7 6.46 1.05.25 2.21.28 3.42.11 3.23-.46 5.76-2.3 6.94-5.07.72.07 1.48-.05 2.12-.5.14-.1.19-.28.14-.45-.04-.15-.17-.26-.32-.28z"/>
      </svg>
    );
  }

  // 14. Figma
  if (s.includes("figma") || s.includes("ui/ux") || s.includes("design")) {
    return (
      <svg className="w-4 h-4" viewBox="0 0 38 57" fill="none">
        <path d="M19 28.5C19 23.2533 23.2533 19 28.5 19C33.7467 19 38 23.2533 38 28.5C38 33.7467 33.7467 38 28.5 38C23.2533 38 19 33.7467 19 28.5Z" fill="#1ABCFE"/>
        <path d="M0 47.5C0 42.2533 4.25329 38 9.5 38H19V47.5C19 52.7467 14.7467 57 9.5 57C4.25329 57 0 52.7467 0 47.5Z" fill="#0ACF83"/>
        <path d="M19 0V19H28.5C33.7467 19 38 14.7467 38 9.5C38 4.25329 33.7467 0 28.5 0H19Z" fill="#FF7262"/>
        <path d="M0 9.5C0 14.7467 4.25329 19 9.5 19H19V0H9.5C4.25329 0 0 4.25329 0 9.5Z" fill="#F24E1E"/>
        <path d="M0 28.5C0 33.7467 4.25329 38 9.5 38H19V19H9.5C4.25329 19 0 23.2533 0 28.5Z" fill="#A259FF"/>
      </svg>
    );
  }

  // 15. Vue
  if (s.includes("vue")) {
    return (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
        <path d="M2 3H6L12 13.5L18 3H22L12 21L2 3Z" fill="#42B883"/>
        <path d="M6 3H10L12 6.5L14 3H18L12 13.5L6 3Z" fill="#35495E"/>
      </svg>
    );
  }

  // 16. Go / Golang
  if (s === "go" || s.includes("golang")) {
    return (
      <svg className="w-4 h-4 text-[#00ADD8]" viewBox="0 0 24 24" fill="currentColor">
        <path d="M1.9 9.5c0-.1 0-.3.1-.4.2-.6.7-1 1.4-1.2.9-.2 1.9-.3 2.8-.3h.4c.5 0 .9.1 1.3.4.4.3.7.8.8 1.3.1.5.1 1.1 0 1.6-.1.6-.4 1.1-.9 1.4-.4.3-.9.4-1.5.4H5.6c-.6 0-1.1-.1-1.6-.4-.5-.3-.9-.7-1.1-1.3-.2-.5-.3-1-.2-1.5zm11.2-1.9c.5 0 1 .1 1.4.3.4.2.8.6 1 1 .2.5.3 1 .2 1.5 0 .5-.2 1-.5 1.4-.3.4-.7.7-1.2.8-.5.2-1 .2-1.6.2h-.4c-.5 0-1-.1-1.4-.3-.4-.2-.8-.6-1-1-.2-.5-.3-1-.2-1.5 0-.5.2-1 .5-1.4.3-.4.7-.7 1.2-.8.5-.2 1-.2 1.6-.2h.4z"/>
      </svg>
    );
  }

  // 17. Solidity / Web3 / Crypto
  if (s.includes("solidity") || s.includes("web3") || s.includes("crypto") || s.includes("eth")) {
    return (
      <svg className="w-4 h-4 text-[#363636]" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0L6 10.5L12 14.5L18 10.5L12 0Z" opacity="0.6"/>
        <path d="M6 11.5L12 22L18 11.5L12 15.5L6 11.5Z"/>
      </svg>
    );
  }

  // 18. GraphQL
  if (s.includes("graphql")) {
    return (
      <svg className="w-4 h-4 text-[#E10098]" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2L2 8v8l10 6 10-6V8l-10-6zm0 2.2L19.8 9 12 13.8 4.2 9 12 4.2zM4 10.5l7 4.3v6.9l-7-4.2v-7zm9 11.2v-6.9l7-4.3v7l-7 4.2z"/>
      </svg>
    );
  }

  // 19. Git / GitHub
  if (s.includes("git") || s.includes("github")) {
    return (
      <svg className="w-4 h-4 text-[#F05032]" viewBox="0 0 24 24" fill="currentColor">
        <path d="M2.6 10.59L8.38 4.8a2.15 2.15 0 0 1 3.04 0l1.24 1.24-2.82 2.82a1.86 1.86 0 0 0-1.8 1.83 1.86 1.86 0 0 0 .52 1.3l-2.02 2.02a1.86 1.86 0 0 0-1.3-.52c-1.02 0-1.85.83-1.85 1.85 0 1.02.83 1.85 1.85 1.85.99 0 1.8-.78 1.85-1.76l2-2a1.86 1.86 0 0 0 1.26.5c1.02 0 1.85-.83 1.85-1.85 0-.34-.1-.66-.27-.93l2.76-2.76 1.54 1.54a2.15 2.15 0 0 1 0 3.04l-5.78 5.79a2.15 2.15 0 0 1-3.04 0L2.6 13.63a2.15 2.15 0 0 1 0-3.04z"/>
      </svg>
    );
  }

  // Generic fallback tech chip icon
  return (
    <div className="w-4 h-4 bg-[#003527] text-[#ffe08a] font-mono text-[8.5px] font-black rounded flex items-center justify-center">
      &lt;/&gt;
    </div>
  );
}

export default function BuilderCard({ data, cardRef }: Props) {
  const skillsList = data.skills
    ? data.skills
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean)
        .slice(0, 5)
    : ["React", "TypeScript", "Node.js", "AI"];

  return (
    <div
      ref={cardRef}
      className="relative w-full overflow-hidden select-none"
      style={{
        aspectRatio: "1.4 / 1",
        backgroundColor: "#FBF6EA",
        border: "12px solid #003527",
        borderRadius: "26px",
        boxShadow: "0 20px 40px -10px rgba(0, 53, 39, 0.25)",
      }}
    >
      {/* ── Inner Dashed Border ── */}
      <div
        className="absolute inset-[6px] pointer-events-none rounded-[18px] z-20"
        style={{ border: "1.5px dashed rgba(0, 53, 39, 0.4)" }}
      />

      {/* ── Top Left Logo & Title (Moved right to left-9 for clear visibility and no overlap) ── */}
      <div className="absolute top-3.5 left-9 z-30 flex flex-col">
        <div className="flex items-baseline gap-1.5">
          <span
            className="font-serif tracking-tight text-[#003527]"
            style={{
              fontSize: "clamp(20px, 3.2vw, 32px)",
              fontWeight: 900,
              fontFamily: "Georgia, 'Times New Roman', serif",
              letterSpacing: "-0.02em",
            }}
          >
            HACKER
          </span>
          <span
            className="font-bold px-1 rounded transform -rotate-3 inline-block"
            style={{
              fontSize: "clamp(16px, 2.6vw, 26px)",
              color: "#FF3868",
              fontFamily: "sans-serif",
            }}
          >
            गोवा
          </span>
          <span
            className="font-serif tracking-tight text-[#003527]"
            style={{
              fontSize: "clamp(20px, 3.2vw, 32px)",
              fontWeight: 900,
              fontFamily: "Georgia, 'Times New Roman', serif",
              letterSpacing: "-0.02em",
            }}
          >
            HOUSE
          </span>
        </div>
        <div className="text-[#003527] font-mono tracking-widest text-[9px] md:text-[10px] font-extrabold mt-0.5 opacity-85">
          BUILD • SHIP • IMPACT
        </div>
      </div>

      {/* ── Top Right Postage Stamp & Built In Goa Stamp ── */}
      <div className="absolute top-3.5 right-6 z-20 flex items-center gap-3">
        {/* Circular pink stamp */}
        <div className="relative w-14 h-14 md:w-16 md:h-16 flex items-center justify-center">
          <svg className="w-full h-full text-[#E94F72]" viewBox="0 0 100 100" fill="none">
            <circle cx="50" cy="50" r="46" stroke="currentColor" strokeWidth="2.5" strokeDasharray="4 2" />
            <circle cx="50" cy="50" r="38" stroke="currentColor" strokeWidth="1.5" />
            <path id="curve-top" d="M 20 50 A 30 30 0 0 1 80 50" fill="none" />
            <path id="curve-bottom" d="M 80 50 A 30 30 0 0 1 20 50" fill="none" />
            <text fontSize="8.5" fontWeight="bold" fill="currentColor" letterSpacing="2">
              <textPath href="#curve-top" startOffset="50%" textAnchor="middle">
                BUILT IN GOA
              </textPath>
            </text>
            <text fontSize="7.5" fontWeight="bold" fill="currentColor" letterSpacing="1.5">
              <textPath href="#curve-bottom" startOffset="50%" textAnchor="middle">
                FOR THE WORLD
              </textPath>
            </text>
            {/* Center Hut & Sun */}
            <path d="M42 56h16v-8l-8-6-8 6v8z" fill="none" stroke="currentColor" strokeWidth="1.5" />
            <circle cx="50" cy="38" r="3.5" fill="currentColor" />
          </svg>
          {/* Postmark cancellation wavy lines */}
          <div className="absolute -right-5 top-1/2 -translate-y-1/2 flex flex-col gap-1 opacity-70">
            <svg width="24" height="20" viewBox="0 0 24 20" fill="none" stroke="#E94F72" strokeWidth="1.2">
              <path d="M0 4 Q6 0 12 4 T24 4" />
              <path d="M0 10 Q6 6 12 10 T24 10" />
              <path d="M0 16 Q6 12 12 16 T24 16" />
            </svg>
          </div>
        </div>

        {/* Green Scalloped Stamp Badge */}
        <div
          className="relative bg-[#003527] text-white px-2.5 py-1.5 rounded-sm flex flex-col items-center justify-center shadow-md"
          style={{
            clipPath:
              "polygon(0% 4px, 4px 4px, 4px 0%, 8px 0%, 8px 4px, 12px 4px, 12px 0%, 16px 0%, 16px 4px, 20px 4px, 20px 0%, 24px 0%, 24px 4px, 28px 4px, 28px 0%, 32px 0%, 32px 4px, 36px 4px, 36px 0%, 40px 0%, 40px 4px, 44px 4px, 44px 0%, 48px 0%, 48px 4px, 52px 4px, 52px 0%, 56px 0%, 56px 4px, 60px 4px, 60px 0%, 100% 0%, 100% 100%, 0% 100%)",
            border: "1.5px solid #002219",
          }}
        >
          <span className="font-serif tracking-widest text-[11px] font-bold text-[#F4BF24] uppercase">
            GOA
          </span>
          <span className="font-display text-base font-black leading-tight text-white">
            2026
          </span>
        </div>
      </div>

      {/* ── Main Layout Body (pt-[4.75rem] gives clear space below top header) ── */}
      <div className="relative z-10 w-full h-full flex pt-[4.6rem] md:pt-[4.9rem] pb-4 px-7">
        {/* ── Left Column: Framed Photo & Beach Artwork ── */}
        <div className="relative w-[34%] h-[88%] flex flex-col justify-between">
          {/* User Photo in Double-Green Frame */}
          <div
            className="relative w-full aspect-[4/4.8] rounded-2xl overflow-hidden bg-white shadow-md z-10"
            style={{ border: "3px solid #003527" }}
          >
            {data.photoUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={data.photoUrl}
                alt={`${data.name} photo`}
                className="w-full h-full object-cover object-center"
              />
            ) : (
              <div className="w-full h-full bg-[#eae2cb] flex flex-col items-center justify-center text-[#707974]">
                <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </div>
            )}
          </div>

          {/* Left Palm Fronds Curving Up (Positioned outside text zone so it never blocks HACKER) */}
          <div className="absolute top-1 -left-7 w-12 h-24 pointer-events-none z-10 opacity-70">
            <svg viewBox="0 0 60 120" fill="none">
              <path d="M4 120 Q 8 60 20 20" stroke="#003527" strokeWidth="2.5" strokeLinecap="round" />
              <path d="M20 20 C10 16 2 24 0 34 C8 28 16 32 20 20 Z" fill="#0B4D3B" />
              <path d="M20 20 C28 16 38 24 42 34 C32 28 24 32 20 20 Z" fill="#0B4D3B" />
              <path d="M16 45 C8 42 2 48 0 56 C6 52 12 55 16 45 Z" fill="#003527" />
              <path d="M12 70 C6 68 0 74 0 82 C5 78 10 80 12 70 Z" fill="#0B4D3B" />
            </svg>
          </div>

          {/* Bottom Left Tropical Beach Scenery Artwork */}
          <div className="absolute -bottom-3 -left-3 w-[150%] h-[42%] pointer-events-none z-20">
            <svg className="w-full h-full overflow-visible" viewBox="0 0 260 120" fill="none">
              {/* Golden Sun */}
              <circle cx="60" cy="85" r="26" fill="#F4BF24" />
              <circle cx="60" cy="85" r="32" stroke="#F4BF24" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.6" />

              {/* Blue & Green Ocean Waves */}
              <path d="M0 92 Q 40 85, 80 92 T 160 92 T 240 92 L 240 120 L 0 120 Z" fill="#0A7E6C" opacity="0.85" />
              <path d="M0 98 Q 35 93, 70 98 T 140 98 T 210 98 L 210 120 L 0 120 Z" fill="#06594C" />
              <path d="M5 93 Q 30 88 55 93" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" opacity="0.9" />
              <path d="M80 94 Q 110 89 140 94" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" opacity="0.9" />

              {/* Sand Shoreline */}
              <path d="M0 102 Q 60 98 120 106 T 260 108 L 260 120 L 0 120 Z" fill="#E8D19F" />

              {/* Yellow Surfboard with Pink Stripe */}
              <g transform="translate(10, 58) rotate(-14)">
                <ellipse cx="6" cy="30" rx="6" ry="28" fill="#F4BF24" stroke="#003527" strokeWidth="1.2" />
                <path d="M6 2 L6 58" stroke="#E94F72" strokeWidth="2.5" />
              </g>

              {/* Pink Tropical Hibiscus Flower */}
              <g transform="translate(20, 95) scale(0.65)">
                <circle cx="12" cy="12" r="5" fill="#F4BF24" />
                <circle cx="12" cy="4" r="5" fill="#E94F72" opacity="0.9" />
                <circle cx="4" cy="12" r="5" fill="#E94F72" opacity="0.9" />
                <circle cx="20" cy="12" r="5" fill="#E94F72" opacity="0.9" />
                <circle cx="8" cy="18" r="5" fill="#E94F72" opacity="0.9" />
                <circle cx="16" cy="18" r="5" fill="#E94F72" opacity="0.9" />
              </g>

              {/* Goan Heritage Houses along shoreline */}
              <g transform="translate(90, 78)">
                {/* House 1 - White & Pink */}
                <rect x="10" y="16" width="22" height="18" fill="#FFFDF5" stroke="#003527" strokeWidth="1" />
                <polygon points="8,16 21,5 34,16" fill="#D34B36" stroke="#003527" strokeWidth="1" />
                <rect x="18" y="24" width="6" height="10" fill="#003527" />
                <rect x="13" y="19" width="4" height="4" fill="#F4BF24" stroke="#003527" strokeWidth="0.8" />

                {/* House 2 - Green Village House */}
                <rect x="34" y="20" width="28" height="15" fill="#81BDA6" stroke="#003527" strokeWidth="1" />
                <polygon points="32,20 48,10 64,20" fill="#003527" />
                <rect x="39" y="23" width="5" height="5" fill="#FFFDF5" stroke="#003527" strokeWidth="0.8" />
                <rect x="52" y="23" width="5" height="5" fill="#F4BF24" stroke="#003527" strokeWidth="0.8" />

                {/* House 3 - Yellow Cottage */}
                <rect x="64" y="18" width="20" height="17" fill="#FFE08A" stroke="#003527" strokeWidth="1" />
                <polygon points="62,18 74,8 86,18" fill="#D34B36" stroke="#003527" strokeWidth="1" />
                <rect x="71" y="25" width="6" height="10" fill="#003527" />

                {/* Palm Trees between houses */}
                <path d="M30 22 Q 28 8 24 2" stroke="#003527" strokeWidth="1.5" />
                <path d="M24 2 Q 16 0 10 4 M24 2 Q 30 0 36 6 M24 2 Q 24 -6 20 -8" stroke="#0B4D3B" strokeWidth="1.5" />
                <path d="M88 20 Q 86 6 82 0" stroke="#003527" strokeWidth="1.5" />
                <path d="M82 0 Q 74 -2 68 2 M82 0 Q 88 -2 94 4" stroke="#0B4D3B" strokeWidth="1.5" />
              </g>
            </svg>
          </div>
        </div>

        {/* ── Right Column: Builder Details ── */}
        <div className="relative flex-1 pl-6 flex flex-col justify-between z-20">
          <div>
            {/* Full Name */}
            <h1
              className="font-serif tracking-tight text-[#003527] leading-[0.95] uppercase"
              style={{
                fontSize: "clamp(24px, 4.2vw, 42px)",
                fontWeight: 900,
                fontFamily: "Georgia, 'Arial Black', sans-serif",
                letterSpacing: "-0.02em",
              }}
            >
              {data.name || "YOUR NAME"}
            </h1>

            {/* Role in Coral/Pink with Code Brackets */}
            <div className="flex items-center gap-1.5 mt-1">
              <p
                className="font-mono uppercase tracking-wider text-[#E94F72] font-black"
                style={{ fontSize: "clamp(12px, 1.8vw, 16px)" }}
              >
                {data.role || "BUILDER"}
              </p>
              <span className="text-[#F4BF24] font-mono font-bold text-sm">&lt;/&gt;</span>
            </div>

            {/* Thin Horizontal Divider */}
            <div className="w-full my-2.5" style={{ height: "1px", backgroundColor: "rgba(0, 53, 39, 0.2)" }} />

            {/* Builder Title with Star Icon and Yellow Brush Underline */}
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5 text-[#003527] font-mono text-[10px] font-extrabold uppercase tracking-widest">
                <span className="text-[#F4BF24] text-sm leading-none">★</span>
                <span>BUILDER TITLE</span>
              </div>
              <div className="relative inline-block mt-0.5">
                <p
                  className="italic font-extrabold text-[#E94F72] leading-tight"
                  style={{
                    fontSize: "clamp(14px, 2.2vw, 22px)",
                    fontFamily: "'Brush Script MT', 'Epilogue', cursive, sans-serif",
                    letterSpacing: "-0.01em",
                  }}
                >
                  {data.title || "THE FULL-STACK VISIONARY"}
                </p>
                {/* Yellow Brush Underline Accent */}
                <svg className="w-48 h-2 text-[#F4BF24] mt-0.5 opacity-90" viewBox="0 0 200 8" fill="none">
                  <path d="M2 5 Q 60 1, 120 4 T 198 3" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                </svg>
              </div>
            </div>

            {/* Stack & Skills Section */}
            <div className="mt-2.5">
              <div className="flex items-center gap-1.5 text-[#003527] font-mono text-[10px] font-extrabold uppercase tracking-widest mb-1.5">
                <span className="text-sm leading-none">🌴</span>
                <span>STACK & SKILLS</span>
              </div>
              {/* Skill Badges with Icons */}
              <div className="flex flex-wrap items-center gap-2">
                {skillsList.map((skill) => (
                  <div
                    key={skill}
                    className="flex items-center gap-1.5 bg-white border border-[#003527]/30 rounded-lg px-2.5 py-1 shadow-sm"
                  >
                    {renderSkillIcon(skill)}
                    <span className="font-mono text-[10px] md:text-[11px] font-bold text-[#003527]">
                      {skill}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── Bottom Bar: Location, Hashtag, QR Code & Scooter ── */}
          <div className="flex items-end justify-between pt-2">
            {/* Location & Hashtag Pill */}
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center gap-1 text-[#003527] font-mono text-[11px] font-extrabold tracking-wider">
                <span className="text-[#E94F72] text-xs">📍</span>
                <span>GOA, INDIA</span>
              </div>
              <div
                className="bg-[#003527] text-[#F4BF24] font-mono font-black text-[10px] md:text-[11px] tracking-widest px-3 py-1 rounded-full uppercase inline-block shadow-sm"
              >
                #HHGOA2026
              </div>
            </div>

            {/* Stylized QR Code */}
            <div className="w-11 h-11 md:w-12 md:h-12 bg-white border-2 border-[#003527] p-1 rounded-lg flex items-center justify-center relative shadow-sm">
              <svg className="w-full h-full text-[#003527]" viewBox="0 0 32 32" fill="currentColor">
                <path d="M2 2h10v10H2V2zm2 2v6h6V4H4zm16-2h10v10H20V2zm2 2v6h6V4h-6zM2 20h10v10H2V20zm2 2v6h6v-6H4zm16 0h4v4h-4v-4zm6 0h4v4h-4v-4zm-6 6h4v4h-4v-4zm6 0h4v4h-4v-4z" />
              </svg>
              {/* Pink HH center icon in QR */}
              <div className="absolute inset-0 m-auto w-4 h-4 bg-[#E94F72] text-white font-bold text-[7px] flex items-center justify-center rounded-sm">
                HH
              </div>
            </div>
          </div>
        </div>

        {/* ── Right Side Directional Signpost & Vespa Scooter Illustration ── */}
        <div className="absolute bottom-2 right-2 w-32 h-44 pointer-events-none z-30">
          <svg className="w-full h-full overflow-visible" viewBox="0 0 140 180" fill="none">
            {/* Top Right Palm Fronds */}
            <g transform="translate(40, -15)">
              <path d="M40 0 Q 20 30 0 70" stroke="#003527" strokeWidth="2.5" />
              <path d="M0 70 C-10 60 -18 75 -24 90 C-12 85 0 90 0 70 Z" fill="#0B4D3B" />
              <path d="M10 50 C2 40 -8 55 -14 70 C-2 65 10 70 10 50 Z" fill="#003527" />
              <path d="M25 25 C15 15 5 30 0 45 C12 40 25 45 25 25 Z" fill="#0B4D3B" />
            </g>

            {/* Wooden Directional Signpost Pole */}
            <rect x="58" y="55" width="8" height="120" fill="#003527" rx="2" />

            {/* 1 - Yellow "BUILD" Arrow Plaque */}
            <g transform="translate(18, 56)">
              <polygon points="0,0 72,0 82,10 72,20 0,20 6,10" fill="#F4BF24" stroke="#003527" strokeWidth="1.5" />
              <text x="38" y="14" fill="#003527" fontSize="9" fontWeight="900" fontFamily="sans-serif" textAnchor="middle">
                BUILD
              </text>
            </g>

            {/* 2 - Pink "SHIP" Arrow Plaque (Pointing Left) */}
            <g transform="translate(24, 80)">
              <polygon points="10,0 82,0 76,10 82,20 10,20 0,10" fill="#E94F72" stroke="#003527" strokeWidth="1.5" />
              <text x="44" y="14" fill="#FFFFFF" fontSize="9" fontWeight="900" fontFamily="sans-serif" textAnchor="middle">
                SHIP
              </text>
            </g>

            {/* 3 - Yellow "IMPACT" Arrow Plaque */}
            <g transform="translate(20, 104)">
              <polygon points="0,0 72,0 82,10 72,20 0,20 6,10" fill="#F4BF24" stroke="#003527" strokeWidth="1.5" />
              <text x="38" y="14" fill="#003527" fontSize="8.5" fontWeight="900" fontFamily="sans-serif" textAnchor="middle">
                IMPACT
              </text>
            </g>

            {/* Retro Pink Vespa Scooter */}
            <g transform="translate(0, 118) scale(0.9)">
              {/* Back Wheel */}
              <circle cx="95" cy="46" r="11" fill="#222" stroke="#FFF" strokeWidth="2" />
              <circle cx="95" cy="46" r="6" fill="#DDD" />

              {/* Front Wheel */}
              <circle cx="16" cy="46" r="11" fill="#222" stroke="#FFF" strokeWidth="2" />
              <circle cx="16" cy="46" r="6" fill="#DDD" />

              {/* Scooter Body - Hot Pink */}
              <path
                d="M16 46 L24 20 L40 18 Q55 24 70 34 Q85 36 100 44 L80 48 L40 48 Z"
                fill="#E94F72"
                stroke="#003527"
                strokeWidth="1.5"
              />

              {/* Brown Leather Seat */}
              <path d="M50 22 Q 72 20 85 24 L82 28 Q 65 25 48 26 Z" fill="#F4BF24" stroke="#003527" strokeWidth="1.2" />

              {/* Handlebar & Chrome Headlight */}
              <path d="M24 20 L28 4" stroke="#003527" strokeWidth="2.5" strokeLinecap="round" />
              <circle cx="28" cy="4" r="5" fill="#FFE08A" stroke="#003527" strokeWidth="1.5" />
              <line x1="20" y1="5" x2="36" y2="5" stroke="#003527" strokeWidth="2" strokeLinecap="round" />
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
}
