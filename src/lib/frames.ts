export type FrameType = "none" | "browser" | "macbook" | "window-dark" | "window-light";

export interface FramePadding {
  top: number;
  right: number;
  bottom: number;
  left: number;
}

export interface FrameConfig {
  id: FrameType;
  name: string;
  /** Extra padding needed inside the frame for the image (unscaled) */
  padding: FramePadding;
}

export const FRAME_CONFIGS: FrameConfig[] = [
  { id: "none", name: "No frame", padding: { top: 0, right: 0, bottom: 0, left: 0 } },
  { id: "browser", name: "Browser", padding: { top: 40, right: 0, bottom: 0, left: 0 } },
  {
    id: "window-dark",
    name: "Window (dark)",
    padding: { top: 36, right: 0, bottom: 0, left: 0 },
  },
  {
    id: "window-light",
    name: "Window (light)",
    padding: { top: 36, right: 0, bottom: 0, left: 0 },
  },
  { id: "macbook", name: "MacBook", padding: { top: 20, right: 20, bottom: 40, left: 20 } },
];

/**
 * Draws a browser/window frame around an image area on a canvas context.
 * All coordinates and dimensions should already be scaled by the caller.
 * `scaledPad` contains the frame padding values after fitScale is applied.
 */
export function drawFrame(
  ctx: CanvasRenderingContext2D,
  frame: FrameType,
  x: number,
  y: number,
  width: number,
  height: number,
  borderRadius: number,
  scaledPad?: FramePadding
): void {
  if (frame === "none") return;

  const frameConfig = FRAME_CONFIGS.find((f) => f.id === frame);
  if (!frameConfig) return;

  // Use scaled padding if provided, otherwise fall back to raw config
  const pad = scaledPad ?? frameConfig.padding;
  const barHeight = pad.top;

  if (frame === "browser" || frame === "window-dark" || frame === "window-light") {
    const isDark = frame !== "window-light";
    const barColor = isDark ? "#1e1e1e" : "#e8e8e8";
    const dotColors = ["#ff5f57", "#febc2e", "#28c840"];
    const urlBarColor = isDark ? "#2d2d2d" : "#f5f5f5";

    // Title bar — drawn above the image using scaled bar height
    const barY = y - barHeight;
    ctx.fillStyle = barColor;
    drawRoundedRectTop(ctx, x, barY, width, barHeight, borderRadius);
    ctx.fill();

    // Traffic light dots — scale proportionally
    const dotScale = barHeight / frameConfig.padding.top;
    const dotRadius = 5 * dotScale;
    const dotY = barY + barHeight / 2;
    const dotStartX = x + 16 * dotScale;
    const dotSpacing = 20 * dotScale;

    dotColors.forEach((color, i) => {
      ctx.beginPath();
      ctx.arc(dotStartX + i * dotSpacing, dotY, dotRadius, 0, Math.PI * 2);
      ctx.fillStyle = color;
      ctx.fill();
    });

    // URL bar (browser frame only)
    if (frame === "browser") {
      const urlBarX = x + 80 * dotScale;
      const urlBarWidth = width - 160 * dotScale;
      const urlBarHeight = 22 * dotScale;
      const urlBarY = barY + (barHeight - urlBarHeight) / 2;

      if (urlBarWidth > 40) {
        ctx.fillStyle = urlBarColor;
        ctx.beginPath();
        ctx.roundRect(urlBarX, urlBarY, urlBarWidth, urlBarHeight, 6 * dotScale);
        ctx.fill();

        ctx.fillStyle = isDark ? "#808080" : "#999";
        const fontSize = Math.max(9, Math.round(11 * dotScale));
        ctx.font = `${fontSize}px Inter, system-ui, sans-serif`;
        ctx.textAlign = "center";
        ctx.fillText("picedit.app", x + width / 2, urlBarY + urlBarHeight * 0.7);
        ctx.textAlign = "start";
      }
    }
  } else if (frame === "macbook") {
    const bezelColor = "#1a1a1a";
    const bezelRadius = borderRadius + 8;

    ctx.fillStyle = bezelColor;
    ctx.beginPath();
    ctx.roundRect(
      x - pad.left,
      y - pad.top,
      width + pad.left + pad.right,
      height + pad.top + pad.bottom,
      bezelRadius
    );
    ctx.fill();

    // Camera dot
    ctx.beginPath();
    ctx.arc(x + width / 2, y - pad.top / 2, 3, 0, Math.PI * 2);
    ctx.fillStyle = "#333";
    ctx.fill();

    // Bottom chin
    const chinHeight = 16 * (pad.bottom / frameConfig.padding.bottom);
    const chinWidth = width * 0.35;
    ctx.fillStyle = "#2a2a2a";
    ctx.beginPath();
    ctx.roundRect(
      x + (width - chinWidth) / 2,
      y + height + pad.bottom - chinHeight - 4,
      chinWidth,
      chinHeight,
      [0, 0, 6, 6]
    );
    ctx.fill();
  }
}

function drawRoundedRectTop(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number
): void {
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + width - radius, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
  ctx.lineTo(x + width, y + height);
  ctx.lineTo(x, y + height);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.closePath();
}
