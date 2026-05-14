"use client";

import { useRef, useCallback, useState } from "react";
import { GRADIENT_PRESETS, SOLID_COLORS } from "@/lib/gradients";
import { FRAME_CONFIGS } from "@/lib/frames";
import { EXPORT_PRESETS, type EditorState, type ExportPresetId } from "@/lib/constants";
import { downloadImage, copyToClipboard } from "@/lib/renderer";

interface ControlsProps {
  state: EditorState;
  canvasRef: React.RefObject<HTMLCanvasElement>;
  onUpdate: (partial: Partial<EditorState>) => void;
  onReset: () => void;
  onNewImage: (img: HTMLImageElement) => void;
}

export function Controls({ state, canvasRef, onUpdate, onReset, onNewImage }: ControlsProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [copyFeedback, setCopyFeedback] = useState(false);

  const handleExport = useCallback(async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    await downloadImage(canvas, state);
  }, [state, canvasRef]);

  const handleCopy = useCallback(async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ok = await copyToClipboard(canvas, state);
    if (ok) {
      setCopyFeedback(true);
      setTimeout(() => setCopyFeedback(false), 2000);
    }
  }, [state, canvasRef]);

  const handleNewImage = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file || !file.type.startsWith("image/")) return;

      const url = URL.createObjectURL(file);
      const img = new Image();
      img.onload = () => onNewImage(img);
      img.src = url;

      // Reset so the same file can be selected again
      e.target.value = "";
    },
    [onNewImage]
  );

  return (
    <div className="p-4 space-y-5">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />

      {/* Export buttons */}
      <div className="flex gap-2">
        <button
          onClick={handleExport}
          className="flex-1 py-2.5 rounded-lg bg-gradient-to-r from-[#f093fb] to-[#5c7cfa] text-white font-medium text-sm hover:opacity-90 transition-opacity active:scale-[0.98]"
        >
          Download PNG ({state.scale}x)
        </button>
        <button
          onClick={handleCopy}
          className="px-4 py-2.5 rounded-lg border border-[var(--border)] text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--text-muted)] transition-colors active:scale-[0.98]"
          title="Copy to clipboard (Cmd+C)"
        >
          {copyFeedback ? (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-green-400">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          ) : (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
            </svg>
          )}
        </button>
      </div>

      {/* Export preset */}
      <Section title="Export size">
        <select
          value={state.exportPreset}
          onChange={(e) => onUpdate({ exportPreset: e.target.value as ExportPresetId })}
          className="w-full bg-[var(--bg-tertiary)] text-[var(--text-primary)] text-sm rounded-lg px-3 py-2 border border-[var(--border)] outline-none focus:border-[var(--accent)]"
        >
          {EXPORT_PRESETS.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name}
              {p.width > 0 ? ` (${p.width}x${p.height})` : ""}
            </option>
          ))}
        </select>
        <div className="flex gap-2 mt-2">
          {[1, 2, 3].map((s) => (
            <button
              key={s}
              onClick={() => onUpdate({ scale: s })}
              className={`flex-1 py-1.5 rounded-md text-xs font-medium transition-colors ${
                state.scale === s
                  ? "bg-[var(--accent)] text-white"
                  : "bg-[var(--bg-tertiary)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
              }`}
            >
              {s}x
            </button>
          ))}
        </div>
      </Section>

      {/* Background */}
      <Section title="Background">
        <div className="flex gap-1 mb-3">
          <button
            onClick={() => onUpdate({ backgroundType: "gradient" })}
            className={`flex-1 py-1.5 rounded-md text-xs font-medium transition-colors ${
              state.backgroundType === "gradient"
                ? "bg-[var(--accent)] text-white"
                : "bg-[var(--bg-tertiary)] text-[var(--text-secondary)]"
            }`}
          >
            Gradient
          </button>
          <button
            onClick={() => onUpdate({ backgroundType: "solid" })}
            className={`flex-1 py-1.5 rounded-md text-xs font-medium transition-colors ${
              state.backgroundType === "solid"
                ? "bg-[var(--accent)] text-white"
                : "bg-[var(--bg-tertiary)] text-[var(--text-secondary)]"
            }`}
          >
            Solid
          </button>
        </div>

        {state.backgroundType === "gradient" ? (
          <div className="grid grid-cols-8 gap-1.5">
            {GRADIENT_PRESETS.map((g) => (
              <button
                key={g.id}
                onClick={() => onUpdate({ gradientId: g.id })}
                className={`gradient-swatch ${state.gradientId === g.id ? "active" : ""}`}
                style={{
                  background: `linear-gradient(${g.angle}deg, ${g.colors.join(", ")})`,
                }}
                title={g.name}
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-7 gap-1.5">
            {SOLID_COLORS.map((color) => (
              <button
                key={color}
                onClick={() => onUpdate({ solidColor: color })}
                className={`gradient-swatch ${state.solidColor === color ? "active" : ""}`}
                style={{ background: color }}
                title={color}
              />
            ))}
          </div>
        )}
      </Section>

      {/* Padding */}
      <Section title="Padding">
        <SliderControl
          value={state.padding}
          min={0}
          max={200}
          onChange={(v) => onUpdate({ padding: v })}
        />
      </Section>

      {/* Border radius */}
      <Section title="Border radius">
        <SliderControl
          value={state.borderRadius}
          min={0}
          max={48}
          onChange={(v) => onUpdate({ borderRadius: v })}
        />
      </Section>

      {/* Shadow */}
      <Section title="Shadow">
        <SliderControl
          value={state.shadow}
          min={0}
          max={100}
          onChange={(v) => onUpdate({ shadow: v })}
        />
      </Section>

      {/* Device frame */}
      <Section title="Device frame">
        <div className="grid grid-cols-2 gap-1.5">
          {FRAME_CONFIGS.map((f) => (
            <button
              key={f.id}
              onClick={() => onUpdate({ frameType: f.id })}
              className={`py-2 px-3 rounded-lg text-xs font-medium transition-colors ${
                state.frameType === f.id
                  ? "bg-[var(--accent)] text-white"
                  : "bg-[var(--bg-tertiary)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
              }`}
            >
              {f.name}
            </button>
          ))}
        </div>
      </Section>

      {/* Actions */}
      <div className="flex gap-2 pt-2 border-t border-[var(--border)]">
        <button
          onClick={handleNewImage}
          className="flex-1 py-2 rounded-lg text-xs font-medium bg-[var(--bg-tertiary)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
        >
          Change image
        </button>
        <button
          onClick={onReset}
          className="flex-1 py-2 rounded-lg text-xs font-medium bg-[var(--bg-tertiary)] text-[var(--text-secondary)] hover:text-red-400 transition-colors"
        >
          Start over
        </button>
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-xs font-medium text-[var(--text-secondary)] mb-2 uppercase tracking-wider">
        {title}
      </label>
      {children}
    </div>
  );
}

function SliderControl({
  value,
  min,
  max,
  onChange,
}: {
  value: number;
  min: number;
  max: number;
  onChange: (v: number) => void;
}) {
  return (
    <div className="flex items-center gap-3">
      <input
        type="range"
        min={min}
        max={max}
        step={1}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="flex-1"
      />
      <span className="text-xs text-[var(--text-muted)] w-8 text-right tabular-nums">{value}</span>
    </div>
  );
}
