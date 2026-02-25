"use client";

import React, { useEffect, useState } from "react";
import { usePalette } from "@/context/PaletteContext";

interface LanyardData {
  data: {
    discord_user: {
      username: string;
      discriminator: string;
      avatar: string;
      id: string;
      global_name?: string;
    };
    discord_status: "online" | "idle" | "dnd" | "offline";
    activities: Array<{
      type: number;
      name: string;
      details?: string;
      state?: string;
      assets?: {
        large_image?: string;
        small_image?: string;
      };
    }>;
    listening_to_spotify: boolean;
    spotify?: {
      song: string;
      artist: string;
      album_art_url: string;
    };
  };
}

const DISCORD_ID = "632142872577048577"; // PLACEHOLDER: Replace with your Discord ID

export const LanyardCard = () => {
  const { currentPalette } = usePalette();
  const [data, setData] = useState<LanyardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://api.lanyard.rest/v1/users/${DISCORD_ID}`);
        const json = await response.json();
        setData(json);
      } catch (error) {
        console.error("Lanyard error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 30000); // Update every 30s
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div 
        className="w-full h-32 border bg-black/40 animate-pulse"
        style={{ borderColor: `${currentPalette.tint}22` }}
      />
    );
  }

  if (!data) return null;

  const { discord_user, discord_status, activities, listening_to_spotify, spotify } = data.data;
  
  const statusColors = {
    online: "#22c55e",
    idle: "#f59e0b",
    dnd: "#ef4444",
    offline: "#64748b"
  };

  const statusColor = statusColors[discord_status] || statusColors.offline;

  return (
    <div 
      className="p-6 border bg-black/40 backdrop-blur-sm group transition-all duration-300 hover:bg-black/60"
      style={{ borderColor: `${currentPalette.tint}33` }}
    >
      <div className="flex items-center gap-5">
        <div className="relative">
          <img 
            src={`https://cdn.discordapp.com/avatars/${discord_user.id}/${discord_user.avatar}.png`} 
            alt={discord_user.username}
            className="w-16 h-16 border p-1"
            style={{ borderColor: `${currentPalette.tint}44` }}
          />
          <div 
            className="absolute bottom-0 right-0 w-4 h-4 border-2 border-black"
            style={{ backgroundColor: statusColor }}
          />
        </div>
        
        <div className="flex-1 overflow-hidden">
          <h3 
            className="text-lg font-bold truncate"
            style={{ color: currentPalette.tint }}
          >
            {discord_user.global_name || discord_user.username}
          </h3>
          <p className="text-xs text-slate-500 uppercase tracking-widest mb-2">
            Discord Status: <span style={{ color: statusColor }}>{discord_status}</span>
          </p>
          
          {listening_to_spotify && spotify ? (
            <div className="text-[10px] text-slate-400 font-mono animate-pulse flex items-center gap-2">
              <span className="text-green-500">♫</span> Listening to {spotify.song}
            </div>
          ) : activities.length > 0 ? (
            <div className="text-[10px] text-slate-400 font-mono flex flex-col">
              <span className="opacity-60">Currently:</span>
              <span className="truncate">{activities[0].name}</span>
            </div>
          ) : (
            <div className="text-[10px] text-slate-400 font-mono opacity-40 italic">
              No current activity
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
