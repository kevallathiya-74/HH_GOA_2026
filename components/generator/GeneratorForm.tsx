"use client";

import { useCallback, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formSchema, type FormValues } from "@/lib/validation";
import { exportCard } from "@/lib/image";
import { buildXIntent, getShareCaption } from "@/lib/share";
import { getBaseUrl } from "@/lib/url";
import PhotoUpload from "./PhotoUpload";
import CardPreview from "@/components/card/CardPreview";
import type { CardData } from "@/components/card/BuilderCard";

type Step = "idle" | "generating-title" | "generating-card" | "done";

export default function GeneratorForm() {
  const cardRef = useRef<HTMLDivElement>(null!);
  const [photo, setPhoto] = useState("");
  const [builderTitle, setBuilderTitle] = useState("");
  const [step, setStep] = useState<Step>("idle");
  const [cardId, setCardId] = useState("");
  const [cardUrl, setCardUrl] = useState("");
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormValues>({ resolver: zodResolver(formSchema) });

  const name = watch("name", "");
  const role = watch("role", "");
  const skills = watch("skills", "");

  const cardData: CardData = {
    name,
    role,
    skills: skills ?? "",
    title: builderTitle,
    photoUrl: photo,
  };

  const generateTitle = useCallback(async () => {
    if (!name || !role) return;
    setStep("generating-title");
    setError("");
    try {
      const res = await fetch("/api/builder-title", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, role, skills }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Title generation failed");
      setBuilderTitle(data.title);
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setStep("idle");
    }
  }, [name, role, skills]);

  const onSubmit = async () => {
    if (!photo) {
      setError("Please upload a photo first.");
      return;
    }
    if (!builderTitle) {
      setError("Please generate your builder title first.");
      return;
    }
    setError("");
    setStep("generating-card");

    try {
      // 1. Export card as PNG data URL (client-side)
      const dataUrl = await exportCard(cardRef.current);

      // 2. Generate unique ID for this card
      const safeName = (name || "builder").toLowerCase().replace(/[^a-z0-9]/g, "-").slice(0, 40);
      const uniqueId = `${safeName}-${Date.now()}`;

      let finalCardId = uniqueId;
      let finalImageUrl = dataUrl;

      // 3. Upload to Vercel Blob via API
      try {
        const res = await fetch("/api/cards", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ imageDataUrl: dataUrl, name, id: uniqueId }),
        });
        const data = await res.json();
        if (res.ok && data.id) {
          finalCardId = data.id;
          finalImageUrl = data.imageUrl || `${getBaseUrl()}/api/cards/${data.id}/image`;
        }
      } catch (uploadErr) {
        console.warn("[generate] Blob upload note:", uploadErr);
      }

      setCardId(finalCardId);
      setCardUrl(finalImageUrl);
      setStep("done");

      const finalShareUrl = `${getBaseUrl()}/card/${finalCardId}`;
      if (process.env.NODE_ENV === "development") {
        console.log("X Share URL:", finalShareUrl);
        if (!finalShareUrl.includes("/card/")) {
          console.error("ERROR: X share URL is not a generated card URL");
        }
      }
    } catch (e) {
      console.error("[generate] Error:", (e as Error).message);
      setError((e as Error).message);
      setStep("idle");
    }
  };

  const download = () => {
    if (!cardRef.current) return;
    exportCard(cardRef.current)
      .then((dataUrl) => {
        const a = document.createElement("a");
        a.download = `hh-goa-builder-id-${Date.now()}.png`;
        a.href = dataUrl;
        a.click();
      })
      .catch((err) => {
        console.error("[download] Export error:", err);
      });
  };

  const publicShareUrl = cardId
    ? `${getBaseUrl()}/card/${cardId}`
    : `${getBaseUrl()}/card/${(name || "builder").toLowerCase().replace(/[^a-z0-9]/g, "-")}-${Date.now()}`;
  const xIntentUrl = buildXIntent(publicShareUrl);

  const copyShareText = async () => {
    const caption = getShareCaption(publicShareUrl);
    try {
      await navigator.clipboard.writeText(caption);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch (err) {
      console.warn("[clipboard] Write failed:", err);
    }
  };

  return (
    <section
      id="generate"
      className="w-full max-w-7xl mx-auto px-4 md:px-8 py-6 md:py-10"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* ── Left: Form Panel (5 cols / ~40%) ── */}
        <div className="lg:col-span-5 flex flex-col gap-6 bg-[#FBF6EA] border-2 border-primary/20 rounded-2xl p-6 md:p-8 shadow-xs">
          {/* Header */}
          <div className="border-b-2 border-primary/15 pb-4">
            <h2 className="font-display text-2xl md:text-3xl font-black uppercase text-primary tracking-tight leading-tight">
              CREATE YOUR BUILDER ID
            </h2>
            <p className="font-body text-sm text-on-surface-variant mt-1">
              Turn your photo into an official HH Goa 2026 Builder ID in seconds.
            </p>
          </div>

          <div className="flex flex-col gap-5">
            {/* 1 — Photo Upload */}
            <PhotoUpload onPhoto={setPhoto} preview={photo || undefined} />

            {/* 2 — Details */}
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2 border-b border-primary/20 pb-1.5">
                <span className="font-label text-[11px] font-black text-primary uppercase tracking-widest">
                  Your Details
                </span>
              </div>

              {/* Name */}
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="name"
                  className="font-label text-[10px] font-bold text-on-surface-variant uppercase tracking-widest"
                >
                  Full Name
                </label>
                <input
                  id="name"
                  type="text"
                  placeholder="e.g. Keval Lathiya"
                  className="bg-paper-white border border-primary/20 rounded-lg px-3.5 py-2.5 font-body text-sm text-on-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                  {...register("name")}
                />
                {errors.name && (
                  <p className="font-label text-error text-[10px] font-bold uppercase tracking-wider">
                    {errors.name.message}
                  </p>
                )}
              </div>

              {/* Role */}
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="role"
                  className="font-label text-[10px] font-bold text-on-surface-variant uppercase tracking-widest"
                >
                  Role
                </label>
                <input
                  id="role"
                  type="text"
                  placeholder="e.g. Full-Stack Developer"
                  className="bg-paper-white border border-primary/20 rounded-lg px-3.5 py-2.5 font-body text-sm text-on-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                  {...register("role")}
                />
                {errors.role && (
                  <p className="font-label text-error text-[10px] font-bold uppercase tracking-wider">
                    {errors.role.message}
                  </p>
                )}
              </div>

              {/* Skills */}
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="skills"
                  className="font-label text-[10px] font-bold text-on-surface-variant uppercase tracking-widest"
                >
                  Top Skills{" "}
                  <span className="normal-case font-normal text-outline text-[10px]">
                    (comma-separated, e.g. React, TS, AI)
                  </span>
                </label>
                <input
                  id="skills"
                  type="text"
                  placeholder="React, TypeScript, AI, Node.js"
                  className="bg-paper-white border border-primary/20 rounded-lg px-3.5 py-2.5 font-body text-sm text-on-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                  {...register("skills")}
                />
              </div>
            </div>

            {/* 3 — Builder Title */}
            <div className="flex flex-col gap-1.5">
              <label className="font-label text-[10px] font-bold text-primary uppercase tracking-widest flex items-center justify-between">
                <span>Builder Title</span>
              </label>
              <div className="flex items-center gap-2">
                <div className="flex-grow bg-paper-white border border-primary/20 rounded-lg px-3.5 py-2.5 font-body italic text-[#E94F72] font-bold text-xs md:text-sm min-h-[42px] flex items-center shadow-2xs">
                  {builderTitle || (
                    <span className="text-outline not-italic text-xs font-normal">
                      Click ↻ to generate your title →
                    </span>
                  )}
                </div>
                <button
                  type="button"
                  onClick={generateTitle}
                  disabled={!name || !role || step === "generating-title"}
                  title="Generate creative title"
                  className="bg-surface-container-high text-primary p-2.5 rounded-lg border border-primary/20 hover:bg-primary-container hover:text-on-primary transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center shadow-xs"
                >
                  <span
                    className={`material-symbols-outlined text-lg ${
                      step === "generating-title" ? "animate-spin" : ""
                    }`}
                  >
                    autorenew
                  </span>
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <p className="font-label text-[11px] font-bold text-error uppercase tracking-wider bg-error-container/40 p-2.5 rounded-lg border border-error/20">
                ⚠ {error}
              </p>
            )}

            {/* ── Actions ── */}
            {step !== "done" ? (
              <button
                type="button"
                onClick={handleSubmit(onSubmit)}
                disabled={step !== "idle"}
                className="w-full bg-primary text-on-primary font-display font-extrabold text-sm md:text-base py-3.5 rounded-full btn-shadow hover:-translate-y-0.5 transition-transform disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-2 shadow-md cursor-pointer"
              >
                <span className="material-symbols-outlined text-lg">badge</span>
                {step === "generating-card" ? "Generating Card…" : "Generate My ID Card"}
              </button>
            ) : (
              /* Post-Generation CTAs */
              <div className="flex flex-col gap-2.5 pt-1">
                <div className="bg-primary/10 border border-primary/20 rounded-lg py-2 px-3 text-center">
                  <p className="font-label text-[11px] font-black text-primary uppercase tracking-widest">
                    ✓ Your Builder ID is Ready!
                  </p>
                </div>

                <button
                  type="button"
                  onClick={download}
                  className="w-full bg-primary text-on-primary font-body font-bold text-xs md:text-sm py-3 rounded-full btn-shadow hover:-translate-y-0.5 transition-transform flex items-center justify-center gap-2 shadow-sm cursor-pointer"
                >
                  <span className="material-symbols-outlined text-lg">download</span>
                  Download PNG
                </button>

                <a
                  href={xIntentUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-[#E94F72] text-white font-body font-bold text-xs md:text-sm py-3 rounded-full hover:bg-[#d83a64] hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 text-center shadow-sm"
                >
                  <span className="material-symbols-outlined text-lg">share</span>
                  Share on X with #FrameInGoa
                </a>

                <button
                  type="button"
                  onClick={copyShareText}
                  className="w-full bg-surface-container-high text-primary border border-primary/20 font-body font-medium text-xs py-2.5 rounded-full hover:bg-surface-container-highest transition-colors flex items-center justify-center gap-1.5 text-center cursor-pointer"
                >
                  <span className="material-symbols-outlined text-sm">
                    {copied ? "check" : "content_copy"}
                  </span>
                  {copied ? "✓ Copied Caption & Link!" : "Copy Caption & Link"}
                </button>

                {cardId && (
                  <a
                    href={publicShareUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-label text-[10px] font-bold text-outline uppercase tracking-widest text-center hover:text-primary transition-colors mt-1 underline"
                  >
                    View public share page (/card/{cardId}) →
                  </a>
                )}

                <button
                  type="button"
                  onClick={() => {
                    setStep("idle");
                    setCardId("");
                    setCardUrl("");
                  }}
                  className="font-label text-[10px] font-medium text-outline uppercase tracking-widest text-center hover:text-primary transition-colors cursor-pointer"
                >
                  Create another card ↻
                </button>
              </div>
            )}
          </div>
        </div>

        {/* ── Right: Card Live Preview (7 cols / ~60%) ── */}
        <div className="lg:col-span-7 flex flex-col items-center justify-start lg:sticky lg:top-24">
          <div className="w-full max-w-2xl">
            <CardPreview data={cardData} cardRef={cardRef} />
          </div>
        </div>
      </div>
    </section>
  );
}
