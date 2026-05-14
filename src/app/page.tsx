"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { DEFAULT_STATE, type EditorState } from "@/lib/constants";
import { downloadImage, copyToClipboard } from "@/lib/renderer";
import { Header } from "@/components/Header";
import { UploadZone } from "@/components/UploadZone";
import { Canvas } from "@/components/Canvas";
import { Controls } from "@/components/Controls";
import { Footer } from "@/components/Footer";

export default function Home() {
  const [state, setState] = useState<EditorState>(DEFAULT_STATE);
  const canvasRef = useRef<HTMLCanvasElement>(null!);


  const updateState = useCallback((partial: Partial<EditorState>) => {
    setState((prev) => ({ ...prev, ...partial }));
  }, []);

  const handleImageLoad = useCallback(
    (img: HTMLImageElement) => {
      updateState({ image: img });
    },
    [updateState]
  );

  const handleReset = useCallback(() => {
    setState(DEFAULT_STATE);
  }, []);

  // Global paste handler — works in both upload and editor mode
  useEffect(() => {
    const handlePaste = (e: ClipboardEvent) => {
      const items = e.clipboardData?.items;
      if (!items) return;

      for (let i = 0; i < items.length; i++) {
        const item = items[i];
        if (item.type.startsWith("image/")) {
          e.preventDefault();
          const file = item.getAsFile();
          if (file) {
            const url = URL.createObjectURL(file);
            const img = new Image();
            img.onload = () => handleImageLoad(img);
            img.src = url;
          }
          break;
        }
      }
    };

    document.addEventListener("paste", handlePaste);
    return () => document.removeEventListener("paste", handlePaste);
  }, [handleImageLoad]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const isMod = e.metaKey || e.ctrlKey;

      // Cmd+S = download
      if (isMod && e.key === "s") {
        e.preventDefault();
        if (canvasRef.current && state.image) {
          downloadImage(canvasRef.current, state);
        }
      }

      // Cmd+Shift+C = copy to clipboard
      if (isMod && e.shiftKey && e.key === "c") {
        e.preventDefault();
        if (canvasRef.current && state.image) {
          copyToClipboard(canvasRef.current, state);
        }
      }

      // Escape = reset
      if (e.key === "Escape" && state.image) {
        handleReset();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [state, handleReset]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {!state.image ? (
          <div className="max-w-3xl mx-auto px-4 py-16">
            <div className="text-center mb-10">
              <h1 className="text-4xl font-bold tracking-tight mb-3">
                Make your screenshots{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#f093fb] to-[#5c7cfa]">
                  beautiful
                </span>
              </h1>
              <p className="text-[var(--text-secondary)] text-lg max-w-xl mx-auto">
                Add stunning backgrounds, device frames, and shadows. Export for Twitter, LinkedIn,
                or your blog. Free, no signup required.
              </p>
            </div>
            <UploadZone onImageLoad={handleImageLoad} />
            <p className="text-center text-xs text-[var(--text-muted)] mt-4">
              Keyboard shortcuts: Cmd+V paste, Cmd+S download, Cmd+Shift+C copy, Esc reset
            </p>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row h-[calc(100vh-56px)]">
            <div className="flex-1 flex items-center justify-center p-4 lg:p-8 overflow-auto bg-[var(--bg-secondary)]">
              <Canvas state={state} canvasRef={canvasRef} />
            </div>

            <div className="w-full lg:w-80 xl:w-96 border-t lg:border-t-0 lg:border-l border-[var(--border)] bg-[var(--bg-primary)] overflow-y-auto">
              <Controls
                state={state}
                canvasRef={canvasRef}
                onUpdate={updateState}
                onReset={handleReset}
                onNewImage={handleImageLoad}
              />
            </div>
          </div>
        )}
      </main>

      {!state.image && <Footer />}
    </div>
  );
}
