export interface Palette {
  name: string;
  id: string;
  tint: string;      // Primary color (tint)
  accent: string;    // Medium/Secondary
  background: string; // Dark/Background
}

export const palettes: Palette[] = [
  {
    name: "Default",
    id: "default",
    tint: "#5d0dfd",
    accent: "#010033",
    background: "#001a12"
  },
  {
    name: "Phosphor Green",
    id: "phosphor-green",
    tint: "#00ff88",
    accent: "#003322",
    background: "#001a12"
  },
  {
    name: "Amber",
    id: "amber",
    tint: "#ffb000",
    accent: "#3a2200",
    background: "#1c1200"
  },
  {
    name: "Cyan",
    id: "cyan",
    tint: "#00e5ff",
    accent: "#002a30",
    background: "#001518"
  },
  {
    name: "Magenta",
    id: "magenta",
    tint: "#ff3ec9",
    accent: "#2a0030",
    background: "#150018"
  },
  {
    name: "Cold Blue",
    id: "cold-blue",
    tint: "#3ea6ff",
    accent: "#001a33",
    background: "#000d1a"
  }
];

export const defaultPalette = palettes[0];
