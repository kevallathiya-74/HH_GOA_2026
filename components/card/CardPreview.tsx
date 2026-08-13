"use client";

import BuilderCard, { type CardData } from "./BuilderCard";

interface Props {
  data: CardData;
  cardRef: React.RefObject<HTMLDivElement | null>;
  isGenerated?: boolean;
}

export default function CardPreview({ data, cardRef, isGenerated }: Props) {
  return (
    <div className="flex flex-col gap-4 items-center w-full">
      {/* State Header on Preview Column */}
      <div className="w-full flex flex-col items-center md:items-start text-center md:text-left mb-1">
        <div className="inline-flex items-center gap-2 mb-1">
          <span className="w-2.5 h-2.5 rounded-full bg-secondary animate-pulse" />
          <h2 className="font-display text-xl sm:text-2xl font-black uppercase tracking-tight text-primary">
            YOUR BUILDER ID CARD
          </h2>
        </div>
        <p className="font-body text-xs sm:text-sm text-on-surface-variant">
          {isGenerated
            ? "Your card is ready! Download it or share it with the world."
            : "Your personalized HH Goa card will appear here after generation."}
        </p>
      </div>

      {/* Large Dominant Card Container (up to 720px) */}
      <div className="w-full max-w-[720px] transition-all duration-300">
        <BuilderCard data={data} cardRef={cardRef} />
      </div>
    </div>
  );
}
