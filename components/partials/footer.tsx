import React from 'react';
import { usePalette } from '@/context/PaletteContext';

const Footer = () => {
  const { currentPalette } = usePalette();

  return (
    <footer 
      className="relative w-full overflow-hidden bg-black py-10 px-8 border-t font-mono"
      style={{ borderColor: `${currentPalette.tint}33` }}
    >
      <style dangerouslySetInnerHTML={{ __html: `
        .footer-text-primary {
          color: ${currentPalette.tint}b3;
        }
        .footer-text-secondary {
          color: ${currentPalette.tint}66;
        }
        .footer-link {
          transition: all 0.3s ease;
        }
        .footer-link:hover {
          color: white;
          filter: drop-shadow(0 0 8px ${currentPalette.tint}cc);
        }
        .footer-copyright:hover {
          color: ${currentPalette.tint};
        }
      `}} />
      
      {/* 1. SVG Noise Filter Definition (Hidden) */}
      <svg className="absolute w-0 h-0 invisible">
        <filter id="terminalNoise">
          <feTurbulence 
            type="fractalNoise" 
            baseFrequency="0.65" 
            stitchTiles="stitch" 
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
      </svg>

      {/* 2. Animated Noise Overlay */}
      <div 
        className="absolute -inset-[100%] z-0 opacity-[0.08] pointer-events-none animate-noise"
        style={{ filter: 'url(#terminalNoise)' }}
      />

      {/* 3. Scanline Effect (Garis-garis TV) */}
      <div className="absolute inset-0 z-10 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.03),rgba(0,255,0,0.01),rgba(0,0,255,0.03))] bg-[length:100%_3px,2px_100%]" />

      {/* 4. Content Container */}
      <div className="relative z-20 max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] md:text-xs tracking-[0.2em] footer-text-primary">
        
        <div className="flex flex-col gap-1 uppercase">
          <p className="footer-copyright transition-colors cursor-default">
            © 2026 ALAN's PORTOFOLIO
          </p>
          <p className="text-[9px] footer-text-secondary">
            ALL RIGHTS RESERVED.
          </p>
        </div>

        <div className="flex items-center gap-8">
          <div className="hidden md:block opacity-30 italic">
            Surabaya — GMT+7
          </div>
          
          <nav className="flex gap-6">
            <a href="https://github.com/Bubbleyur" target="_blank" className="footer-link">
              [ GITHUB ]
            </a>
            <a href="https://www.linkedin.com/in/alan-wijaya-9880603a8/" target="_blank" className="footer-link">
              [ LINKEDIN ]
            </a>
          </nav>
          
          <div className="hidden lg:block opacity-30 uppercase">
            Iterate • Break • Rebuild
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
