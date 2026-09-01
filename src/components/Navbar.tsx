import React from "react";
import { Terminal, Volume2, VolumeX, Sparkles } from "lucide-react";
import { LanguageTrack } from "@/types/curriculum";

interface NavbarProps {
  tracks: LanguageTrack[];
  selectedTrack: LanguageTrack;
  onSelectTrack: (track: LanguageTrack) => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
  overallProgress: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  tracks,
  selectedTrack,
  onSelectTrack,
  soundEnabled,
  onToggleSound,
  overallProgress,
}) => {
  return (
    <header className="h-16 border-b border-slate-800 bg-slate-950/80 backdrop-blur px-4 sm:px-6 flex items-center justify-between sticky top-0 z-50">
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
          <Terminal className="w-5 h-5" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-sm sm:text-base tracking-tight text-slate-100">
              BelajarBahasa<span className="text-emerald-400">.io</span>
            </span>
            <span className="hidden sm:inline-block text-[10px] bg-slate-900 text-slate-400 font-semibold px-2 py-0.5 rounded border border-slate-800">
              v3.0 Canvas
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3">
        {/* Progress Tracker Pill */}
        <div className="hidden md:flex items-center gap-2 bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-lg text-xs">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span className="text-slate-400">Track Progress:</span>
          <span className="font-bold text-emerald-400">{overallProgress}%</span>
          <div className="w-16 h-1.5 bg-slate-800 rounded-full overflow-hidden ml-1">
            <div
              className="h-full bg-emerald-500 transition-all duration-300"
              style={{ width: `${overallProgress}%` }}
            />
          </div>
        </div>

        {/* Language Selector */}
        <select
          value={selectedTrack.id}
          onChange={(e) => {
            const track = tracks.find((t) => t.id === e.target.value);
            if (track) onSelectTrack(track);
          }}
          className="bg-slate-900 text-slate-200 border border-slate-700 hover:border-slate-600 focus:border-emerald-500 rounded-lg px-3 py-1.5 text-xs font-semibold transition outline-none cursor-pointer"
        >
          <optgroup label="Bahasa Modern">
            {tracks
              .filter((t) => t.category === "Modern")
              .map((t) => (
                <option key={t.id} value={t.id}>
                  {t.name} ({t.year})
                </option>
              ))}
          </optgroup>
          <optgroup label="Klasik & Retro">
            {tracks
              .filter((t) => t.category === "Klasik & Retro")
              .map((t) => (
                <option key={t.id} value={t.id}>
                  {t.name} ({t.year})
                </option>
              ))}
          </optgroup>
        </select>

        {/* Audio Toggle */}
        <button
          onClick={onToggleSound}
          title={soundEnabled ? "Nonaktifkan Suara" : "Aktifkan Suara"}
          className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700 transition"
        >
          {soundEnabled ? <Volume2 className="w-4 h-4 text-emerald-400" /> : <VolumeX className="w-4 h-4 text-slate-500" />}
        </button>
      </div>
    </header>
  );
};