import { GRADIENT_PRESETS } from "./gradients";
import { FRAME_CONFIGS, drawFrame, type FrameType } from "./frames";
import { EXPORT_PRESETS, type EditorState } from "./constants";

/**
 * Core rendering engine for Picedit.
 * Draws the complete scene (background + frame + image + shadow) onto a canvas.
 */
export function renderScene(
  canvas: HTMLCanvasElement,
  state: EditorState,
  forExport = false
): void {
  const ctx = canvas.getContext("2d");
  if (!ctx || !state.image) return;

  // Use devicePixelRatio for crisp preview on retina displays
  const dpr = forExport ? 1 : (typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1);
  const scale = forExport ? state.scale : dpr;
  const preset = EXPORT_PRESETS.find((p) => p.id === state.exportPreset);

  const imgWidth = state.image.naturalWidth;
  const imgHeight = state.image.naturalHeight;

  const frameConfig = FRAME_CONFIGS.find((f) => f.id === state.frameType);
  const framePad = frameConfig?.padding ?? { top: 0, right: 0, bottom: 0, left: 0 };

  const framedWidth = imgWidth + framePad.left + framePad.right;
  const framedHeight = imgHeight + framePad.top + framePad.bottom;

  let canvasW: number;
  let canvasH: number;

  if (preset && preset.width > 0 && preset.height > 0) {
    canvasW = preset.width;
    canvasH = preset.height;
  } else {
    canvasW = framedWidth + state.padding * 2;
    canvasH = framedHeight + state.padding * 2;
  }

  canvas.width = canvasW * scale;
  canvas.height = canvasH * scale;

  if (!forExport) {
    canvas.style.width = `${canvasW}px`;
    canvas.style.height = `${canvasH}px`;
  }

  ctx.scale(scale, scale);

  // 1. Draw background
  drawBackground(ctx, canvasW, canvasH, state);

  // 2. Calculate fit scale so image + frame fits in available space
  const availW = canvasW - state.padding * 2;
  const availH = canvasH - state.padding * 2;
  const fitScale = Math.min(availW / framedWidth, availH / framedHeight, 1);

  const scaledFramedW = framedWidth * fitScale;
  const scaledFramedH = framedHeight * fitScale;
  const scaledImgW = imgWidth * fitScale;
  const scaledImgH = imgHeight * fitScale;
  const scaledFramePad = {
    top: framePad.top * fitScale,
    right: framePad.right * fitScale,
    bottom: framePad.bottom * fitScale,
    left: framePad.left * fitScale,
  };

  const offsetX = (canvasW - scaledFramedW) / 2;
  const offsetY = (canvasH - scaledFramedH) / 2;

  const imgX = offsetX + scaledFramePad.left;
  const imgY = offsetY + scaledFramePad.top;
  const radius = state.borderRadius * fitScale;

  // 3. Draw shadow (using offscreen technique to avoid visible alpha fill)
  if (state.shadow > 0) {
    ctx.save();
    ctx.shadowColor = "rgba(0, 0, 0, 0.35)";
    ctx.shadowBlur = state.shadow * fitScale;
    ctx.shadowOffsetY = (state.shadow / 3) * fitScale;

    // Draw shadow shape off-screen, only the shadow is visible on canvas
    const shadowX = state.frameType !== "none" ? offsetX : imgX;
    const shadowY = state.frameType !== "none" ? offsetY : imgY;
    const shadowW = state.frameType !== "none" ? scaledFramedW : scaledImgW;
    const shadowH = state.frameType !== "none" ? scaledFramedH : scaledImgH;

    ctx.fillStyle = "rgba(0, 0, 0, 1)";
    ctx.beginPath();
    ctx.roundRect(shadowX, shadowY, shadowW, shadowH, radius);

    // Clip out the shape itself so only the shadow bleeds through
    ctx.save();
    ctx.beginPath();
    ctx.rect(0, 0, canvasW, canvasH);
    ctx.roundRect(shadowX, shadowY, shadowW, shadowH, radius);
    ctx.clip("evenodd");

    ctx.fillStyle = "rgba(0, 0, 0, 1)";
    ctx.shadowColor = "rgba(0, 0, 0, 0.35)";
    ctx.shadowBlur = state.shadow * fitScale;
    ctx.shadowOffsetY = (state.shadow / 3) * fitScale;
    ctx.beginPath();
    ctx.roundRect(shadowX, shadowY, shadowW, shadowH, radius);
    ctx.fill();
    ctx.restore();

    ctx.restore();
  }

  // 4. Draw frame with properly scaled padding
  if (state.frameType !== "none") {
    drawFrame(
      ctx,
      state.frameType as FrameType,
      imgX,
      imgY,
      scaledImgW,
      scaledImgH,
      radius,
      scaledFramePad
    );
  }

  // 5. Draw image with border radius clipping
  ctx.save();
  ctx.beginPath();

  if (state.frameType !== "none" && state.frameType !== "macbook") {
    // Clip only bottom corners when frame has a title bar
    ctx.moveTo(imgX, imgY);
    ctx.lineTo(imgX + scaledImgW, imgY);
    ctx.lineTo(imgX + scaledImgW, imgY + scaledImgH - radius);
    ctx.quadraticCurveTo(
      imgX + scaledImgW,
      imgY + scaledImgH,
      imgX + scaledImgW - radius,
      imgY + scaledImgH
    );
    ctx.lineTo(imgX + radius, imgY + scaledImgH);
    ctx.quadraticCurveTo(imgX, imgY + scaledImgH, imgX, imgY + scaledImgH - radius);
    ctx.lineTo(imgX, imgY);
  } else {
    ctx.roundRect(imgX, imgY, scaledImgW, scaledImgH, radius);
  }

  ctx.clip();
  ctx.drawImage(state.image, imgX, imgY, scaledImgW, scaledImgH);
  ctx.restore();
}

