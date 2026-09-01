import React, { useState } from "react";
import { CheckCircle2, Circle, HelpCircle, BookOpen, Layers } from "lucide-react";
import { LanguageTrack, CurriculumModule } from "@/types/curriculum";

interface SidebarTrackProps {
  track: LanguageTrack;
  activeModule: CurriculumModule;
  completedIds: string[];
  onSelectModule: (module: CurriculumModule) => void;
}

export const SidebarTrack: React.FC<SidebarTrackProps> = ({
  track,
  activeModule,
  completedIds,
  onSelectModule,
}) => {
  const [hintIndex, setHintIndex] = useState<number>(-1);

  return (
    <aside className="w-full h-full flex flex-col bg-slate-950 border-r border-slate-800 overflow-y-auto">
      {/* Track Description */}
      <div className="p-4 border-b border-slate-800/80 bg-slate-900/30">
        <div className="flex items-center justify-between mb-1.5">
          <h2 className="text-sm font-extrabold text-slate-100 flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-emerald-400" />
            {track.name} Track
          </h2>
          <span className="text-[10px] bg-slate-800 text-slate-400 px-2 py-0.5 rounded font-mono">
            {completedIds.length}/{track.modules.length} Selesai
          </span>
        </div>
        <p className="text-xs text-slate-400 leading-relaxed line-clamp-2">
          {track.description}
        </p>
      </div>

      {/* Module Curriculum List */}
      <div className="p-3 flex flex-col gap-1.5 flex-1">
        <span className="text-[10px] font-bold tracking-wider text-slate-500 uppercase px-2 py-1">
          Daftar 10 Modul Pembelajaran
        </span>
        {track.modules.map((mod) => {
          const isCurrent = activeModule.id === mod.id;
          const isDone = completedIds.includes(mod.id);

          return (
            <button
              key={mod.id}
              onClick={() => {
                onSelectModule(mod);
                setHintIndex(-1);
              }}
              className={`w-full text-left p-2.5 rounded-lg border transition-all flex items-center justify-between gap-3 ${
                isCurrent
                  ? "bg-slate-900 border-emerald-500/50 text-slate-100 shadow-sm"
                  : "bg-slate-950 border-slate-800/80 text-slate-400 hover:border-slate-700 hover:text-slate-200"
              }`}
            >
              <div className="flex items-center gap-2.5 min-w-0">
                {isDone ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                ) : (
                  <Circle className="w-4 h-4 text-slate-600 shrink-0" />
                )}
                <div className="truncate">
                  <div className="text-[10px] font-semibold text-slate-500 uppercase tracking-wide">
                    Level {mod.order}: {mod.level}
                  </div>
                  <div className="text-xs font-bold text-slate-200 truncate">
                    {mod.title}
                  </div>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Active Theory & Task Description */}
      <div className="p-4 border-t border-slate-800 bg-slate-900/40 flex flex-col gap-3">
        <div>
          <div className="text-[11px] font-bold text-emerald-400 flex items-center gap-1.5 mb-1">
            <Layers className="w-3.5 h-3.5" />
            Materi Teori Singkat
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            {activeModule.theory}
          </p>
        </div>

        <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
          <div className="text-[11px] font-bold text-amber-400 mb-1">
            🎯 Tugas Anda:
          </div>
          <p className="text-xs text-slate-300 leading-relaxed font-medium">
            {activeModule.task}
          </p>
        </div>

        {/* Interactive Progressive Hint */}
        {activeModule.hints && activeModule.hints.length > 0 && (
          <div>
            <button
              onClick={() =>
                setHintIndex((prev) =>
                  prev < activeModule.hints.length - 1 ? prev + 1 : prev
                )
              }
              className="text-xs text-slate-400 hover:text-amber-300 flex items-center gap-1.5 transition font-semibold"
            >
              <HelpCircle className="w-3.5 h-3.5" />
              {hintIndex < 0
                ? "Buka Petunjuk (Hint)"
                : `Petunjuk (${hintIndex + 1}/${activeModule.hints.length})`}
            </button>
            {hintIndex >= 0 && (
              <div className="mt-2 p-2 rounded bg-amber-950/20 border border-amber-800/40 text-[11px] text-amber-200">
                💡 {activeModule.hints[hintIndex]}
              </div>
            )}
          </div>
        )}
      </div>
    </aside>
  );
};