import React from "react";

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-slate-800 bg-slate-950 text-slate-400 text-xs py-6 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex flex-col items-center md:items-start gap-1">
          <div className="font-bold text-slate-200 text-sm">
            BelajarBahasa<span className="text-emerald-400">.io</span>
          </div>
          <p className="text-slate-500 text-[11px]">
            Interactive Coding Canvas • Built by <span className="text-slate-300 font-medium">Doni Firmansyah</span>
          </p>
        </div>

        <div className="flex items-center gap-3">
          <a
            href="https://github.com/Donia878go"
            target="_blank"
            rel="noopener noreferrer"
            className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800 hover:border-slate-600 hover:text-slate-100 transition"
          >
            GitHub
          </a>
          <a
            href="https://linkedin.com/in/doni-firmansyah"
            target="_blank"
            rel="noopener noreferrer"
            className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800 hover:border-sky-600 hover:text-sky-400 transition"
          >
            LinkedIn
          </a>
          <a
            href="https://instagram.com/doni.frmnsyh"
            target="_blank"
            rel="noopener noreferrer"
            className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800 hover:border-pink-600 hover:text-pink-400 transition"
          >
            Instagram
          </a>
          <a
            href="https://saweria.co/donifirmansyah"
            target="_blank"
            rel="noopener noreferrer"
            className="px-2.5 py-1 rounded bg-amber-500/10 border border-amber-500/30 text-amber-300 hover:bg-amber-500/20 transition font-medium"
          >
            Saweria
          </a>
        </div>

        <div className="flex items-center gap-3 text-[11px] text-slate-500">
          <a
            href="https://github.com/Donia878go/belajarbahasa/issues"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-slate-300 transition"
          >
            Laporkan Masalah
          </a>
          <span>•</span>
          <span>MIT License</span>
        </div>
      </div>
    </footer>
  );
};