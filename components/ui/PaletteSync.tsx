"use client";

import { useEffect } from "react";
import { usePalette } from "@/context/PaletteContext";

export default function PaletteSync() {
  const { currentPalette } = usePalette();

  useEffect(() => {
    document.documentElement.style.setProperty("--tint", currentPalette.tint);
    document.documentElement.style.setProperty("--background", currentPalette.background);
  }, [currentPalette]);

  return null;
}
