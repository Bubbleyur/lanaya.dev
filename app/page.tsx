"use client";

import Image from "next/image";
import React from "react";
import TextType from '@/components/typography/TextType';
import { ProjectCard } from '@/components/portfolio/project-card';
import { usePalette } from "@/context/PaletteContext";
import TerminalSection from "@/components/ui/TerminalSection";
import { projectsData, ProjectItem } from '@/constants/portfolio/project';
import { AboutCard } from "@/components/ui/AboutCard";
import { LanyardCard } from "@/components/ui/LanyardCard";
import { Brain, Quote } from "lucide-react";

export default function Home() {
  const { currentPalette } = usePalette();
  const [projects, setProjects] = React.useState<ProjectItem[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    fetch("/api/projects")
      .then((res) => res.json())
      .then((data) => {
        setProjects(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch projects:", err);
        setProjects(projectsData); // Fallback to static data
        setLoading(false);
      });
  }, []);

  return (
    <>
      {/* SECTION 1: HERO */}
      <TerminalSection id="hero" className="min-h-screen justify-center items-center px-4">
        <div className="relative w-full max-w-5xl">
          {/* Subtle background element */}
          <div className="absolute -top-20 -left-20 w-64 h-64 bg-stone-900 rounded-full blur-[100px] opacity-20 pointer-events-none" />
          
          <div className="relative z-10 flex flex-col md:flex-row gap-12 items-start">
            <div className="flex-1 space-y-8">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 border border-stone-800 bg-stone-900/50" style={{ borderColor: `${currentPalette.tint}22` }}>
                  <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: currentPalette.tint }} />
                  <span className="text-[10px] uppercase tracking-[0.3em] text-stone-300">PORTFOLIO v1.0.3</span>
                </div>
                
                <h1 className="text-4xl md:text-7xl font-bold tracking-tighter leading-[1.1]" style={{ color: currentPalette.tint }}>
                  {/* @ts-ignore */}
                  <TextType 
                    text={["INNOVATING", "ARCHITECTING", "DEVELOPING"]}
                    typingSpeed={100}
                    pauseDuration={2000}
                    showCursor
                    cursorCharacter="_"
                  />
                  <br />
                  <span className="text-white">ALAN.DEV</span>
                </h1>
              </div>

              <p className="text-lg md:text-xl text-stone-200 font-md max-w-xl font-mono leading-relaxed bg-black/20 backdrop-blur-sm border border-white p-2">
                <span style={{ color: currentPalette.tint }}>{`>`}</span> a junior developer dedicated to crafting seamless digital ecosystems and robust architecture.
              </p>

              <div className="flex flex-wrap gap-4 pt-4">
                <a href="/projects"
                  className="px-8 py-3 border font-bold uppercase tracking-widest text-xs transition-all duration-300 hover:scale-[1.02] active:scale-95"
                  style={{ 
                    backgroundColor: currentPalette.tint, 
                    borderColor: currentPalette.tint,
                    color: currentPalette.background 
                  }}
                >
                  See Doings
                </a>
                <a href="/about"
                  className="px-8 py-3 border font-bold uppercase tracking-widest text-xs transition-all duration-300 hover:bg-stone-800 bg-stone-500/20 backdrop-blur-md"
                  style={{ 
                    borderColor: `${currentPalette.tint}44`,
                    color: currentPalette.tint
                  }}
                >
                  Get In Touch
                </a>
              </div>
            </div>

            <div className="w-full md:w-80 space-y-4">
              <div className="p-6 border bg-stone-900/40 backdrop-blur-sm space-y-4" style={{ borderColor: `${currentPalette.tint}11` }}>
                <div className="flex justify-between items-center text-[10px] text-stone-300 uppercase tracking-widest">
                  <span>Availability</span>
                  <span className="text-green-500">Open for Work</span>
                </div>
                <div className="space-y-2">
                  <div className="h-1 w-full bg-stone-800">
                    <div className="h-full bg-stone-600 w-3/4" style={{ backgroundColor: currentPalette.tint }} />
                  </div>
                  <div className="h-1 w-full bg-stone-800">
                    <div className="h-full bg-stone-600 w-1/2" style={{ backgroundColor: currentPalette.tint }} />
                  </div>
                </div>
                <p className="text-[10px] font-mono text-stone-200/50">
                  REACT // NEXT.JS // TYPESCRIPT // NODE.JS
                </p>
              </div>
            </div>
          </div>
        </div>
      </TerminalSection>

      {/* SECTION 2: ABOUT */}
      <TerminalSection id="about" className="py-24">
        <div className="w-full max-w-5xl px-4">
          <div className="flex flex-col md:flex-row justify-between items-start gap-12 mb-16">
            <div className="space-y-6 flex-row justify-items-center">
              {/* Profile Image with Terminal Frame */}
              <div className="relative w-32 h-32 md:w-50 md:h-50 group">
                <div 
                  className="absolute inset-0 border-2 z-10 transition-transform duration-300 group-hover:scale-105"
                  style={{ borderColor: currentPalette.tint }}
                />
                <div 
                  className="absolute -inset-2 border opacity-20 z-0 animate-pulse"
                  style={{ borderColor: currentPalette.tint }}
                />
                <Image 
                  src="https://res.cloudinary.com/drrleg8t2/image/upload/v1770549330/WhatsApp_Image_2026-02-08_at_18.09.29_e0caxm.jpg" // High quality stylized placeholder
                  alt="Alan Profile"
                  fill
                  priority
                  sizes="(max-width: 768px) 128px, 200px"
                  className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                />
                <div className="absolute top-0 right-0 p-1 bg-black/80 z-20 text-[8px] font-mono tracking-tighter" style={{ color: currentPalette.tint }}>
                  ALAN_OS.IMG
                </div>
              </div>

              <div className="space-y-4">
                <span className="text-xs uppercase tracking-[0.5em] opacity-40">System_Profile</span>
                <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tighter">
                  Who is <span style={{ color: currentPalette.tint }}>Alan</span>?
                </h2>
              </div>
            </div>

            <div 
              className="max-w-xl p-8 border bg-stone-900/40 backdrop-blur-md relative"
              style={{ borderColor: `${currentPalette.tint}33` }}
            >
              <div 
                className="absolute top-0 left-0 w-8 h-[2px]" 
                style={{ backgroundColor: currentPalette.tint }}
              />
              <div 
                className="absolute top-0 left-0 w-[2px] h-8" 
                style={{ backgroundColor: currentPalette.tint }}
              />
              
              <div className="space-y-6">
                <p 
                  className="text-lg md:text-xl font-mono leading-relaxed font-bold"
                  style={{ 
                    color: `${currentPalette.tint}ff`,
                    textShadow: `0 0 10px ${currentPalette.tint}44`
                  }}
                >
                  <span className="opacity-50 mr-2">$</span> Decoding life through code, coffee, and constant curiosity. I specialize in bridging the gap between complex backend logic and intuitive, human-centric frontend experiences.
                </p>
                <p className="text-stone-100 text-sm md:text-base font-mono leading-relaxed font-medium opacity-90">
                  Exploring the intersection of human psychology and digital interfaces, I build systems that aren't just functional, but feel alive. My philosophy is rooted in technical excellence and the belief that every line of code is an opportunity to solve a puzzle.
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <LanyardCard />
            
            <AboutCard 
              title="Personality"
              description="An ENTP driven by curiosity and bold ideas — thriving on challenging norms and reshaping them into smarter solutions."
              icon={<Brain size={20} />}
            />

            <AboutCard 
              title="Philosophy"
              description="Ideas only matter when executed. I break, refine, and rebuild systems — turning curiosity into clean, working structure."
              icon={<Quote size={20} />}
            />
          </div>
        </div>
      </TerminalSection>

      {/* SECTION 3: PROJECTS */}
      <TerminalSection id="project">
        <div className="mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-slate-200 mb-6">
            find my doings
          </h1>
          <p className="text-base md:text-lg text-slate-100/60 max-w-2xl">
            Check out my curated projects and experiments.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-5xl">
          {loading ? (
            <div className="col-span-full py-12 text-center font-mono opacity-50">
              [ INITIALIZING_REPOSITORY_ACCESS... ]
            </div>
          ) : (
            projects.slice(0, 4).map((project, idx) => ( // Show first 4 on home
              <ProjectCard key={idx} project={project} priority={idx < 2} />
            ))
          )}
        </div>
      </TerminalSection>
    </>
  );
}