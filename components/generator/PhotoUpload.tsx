"use client";

import { useCallback, useRef, useState } from "react";

interface Props {
  onPhoto: (dataUrl: string) => void;
  preview?: string;
}

const ACCEPTED = ["image/jpeg", "image/png", "image/heic", "image/heif"];
const MAX_MB = 5;

export default function PhotoUpload({ onPhoto, preview }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragOver, setDragOver] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const process = useCallback(
    async (file: File) => {
      setError(null);

      if (!ACCEPTED.includes(file.type.toLowerCase())) {
        setError("Please upload a JPG, PNG, or HEIC file.");
        return;
      }
      if (file.size > MAX_MB * 1024 * 1024) {
        setError(`File must be under ${MAX_MB}MB.`);
        return;
      }

      let src: Blob = file;

      // HEIC → PNG conversion (client-side, lazy import)
      if (file.type === "image/heic" || file.type === "image/heif") {
        try {
          const heic2any = (await import("heic2any")).default;
          src = (await heic2any({ blob: file, toType: "image/png" })) as Blob;
        } catch {
          setError("Could not convert HEIC file. Try a JPG or PNG.");
          return;
        }
      }

      const reader = new FileReader();
      reader.onload = (e) => onPhoto(e.target?.result as string);
      reader.readAsDataURL(src);
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
            onClick={() => {
              onPhoto("");
              if (inputRef.current) inputRef.current.value = "";
            }}
            className="absolute top-2 right-2 bg-primary text-on-primary rounded-full px-3 py-1 font-label text-label-caps uppercase tracking-widest text-xs hover:bg-primary-container transition-colors"
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
          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={onDrop}
        >
          {/* Stamp icon */}
          <div
            className={`w-12 h-12 rounded-full flex items-center justify-center mb-4 transition-colors ${
              dragOver
                ? "bg-primary text-on-primary"
                : "bg-surface-container-highest text-primary"
            }`}
          >
            <span className="material-symbols-outlined">upload_file</span>
          </div>
          <span className="font-body text-button-text text-primary mb-1">
            Click to upload or drag and drop
          </span>
          <span className="font-body text-sm text-outline">
            JPG, PNG, HEIC (max {MAX_MB}MB)
          </span>
        </div>
      )}

      {error && (
        <p className="font-label text-label-caps text-error uppercase tracking-widest">
          {error}
        </p>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/heic,image/heif"
        className="hidden"
        onChange={onInputChange}
        aria-hidden="true"
      />
    </div>
  );
}
