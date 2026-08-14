"use client";

import { useCallback, useRef, useState } from "react";

interface Props {
  onPhoto: (dataUrl: string) => void;
  preview?: string;
}

const MAX_MB = 10; // Allow up to 10MB photos from modern phone cameras

function isHeicFile(file: File): boolean {
  const name = file.name.toLowerCase();
  const type = (file.type || "").toLowerCase();
  return (
    name.endsWith(".heic") ||
    name.endsWith(".heif") ||
    type.includes("heic") ||
    type.includes("heif")
  );
}

function isValidImageFile(file: File): boolean {
  const name = file.name.toLowerCase();
  const type = (file.type || "").toLowerCase();
  const validExtensions = [".jpg", ".jpeg", ".png", ".heic", ".heif", ".webp", ".gif", ".svg", ".avif", ".bmp"];
  return (
    type.startsWith("image/") ||
    validExtensions.some((ext) => name.endsWith(ext)) ||
    isHeicFile(file)
  );
}

export default function PhotoUpload({ onPhoto, preview }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragOver, setDragOver] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const process = useCallback(
    async (file: File) => {
      setError(null);

      if (!isValidImageFile(file)) {
        setError("Please upload a JPG, PNG, HEIC, or WebP photo.");
        return;
      }
      if (file.size > MAX_MB * 1024 * 1024) {
        setError(`File size must be under ${MAX_MB}MB.`);
        return;
      }

      setLoading(true);

      try {
        let src: Blob = file;

        // HEIC/HEIF conversion (iPhone / Android)
        if (isHeicFile(file)) {
          try {
            const heic2any = (await import("heic2any")).default;
            const result = await heic2any({ blob: file, toType: "image/png" });
            src = Array.isArray(result) ? result[0] : result;
          } catch (heicErr) {
            console.warn("HEIC direct conversion note:", heicErr);
            // Fallback to original blob if browser natively handles it
            src = file;
          }
        }

        const reader = new FileReader();
        reader.onload = (e) => {
          onPhoto(e.target?.result as string);
          setLoading(false);
        };
        reader.onerror = () => {
          setError("Failed to read image file. Please try another photo.");
          setLoading(false);
        };
        reader.readAsDataURL(src);
      } catch (err) {
        console.error("Image processing error:", err);
        setError("Failed to process photo. Please try another image.");
        setLoading(false);
      }
    },
    [onPhoto]
  );

  const onDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragOver(false);
      const file = e.dataTransfer.files[0];
      if (file) process(file);
    },
    [process]
  );

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) process(file);
  };

  return (
    <div className="flex flex-col gap-2">
      <label className="font-label text-label-caps text-primary uppercase tracking-widest">
        Upload Your Photo
      </label>

      {preview ? (
        /* Thumbnail state */
        <div className="relative rounded-xl overflow-hidden border-2 border-primary/40 aspect-[4/3] bg-surface-container-highest">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={preview}
            alt="Uploaded photo preview"
            className="w-full h-full object-cover"
          />
          <button
            type="button"
            onClick={() => {
              onPhoto("");
              if (inputRef.current) inputRef.current.value = "";
            }}
            className="absolute top-2 right-2 bg-primary text-on-primary rounded-full px-3 py-1 font-label text-label-caps uppercase tracking-widest text-xs hover:bg-primary-container transition-colors shadow-sm"
          >
            Change
          </button>
        </div>
      ) : (
        /* Drop zone */
        <div
          role="button"
          tabIndex={0}
          aria-label="Click to upload or drag and drop your photo"
          className={`border-2 border-dashed rounded-xl bg-paper-white p-8 flex flex-col items-center justify-center text-center cursor-pointer transition-colors ${
            dragOver
              ? "border-primary bg-surface-container-low"
              : "border-primary/30 hover:border-primary/60"
          }`}
          onClick={() => inputRef.current?.click()}
          onKeyDown={(e) => e.key === "Enter" && inputRef.current?.click()}
          onDragOver={(e) => {
            e.preventDefault();
            setDragOver(true);
          }}
          onDragLeave={() => setDragOver(false)}
          onDrop={onDrop}
        >
          {/* Upload icon */}
          <div
            className={`w-12 h-12 rounded-full flex items-center justify-center mb-4 transition-colors ${
              dragOver
                ? "bg-primary text-on-primary"
                : "bg-surface-container-highest text-primary"
            }`}
          >
            <span className="material-symbols-outlined">
              {loading ? "hourglass_top" : "upload_file"}
            </span>
          </div>
          <span className="font-body text-button-text text-primary mb-1">
            {loading ? "Processing photo…" : "Click to upload or drag and drop"}
          </span>
          <span className="font-body text-sm text-outline">
            JPG, PNG, HEIC, WebP 
          </span>
        </div>
      )}

      {error && (
        <p className="font-label text-label-caps text-error uppercase tracking-widest text-xs">
          ⚠ {error}
        </p>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/*,.heic,.heif,.HEIC,.HEIF"
        className="hidden"
        onChange={onInputChange}
        aria-hidden="true"
      />
    </div>
  );
}
