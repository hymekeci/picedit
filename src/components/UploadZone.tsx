"use client";

import { useCallback, useRef, useState } from "react";

interface UploadZoneProps {
  onImageLoad: (img: HTMLImageElement) => void;
}

export function UploadZone({ onImageLoad }: UploadZoneProps) {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const processFile = useCallback(
    (file: File) => {
      if (!file.type.startsWith("image/")) return;

      // Use createObjectURL instead of FileReader — faster, less memory
      const url = URL.createObjectURL(file);
      const img = new Image();
      img.onload = () => onImageLoad(img);
      img.src = url;
    },
    [onImageLoad]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      const file = e.dataTransfer.files[0];
      if (file) processFile(file);
    },
    [processFile]
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleClick = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) processFile(file);
      // Reset so the same file can be selected again
      e.target.value = "";
    },
    [processFile]
  );

  return (
    <div
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onClick={handleClick}
      className={`drop-zone cursor-pointer rounded-2xl border-2 border-dashed p-12 text-center transition-all ${
        isDragging
          ? "drag-over border-[var(--accent)]"
          : "border-[var(--border)] hover:border-[var(--text-muted)]"
      }`}
    >
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />

      <div className="mb-4">
        <svg
          width="48"
          height="48"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="mx-auto text-[var(--text-muted)]"
        >
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
          <polyline points="17 8 12 3 7 8" />
          <line x1="12" y1="3" x2="12" y2="15" />
        </svg>
      </div>

      <p className="text-[var(--text-primary)] font-medium mb-1">
        Drop your screenshot here, or click to browse
      </p>
      <p className="text-sm text-[var(--text-muted)]">
        Supports PNG, JPG, WebP. You can also paste from clipboard (Ctrl+V / Cmd+V)
      </p>
    </div>
  );
}
