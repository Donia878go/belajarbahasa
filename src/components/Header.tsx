import React from "react";
import { LanguageSpec } from "@/data/languages";

interface HeaderProps {
  languages: LanguageSpec[];
  selectedLang: LanguageSpec;
  onSelectLang: (lang: LanguageSpec) => void;
}

export const Header: React.FC<HeaderProps> = ({ languages, selectedLang, onSelectLang }) => {
  return (
    <header className="h-16 border-b border-[#ebdccb] bg-[#fffaef] px-6 flex items-center justify-between shadow-sm">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-2xl bg-[#f5a623] flex items-center justify-center text-white font-extrabold text-xl shadow-md">
          ⚡
        </div>
        <div>
          <div className="flex items-center gap-2">
            <span className="text-lg font-black tracking-tight text-[#1a1a1a]">
              BelajarBahasa<span className="text-[#f5a623]">.io</span>
            </span>
            <span className="text-[10px] bg-[#ffeed0] text-[#a06000] font-bold px-2 py-0.5 rounded-full border border-[#fbd697]">
              Saweria Edition
            </span>
          </div>
          <span className="text-[11px] text-[#7a6f62] block">
            Multi-Language Interactive Coding Canvas
          </span>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="hidden md:flex items-center gap-2 bg-[#ffffff] border border-[#ebdccb] px-3 py-1.5 rounded-xl text-xs text-[#6e6355] shadow-sm">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
          <span>Kernel: <b className="text-[#1a1a1a]">RAM</b> 1.8GB / <b className="text-[#1a1a1a]">Disk</b> 25GB</span>
        </div>

        <select
          value={selectedLang.id}
          onChange={(e) => {
            const target = languages.find((l) => l.id === e.target.value);
            if (target) onSelectLang(target);
          }}
          className="bg-[#ffffff] text-[#333] border-2 border-[#ebdccb] hover:border-[#f5a623] focus:border-[#f5a623] rounded-xl px-3 py-2 text-xs font-bold transition focus:outline-none cursor-pointer shadow-sm"
        >
          <optgroup label="Bahasa Modern">
            {languages.filter((l) => l.category === "Modern").map((lang) => (
              <option key={lang.id} value={lang.id}>{lang.name} ({lang.year})</option>
            ))}
          </optgroup>
          <optgroup label="Klasik, 90-an & Mainframe">
            {languages.filter((l) => l.category === "Klasik & Retro").map((lang) => (
              <option key={lang.id} value={lang.id}>{lang.name} ({lang.year})</option>
            ))}
          </optgroup>
        </select>
      </div>
    </header>
  );
};