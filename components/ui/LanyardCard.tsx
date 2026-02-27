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
      timestamps: {
        start: number;
        end: number;
      };
    };
  };
}

interface LRCLine {
  time: number; // in milliseconds
  text: string;
}

const DISCORD_ID = "632142872577048577"; // PLACEHOLDER: Replace with your Discord ID

export const LanyardCard = () => {
  const { currentPalette } = usePalette();
  const [data, setData] = useState<LanyardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [lyrics, setLyrics] = useState<string | null>(null);
  const [parsedSyncedLyrics, setParsedSyncedLyrics] = useState<LRCLine[]>([]);
  const [lyricsLoading, setLyricsLoading] = useState(false);
  const [lastfmData, setLastfmData] = useState<{ song: string; artist: string } | null>(null);
  const [currentProgress, setCurrentProgress] = useState(0);

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

  useEffect(() => {
    const LASTFM_API_KEY = process.env.LASTFM_API_KEY;
    const LASTFM_USERNAME = process.env.NEXT_PUBLIC_LASTFM_USERNAME;
    
    if (!LASTFM_API_KEY || !LASTFM_USERNAME) return;

    const fetchLastfm = async () => {
      try {
        const res = await fetch(`https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${LASTFM_USERNAME}&api_key=${LASTFM_API_KEY}&format=json&limit=1`);
        const json = await res.json();
        const track = json.recenttracks.track[0];
        if (track && track['@attr'] && track['@attr'].nowplaying === 'true') {
          setLastfmData({ 
            song: track.name, 
            artist: track.artist['#text'] 
          });
        } else {
          setLastfmData(null);
        }
      } catch (e) {
        console.error("Last.fm error", e);
      }
    };

    fetchLastfm();
    const interval = setInterval(fetchLastfm, 10000);
    return () => clearInterval(interval);
  }, []);

  const lanyardSpotify = data?.data?.spotify;
  const lanyardListening = data?.data?.listening_to_spotify;

  const currentSong = lastfmData || (lanyardListening && lanyardSpotify ? { song: lanyardSpotify.song, artist: lanyardSpotify.artist } : null);
  const isListening = !!currentSong;

  // Track progress in real-time
  useEffect(() => {
    if (!lanyardListening || !lanyardSpotify) {
      setCurrentProgress(0);
      return;
    }

    const updateProgress = () => {
      const start = lanyardSpotify.timestamps.start;
      const progress = Date.now() - start;
      setCurrentProgress(progress);
    };

    updateProgress();
    const interval = setInterval(updateProgress, 100); // 100ms for responsiveness
    return () => clearInterval(interval);
  }, [lanyardListening, lanyardSpotify?.timestamps.start]);

  const parseLRC = (lrc: string): LRCLine[] => {
    const lines = lrc.split('\n');
    const result: LRCLine[] = [];
    const timeRegex = /\[(\d{2}):(\d{2})\.(\d{2,3})\](.*)/;

    lines.forEach(line => {
      const match = line.match(timeRegex);
      if (match) {
        const minutes = parseInt(match[1]);
        const seconds = parseInt(match[2]);
        const ms = parseInt(match[3].padEnd(3, '0'));
        const time = (minutes * 60 + seconds) * 1000 + ms;
        const text = match[4].trim();
        if (text) result.push({ time, text });
      }
    });

    return result.sort((a, b) => a.time - b.time);
  };

  useEffect(() => {
    if (isListening && currentSong) {
      const fetchLyrics = async () => {
        setLyricsLoading(true);
        try {
          const res = await fetch(`https://lrclib.net/api/get?artist_name=${encodeURIComponent(currentSong.artist)}&track_name=${encodeURIComponent(currentSong.song)}`);
          if (res.ok) {
            const data = await res.json();
            if (data.syncedLyrics) {
              setParsedSyncedLyrics(parseLRC(data.syncedLyrics));
              setLyrics(null);
            } else {
              setParsedSyncedLyrics([]);
              setLyrics(data.plainLyrics || "No lyrics found.");
            }
          } else {
            setLyrics("No lyrics found.");
            setParsedSyncedLyrics([]);
          }
        } catch (error) {
          setLyrics("Error loading lyrics.");
          setParsedSyncedLyrics([]);
        } finally {
          setLyricsLoading(false);
        }
      };
      fetchLyrics();
    } else {
      setLyrics(null);
    }
  }, [isListening, currentSong?.song, currentSong?.artist]);

  if (loading) {
    return (
      <div 
        className="w-full h-32 border bg-black/40 animate-pulse"
        style={{ borderColor: `${currentPalette.tint}22` }}
      />
    );
  }

  if (!data) return null;

  const { discord_user, discord_status, activities } = data.data;
  
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
      <div className="flex items-start gap-5">
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
          
          {isListening && currentSong ? (
            <div className="text-[10px] text-slate-400 font-mono animate-pulse flex items-center gap-2">
              <span className="text-green-500">♫</span> Listening to {currentSong.song}
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

      {isListening && (
        <div 
          className="mt-4 w-full h-[120px] text-[10px] font-mono overflow-hidden scrollbar-hide relative px-4"
          style={{ 
            color: `${currentPalette.tint}cc`,
            maskImage: 'linear-gradient(to bottom, transparent, black 25%, black 75%, transparent)',
            WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 25%, black 75%, transparent)'
          }}
        >
          {lyricsLoading ? (
            <div className="animate-pulse opacity-50 py-2">SYNCING_LYRICS...</div>
          ) : parsedSyncedLyrics.length > 0 ? (
            <div 
              className="transition-transform duration-500 ease-in-out py-10"
              style={{
                transform: `translateY(${-parsedSyncedLyrics.findIndex((l, i) => 
                  currentProgress >= l.time && (!parsedSyncedLyrics[i+1] || currentProgress < parsedSyncedLyrics[i+1].time)
                ) * 20}px)`
              }}
            >
              {parsedSyncedLyrics.map((line, index) => {
                const isActive = currentProgress >= line.time && 
                  (!parsedSyncedLyrics[index + 1] || currentProgress < parsedSyncedLyrics[index + 1].time);
                
                return (
                  <div 
                    key={index}
                    className="h-[20px] transition-all duration-300 origin-left"
                    style={{ 
                      opacity: isActive ? 1 : 0.3,
                      transform: isActive ? 'scale(1.05)' : 'scale(1)',
                      color: isActive ? currentPalette.tint : 'inherit'
                    }}
                  >
                    {line.text}
                  </div>
                );
              })}
            </div>
          ) : (
            <div 
              className={lyrics ? "animate-lyrics-scroll py-8" : "py-4"}
              style={{ animationDuration: lyrics && lyrics.length > 500 ? '60s' : '40s' }}
            >
              <div className="whitespace-pre-wrap leading-relaxed opacity-70 mb-8">
                {lyrics || "LYRICS_NOT_FOUND"}
              </div>
              {lyrics && (
                <div className="whitespace-pre-wrap leading-relaxed opacity-70">
                  {lyrics}
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