function drawBackground(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  state: EditorState
): void {
  if (state.backgroundType === "solid") {
    ctx.fillStyle = state.solidColor;
    ctx.fillRect(0, 0, width, height);
    return;
  }

  const gradient = GRADIENT_PRESETS.find((g) => g.id === state.gradientId);
  if (!gradient) {
    ctx.fillStyle = "#1a1a2e";
    ctx.fillRect(0, 0, width, height);
    return;
  }

  const angleRad = ((gradient.angle - 90) * Math.PI) / 180;
  const cx = width / 2;
  const cy = height / 2;
  const diag = Math.sqrt(width * width + height * height) / 2;

  const x1 = cx - Math.cos(angleRad) * diag;
  const y1 = cy - Math.sin(angleRad) * diag;
  const x2 = cx + Math.cos(angleRad) * diag;
  const y2 = cy + Math.sin(angleRad) * diag;

  const linearGrad = ctx.createLinearGradient(x1, y1, x2, y2);
  gradient.colors.forEach((color, i) => {
    linearGrad.addColorStop(i / (gradient.colors.length - 1), color);
  });

  ctx.fillStyle = linearGrad;
  ctx.fillRect(0, 0, width, height);
}

/**
 * Export the canvas as a PNG blob with memory cleanup.
 */
export function exportCanvas(canvas: HTMLCanvasElement, state: EditorState): Promise<Blob | null> {
  const tempCanvas = document.createElement("canvas");
  renderScene(tempCanvas, state, true);

  return new Promise((resolve) => {
    tempCanvas.toBlob(
      (blob) => {
        // Release canvas memory immediately
        tempCanvas.width = 0;
        tempCanvas.height = 0;
        resolve(blob);
      },
      "image/png",
      1.0
    );
  });
}

/**
 * Trigger a download of the exported image.
 */
export async function downloadImage(canvas: HTMLCanvasElement, state: EditorState): Promise<void> {
  const blob = await exportCanvas(canvas, state);
  if (!blob) return;

  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `picedit-${Date.now()}.png`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

/**
 * Copy the exported image to clipboard.
 */
export async function copyToClipboard(
  canvas: HTMLCanvasElement,
  state: EditorState
): Promise<boolean> {
  try {
    const blob = await exportCanvas(canvas, state);
    if (!blob) return false;

    await navigator.clipboard.write([
      new ClipboardItem({ "image/png": blob }),
    ]);
    return true;
  } catch {
    return false;
  }
}
