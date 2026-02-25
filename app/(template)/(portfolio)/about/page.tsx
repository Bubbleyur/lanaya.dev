"use client";

import React from "react";
import { usePalette } from "@/context/PaletteContext";
import TerminalSection from "@/components/ui/TerminalSection";
import { Trophy, Code, Mail, Github, Linkedin, Globe, MessageSquare } from "lucide-react";
import { AboutCard } from "@/components/ui/AboutCard";

export default function About() {
  const { currentPalette } = usePalette();

  const achievements = [
    {
      title: "Schematics - NLC 2023",
      description: "Schematics National Logic Competition (NLC) 2023 is a national-level logic competition organized as part of Schematics ITS by the Department of Informatics, Institut Teknologi Sepuluh Nopember (ITS).",
      date: "2023"
    },
    {
      title: "CTF Ara",
      description: "CTF Ara is a Capture The Flag competition organized by HMIT-ITS. The competition challenges participants to solve a series of cybersecurity challenges, testing their skills in areas such as web exploitation, reverse engineering, and forensics.",
      date: "2024"
    },
  ];

  const techStack = [
    { category: "Frontend", skills: ["React", "Next.js", "Tailwind CSS", "GSAP", "Three.js", "Jinja2"] },
    { category: "Backend", skills: ["Node.js", "Python", "PostgreSQL", "Cloudflare Workers"] },
    { category: "Tools", skills: ["Git", "Docker", "Github", "Vercel", "Linux"] }
  ];

  const contacts = [
    { label: "Email", value: "contact@alanwijayaok14@gmail.com", icon: <Mail size={18} />, link: "mailto:contact@alanwijayaok14@gmail.com" },
    { label: "GitHub", value: "github.com/bubbleyur", icon: <Github size={18} />, link: "https://github.com/bubbleyur" },
    { label: "LinkedIn", value: "linkedin.com/in/alan", icon: <Linkedin size={18} />, link: "https://www.linkedin.com/in/alan-wijaya-9880603a8/" },
    { label: "Discord", value: "@bubbleyur", icon: <MessageSquare size={18} />, link: "https://discord.com/users/632142872577048577" }
  ];

  return (
    <div className="pt-20 pb-20">
      {/* HERO SECTION */}
      <TerminalSection id="about-hero" className="min-h-[50vh] flex flex-col justify-center items-start px-6 md:px-12">
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 tracking-tighter">
          who am i?
        </h1>
        <p className="text-stone-500 font-mono text-lg max-w-2xl">
          someone <span style={{ color: currentPalette.tint }}>who</span> turns ideas into structure, and structure into something real.
        </p>
      </TerminalSection>

      {/* BIO SECTION */}
      <TerminalSection id="bio" className="py-24 px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div 
            className="aspect-video border-2 flex items-center justify-center p-12 text-center bg-stone-900/20 backdrop-blur-sm relative overflow-hidden group"
            style={{ borderColor: `${currentPalette.tint}22` }}
          >
            <div className="absolute top-2 left-2 flex gap-1.5">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: currentPalette.tint }} />
              <div className="w-2 h-2 rounded-full opacity-40 text-xs font-mono -mt-1" style={{ color: currentPalette.tint }}>SYS_IMG</div>
            </div>
            <p className="text-stone-600 font-mono text-sm uppercase tracking-widest animate-pulse">
              idk what to put in here yet...
              <br />
              <span className="text-[10px] opacity-40 mt-4 block">[ ERROR: ASSET_NOT_FOUND ]</span>
            </p>
            {/* Decorative corners */}
            <div className="absolute bottom-0 right-0 w-8 h-8 opacity-20" style={{ background: `linear-gradient(135deg, transparent 50%, ${currentPalette.tint} 50%)` }} />
          </div>

          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-white uppercase tracking-tighter" style={{ color: currentPalette.tint }}>
              You’ve found Alan.
            </h3>
            <div className="space-y-4 text-stone-400 font-mono leading-relaxed">
              <p>
                i started coding by experimenting with node.js and discord bots, tweaking things until they worked the way i imagined.
              </p>
              <p>
                over time, that curiosity turned into a habit of building clean and structured systems.
              </p>
              <p>
                coding became my way to focus, organize ideas, and turn thoughts into something real — where execution matters more than just ideas.
              </p>
            </div>
          </div>
        </div>
      </TerminalSection>

      {/* ACHIEVEMENTS */}
      <TerminalSection id="achievements" className="py-24 px-6 md:px-12 border-t border-stone-900">
        <div className="mb-12">
          <span className="text-xs uppercase tracking-[0.5em] opacity-40 mb-2 block">Terminal_Achievements</span>
          <h2 className="text-4xl font-bold text-white">Awards & <span style={{ color: currentPalette.tint }}>Milestones</span></h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {achievements.map((item, i) => (
            <div key={i} className="p-8 border bg-stone-900/40 relative group hover:bg-stone-900/60 transition-all duration-300" style={{ borderColor: `${currentPalette.tint}22` }}>
              <div className="absolute top-4 right-4 text-stone-700 font-mono text-xs">{item.date}</div>
              <Trophy size={32} className="mb-6 opacity-40 group-hover:opacity-100 transition-opacity" style={{ color: currentPalette.tint }} />
              <h4 className="text-xl font-bold text-white mb-2 uppercase tracking-tight">{item.title}</h4>
              <p className="text-stone-500 text-sm font-mono leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </TerminalSection>

      {/* TECH STACK */}
      <TerminalSection id="tech" className="py-24 px-6 md:px-12 border-t border-stone-900 bg-black/20">
        <div className="mb-12 text-center">
          <h2 className="text-4xl font-bold text-white uppercase tracking-tighter">Tools of the <span style={{ color: currentPalette.tint }}>Trade</span></h2>
          <p className="text-stone-500 font-mono text-sm mt-2">THE CORE SYSTEMS THAT POWER MY WORKFLOW</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {techStack.map((stack, i) => (
            <div key={i} className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="h-[1px] flex-1 bg-stone-800" />
                <h4 className="text-xs font-mono uppercase tracking-[0.4em] text-stone-400" style={{ color: currentPalette.tint }}>{stack.category}</h4>
                <div className="h-[1px] flex-1 bg-stone-800" />
              </div>
              <div className="flex flex-wrap gap-2 justify-center">
                {stack.skills.map((skill, j) => (
                  <span 
                    key={j} 
                    className="px-4 py-2 border text-[10px] font-mono tracking-widest uppercase transition-colors hover:bg-stone-800 cursor-default"
                    style={{ borderColor: `${currentPalette.tint}22`, color: currentPalette.tint }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </TerminalSection>

      {/* CONTACTS */}
      <TerminalSection id="contacts" className="py-24 px-6 md:px-12 border-t border-stone-900">
        <div className="max-w-4xl mx-auto border p-12 bg-stone-950/80 relative" style={{ borderColor: `${currentPalette.tint}22` }}>
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-6 bg-[#050505] text-[10px] tracking-[0.6em] font-mono whitespace-nowrap" style={{ color: currentPalette.tint }}>
            ESTABLISH_CONNECTION
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-6">
              <h3 className="text-3xl font-bold text-white uppercase tracking-tighter">Get in <span style={{ color: currentPalette.tint }}>Touch</span></h3>
              <p className="text-stone-500 font-mono text-sm leading-relaxed">
                Whether you have a question, a project proposal, or just want to say hi, my inbox is always open (and terminal-buffered). Let's build something extraordinary together.
              </p>
              <div className="pt-4">
                <div className="h-1 w-24 bg-stone-800">
                  <div className="h-full w-2/3 animate-pulse" style={{ backgroundColor: currentPalette.tint }} />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {contacts.map((contact, i) => (
                <a 
                  key={i} 
                  href={contact.link}
                  target="_blank"
                  className="flex items-center justify-between p-4 border bg-stone-900/20 group hover:bg-stone-900/50 transition-all duration-300"
                  style={{ borderColor: `${currentPalette.tint}11` }}
                >
                  <div className="flex items-center gap-4">
                    <div className="p-2 border" style={{ borderColor: `${currentPalette.tint}33`, color: currentPalette.tint }}>
                      {contact.icon}
                    </div>
                    <div>
                      <div className="text-[10px] text-stone-600 uppercase tracking-widest">{contact.label}</div>
                      <div className="text-sm font-mono text-stone-300 group-hover:text-white transition-colors">{contact.value}</div>
                    </div>
                  </div>
                  <Globe size={14} className="opacity-0 group-hover:opacity-40 transition-opacity" style={{ color: currentPalette.tint }} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </TerminalSection>
    </div>
  );
}
