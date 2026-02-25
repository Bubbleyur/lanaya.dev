"use client";

import React from "react";
import { usePalette } from "@/context/PaletteContext";

interface AboutCardProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  className?: string;
}

export const AboutCard = ({ title, description, icon, className = "" }: AboutCardProps) => {
  const { currentPalette } = usePalette();

  return (
    <div 
      className={`group p-6 border bg-black/40 backdrop-blur-sm transition-all duration-300 hover:bg-black/60 ${className}`}
      style={{ borderColor: `${currentPalette.tint}33` }}
    >
      <div className="flex flex-col gap-4">
        {icon && (
          <div 
            className="w-10 h-10 flex items-center justify-center border"
            style={{ 
              color: currentPalette.tint,
              borderColor: `${currentPalette.tint}44`,
              backgroundColor: `${currentPalette.tint}11`
            }}
          >
            {icon}
          </div>
        )}
        <div>
          <h3 
            className="text-lg font-bold uppercase tracking-wider mb-2"
            style={{ color: currentPalette.tint }}
          >
            {title}
          </h3>
          <p className="text-sm text-slate-400 leading-relaxed font-mono">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};
