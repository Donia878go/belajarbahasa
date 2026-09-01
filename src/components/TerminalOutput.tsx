import React from "react";

interface TerminalProps {
  output: string;
  debugLog: string;
  activeTab: "output" | "debug";
  onTabChange: (tab: "output" | "debug") => void;
  onClear: () => void;
}

export const TerminalOutput: React.FC<TerminalProps> = ({
  output,
  debugLog,
  activeTab,
  onTabChange,
  onClear,
}) => {
  return (
    <div className="bg-[#181818] flex flex-col">
      <div className="h-9 bg-[#111111] px-4 flex items-center justify-between border-b border-[#292929]">
        <div className="flex items-center gap-2">
          <button
            onClick={() => onTabChange("output")}
            className={`text-[11px] font-bold px-3 py-1 rounded-t transition cursor-pointer ${
              activeTab === "output"
                ? "bg-[#181818] text-[#f5a623] border-t-2 border-[#f5a623]"
                : "text-[#888] hover:text-[#bbb]"
            }`}
          >
            Console Output
          </button>
          <button
            onClick={() => onTabChange("debug")}
            className={`text-[11px] font-bold px-3 py-1 rounded-t transition cursor-pointer ${
              activeTab === "debug"
                ? "bg-[#181818] text-[#f5a623] border-t-2 border-[#f5a623]"
                : "text-[#888] hover:text-[#bbb]"
            }`}
          >
            Colab Diagnostics
          </button>
        </div>

        <button
          onClick={onClear}
          className="text-[10px] text-[#666] hover:text-[#aaa] transition cursor-pointer"
        >
          Clear Output
        </button>
      </div>

      <div className="p-4 min-h-[160px] max-h-[260px] overflow-auto font-mono text-xs text-[#e6e6e6] leading-relaxed">
        {activeTab === "output" ? (
          <pre className="whitespace-pre-wrap selection:bg-[#f5a623] selection:text-black">
            {output || "// Klik tombol '▶ Jalankan Sel (Run)' untuk melihat output program."}
          </pre>
        ) : (
          <pre className="text-[#999] whitespace-pre-wrap">{debugLog}</pre>
        )}
      </div>
    </div>
  );
};