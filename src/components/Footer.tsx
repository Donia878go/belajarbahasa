import React from "react";
import { Github, Linkedin, Instagram, Heart, MessageSquare, ShieldCheck } from "lucide-react";

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-slate-800 bg-slate-950 text-slate-400 text-xs py-8 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Brand & Author Info */}
        <div className="flex flex-col items-center md:items-start gap-1">
          <div className="font-bold text-slate-200 text-sm">
            BelajarBahasa<span className="text-emerald-400">.io</span>
          </div>
          <p className="text-slate-500 text-[11px]">
            Interactive Coding Canvas • Built by <span className="text-slate-300 font-medium">Doni Firmansyah</span>
          </p>
        </div>

        {/* Social Media Links with Hover Effects */}
        <div className="flex items-center gap-3">
          <a
            href="https://github.com/Donia878go"
            target="_blank"
            rel="noopener noreferrer"
            title="GitHub Repository"
            className="p-2 rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-600 hover:text-slate-100 hover:scale-105 transition"
          >
            <Github className="w-4 h-4" />
          </a>
          <a
            href="https://linkedin.com/in/doni-firmansyah"
            target="_blank"
            rel="noopener noreferrer"
            title="LinkedIn Profile"
            className="p-2 rounded-lg bg-slate-900 border border-slate-800 hover:border-sky-600 hover:text-sky-400 hover:scale-105 transition"
          >
            <Linkedin className="w-4 h-4" />
          </a>
          <a
            href="https://instagram.com/doni.frmnsyh"
            target="_blank"
            rel="noopener noreferrer"
            title="Instagram Profile"
            className="p-2 rounded-lg bg-slate-900 border border-slate-800 hover:border-pink-600 hover:text-pink-400 hover:scale-105 transition"
          >
            <Instagram className="w-4 h-4" />
          </a>
          <a
            href="https://saweria.co/donifirmansyah"
            target="_blank"
            rel="noopener noreferrer"
            title="Dukung via Saweria"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-300 hover:bg-amber-500/20 hover:scale-105 transition font-semibold text-[11px]"
          >
            <Heart className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span>Saweria</span>
          </a>
        </div>

        {/* Supporting Legal & Feedback Links */}
        <div className="flex items-center gap-4 text-[11px] text-slate-500">
          <a
            href="https://github.com/Donia878go/belajarbahasa/issues"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-slate-300 flex items-center gap-1 transition"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            Laporkan Masalah
          </a>
          <span>•</span>
          <span className="flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
            MIT Open Source License
          </span>
        </div>

      </div>
    </footer>
  );
};