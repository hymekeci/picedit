export interface GradientPreset {
  id: string;
  name: string;
  colors: string[];
  angle: number;
}

export const GRADIENT_PRESETS: GradientPreset[] = [
  { id: "sunset", name: "Sunset", colors: ["#f093fb", "#f5576c"], angle: 135 },
  { id: "ocean", name: "Ocean", colors: ["#4facfe", "#00f2fe"], angle: 135 },
  { id: "forest", name: "Forest", colors: ["#43e97b", "#38f9d7"], angle: 135 },
  { id: "lavender", name: "Lavender", colors: ["#a18cd1", "#fbc2eb"], angle: 135 },
  { id: "peach", name: "Peach", colors: ["#ffecd2", "#fcb69f"], angle: 135 },
  { id: "nightsky", name: "Night Sky", colors: ["#0c0c1d", "#1a1a3e", "#2d1b69"], angle: 160 },
  { id: "aurora", name: "Aurora", colors: ["#00c6fb", "#005bea"], angle: 135 },
  { id: "flame", name: "Flame", colors: ["#f83600", "#f9d423"], angle: 135 },
  { id: "berry", name: "Berry", colors: ["#8e2de2", "#4a00e0"], angle: 135 },
  { id: "mint", name: "Mint", colors: ["#0ba360", "#3cba92"], angle: 135 },
  { id: "coral", name: "Coral", colors: ["#ff9a9e", "#fecfef"], angle: 135 },
  { id: "steel", name: "Steel", colors: ["#485563", "#29323c"], angle: 135 },
  { id: "candy", name: "Candy", colors: ["#fa709a", "#fee140"], angle: 135 },
  { id: "twilight", name: "Twilight", colors: ["#0f0c29", "#302b63", "#24243e"], angle: 135 },
  { id: "emerald", name: "Emerald", colors: ["#11998e", "#38ef7d"], angle: 135 },
  { id: "rose", name: "Rose", colors: ["#ee9ca7", "#ffdde1"], angle: 135 },
];

export const SOLID_COLORS = [
  "#ffffff",
  "#f8f9fa",
  "#e9ecef",
  "#dee2e6",
  "#1a1a2e",
  "#0a0a0f",
  "#000000",
  "#ff6b6b",
  "#ffa94d",
  "#ffd43b",
  "#69db7c",
  "#4dabf7",
  "#9775fa",
  "#f783ac",
];
