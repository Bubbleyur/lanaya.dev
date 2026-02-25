"use client";

import React from "react";
import TerminalSection from "@/components/ui/TerminalSection";
import { usePalette } from "@/context/PaletteContext";

export default function BlogHero() {
  const { currentPalette } = usePalette();

  return (
    <TerminalSection id="blog-hero" className="min-h-[40vh] flex flex-col justify-center items-center px-4 pt-32 pb-16">
      <div className="w-full max-w-5xl space-y-6 relative text-center">
         <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 border border-stone-800 bg-stone-900/50 mx-auto" style={{ borderColor: `${currentPalette.tint}22` }}>
            <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: currentPalette.tint }} />
            <span className="text-[10px] uppercase tracking-[0.4em] text-stone-500 font-mono">Thought_Process // Knowledge_Base</span>
          </div>

          <h1 className="text-5xl md:text-8xl font-bold tracking-tighter leading-none" style={{ color: currentPalette.tint }}>
            CHRONICLES
          </h1>
          <p className="text-lg md:text-xl text-stone-400 font-mono max-w-2xl mx-auto leading-relaxed">
            Documenting my journey through code, architecture, and the digital frontier.
          </p>
        </div>
      </div>
    </TerminalSection>
  );
}
