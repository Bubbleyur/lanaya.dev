"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { useRouter, usePathname } from "next/navigation";
import Navbar from "@/components/partials/navbar";
import Footer from "@/components/partials/footer";
import { usePalette } from "@/context/PaletteContext";
import { useTransitionNav } from "@/components/ui/TransitionProvider";

// Lazy load the heavy WebGL component for better performance
const FaultyTerminal = dynamic(() => import("@/components/FaultyTerminal"), {
  ssr: false,
  loading: () => <div className="w-full h-full bg-black/10" />
});

export const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasVisited, setHasVisited] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [showTerminal, setShowTerminal] = useState(false);
  
  const { currentPalette } = usePalette();
  const { isExiting } = useTransitionNav();
  const pathname = usePathname();
  
  const isPage = pathname === '/';

  useEffect(() => {
    setIsMounted(true);
    const hasLoaded = sessionStorage.getItem("hasLoaded");
    
    if (hasLoaded) {
      setIsLoading(false);
      setHasVisited(true);
      setShowTerminal(true);
      return;
    }

    // Phase 1: Show LOADING SYSTEM text
    const loadingTimer = setTimeout(() => {
      setIsLoading(false);
      sessionStorage.setItem("hasLoaded", "true");
      
      // Phase 2: Give the CRT open animation a head start before loading WebGL
      const terminalTimer = setTimeout(() => {
        setShowTerminal(true);
      }, 300); // 300ms delay after loading screen disappears
      
      return () => clearTimeout(terminalTimer);
    }, 1200); 

    return () => clearTimeout(loadingTimer);
  }, []);

  if (!isMounted) return <div className="h-screen w-full bg-stone-900" />;

  const crtAnimationClass = !hasVisited ? "animate-crt-boot" : "";
  const zoomAnimationClass = !hasVisited ? "animate-zoom-in" : "";

  return (
    <div 
      className="relative h-screen w-full bg-stone-900 flex justify-center items-center font-mono overflow-hidden"
      style={{ "--palette-tint": currentPalette.tint } as any}
    >
      {isLoading ? (
        <div className="relative w-full h-full flex flex-col items-center justify-center bg-[#050505] z-[100]">
          <div className="space-y-2 text-center" style={{ color: `${currentPalette.tint}cc` }}>
            <p className="text-xs tracking-[0.2em] opacity-50 font-mono">ALAN_OS VER 1.0.4</p>
            <div className="text-xl font-bold flex items-center justify-center gap-3 animate-pulse font-mono tracking-widest">
              LOADING SYSTEM...
            </div>
          </div>
        </div>
      ) : (
        <div className={`${crtAnimationClass} ${isExiting ? "crt-close-animation" : ""} w-full h-full relative overflow-hidden origin-center bg-black transition-opacity duration-1000`}>
          
          <Navbar />

          <div className={`${zoomAnimationClass} w-full h-full relative`}>
            <div className="absolute inset-0 overflow-y-auto overflow-x-hidden retro-scroll grid grid-cols-1 grid-rows-1">
              
              {/* LAYER BACKGROUND */}
              <div className="col-start-1 row-start-1 sticky top-0 w-full h-screen z-0">
                {showTerminal && isPage && (
                  <FaultyTerminal
                    scale={1.5}
                    digitSize={1.2}
                    scanlineIntensity={0.45}
                    glitchAmount={1}
                    flickerAmount={2}
                    noiseAmp={1}
                    chromaticAberration={0.04}
                    dither={0.65}
                    curvature={0.2}
                    tint={currentPalette.tint}
                    mouseReact
                    mouseStrength={0.5}
                    brightness={1.4}
                    pageLoadAnimation={!hasVisited}
                    className="opacity-0 animate-fade-in"
                    style={{ animationDuration: '1s', animationFillMode: 'forwards' }}
                  />
                )}
                
                {!isPage && (
                  <div className="absolute inset-0 bg-[#080808] opacity-100 transition-opacity duration-1000" />
                )}
              </div>

              {/* LAYER KONTEN FOREGROUND */}
              <div className="col-start-1 row-start-1 relative z-10 w-full h-fit">
                <div className="w-full">
                  {children}
                </div>
                <Footer />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
