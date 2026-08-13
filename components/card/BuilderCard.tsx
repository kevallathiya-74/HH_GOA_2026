import React from "react";

export interface CardData {
  name: string;
  role: string;
  skills: string;
  title: string;
  photoUrl: string;
}

// Postage stamp corner SVG — inline so html-to-image captures it without network
const StampCorner = ({ className }: { className?: string }) => (
  <svg
    width="32"
    height="32"
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <rect
      x="1"
      y="1"
      width="30"
      height="30"
      rx="3"
      stroke="#003527"
      strokeWidth="1.5"
      strokeDasharray="3 2"
      fill="none"
    />
    <circle cx="16" cy="16" r="6" stroke="#003527" strokeWidth="1.2" fill="none" />
    <path
      d="M16 10V8M16 24V22M10 16H8M24 16H22"
      stroke="#003527"
      strokeWidth="1.2"
      strokeLinecap="round"
    />
  </svg>
);

// Palm tree SVG accent
const PalmAccent = ({ className }: { className?: string }) => (
  <svg
    width="40"
    height="56"
    viewBox="0 0 40 56"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path d="M20 56V28" stroke="#003527" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M20 28C20 28 8 22 4 14C10 12 18 20 20 28Z" fill="#0b4d3b" opacity="0.7" />
    <path d="M20 28C20 28 32 22 36 14C30 12 22 20 20 28Z" fill="#0b4d3b" opacity="0.7" />
    <path d="M20 24C20 24 12 14 14 6C18 8 22 18 20 24Z" fill="#003527" opacity="0.6" />
  </svg>
);

// Inline person avatar icon fallback
const PersonIcon = () => (
  <svg
    width="48"
    height="48"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#707974"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

interface Props {
  data: CardData;
  cardRef?: React.RefObject<HTMLDivElement | null>;
}

export default function BuilderCard({ data, cardRef }: Props) {
  const skills = data.skills
    ? data.skills
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean)
        .slice(0, 5)
    : [];

  return (
    <div
      ref={cardRef}
      className="relative w-full bg-paper-white rounded-2xl card-ambient-shadow overflow-hidden flex"
      style={{
        border: "10px solid #003527",
        aspectRatio: "4/3",
        minHeight: 320,
      }}
    >
      {/* Stamp corners */}
      <StampCorner className="absolute top-3 left-3 z-20 opacity-40" />
      <StampCorner className="absolute top-3 right-3 z-20 opacity-40 rotate-90" />
      <StampCorner className="absolute bottom-3 left-3 z-20 opacity-40 -rotate-90" />
      <StampCorner className="absolute bottom-3 right-3 z-20 opacity-40 rotate-180" />

      {/* Palm accent — top right decoration */}
      <PalmAccent className="absolute top-0 right-8 z-10 opacity-20" />

      {/* Photo — left 38% */}
      <div className="relative z-10 flex-shrink-0" style={{ width: "38%" }}>
        {data.photoUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={data.photoUrl}
            alt={`${data.name} photo`}
            className="w-full h-full object-cover object-center"
            style={{ display: "block" }}
          />
        ) : (
          <div className="w-full h-full bg-surface-container-highest flex items-center justify-center">
            <PersonIcon />
          </div>
        )}
        {/* Vertical dotted divider */}
        <div
          className="absolute top-4 right-0 bottom-4"
          style={{ width: 1, borderRight: "1px dashed rgba(0,53,39,0.3)" }}
        />
      </div>

      {/* Content — right 62% */}
      <div className="relative z-10 flex flex-col justify-between p-5 flex-1 overflow-hidden">
        {/* Header */}
        <div>
          <p
            className="font-label text-label-caps text-primary uppercase tracking-widest mb-1"
            style={{ fontSize: 10 }}
          >
            HH GOA 2026 · BUILDER ID
          </p>

          {/* Name */}
          <h2
            className="font-display text-primary leading-tight mb-1"
            style={{
              fontSize: "clamp(18px, 3.5vw, 28px)",
              fontWeight: 800,
              letterSpacing: "-0.02em",
            }}
          >
            {data.name || "YOUR NAME"}
          </h2>

          {/* Generated title */}
          {data.title && (
            <p
              className="font-body italic mb-2"
              style={{
                color: "#E94F72",
                fontSize: "clamp(11px, 1.8vw, 14px)",
                fontWeight: 600,
              }}
            >
              {data.title}
            </p>
          )}

          {/* Role */}
          <p
            className="font-label text-on-surface-variant uppercase tracking-widest mb-3"
            style={{ fontSize: 10 }}
          >
            {data.role || "ROLE"}
          </p>

          {/* Skills chips */}
          {skills.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {skills.map((skill) => (
                <span
                  key={skill}
                  className="font-label uppercase tracking-widest text-primary"
                  style={{
                    fontSize: 9,
                    border: "1px solid rgba(0,53,39,0.5)",
                    borderRadius: 9999,
                    padding: "2px 7px",
                  }}
                >
                  {skill}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-end justify-between">
          <div>
            <p
              className="font-label text-outline uppercase tracking-widest"
              style={{ fontSize: 9 }}
            >
              Goa, India · 2026
            </p>
            <p
              className="font-label uppercase tracking-widest"
              style={{ fontSize: 9, color: "#E94F72" }}
            >
              #FrameInGoa
            </p>
          </div>
          {/* Event badge */}
          <div
            className="font-display text-on-primary rounded-full flex items-center justify-center"
            style={{
              backgroundColor: "#003527",
              width: 44,
              height: 44,
              fontSize: 8,
              fontWeight: 800,
              textAlign: "center",
              lineHeight: 1.2,
              padding: "4px",
            }}
          >
            HH
            <br />
            GOA
          </div>
        </div>
      </div>
    </div>
  );
}
