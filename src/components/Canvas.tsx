"use client";

import { useRef, useEffect, useCallback } from "react";
import { renderScene } from "@/lib/renderer";
import type { EditorState } from "@/lib/constants";

interface CanvasProps {
  state: EditorState;
  canvasRef: React.RefObject<HTMLCanvasElement>;
}

export function Canvas({ state, canvasRef }: CanvasProps) {
  const rafId = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !state.image) return;

    // Cancel any pending frame to avoid stacking renders
    if (rafId.current) {
      cancelAnimationFrame(rafId.current);
    }

    // Throttle renders to screen refresh rate via requestAnimationFrame
    rafId.current = requestAnimationFrame(() => {
      renderScene(canvas, state, false);
    });

    return () => {
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }
    };
  }, [state, canvasRef]);

  if (!state.image) return null;

  return (
    <div className="flex items-center justify-center w-full h-full">
      <canvas
        ref={canvasRef}
        className="max-w-full max-h-full rounded-lg"
        style={{
          boxShadow: "0 4px 24px rgba(0, 0, 0, 0.3)",
        }}
      />
    </div>
  );
}
