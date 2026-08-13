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
  const [copiedIntent, setCopiedIntent] = useState(false);
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

      // 2. Upload to storage if configured (non-blocking)
      try {
        const res = await fetch("/api/cards", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ imageDataUrl: dataUrl, name }),
        });
        const data = await res.json();
        if (res.ok && data.id) {
          setCardId(data.id);
          setCardUrl(data.url);
        }
      } catch (uploadErr) {
        console.warn("[generate] Blob upload skipped/unavailable:", uploadErr);
      }

      setStep("done");
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

  const publicShareUrl = cardId ? `${getBaseUrl()}/card/${cardId}` : getBaseUrl();
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
              Upload your photo, generate an AI title, and frame yourself in Goa 2026.
            </p>
          </div>

          <div className="flex flex-col gap-5">
            {/* 1 — Photo Upload */}
            <PhotoUpload onPhoto={setPhoto} preview={photo || undefined} />

            {/* 2 — Details */}
            <div className="flex flex-col gap-4">
              <h3 className="font-label text-xs text-primary font-black uppercase tracking-widest border-b border-primary/10 pb-1.5 flex items-center gap-1.5">
                <span>📍</span>
                <span>Your Details</span>
              </h3>

              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="name"
                  className="font-label text-xs text-primary/80 uppercase tracking-widest font-bold"
                >
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  placeholder="e.g. Satoshi Nakamoto"
                  className="bg-paper-white border-2 border-primary/20 rounded-xl px-4 py-2.5 font-body text-sm text-on-surface focus:border-primary focus:ring-0 outline-none transition-colors"
                  {...register("name")}
                />
                {errors.name && (
                  <p className="font-label text-error text-xs uppercase tracking-widest">
                    {errors.name.message}
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="role"
                  className="font-label text-xs text-primary/80 uppercase tracking-widest font-bold"
                >
                  Role
                </label>
                <input
                  id="role"
                  type="text"
                  placeholder="e.g. Full-Stack Dev / AI Researcher"
                  className="bg-paper-white border-2 border-primary/20 rounded-xl px-4 py-2.5 font-body text-sm text-on-surface focus:border-primary focus:ring-0 outline-none transition-colors"
                  {...register("role")}
                />
                {errors.role && (
                  <p className="font-label text-error text-xs uppercase tracking-widest">
                    {errors.role.message}
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="skills"
                  className="font-label text-xs text-primary/80 uppercase tracking-widest font-bold"
                >
                  Top Skills{" "}
                  <span className="normal-case font-body text-xs text-outline font-normal">
                    (optional, comma-separated)
                  </span>
                </label>
                <input
                  id="skills"
                  type="text"
                  placeholder="React, Next.js, Node.js"
                  className="bg-paper-white border-2 border-primary/20 rounded-xl px-4 py-2.5 font-body text-sm text-on-surface focus:border-primary focus:ring-0 outline-none transition-colors"
                  {...register("skills")}
                />
              </div>
            </div>

            {/* 3 — Builder Title */}
            <div className="flex flex-col gap-1.5">
              <label className="font-label text-xs text-primary font-black uppercase tracking-widest flex items-center gap-1">
                <span>★</span>
                <span>Builder Title</span>
              </label>
              <div className="flex items-center gap-2">
                <div className="flex-grow bg-paper-white border-2 border-primary/20 rounded-xl px-4 py-2.5 font-body italic text-stamp-red font-bold text-sm min-h-[46px] flex items-center truncate">
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
                  title="Generate builder title"
                  className="bg-primary text-on-primary p-2.5 rounded-xl border border-primary hover:bg-primary-container transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center shadow-xs"
                >
                  <span
                    className={`material-symbols-outlined text-xl ${
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
              <p className="font-label text-xs text-error font-bold uppercase tracking-widest bg-error-container/20 p-2.5 rounded-lg border border-error/30">
                ⚠ {error}
              </p>
            )}

            {/* CTA / Generation Actions */}
            {step !== "done" ? (
              <button
                type="button"
                onClick={handleSubmit(onSubmit)}
                disabled={step !== "idle"}
                className="w-full bg-primary text-on-primary font-display text-base md:text-lg font-black py-4 px-6 rounded-full btn-shadow hover:-translate-y-0.5 active:translate-y-0 transition-transform disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-md uppercase tracking-wider mt-2"
              >
                <span className="text-secondary text-xl">✨</span>
                <span>{step === "generating-card" ? "Generating Builder ID…" : "Generate My ID Card"}</span>
              </button>
            ) : (
              /* Post-generation actions with clean hierarchy */
              <div className="flex flex-col gap-3 pt-2">
                <div className="bg-primary/10 border border-primary/20 rounded-xl p-3 text-center">
                  <p className="font-display text-xs font-black text-primary uppercase tracking-widest">
                    ✓ Your Builder ID is ready!
                  </p>
                </div>

                {/* Primary CTA */}
                <button
                  type="button"
                  onClick={download}
                  className="w-full bg-primary text-on-primary font-display text-base font-black py-3.5 rounded-full btn-shadow hover:-translate-y-0.5 transition-transform flex items-center justify-center gap-2 shadow-md uppercase tracking-wider"
                >
                  <span className="material-symbols-outlined text-xl">download</span>
                  <span>Download PNG</span>
                </button>

                {/* Secondary / Social CTA */}
                <a
                  href={xIntentUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-secondary text-on-secondary font-display text-sm md:text-base font-black py-3.5 rounded-full btn-shadow-secondary hover:-translate-y-0.5 transition-transform flex items-center justify-center gap-2 text-center uppercase tracking-wider shadow-sm"
                >
                  <span className="material-symbols-outlined text-lg">share</span>
                  <span>Share on X with #FrameInGoa</span>
                </a>

                {/* Tertiary Copy Caption */}
                <button
                  type="button"
                  onClick={copyShareText}
                  className="w-full bg-surface-container-high text-primary border-2 border-primary/20 font-body text-xs md:text-sm font-bold py-3 rounded-full hover:bg-surface-container-highest transition-colors flex items-center justify-center gap-2 text-center"
                >
                  <span className="material-symbols-outlined text-lg">
                    {copied ? "check" : "content_copy"}
                  </span>
                  <span>{copied ? "✓ Copied Caption to Clipboard!" : "Copy Caption & Link"}</span>
                </button>

                <div className="flex items-center justify-between pt-2 px-1">
                  {cardId && (
                    <a
                      href={`/card/${cardId}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-label text-[11px] text-primary/80 uppercase tracking-widest hover:text-secondary font-bold transition-colors"
                    >
                      View public page →
                    </a>
                  )}

                  <button
                    type="button"
                    onClick={() => {
                      setStep("idle");
                      setCardId("");
                      setCardUrl("");
                    }}
                    className="font-label text-[11px] text-outline uppercase tracking-widest hover:text-primary font-bold transition-colors ml-auto"
                  >
                    Make another card ↻
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ── Right: Large Builder Card Preview (7 cols / ~60%) ── */}
        <div className="lg:col-span-7 flex flex-col items-center w-full lg:sticky lg:top-20">
          <CardPreview
            data={cardData}
            cardRef={cardRef}
            isGenerated={step === "done"}
          />
        </div>
      </div>
    </section>
  );
}
