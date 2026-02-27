"use client";

import React from "react";
import Link from "next/link";
import { ExternalLink, Mail, MessageSquareText, Globe } from "lucide-react";
import TerminalSection from "@/components/ui/TerminalSection";
import { VentureCard } from "@/components/portfolio/venture-card";
import { venturesData, MAIN_WEBSITE_URL } from "@/constants/config";
import { usePalette } from "@/context/PaletteContext";
import TextType from "@/components/typography/TextType";

export default function VenturesPage() {
  const { currentPalette } = usePalette();

  return (
    <div className="flex flex-col w-full">
      {/* SECTION 1: HERO */}
      <TerminalSection id="ventures-hero" className="min-h-[60vh] flex flex-col justify-center items-center px-4 pt-32 pb-16">
        <div className="w-full max-w-5xl space-y-8 relative text-center md:text-left">
           {/* Decorative elements */}
           <div className="absolute -top-10 -right-10 w-48 h-48 rounded-full blur-[80px] opacity-10 pointer-events-none" style={{ backgroundColor: currentPalette.tint }} />
           
           <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 border border-stone-800 bg-stone-900/50" style={{ borderColor: `${currentPalette.tint}22` }}>
              <span className="text-[10px] uppercase tracking-[0.4em] text-stone-500 font-mono">Business // Clients // Sponsorships</span>
            </div>

            <h1 className="text-5xl md:text-8xl font-bold tracking-tighter leading-none" style={{ color: currentPalette.tint }}>
              {/* @ts-ignore */}
              <TextType 
                text={["BUSINESS", "CLIENTS", "SPONSORS"]}
                typingSpeed={120}
                pauseDuration={3000}
                showCursor
                cursorCharacter="▋"
              />
            </h1>
            <p className="text-xl md:text-2xl text-stone-400 font-mono max-w-2xl leading-relaxed mx-auto md:mx-0">
               A showcase of independent ventures, professional partnerships, and strategic investments.
            </p>
          </div>

          <div className="flex flex-wrap gap-4 pt-6 justify-center md:justify-start">
            <Link 
              href={MAIN_WEBSITE_URL}
              className="group relative px-6 py-3 border border-stone-800 bg-stone-900/50 hover:bg-stone-900 transition-all font-mono text-[10px] uppercase tracking-[0.3em] flex items-center gap-2"
              style={{ color: currentPalette.tint, borderColor: `${currentPalette.tint}44` }}
            >
              <Globe size={14} />
              Return to Main Hub
              <ExternalLink size={10} className="opacity-0 group-hover:opacity-100 transition-opacity" />
            </Link>
          </div>
        </div>
      </TerminalSection>

      {/* SECTION 2: VENTURE LIST */}
      <TerminalSection id="venture-list" className="py-24">
        <div className="w-full max-w-5xl px-4">
          <div className="flex items-center gap-4 mb-12">
            <div className="h-[1px] flex-1 bg-stone-800" />
            <h2 className="text-xs uppercase tracking-[0.6em] text-stone-600 font-bold whitespace-nowrap">
              Active_Ventures
            </h2>
            <div className="h-[1px] w-12 bg-stone-800" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {venturesData.map((venture, idx) => (
              <VentureCard 
                key={idx} 
                venture={venture}
                priority={idx < 2}
                classNames={{
                  container: "group/card h-full flex flex-col hover:border-tint/30 transition-colors duration-500",
                }}
              />
            ))}
          </div>
        </div>
      </TerminalSection>

      {/* SECTION 3: CTA / FOOTER */}
      <TerminalSection id="ventures-cta" className="py-32 border-t border-stone-800/50">
        <div className="w-full max-w-5xl px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h3 className="text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight">
                  Interested in <br />
                  <span style={{ color: currentPalette.tint }}>Partnerships?</span>
                </h3>
                <p className="text-stone-400 font-mono text-lg max-w-md">
                  I am always looking for high-impact opportunities and long-term technical collaborations.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  href="mailto:contact@alanwijayaok14@gmail.com"
                  className="group relative px-8 py-4 overflow-hidden bg-white text-black font-bold uppercase tracking-widest text-xs transition-all hover:pr-12"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    <Mail size={14} />
                    Inquire Now
                  </span>
                  <div 
                    className="absolute inset-0 bg-stone-200 transform translate-x-full group-hover:translate-x-0 transition-transform duration-300"
                  />
                  <ExternalLink size={12} className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all" />
                </Link>

                <Link 
                  href={MAIN_WEBSITE_URL}
                  className="group px-8 py-4 border border-stone-800 hover:bg-stone-900 transition-all font-bold uppercase tracking-widest text-xs flex items-center gap-2"
                  style={{ color: currentPalette.tint, borderColor: `${currentPalette.tint}33` }}
                >
                  <Globe size={14} />
                  Main Website
                </Link>
              </div>
            </div>

            <div className="relative">
              <div 
                className="absolute inset-0 border border-dashed opacity-10 animate-spin-slow pointer-events-none" 
                style={{ borderColor: currentPalette.tint, borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%' }}
              />
              <div className="p-12 bg-stone-900/40 backdrop-blur-xl border border-stone-800 relative z-10">
                <div className="space-y-6">
                  <div className="flex items-center gap-3">
                    <MessageSquareText size={20} style={{ color: currentPalette.tint }} />
                    <span className="text-[10px] uppercase tracking-widest text-stone-500 font-bold">Strategy</span>
                  </div>
                  <blockquote className="text-xl font-mono text-stone-200 leading-relaxed italic">
                    "Scalability isn't just about code; it's about the systems that support human growth and technical excellence."
                  </blockquote>
                  <div className="flex items-center gap-2 pt-4">
                    <div className="w-8 h-[1px] bg-stone-700" />
                    <span className="text-[10px] uppercase tracking-[0.3em] text-stone-600 font-bold">Alan</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </TerminalSection>
    </div>
  );
}
