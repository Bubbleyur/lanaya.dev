"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import StaggeredMenu from '@/components/partials/staggeredmenu/StaggeredMenu';
import { usePalette } from '@/context/PaletteContext';
import { palettes } from '@/constants/palettes';
import { useTransitionNav } from '@/components/ui/TransitionProvider';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isPaletteOpen, setIsPaletteOpen] = useState(false);
  const { currentPalette, setPalette } = usePalette();
  const { navigate } = useTransitionNav();

  const togglePaletteMenu = () => {
    setIsPaletteOpen(!isPaletteOpen);
  };

  const menuItems: { label: string; link: string; }[] = [
    { label: 'Home', link: '/' },
    { label: 'About', link: '/about' },
    { label: 'Projects', link: '/projects' },
    { label: 'Contact', link: 'mailto:contact@alan.me' }
  ];

  const socialItems: { label: string; link: string; }[] = [
    { label: 'GitHub', link: 'https://github.com' },
    { label: 'LinkedIn', link: 'https://linkedin.com' }
  ];

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        .nav-noise {
          position: absolute; inset: 0; z-index: -1; opacity: 0.04;
          pointer-events: none; filter: url(#navNoise);
        }
        .bracket {
          position: absolute; width: 8px; height: 8px; border-color: ${currentPalette.tint}; opacity: 0.5;
          transition: border-color 0.3s ease;
        }
        .palette-item {
          transition: all 0.2s ease;
        }
        .palette-item:hover {
          background: ${currentPalette.accent}44;
          color: ${currentPalette.tint};
        }
        .palette-active {
          color: ${currentPalette.tint};
          border-left: 2px solid ${currentPalette.tint};
        }
      `}} />

      <svg className="absolute w-0 h-0 invisible">
        <filter id="navNoise">
          <feTurbulence type="fractalNoise" baseFrequency="0.8" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
      </svg>

      <nav className="fixed top-0 left-0 w-full z-[100] border-b border-stone-800/60 bg-black/80 backdrop-blur-xl">
        <div className="nav-noise" />

        <div className="w-full px-6 md:px-12 py-5 flex justify-between items-center relative">
          
          {/* SIKU-SIKU FRAME (4 SUDUT) */}
          {/* Top Left */}
          <div className="bracket top-2 left-2 border-t-2 border-l-2" />
          {/* Top Right */}
          <div className="bracket top-2 right-2 border-t-2 border-r-2" />
          {/* Bottom Left */}
          <div className="bracket bottom-2 left-2 border-b-2 border-l-2" />
          {/* Bottom Right */}
          <div className="bracket bottom-2 right-2 border-b-2 border-r-2" />

          {/* LEFT: Identity */}
          <div 
            onClick={() => navigate("/")} 
            className="flex items-center gap-3 z-10 hover:opacity-80 transition-opacity cursor-pointer"
          >
            <span className="font-mono text-white font-bold tracking-[0.25em] text-sm md:text-base">
              ALAN<span style={{ color: currentPalette.tint }} className="transition-colors duration-300">.DEV</span>
            </span>
          </div>

          {/* RIGHT: Desktop Nav */}
          <div className="hidden md:flex items-center gap-10 font-mono text-[11px] uppercase tracking-[0.4em] text-stone-500 z-10">
            <button 
              onClick={() => navigate("/about")} 
              className="hover:text-white transition-colors cursor-pointer" 
              style={{ '--hover-color': currentPalette.tint } as any}
            >
              /about
            </button>
            <button 
              onClick={() => navigate("/projects")} 
              className="hover:text-white transition-colors cursor-pointer"
            >
              /projects
            </button>
            <button 
              onClick={() => navigate("/blog")} 
              className="hover:text-white transition-colors cursor-pointer"
            >
              /blog
            </button>
            <button 
              onClick={() => navigate("/ventures")} 
              className="hover:text-white transition-colors cursor-pointer"
            >
              /ventures
            </button>
            
            <div className="relative bg-white/10 backdrop-blur-sm p-1 rounded-xs">
              <button 
                onClick={togglePaletteMenu}
                className="hover:text-white transition-colors flex items-center gap-1"
                style={{ color: isPaletteOpen ? currentPalette.tint : '' }}
              >
                _display
              </button>

              {isPaletteOpen && (
                <div className="absolute top-full right-0 mt-4 w-48 bg-black/90 backdrop-blur-md border border-stone-800 rounded-sm py-2 shadow-2xl z-[110]">
                  <div className="px-3 py-1 mb-2 border-b border-stone-800/50">
                    <span className="text-[9px] text-stone-600 tracking-widest font-bold">SYSTEM_PALETTE</span>
                  </div>
                  {palettes.map((p) => (
                    <button
                      key={p.id}
                      onClick={() => {
                        setPalette(p.id);
                        setIsPaletteOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2 text-[10px] tracking-[0.2em] palette-item flex items-center gap-3 ${currentPalette.id === p.id ? 'palette-active' : 'text-stone-400'}`}
                    >
                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: p.tint }} />
                      {p.name.toUpperCase()}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Mobile Trigger */}
          <div className="md:hidden flex items-center z-10">
            {!isMenuOpen && (
              <button 
                onClick={() => setIsMenuOpen(true)}
                className="text-[10px] font-mono tracking-widest border px-3 py-1 transition-colors"
                style={{ 
                  color: currentPalette.tint, 
                  borderColor: `${currentPalette.tint}44`,
                  backgroundColor: `${currentPalette.tint}11`
                }}
              >
                [ MENU ]
              </button>
            )}
          </div>
        </div>
      </nav>

      {/* FULL SCREEN MENU FOR MOBILE */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-[120] pointer-events-auto md:hidden">
          <StaggeredMenu
            position="right"
            items={menuItems}
            socialItems={socialItems}
            displaySocials
            displayItemNumbering={true}
            menuButtonColor="transparent" 
            openMenuButtonColor={currentPalette.tint}
            changeMenuColorOnOpen={true}
            colors={[currentPalette.background, currentPalette.tint]}
            accentColor={currentPalette.tint}
            onMenuClose={() => setIsMenuOpen(false)}
            initiallyOpen={true}
          />
        </div>
      )}
    </>
  );
};

export default Navbar;