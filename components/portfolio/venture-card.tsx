"use client";
import Link from "next/link";
import Image from "next/image";
import React from "react";
import { ExternalLink, Terminal, Briefcase, User, Heart, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { usePalette } from "@/context/PaletteContext";
import { Badge } from "@/components/ui/badge";
import type { VentureItem } from "@/constants/config";

const TypeIcon = ({ type, size = 14 }: { type: VentureItem["type"], size?: number }) => {
  switch (type) {
    case "BUSINESS": return <Briefcase size={size} />;
    case "CLIENT": return <User size={size} />;
    case "SPONSORSHIP": return <Heart size={size} />;
    default: return <Star size={size} />;
  }
};

export function VentureCard({
  venture,
  classNames,
}: {
  venture: VentureItem;
  classNames?: {
    container?: string;
    imageWrapper?: string;
    image?: string;
    content?: string;
    title?: string;
    description?: string;
    links?: string;
  };
}) {
  const { currentPalette } = usePalette();

  const defaultImage = "https://res.cloudinary.com/drrleg8t2/image/upload/v1768145350/samples/animals/cat.jpg"; // Placeholder
  const [imgSrc, setImgSrc] = React.useState(venture.imageId || defaultImage);

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

      {/* Image Section (Optional for Ventures) */}
      {venture.imageId && (
        <div
          className={cn(
            "relative h-48 w-full overflow-hidden border-b",
            classNames?.imageWrapper,
          )}
          style={{ borderColor: `${currentPalette.tint}11` }}
        >
          <Image
            src={imgSrc}
            alt={venture.title}
            fill
            className={cn(
              "object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110",
              classNames?.image,
            )}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
        </div>
      )}

      {/* Content Section */}
      <div className={cn("flex flex-col gap-4 p-6 relative z-10", classNames?.content)}>
        <div className="space-y-2">
          {/* Type Badge */}
          <div className="flex justify-between items-start">
            <div className="flex gap-2">
                <Badge variant="outline" className="border-stone-800 bg-stone-900/50 text-stone-500 text-[9px] uppercase tracking-widest font-mono py-0 h-5 px-2">
                  <span className="flex items-center gap-1.5">
                    <TypeIcon type={venture.type} size={10} />
                    {venture.type}
                  </span>
                </Badge>
                {venture.status && (
                    <Badge variant="outline" className="border-stone-800 bg-stone-900/50 text-[9px] uppercase tracking-widest font-mono py-0 h-5 px-2" style={{ color: currentPalette.tint }}>
                        {venture.status}
                    </Badge>
                )}
            </div>
            {venture.date && <span className="text-[10px] font-mono text-stone-600">{venture.date}</span>}
          </div>

          <div className="flex justify-between items-start gap-4">
            <h2
              className={cn(
                "font-bold text-xl tracking-tight uppercase leading-none mt-1",
                classNames?.title,
              )}
              style={{ color: currentPalette.tint }}
            >
              {venture.title}
            </h2>
            <Terminal size={14} className="opacity-20 group-hover:opacity-60 transition-opacity shrink-0" style={{ color: currentPalette.tint }} />
          </div>
        </div>

        {/* Description */}
        <p
          className={cn(
            "text-stone-400 text-xs leading-relaxed font-mono line-clamp-3",
            classNames?.description,
          )}
        >
          {venture.description}
        </p>

        {/* Tags */}
        {venture.tags && venture.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
                {venture.tags.map((tag, i) => (
                    <span key={i} className="text-[9px] text-stone-600 font-mono uppercase bg-stone-950/50 px-1.5 py-0.5 border border-stone-800/50">
                        {tag}
                    </span>
                ))}
            </div>
        )}

        {/* Action Link */}
        {venture.link && (
            <div className={cn("flex items-center gap-6 pt-2 font-mono uppercase tracking-[0.2em] text-[10px]", classNames?.links)}>
              <Link
                href={venture.link}
                target="_blank"
                className="flex items-center gap-2 text-stone-500 hover:text-white transition-colors group/link"
              >
                <ExternalLink size={12} style={{ color: `${currentPalette.tint}88` }} />
                <span>VIEW VENTURE</span>
              </Link>
            </div>
        )}
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
