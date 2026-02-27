"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ExternalLink, Mail, MessageSquareText, Rocket } from "lucide-react";
import TerminalSection from "@/components/ui/TerminalSection";
import { ProjectCard } from "@/components/portfolio/project-card";
import { projectsData, ProjectItem } from "@/constants/portfolio/project";
import { usePalette } from "@/context/PaletteContext";
import TextType from "@/components/typography/TextType";

export default function ProjectsPage() {
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
        setProjects(projectsData); // Fallback
        setLoading(false);
      });
  }, []);

  return (
    <div className="flex flex-col w-full">
      {/* SECTION 1: HERO */}
      <TerminalSection id="projects-hero" className="min-h-[60vh] flex flex-col justify-center items-center px-4 pt-32 pb-16">
        <div className="w-full max-w-5xl space-y-8 relative">
           {/* Decorative elements */}
           <div className="absolute -top-10 -right-10 w-48 h-48 rounded-full blur-[80px] opacity-10 pointer-events-none" style={{ backgroundColor: currentPalette.tint }} />
           
           <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 border border-stone-800 bg-stone-900/50" style={{ borderColor: `${currentPalette.tint}22` }}>
              <span className="text-[10px] uppercase tracking-[0.4em] text-stone-500 font-mono">Archive // Experiment // Foundation</span>
            </div>

            <h1 className="text-5xl md:text-8xl font-bold tracking-tighter leading-none" style={{ color: currentPalette.tint }}>
              {/* @ts-ignore */}
              <TextType 
                text={["PROJECTS", "LABS", "DOINGS"]}
                typingSpeed={120}
                pauseDuration={3000}
                showCursor
                cursorCharacter="▋"
              />
            </h1>
            <p className="text-xl md:text-2xl text-stone-400 font-mono max-w-2xl leading-relaxed">
              A curated selection of technical experiments, full-stack applications, and digital architecture.
            </p>
          </div>

          <div className="flex flex-wrap gap-4 pt-6">
            <div className="p-3 border border-stone-800 bg-stone-900/20 backdrop-blur-sm flex items-center gap-4">
              <div className="flex -space-x-2">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="w-6 h-6 rounded-full border-2 border-black bg-stone-800 overflow-hidden">
                    <div className="w-full h-full opacity-50" style={{ backgroundColor: currentPalette.tint }} />
                  </div>
                ))}
              </div>
              <span className="text-[10px] font-mono text-stone-500 uppercase tracking-widest">
                {loading ? "..." : projects.length} Total Repositories
              </span>
            </div>
          </div>
        </div>
      </TerminalSection>

      {/* SECTION 2: PROJECT LIST */}
      <TerminalSection id="project-list" className="py-24">
        <div className="w-full max-w-5xl px-4">
          <div className="flex items-center gap-4 mb-12">
            <div className="h-[1px] flex-1 bg-stone-800" />
            <h2 className="text-xs uppercase tracking-[0.6em] text-stone-600 font-bold whitespace-nowrap">
              Execution_Logs
            </h2>
            <div className="h-[1px] w-12 bg-stone-800" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {loading ? (
              <div className="col-span-full py-24 text-center font-mono opacity-50">
                [ ACCESSING_ARCHIVE_DATA... ]
              </div>
            ) : (
              projects.map((project, idx) => (
                <ProjectCard 
                  key={idx} 
                  project={project}
                  priority={idx < 2}
                  classNames={{
                    container: "group/card h-full flex flex-col hover:border-tint/30 transition-colors duration-500",
                  }}
                />
              ))
            )}
          </div>
        </div>
      </TerminalSection>

      {/* SECTION 3: CTA / FOOTER */}
      <TerminalSection id="projects-cta" className="py-32 border-t border-stone-800/50">
        <div className="w-full max-w-5xl px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h3 className="text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight">
                  Interested in <br />
                  <span style={{ color: currentPalette.tint }}>Collaboration?</span>
                </h3>
                <p className="text-stone-400 font-mono text-lg max-w-md">
                  My system is currently open for commissions and technical partnerships.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  href="mailto:contact@alanwijayaok14@gmail.com"
                  className="group relative px-8 py-4 overflow-hidden bg-white text-black font-bold uppercase tracking-widest text-xs transition-all hover:pr-12"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    <Mail size={14} />
                    Open Commission
                  </span>
                  <div 
                    className="absolute inset-0 bg-stone-200 transform translate-x-full group-hover:translate-x-0 transition-transform duration-300"
                  />
                  <ExternalLink size={12} className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all" />
                </Link>

                <Link 
                  href="/ventures"
                  className="group px-8 py-4 border border-stone-800 hover:bg-stone-900 transition-all font-bold uppercase tracking-widest text-xs flex items-center gap-2"
                  style={{ color: currentPalette.tint, borderColor: `${currentPalette.tint}33` }}
                >
                  <Rocket size={14} />
                  Explore Ventures
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
                    <span className="text-[10px] uppercase tracking-widest text-stone-500 font-bold">Note</span>
                  </div>
                  <blockquote className="text-xl font-mono text-stone-200 leading-relaxed italic">
                    "Most problems aren’t complicated. They’re just unclear. I prefer solving the part that makes everything else make sense."
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
