"use client";

import React, { useState, useEffect, useCallback } from "react";
import confetti from "canvas-confetti";
import { CURRICULUM_DATA } from "@/data/curriculum";
import { LanguageTrack, CurriculumModule, UserProgress } from "@/types/curriculum";
import { sfx } from "@/utils/audio";
import { Navbar } from "@/components/Navbar";
import { SidebarTrack } from "@/components/SidebarTrack";
import { EditorPane } from "@/components/EditorPane";
import { Footer } from "@/components/Footer";

export default function Home() {
  const [selectedTrack, setSelectedTrack] = useState<LanguageTrack>(CURRICULUM_DATA[0]);
  const [activeModule, setActiveModule] = useState<CurriculumModule>(CURRICULUM_DATA[0].modules[0]);
  const [code, setCode] = useState<string>(CURRICULUM_DATA[0].modules[0].initialCode);
  const [output, setOutput] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [evalStatus, setEvalStatus] = useState<"idle" | "pass" | "fail">("idle");
  const [progress, setProgress] = useState<UserProgress>({});
  
  // Mobile Responsiveness Tab Navigation
  const [mobileTab, setMobileTab] = useState<"kurikulum" | "editor">("editor");

  // Inisialisasi LocalStorage Progress
  useEffect(() => {
    const saved = localStorage.getItem("belajarbahasa_progress");
    if (saved) {
      try {
        setProgress(JSON.parse(saved));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  const saveProgress = (trackId: string, moduleId: string) => {
    setProgress((prev) => {
      const currentTrackModules = prev[trackId] || [];
      if (!currentTrackModules.includes(moduleId)) {
        const updated = { ...prev, [trackId]: [...currentTrackModules, moduleId] };
        localStorage.setItem("belajarbahasa_progress", JSON.stringify(updated));
        return updated;
      }
      return prev;
    });
  };

  const handleSelectTrack = (track: LanguageTrack) => {
    setSelectedTrack(track);
    setActiveModule(track.modules[0]);
    setCode(track.modules[0].initialCode);
    setOutput("");
    setEvalStatus("idle");
  };

  const handleSelectModule = (mod: CurriculumModule) => {
    setActiveModule(mod);
    setCode(mod.initialCode);
    setOutput("");
    setEvalStatus("idle");
  };

  // Eksekusi Kode & Evaluasi Otomatis
  const executeCode = useCallback(async () => {
    setIsLoading(true);
    setEvalStatus("idle");
    setOutput("Mengirim ke backend compiler & mengevaluasi...");

    try {
      const res = await fetch("/api/execute", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          language: selectedTrack.id,
          code: code,
        }),
      });

      const data = await res.json();
      const rawOutput = (data.run?.output || "").trim();
      setOutput(rawOutput || "Program selesai dieksekusi tanpa output.");

      // Evaluasi kesesuaian output
      const expected = activeModule.expectedOutput.trim();
      if (rawOutput === expected) {
        setEvalStatus("pass");
        sfx.playSuccess();
        saveProgress(selectedTrack.id, activeModule.id);

        // Micro-celebration Confetti
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.8 },
        });
      } else {
        setEvalStatus("fail");
        sfx.playError();
      }
    } catch {
      setOutput("Gagal terhubung ke remote execution server.");
      setEvalStatus("fail");
      sfx.playError();
    } finally {
      setIsLoading(false);
    }
  }, [code, selectedTrack, activeModule]);

  // Listener Pintasan Keyboard Ctrl + Enter
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
        e.preventDefault();
        executeCode();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [executeCode]);

  const completedTrackIds = progress[selectedTrack.id] || [];
  const percentCompleted = Math.round(
    (completedTrackIds.length / selectedTrack.modules.length) * 100
  );

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-emerald-500/20 selection:text-emerald-300">
      <Navbar
        tracks={CURRICULUM_DATA}
        selectedTrack={selectedTrack}
        onSelectTrack={handleSelectTrack}
        soundEnabled={soundEnabled}
        onToggleSound={() => {
          setSoundEnabled(!soundEnabled);
          sfx.enabled = !soundEnabled;
        }}
        overallProgress={percentCompleted}
      />

      {/* Mobile Tab Toggle */}
      <div className="flex md:hidden border-b border-slate-800 bg-slate-900/60 p-1">
        <button
          onClick={() => setMobileTab("kurikulum")}
          className={`flex-1 py-1.5 text-xs font-bold rounded-md transition ${
            mobileTab === "kurikulum" ? "bg-slate-800 text-emerald-400" : "text-slate-400"
          }`}
        >
          Kurikulum & Soal
        </button>
        <button
          onClick={() => setMobileTab("editor")}
          className={`flex-1 py-1.5 text-xs font-bold rounded-md transition ${
            mobileTab === "editor" ? "bg-slate-800 text-emerald-400" : "text-slate-400"
          }`}
        >
          Editor & Output
        </button>
      </div>

      {/* Workspace Grid */}
      <main className="flex-1 grid grid-cols-1 md:grid-cols-12 overflow-hidden min-h-[calc(100vh-4rem-140px)]">
        {/* Sidebar Track Left */}
        <div
          className={`${
            mobileTab === "kurikulum" ? "block" : "hidden"
          } md:block md:col-span-4 lg:col-span-3 h-full`}
        >
          <SidebarTrack
            track={selectedTrack}
            activeModule={activeModule}
            completedIds={completedTrackIds}
            onSelectModule={(mod) => {
              handleSelectModule(mod);
              setMobileTab("editor");
            }}
          />
        </div>

        {/* Editor & Console Right */}
        <div
          className={`${
            mobileTab === "editor" ? "block" : "hidden"
          } md:block md:col-span-8 lg:col-span-9 h-full`}
        >
          <EditorPane
            monacoLang={selectedTrack.monacoLang}
            activeModule={activeModule}
            code={code}
            onChangeCode={setCode}
            onResetCode={() => setCode(activeModule.initialCode)}
            onRunCode={executeCode}
            isLoading={isLoading}
            evalStatus={evalStatus}
            output={output}
          />
        </div>
      </main>

      <Footer />
    </div>
  );
}