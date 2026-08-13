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
      // Export card as PNG data URL (client-side html-to-image)
      const dataUrl = await exportCard(cardRef.current);

      // Upload to Vercel Blob via API
      const res = await fetch("/api/cards", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ imageDataUrl: dataUrl, name }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Upload failed");
      
      console.log("[generate] Card created successfully. Public URL:", data.url);
      setCardUrl(data.url);
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

  const getPublicShareUrl = () => {
    if (!cardUrl) return getBaseUrl();
    return `${getBaseUrl()}/card/${encodeURIComponent(btoa(cardUrl))}`;
  };

  const copyShareText = async () => {
    const shareUrl = getPublicShareUrl();
    const caption = getShareCaption(shareUrl);
    try {
      await navigator.clipboard.writeText(caption);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch (err) {
      console.warn("[clipboard] Write failed:", err);
    }
  };

  const publicShareUrl = getPublicShareUrl();
  const xIntentUrl = buildXIntent(publicShareUrl);

  return (
    <section
      id="generate"
      className="w-full px-margin-mobile md:px-margin-desktop py-8 md:py-12 max-w-container-max mx-auto"
    >
      <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter items-start">
        {/* ── Left: form panel (5 cols) ── */}
        <div className="md:col-span-5 flex flex-col gap-8">
          {/* Header */}
          <div>
            <h1 className="font-display text-display-lg-mobile md:text-display-lg text-primary mb-2">
              CREATE YOUR BUILDER ID
            </h1>
            <p className="font-body text-body-lg text-on-surface-variant">
              Turn your photo into your HH Goa 2026 Builder ID in seconds.
            </p>
          </div>

          <div className="flex flex-col gap-6">
            {/* 1 — Photo */}
            <PhotoUpload onPhoto={setPhoto} preview={photo || undefined} />

            {/* 2 — Details */}
            <div className="flex flex-col gap-4">
              <h3 className="font-label text-label-caps text-primary uppercase tracking-widest border-b border-primary/20 pb-2">
                Your Details
              </h3>

              <div className="flex flex-col gap-2">
                <label
                  htmlFor="name"
                  className="font-label text-label-caps text-on-surface-variant uppercase tracking-widest"
                >
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  placeholder="Your full name"
                  className="bg-paper-white border border-primary/20 rounded px-4 py-3 font-body text-on-surface focus:border-primary focus:ring-0 outline-none transition-colors"
                  {...register("name")}
                />
                {errors.name && (
                  <p className="font-label text-label-caps text-error text-xs uppercase tracking-widest">
                    {errors.name.message}
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-2">
                <label
                  htmlFor="role"
                  className="font-label text-label-caps text-on-surface-variant uppercase tracking-widest"
                >
                  Role
                </label>
                <input
                  id="role"
                  type="text"
                  placeholder="e.g. Full-Stack Developer"
                  className="bg-paper-white border border-primary/20 rounded px-4 py-3 font-body text-on-surface focus:border-primary focus:ring-0 outline-none transition-colors"
                  {...register("role")}
                />
                {errors.role && (
                  <p className="font-label text-label-caps text-error text-xs uppercase tracking-widest">
                    {errors.role.message}
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-2">
                <label
                  htmlFor="skills"
                  className="font-label text-label-caps text-on-surface-variant uppercase tracking-widest"
                >
                  Top Skills{" "}
                  <span className="normal-case font-body text-xs text-outline">
                    (optional, comma-separated)
                  </span>
                </label>
                <input
                  id="skills"
                  type="text"
                  placeholder="React, TypeScript, AI/ML"
                  className="bg-paper-white border border-primary/20 rounded px-4 py-3 font-body text-on-surface focus:border-primary focus:ring-0 outline-none transition-colors"
                  {...register("skills")}
                />
              </div>
            </div>

            {/* 3 — Builder Title */}
            <div className="flex flex-col gap-2">
              <label className="font-label text-label-caps text-primary uppercase tracking-widest">
                Builder Title
              </label>
              <div className="flex items-center gap-2">
                <div className="flex-grow bg-paper-white border border-primary/20 rounded px-4 py-3 font-body italic text-stamp-red min-h-[48px] flex items-center">
                  {builderTitle || (
                    <span className="text-outline not-italic text-sm">
                      Generate your builder title →
                    </span>
                  )}
                </div>
                <button
                  type="button"
                  onClick={generateTitle}
                  disabled={!name || !role || step === "generating-title"}
                  title="Generate builder title"
                  className="bg-surface-container-high text-primary p-3 rounded border border-primary/20 hover:bg-primary-container hover:text-on-primary transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  <span
                    className={`material-symbols-outlined ${
                      step === "generating-title" ? "animate-spin" : ""
                    }`}
                  >
                    autorenew
                  </span>
                </button>
              </div>
            </div>

            {/* Error */}
            {error && (
              <p className="font-label text-label-caps text-error uppercase tracking-widest text-sm">
                ⚠ {error}
              </p>
            )}

            {/* CTA */}
            {step !== "done" ? (
              <button
                type="button"
                onClick={handleSubmit(onSubmit)}
                disabled={step !== "idle"}
                className="w-full bg-primary text-on-primary font-display text-headline-md py-4 rounded-full btn-shadow hover:-translate-y-0.5 transition-transform disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined">badge</span>
                {step === "generating-card" ? "Generating…" : "Generate My ID Card"}
              </button>
            ) : (
              /* Post-generation actions */
              <div className="flex flex-col gap-3">
                <p className="font-label text-label-caps text-primary uppercase tracking-widest text-center">
                  ✓ Your Builder ID is ready!
                </p>

                <button
                  type="button"
                  onClick={download}
                  className="w-full bg-primary text-on-primary font-body text-button-text py-3 rounded-full btn-shadow hover:-translate-y-0.5 transition-transform flex items-center justify-center gap-2"
                >
                  <span className="material-symbols-outlined">download</span>
                  Download PNG
                </button>

                <a
                  href={xIntentUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-secondary text-on-secondary font-body text-button-text py-3 rounded-full btn-shadow-secondary hover:-translate-y-0.5 transition-transform flex items-center justify-center gap-2 text-center"
                >
                  <span className="material-symbols-outlined">share</span>
                  Share on X with #FrameInGoa
                </a>

                <button
                  type="button"
                  onClick={copyShareText}
                  className="w-full bg-surface-container-high text-primary border border-primary/20 font-body text-button-text py-3 rounded-full hover:bg-surface-container-highest transition-colors flex items-center justify-center gap-2 text-center"
                >
                  <span className="material-symbols-outlined">
                    {copied ? "check" : "content_copy"}
                  </span>
                  {copied ? "✓ Copied Caption to Clipboard!" : "Copy Caption & Link"}
                </button>

                {cardUrl && (
                  <a
                    href={`/card/${encodeURIComponent(btoa(cardUrl))}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-label text-label-caps text-outline uppercase tracking-widest text-center text-xs hover:text-primary transition-colors mt-1"
                  >
                    View public share page →
                  </a>
                )}

                <button
                  type="button"
                  onClick={() => {
                    setStep("idle");
                    setCardUrl("");
                  }}
                  className="font-label text-label-caps text-outline uppercase tracking-widest text-center text-xs hover:text-primary transition-colors"
                >
                  Make another card
                </button>
              </div>
            )}
          </div>
        </div>

        {/* ── Right: card preview (7 cols) ── */}
        <div className="md:col-span-7 flex items-start justify-center pt-4 md:pt-0 md:sticky md:top-24">
          <div className="w-full max-w-lg">
            <CardPreview data={cardData} cardRef={cardRef} />
          </div>
        </div>
      </div>
    </section>
  );
}
