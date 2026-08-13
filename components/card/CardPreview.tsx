"use client";

import BuilderCard, { type CardData } from "./BuilderCard";

interface Props {
  data: CardData;
  cardRef: React.RefObject<HTMLDivElement | null>;
}

export default function CardPreview({ data, cardRef }: Props) {
  const isEmpty = !data.name && !data.role && !data.photoUrl;

  return (
    <div className="flex flex-col gap-4 items-center w-full">
      {isEmpty && (
        <p className="font-label text-label-caps text-outline uppercase tracking-widest text-center text-sm">
          Fill in your details to see your card
        </p>
      )}
      <div className="w-full max-w-lg">
        <BuilderCard data={data} cardRef={cardRef} />
      </div>
    </div>
  );
}
