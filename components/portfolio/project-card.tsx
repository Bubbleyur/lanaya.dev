"use client";
import Link from "next/link";
import Image from "next/image";
import React from "react";
import { ExternalLink, Github, Terminal } from "lucide-react";
import type { ProjectItem } from "@/constants/portfolio/project";
import { cn } from "@/lib/utils";
import { usePalette } from "@/context/PaletteContext";
import { Badge } from "@/components/ui/badge";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { getOptimizedImage } from "@/lib/cloudinary";

export function ProjectCard({
  project,
  classNames,
  priority = false,
}: {
  project: ProjectItem;
  classNames?: {
    container?: string;
    imageWrapper?: string;
    image?: string;
    content?: string;
    title?: string;
    description?: string;
    links?: string;
  };
  priority?: boolean;
}) {
  const { currentPalette } = usePalette();

  const [imgSrc, setImgSrc] = React.useState(project.imageId);
  const [fallbacksTried, setFallbacksTried] = React.useState(0);

  const handleImageError = () => {
    if (fallbacksTried === 0) {
      // Try master branch
      const masterUrl = project.imageId.replace("/main/", "/master/");
      setImgSrc(masterUrl);
      setFallbacksTried(1);
    } else if (fallbacksTried === 1) {
      // Try cloudinary fallback (using the optimized version of a placeholder if needed)
      setImgSrc("https://res.cloudinary.com/drrleg8t2/image/upload/f_auto,q_auto,w_1200/samples/animals/cat.jpg");
      setFallbacksTried(2);
    }
  };

  return (
    <div
      className={cn(
        "group relative overflow-hidden border bg-stone-900/40 backdrop-blur-sm transition-all duration-500 hover:bg-stone-900/60",
        classNames?.container,
      )}
      style={{ borderColor: `${currentPalette.tint}22` }}
    >
      {/* GLITCH OVERLAY ON HOVER */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-[0.03] pointer-events-none z-20 transition-opacity duration-300"
        style={{ backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 1px, ${currentPalette.tint} 1px, ${currentPalette.tint} 2px)`, backgroundSize: '100% 2px' }}
      />

      {/* Image Section */}
      <div
        className={cn(
          "relative h-56 w-full overflow-hidden border-b",
          classNames?.imageWrapper,
        )}
        style={{ borderColor: `${currentPalette.tint}11` }}
      >
        <Image
          src={getOptimizedImage(imgSrc, 800)}
          alt={project.title}
          fill
          priority={priority}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          onError={handleImageError}
          className={cn(
            "object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110",
            classNames?.image,
          )}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
        
        {/* Terminal decorative element */}
        <div className="absolute top-3 left-3 flex gap-1 z-10 opacity-40 group-hover:opacity-100 transition-opacity">
          <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: currentPalette.tint }} />
          <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: `${currentPalette.tint}88` }} />
          <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: `${currentPalette.tint}44` }} />
        </div>
      </div>

      {/* Content Section */}
      <div className={cn("flex flex-col gap-4 p-6 relative z-10", classNames?.content)}>
        <div className="space-y-2">
          {/* Badges */}
          {((project.badge && project.badge.length > 0) || (project.badges && project.badges.length > 0)) && (
            <div className="flex flex-wrap gap-2">
              {project.badge?.map((badge, i) => (
                <div key={`badge-${i}`} className="scale-90 origin-left">
                  {badge}
                </div>
              ))}
              {project.badges?.map((badge, i) => (
                <div key={`badges-${i}`} className="scale-90 origin-left">
                  <Badge variant="outline" className="border-stone-800 bg-stone-900/50 text-stone-400">
                    {badge}
                  </Badge>
                </div>
              ))}
            </div>
          )}

          <div className="flex justify-between items-start">
            <h2
              className={cn(
                "font-bold text-xl tracking-tight uppercase leading-none mt-1",
                classNames?.title,
              )}
              style={{ color: currentPalette.tint }}
            >
              {project.title}
            </h2>
            <Terminal size={14} className="opacity-20 group-hover:opacity-60 transition-opacity" style={{ color: currentPalette.tint }} />
          </div>
        </div>

        {/* Description */}
        <p
          className={cn(
            "text-stone-400 text-xs leading-relaxed font-mono line-clamp-3",
            classNames?.description,
          )}
        >
          {project.description}
        </p>

        {/* Action Links */}
        <div className={cn("flex items-center gap-6 pt-2 font-mono uppercase tracking-[0.2em] text-[10px]", classNames?.links)}>
          {project.repo && (
            <Link
              href={project.repo}
              target="_blank"
              className="flex items-center gap-2 text-stone-500 hover:text-white transition-colors group/link"
            >
              <Github size={12} style={{ color: `${currentPalette.tint}88` }} />
              <span>SOURCE</span>
            </Link>
          )}

          {project.link && (
            project.unmaintained ? (
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <button className="flex items-center gap-2 text-stone-500 hover:text-white transition-colors group/link">
                    <ExternalLink size={12} style={{ color: `${currentPalette.tint}88` }} />
                    <span>DEMO</span>
                  </button>
                </AlertDialogTrigger>
                <AlertDialogContent className="bg-stone-950 border border-stone-800 text-stone-300 font-mono">
                  <AlertDialogHeader>
                    <AlertDialogTitle className="text-white uppercase tracking-tighter">Legacy System Warning</AlertDialogTitle>
                    <AlertDialogDescription className="text-stone-500">
                      Project <span style={{ color: currentPalette.tint }}>[{project.title}]</span> status is: UNMAINTAINED.
                      The live instance may be unstable or deprecated. Proceed with authorization?
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel className="bg-transparent border-stone-800 text-stone-500 hover:bg-stone-900">ABORT</AlertDialogCancel>
                    <AlertDialogAction asChild>
                      <Link
                        href={project.link}
                        target="_blank"
                        className="bg-white text-black hover:bg-stone-200"
                      >
                        CONFIRM
                      </Link>
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            ) : (
              <Link
                href={project.link}
                target="_blank"
                className="flex items-center gap-2 text-stone-500 hover:text-white transition-colors group/link"
              >
                <ExternalLink size={12} style={{ color: `${currentPalette.tint}88` }} />
                <span>LAUNCH</span>
              </Link>
            )
          )}
        </div>
      </div>

      {/* Decorative corner accent */}
      <div 
        className="absolute bottom-0 right-0 w-8 h-8 opacity-20 transition-opacity group-hover:opacity-100"
        style={{ 
          background: `linear-gradient(135deg, transparent 50%, ${currentPalette.tint} 50%)`,
          clipPath: 'polygon(100% 0, 100% 100%, 0 100%)'
        }}
      />
    </div>
  );
}
