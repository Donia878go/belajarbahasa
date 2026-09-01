import React, { useState, useEffect } from 'react';
import { LANGUAGES_DATA } from './data/languagesData';

export default function App() {
  const [selectedLang, setSelectedLang] = useState(LANGUAGES_DATA[0]);
  const [activeModuleIndex, setActiveModuleIndex] = useState(0);
  const [code, setCode] = useState(selectedLang.modules[0].initialCode);
  const [output, setOutput] = useState('');
  const [execTime, setExecTime] = useState(null);
  const [showHint, setShowHint] = useState(false);
  const [isSuccess, setIsSuccess] = useState(null);
  const [completedModules, setCompletedModules] = useState({});

  const currentModule = selectedLang.modules[activeModuleIndex] || selectedLang.modules[0];

  // Load completed modules from LocalStorage
  useEffect(() => {
    const saved = localStorage.getItem('belajarbahasa_progress');
    if (saved) {
      try { setCompletedModules(JSON.parse(saved)); } catch (e) {}
    }
  }, []);

  // Update code when language or module changes
  useEffect(() => {
    const mod = selectedLang.modules[activeModuleIndex] || selectedLang.modules[0];
    setCode(mod.initialCode);
    setOutput('');
    setExecTime(null);
    setShowHint(false);
    setIsSuccess(null);
  }, [selectedLang, activeModuleIndex]);

  // Keyboard shortcut: Ctrl + Enter / Cmd + Enter to Run
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        handleRunCode();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [code, currentModule]);

  const handleRunCode = () => {
    const startTime = performance.now();
    
    // Check if code contains unreplaced ???
    if (code.includes('???')) {
      setOutput('❌ Error Sintaks: Masih terdapat tanda ??? pada kode. Harap lengkapi tugas latihan terlebih dahulu.');
      setIsSuccess(false);
      setExecTime(((performance.now() - startTime) / 1000).toFixed(2));
      return;
    }

    // Normalizing code for check
    const cleanUser = code.replace(/\s+/g, '');
    const cleanSolution = currentModule.solutionCode.replace(/\s+/g, '');

    setTimeout(() => {
      const duration = ((performance.now() - startTime) / 1000 + 0.15).toFixed(2);
      setExecTime(duration);

      if (cleanUser === cleanSolution || !code.includes('???')) {
        setOutput(currentModule.expectedOutput);
        setIsSuccess(true);
        
        // Save progress
        const newProgress = { ...completedModules, [currentModule.id]: true };
        setCompletedModules(newProgress);
        localStorage.setItem('belajarbahasa_progress', JSON.stringify(newProgress));
      } else {
        setOutput(`[Output Log]\n${currentModule.expectedOutput}\n⚠️ Catatan: Output dihasilkan namun belum persis sesuai solusi yang diharapkan.`);
        setIsSuccess(false);
      }
    }, 180);
  };

  const handleReset = () => {
    setCode(currentModule.initialCode);
    setOutput('');
    setIsSuccess(null);
    setExecTime(null);
  };

  const progressPercent = Math.round(
    (Object.keys(completedModules).length / (LANGUAGES_DATA.length * 2)) * 100
  );

  return (
    <div className="h-screen w-screen flex flex-col bg-zinc-950 text-zinc-100 font-sans overflow-hidden">
      
      {/* ================= HEADER ATAS ================= */}
      <header className="h-16 border-b border-zinc-800 bg-zinc-900/90 backdrop-blur px-5 flex items-center justify-between z-30 shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-yellow-500 to-amber-400 flex items-center justify-center font-black text-zinc-950 text-xl shadow-lg shadow-yellow-500/20">
            B
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-base text-zinc-100 tracking-tight">BelajarBahasa.io</span>
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-yellow-400/10 text-yellow-400 border border-yellow-400/30">
                Saweria Edition
              </span>
            </div>
            <p className="text-xs text-zinc-400">Interactive Coding Canvas</p>
          </div>
        </div>

        {/* Language Selector Dropdown (16 Languages) */}
        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-2 bg-zinc-950/80 px-3 py-1.5 rounded-lg border border-zinc-800 text-xs">
            <span className="text-zinc-400">Progres:</span>
            <span className="font-bold text-yellow-400">{progressPercent}% Selesai</span>
          </div>

          <div className="flex items-center gap-2">
            <label className="text-xs text-zinc-400 hidden sm:inline">Bahasa:</label>
            <select
              value={selectedLang.id}
              onChange={(e) => {
                const lang = LANGUAGES_DATA.find((l) => l.id === e.target.value);
                if (lang) {
                  setSelectedLang(lang);
                  setActiveModuleIndex(0);
                }
              }}
              className="bg-zinc-800 text-zinc-100 border border-zinc-700 rounded-lg px-3 py-1.5 text-xs font-medium focus:outline-none focus:border-yellow-400 cursor-pointer shadow-sm"
            >
              <optgroup label="⚡ Bahasa Modern">
                {LANGUAGES_DATA.filter((l) => l.category === 'Modern').map((l) => (
                  <option key={l.id} value={l.id}>
                    {l.name} ({l.year})
                  </option>
                ))}
              </optgroup>
              <optgroup label="💾 Klasik, 90-an & Mainframe">
                {LANGUAGES_DATA.filter((l) => l.category === 'Klasik & Retro').map((l) => (
                  <option key={l.id} value={l.id}>
                    {l.name} ({l.year})
                  </option>
                ))}
              </optgroup>
            </select>
          </div>
        </div>
      </header>

      {/* ================= MAIN DUAL-PANEL (FIXED SPLIT-SCREEN) ================= */}
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
        
        {/* PANEL KIRI: Teori, Petunjuk, & Modul (Independent Scroll) */}
        <aside className="w-full md:w-[420px] lg:w-[460px] border-r border-zinc-800 bg-zinc-900/50 flex flex-col h-full overflow-y-auto shrink-0 p-5 space-y-6">
          
          {/* Header Bahasa Aktif */}
          <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
            <div>
              <h2 className="text-lg font-bold text-zinc-100 flex items-center gap-2">
                {selectedLang.name}
                <span className={`text-[10px] px-2 py-0.5 rounded-full border ${selectedLang.badgeColor}`}>
                  {selectedLang.category}
                </span>
              </h2>
              <p className="text-xs text-zinc-400 mt-0.5">Rilis: {selectedLang.year}</p>
            </div>
            <div className="text-right">
              <span className="text-[11px] font-semibold text-yellow-400">
                Level {activeModuleIndex + 1} dari {selectedLang.modules.length}
              </span>
            </div>
          </div>

          {/* KARTU 1: TEORI & KONSEP UTAMA */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 shadow-sm space-y-3">
            <div className="flex items-center gap-2 text-yellow-400 font-semibold text-sm">
              <span>💡</span>
              <h3>Konsep & Teori Dasar</h3>
            </div>
            <p className="text-xs text-zinc-300 leading-relaxed">
              {currentModule.theory}
            </p>
            {currentModule.exampleCode && (
              <div className="bg-zinc-950 p-3 rounded-lg border border-zinc-800/80">
                <span className="text-[10px] text-zinc-500 uppercase font-mono block mb-1">Contoh Sintaks:</span>
                <pre className="text-xs font-mono text-emerald-400 overflow-x-auto">
                  {currentModule.exampleCode}
                </pre>
              </div>
            )}
          </div>

          {/* KARTU 2: MISI & TUGAS LATIHAN */}
          <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-yellow-400 font-semibold text-sm">
                <span>🎯</span>
                <h3>Tugas Anda:</h3>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 bg-yellow-400 text-zinc-950 rounded-full">
                Latihan
              </span>
            </div>
            <p className="text-xs text-zinc-200 font-medium leading-relaxed">
              {currentModule.task}
            </p>

            {/* Tombol Hint / Petunjuk */}
            <div className="pt-2 border-t border-yellow-500/20">
              <button
                onClick={() => setShowHint(!showHint)}
                className="text-xs font-semibold text-yellow-400 hover:text-yellow-300 flex items-center gap-1.5 transition-colors"
              >
                <span>{showHint ? '🙈 Sembunyikan Bantuan' : '🔍 Butuh Petunjuk?'}</span>
              </button>
              {showHint && (
                <div className="mt-2 text-xs bg-zinc-950/80 p-2.5 rounded-lg text-yellow-200/90 border border-yellow-500/20">
                  {currentModule.hint}
                </div>
              )}
            </div>
          </div>

          {/* DAFTAR MODUL LEVEL */}
          <div className="space-y-2">
            <h4 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Kurikulum Modul:</h4>
            <div className="space-y-1.5">
              {selectedLang.modules.map((mod, idx) => {
                const isCompleted = completedModules[mod.id];
                const isActive = idx === activeModuleIndex;
                return (
                  <button
                    key={mod.id}
                    onClick={() => setActiveModuleIndex(idx)}
                    className={`w-full text-left p-3 rounded-xl border text-xs flex items-center justify-between transition-all ${
                      isActive
                        ? 'bg-zinc-800 border-yellow-400 text-yellow-400 font-bold shadow-sm'
                        : 'bg-zinc-900/60 border-zinc-800/80 text-zinc-300 hover:bg-zinc-800/50 hover:border-zinc-700'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 truncate">
                      <span className="text-sm">{isCompleted ? '✅' : '📌'}</span>
                      <span className="truncate">{mod.title}</span>
                    </div>
                    {isActive && (
                      <span className="text-[10px] px-2 py-0.5 bg-yellow-400 text-zinc-950 rounded font-bold">
                        Aktif
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* ================= FOOTER MEDIA SOSIAL ================= */}
          <div className="mt-auto pt-6 border-t border-zinc-800 text-center space-y-3">
            <div className="text-xs text-zinc-400">
              <span className="text-zinc-200 font-medium">BelajarBahasa.io</span> by Doni Firmansyah
            </div>
            
            {/* Social Media Links */}
            <div className="flex items-center justify-center gap-4 text-zinc-400">
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="hover:text-white hover:scale-110 transition-transform"
                title="GitHub"
              >
                GitHub
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="hover:text-blue-400 hover:scale-110 transition-transform"
                title="LinkedIn"
              >
                LinkedIn
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="hover:text-pink-400 hover:scale-110 transition-transform"
                title="Instagram"
              >
                Instagram
              </a>
              <a
                href="https://saweria.co"
                target="_blank"
                rel="noreferrer"
                className="px-2.5 py-1 bg-amber-400 text-zinc-950 font-bold text-xs rounded-full hover:bg-amber-300 hover:scale-105 transition-all shadow-md shadow-amber-400/20"
                title="Dukung di Saweria"
              >
                ☕ Saweria
              </a>
            </div>
          </div>

        </aside>

        {/* PANEL KANAN: Editor Kode & Terminal Output (Tetap Diam & Tidak Tergeser) */}
        <main className="flex-1 flex flex-col h-full overflow-hidden bg-zinc-950">
          
          {/* Top Bar Editor */}
          <div className="h-12 border-b border-zinc-800 bg-zinc-900/60 px-4 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block"></span>
              <span className="w-3 h-3 rounded-full bg-yellow-500/80 inline-block"></span>
              <span className="w-3 h-3 rounded-full bg-green-500/80 inline-block"></span>
              <span className="text-xs font-mono text-zinc-400 ml-2">
                workspace.{selectedLang.id === 'python' ? 'py' : selectedLang.id === 'c' ? 'c' : 'txt'}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleReset}
                className="px-3 py-1.5 rounded-lg text-xs font-medium text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800 transition-colors"
              >
                ↺ Reset
              </button>
              <button
                onClick={handleRunCode}
                className="px-4 py-1.5 rounded-lg bg-amber-400 hover:bg-amber-300 text-zinc-950 font-bold text-xs flex items-center gap-1.5 transition-all shadow-md shadow-amber-400/20 hover:scale-105 active:scale-95"
              >
                <span>▶ Jalankan (Ctrl+Enter)</span>
              </button>
            </div>
          </div>

          {/* Area Editor Teks Kode */}
          <div className="flex-1 relative overflow-hidden bg-zinc-950 p-4">
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              spellCheck="false"
              className="w-full h-full bg-transparent font-mono text-sm text-zinc-200 resize-none focus:outline-none leading-relaxed selection:bg-yellow-500/30"
              placeholder="Tulis atau edit kode di sini..."
            />
          </div>

          {/* Panel Konsol Output & Status */}
          <div className="h-44 md:h-52 border-t border-zinc-800 bg-zinc-900/80 flex flex-col shrink-0">
            <div className="h-9 border-b border-zinc-800 px-4 flex items-center justify-between text-xs text-zinc-400">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-zinc-300">Terminal Output</span>
                {execTime && (
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-zinc-800 text-emerald-400 font-mono">
                    Waktu: {execTime}s
                  </span>
                )}
                {isSuccess === true && (
                  <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30">
                    ✓ LULUS
                  </span>
                )}
              </div>
              <button
                onClick={() => setOutput('')}
                className="text-[11px] text-zinc-500 hover:text-zinc-300"
              >
                Bersihkan Log
              </button>
            </div>

            <div className="flex-1 p-3 font-mono text-xs overflow-y-auto text-zinc-300 bg-zinc-950/60">
              {output ? (
                <pre className="whitespace-pre-wrap">{output}</pre>
              ) : (
                <span className="text-zinc-600 italic">
                  Klik tombol "Jalankan (Ctrl+Enter)" untuk melihat output kompilasi kode...
                </span>
              )}
            </div>
          </div>

        </main>
      </div>

    </div>
  );
}