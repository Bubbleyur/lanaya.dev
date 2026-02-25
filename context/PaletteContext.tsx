"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Palette, palettes, defaultPalette } from '@/constants/palettes';

interface PaletteContextType {
  currentPalette: Palette;
  setPalette: (id: string) => void;
}

const PaletteContext = createContext<PaletteContextType | undefined>(undefined);

export const PaletteProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentPalette, setCurrentPaletteState] = useState<Palette>(defaultPalette);

  useEffect(() => {
    const savedPaletteId = localStorage.getItem('app-palette');
    if (savedPaletteId) {
      const found = palettes.find(p => p.id === savedPaletteId);
      if (found) {
        setCurrentPaletteState(found);
      }
    }
  }, []);

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
