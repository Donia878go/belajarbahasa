import React from "react";
import Editor from "@monaco-editor/react";
import { TerminalOutput } from "./TerminalOutput";
import { LanguageSpec, Exercise } from "@/data/languages";

interface EditorCellProps {
  selectedLang: LanguageSpec;
  currentMod: Exercise;
  code: string;
  output: string;
  debugLog: string;
  activeTab: "output" | "debug";
  isLoading: boolean;
  executionTime: string | null;
  onChangeCode: (val: string) => void;
  onResetCode: () => void;
  onRunCode: () => void;
  onTabChange: (tab: "output" | "debug") => void;
  onClearOutput: () => void;
}

export const ColabEditorCell: React.FC<EditorCellProps> = ({
  selectedLang,
  currentMod,
  code,
  output,
  debugLog,
  activeTab,
  isLoading,
  executionTime,
  onChangeCode,
  onResetCode,
  onRunCode,
  onTabChange,
  onClearOutput,
}) => {
  return (
    <div className="lg:col-span-8 flex flex-col gap-4 overflow-y-auto">
      <div className="bg-[#ffffff] border-2 border-[#ebdccb] rounded-2xl shadow-sm overflow-hidden flex flex-col">
        {/* Header Sel */}
        <div className="h-12 bg-[#fffaef] border-b border-[#ebdccb] px-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-[#444] flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#f5a623]"></span>
              [ Cell: {selectedLang.name} / {currentMod.level} ]
            </span>
            {executionTime && (
              <span className="text-[10px] text-emerald-700 bg-emerald-100 font-bold px-2 py-0.5 rounded-md">
                Waktu: {executionTime}
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onResetCode}
              className="text-xs text-[#8b7d6b] hover:text-[#1a1a1a] font-bold px-2.5 py-1 rounded-lg hover:bg-[#ebdccb]/40 transition cursor-pointer"
            >
              Reset Kode
            </button>
            <button
              onClick={onRunCode}
              disabled={isLoading}
              className="bg-[#f5a623] hover:bg-[#e0951a] active:scale-95 disabled:opacity-50 text-white text-xs font-extrabold px-4 py-1.5 rounded-xl shadow-md transition flex items-center gap-1.5 cursor-pointer"
            >
              {isLoading ? "⏳ Menjalankan..." : "▶ Jalankan Sel (Run)"}
            </button>
          </div>
        </div>

        {/* Monaco Editor Container */}
        <div className="h-[400px] border-b border-[#ebdccb] bg-[#1e1e1e]">
          <Editor
            height="100%"
            language={selectedLang.monacoLang}
            theme="vs-dark"
            value={code}
            onChange={(val) => onChangeCode(val || "")}
            options={{
              fontSize: 13.5,
              minimap: { enabled: false },
              automaticLayout: true,
              fontFamily: "monospace",
              lineNumbers: "on",
              renderLineHighlight: "all",
              scrollBeyondLastLine: false,
              tabSize: 2,
            }}
          />
        </div>

        {/* Terminal Tabulasi */}
        <TerminalOutput
          output={output}
          debugLog={debugLog}
          activeTab={activeTab}
          onTabChange={onTabChange}
          onClear={onClearOutput}
        />
      </div>
    </div>
  );
};