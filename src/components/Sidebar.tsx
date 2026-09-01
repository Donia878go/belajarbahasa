import React from "react";
import { LanguageSpec } from "@/data/languages";

interface SidebarProps {
  selectedLang: LanguageSpec;
  selectedModIndex: number;
  onSelectModule: (index: number) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  selectedLang,
  selectedModIndex,
  onSelectModule,
}) => {
  return (
    <div className="lg:col-span-4 flex flex-col gap-4 overflow-y-auto">
      {/* Kartu Profil Bahasa */}
      <div className="bg-[#ffffff] border border-[#ebdccb] rounded-2xl p-5 shadow-sm">
        <div className="flex items-center justify-between pb-3 border-b border-[#f3e7d9]">
          <div className="flex items-center gap-2">
            <h2 className="text-base font-black text-[#1a1a1a]">{selectedLang.name}</h2>
            <span className="text-[10px] bg-[#f5a623] text-white font-extrabold px-2 py-0.5 rounded-md">
              {selectedLang.category}
            </span>
          </div>
          <span className="text-xs font-semibold text-[#8b7d6b]">Rilis: {selectedLang.year}</span>
        </div>
        <p className="text-xs text-[#5f5548] leading-relaxed mt-3">{selectedLang.description}</p>
      </div>

      {/* Daftar Modul Kurikulum */}
      <div className="bg-[#ffffff] border border-[#ebdccb] rounded-2xl p-5 shadow-sm flex-1 flex flex-col">
        <h3 className="text-xs font-black text-[#a06000] uppercase tracking-wider mb-3">
          Kurikulum Modul & Latihan:
        </h3>
        <div className="flex flex-col gap-2.5">
          {selectedLang.modules.map((mod, idx) => {
            const isSelected = selectedModIndex === idx;
            return (
              <button
                key={idx}
                onClick={() => onSelectModule(idx)}
                className={`text-left p-3 rounded-xl border-2 transition cursor-pointer flex flex-col gap-1 ${
                  isSelected
                    ? "bg-[#fff9ed] border-[#f5a623] text-[#1a1a1a] shadow-sm"
                    : "bg-[#ffffff] border-[#ebdccb] text-[#555] hover:border-[#fcd792] hover:bg-[#fffcf7]"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-md ${
                    mod.level === "Pemula" ? "bg-[#e3f7e8] text-[#1e7e34]" :
                    mod.level === "Menengah" ? "bg-[#e3f0fc] text-[#0d6efd]" :
                    mod.level === "Isi Kode" ? "bg-[#fde8e8] text-[#dc3545]" : "bg-[#f3e8fd] text-[#6f42c1]"
                  }`}>
                    Level: {mod.level}
                  </span>
                  {isSelected && <span className="text-xs font-bold text-[#f5a623]">Aktif ✓</span>}
                </div>
                <div className="text-xs font-bold text-[#222] mt-0.5">{mod.title}</div>
                <div className="text-[11px] text-[#7a6f62] line-clamp-2">{mod.instruction}</div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};