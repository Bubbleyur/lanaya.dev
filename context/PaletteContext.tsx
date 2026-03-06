"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Palette, palettes, defaultPalette } from '@/constants/palettes';

interface PaletteContextType {
  currentPalette: Palette;
  setPalette: (id: string) => void;
}

const PaletteContext = createContext<PaletteContextType | undefined>(undefined);

export const PaletteProvider: React.FC<{ children: React.ReactNode; initialPalette?: Palette }> = ({ children, initialPalette }) => {
  const [currentPalette, setCurrentPaletteState] = useState<Palette>(initialPalette ?? defaultPalette);

  useEffect(() => {
    const savedPaletteId = localStorage.getItem('app-palette');
    if (savedPaletteId) {
      const found = palettes.find(p => p.id === savedPaletteId);
      if (found) {
        setCurrentPaletteState(found);
      }
    }
  }, []);

  // write CSS custom properties whenever palette changes
  useEffect(() => {
    document.documentElement.style.setProperty('--tint', currentPalette.tint);
    document.documentElement.style.setProperty('--background', currentPalette.background);
  }, [currentPalette]);

  const setPalette = (id: string) => {
    const found = palettes.find(p => p.id === id);
    if (found) {
      setCurrentPaletteState(found);
      localStorage.setItem('app-palette', id);
    }
  };

  return (
    <PaletteContext.Provider value={{ currentPalette, setPalette }}>
      {children}
    </PaletteContext.Provider>
  );
};

export const usePalette = () => {
  const context = useContext(PaletteContext);
  if (context === undefined) {
    throw new Error('usePalette must be used within a PaletteProvider');
  }
  return context;
};
