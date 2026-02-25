"use client";

import React, { useState, useEffect } from "react";
import { usePalette } from "@/context/PaletteContext";

interface TerminalSectionProps {
  children: React.ReactNode;
  id: string;
  className?: string;
}

const TerminalSection = ({ children, id, className = "" }: TerminalSectionProps) => {
  const [systemRef, setSystemRef] = useState("");
  const { currentPalette } = usePalette();
  
  useEffect(() => {
    setSystemRef(`0x${Math.floor(Math.random() * 1000)}`);
  }, []);

  return (
    <section 
      id={id} 
      className={`relative w-full flex flex-col items-center ${className}`}
    >
      {/* 1. VERTIKAL LINES */}
      <div 
        className="absolute inset-y-0 left-0 w-[1px] md:ml-12 ml-6 transition-all duration-500" 
        style={{ background: `linear-gradient(to bottom, transparent, ${currentPalette.tint}33, transparent)` }} 
      />
      <div 
        className="absolute inset-y-0 right-0 w-[1px] md:mr-12 mr-6 transition-all duration-500" 
        style={{ background: `linear-gradient(to bottom, transparent, ${currentPalette.tint}33, transparent)` }} 
      />

      {/* 2. HORIZONTAL DIVIDER */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-stone-800/50">
        <span 
          className="absolute md:left-12 left-6 -translate-x-1/2 -translate-y-1/2 text-[12px] font-mono leading-none bg-black z-20 transition-colors duration-500"
          style={{ color: currentPalette.tint }}
        >+</span>
        <span 
          className="absolute md:right-12 right-6 translate-x-1/2 -translate-y-1/2 text-[12px] font-mono leading-none bg-black z-20 transition-colors duration-500"
          style={{ color: currentPalette.tint }}
        >+</span>
      </div>

      {/* 3. CONTENT AREA */}
      <div className="w-full px-6 md:px-12 py-24 md:py-32 relative z-10 pointer-events-none">
        <div className="pointer-events-auto w-full max-w-5xl mx-auto flex flex-col items-center">
          {/* Section ID Label */}
          <div className="w-full mb-8 flex items-center gap-2 opacity-40">
            <span 
              className="text-[10px] font-mono uppercase tracking-[0.4em] transition-all duration-500"
              style={{ 
                color: currentPalette.tint,
                filter: `drop-shadow(0 0 3px ${currentPalette.tint}99)`
              }}
            >
              {`// MOD_ID: ${id || "GLOBAL"}`}
            </span>
            <div 
              className="h-[1px] flex-1 transition-colors duration-500" 
              style={{ backgroundColor: `${currentPalette.tint}33` }}
            />
          </div>

          {children}
        </div>
      </div>

      {/* 4. SYSTEM REF */}
      <div className="absolute bottom-4 md:left-14 left-8 text-stone-800 text-[8px] font-mono tracking-tighter uppercase">
        System_Ref: {systemRef}
      </div>
    </section>
  );
};

export default TerminalSection;
