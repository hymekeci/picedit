export const EXPORT_PRESETS = [
  { id: "auto", name: "Original ratio", width: 0, height: 0 },
  { id: "twitter", name: "Twitter / X", width: 1200, height: 675 },
  { id: "linkedin", name: "LinkedIn", width: 1200, height: 627 },
  { id: "instagram", name: "Instagram", width: 1080, height: 1080 },
  { id: "facebook", name: "Facebook", width: 1200, height: 630 },
  { id: "og", name: "Open Graph", width: 1200, height: 630 },
  { id: "dribbble", name: "Dribbble", width: 1600, height: 1200 },
  { id: "producthunt", name: "Product Hunt", width: 1270, height: 760 },
] as const;

export type ExportPresetId = (typeof EXPORT_PRESETS)[number]["id"];

export interface EditorState {
  image: HTMLImageElement | null;
  gradientId: string;
  solidColor: string;
  backgroundType: "gradient" | "solid";
  padding: number;
  borderRadius: number;
  shadow: number;
  frameType: "none" | "browser" | "window-dark" | "window-light" | "macbook";
  exportPreset: ExportPresetId;
  scale: number;
}

export const DEFAULT_STATE: EditorState = {
  image: null,
  gradientId: "sunset",
  solidColor: "#1a1a2e",
  backgroundType: "gradient",
  padding: 64,
  borderRadius: 12,
  shadow: 40,
  frameType: "none",
  exportPreset: "auto",
  scale: 2,
};

export const BMAC_URL = "https://buymeacoffee.com/picedit";
export const GITHUB_URL = "https://github.com/hymekeci/picedit";
