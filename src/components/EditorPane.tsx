import React from "react";
import Editor from "@monaco-editor/react";
import { Play, RotateCcw, Check, XCircle, Terminal as TermIcon } from "lucide-react";
import { CurriculumModule } from "@/types/curriculum";

interface EditorPaneProps {
  monacoLang: string;
  activeModule: CurriculumModule;
  code: string;
  onChangeCode: (val: string) => void;
  onResetCode: () => void;
  onRunCode: () => void;
  isLoading: boolean;
  evalStatus: "idle" | "pass" | "fail";
  output: string;
}

export const EditorPane: React.FC<EditorPaneProps> = ({
  monacoLang,
  activeModule,
  code,
  onChangeCode,
  onResetCode,
  onRunCode,
  isLoading,
  evalStatus,
  output,
}) => {
  return (
    <div className="w-full h-full flex flex-col bg-slate-950 overflow-hidden">
      {/* Editor Top Bar */}
      <div className="h-11 border-b border-slate-800 bg-slate-900/60 px-4 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-300 font-mono">
            workspace.{monacoLang}
          </span>
          <span className="hidden sm:inline-block text-[10px] text-slate-500 font-mono">
            (Pintasan: Ctrl + Enter)
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onResetCode}
            title="Reset kode ke template awal"
            className="p-1.5 rounded-md text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={onRunCode}
            disabled={isLoading}
            className="bg-emerald-600 hover:bg-emerald-500 active:scale-95 disabled:opacity-50 text-white font-bold px-3.5 py-1.5 rounded-lg text-xs transition flex items-center gap-1.5 shadow-sm cursor-pointer"
          >
            {isLoading ? (
              <span>Mengompilasi...</span>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Jalankan Kode</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Monaco Editor Canvas */}
      <div className="flex-1 min-h-[280px] bg-slate-950">
        <Editor
          height="100%"
          language={monacoLang}
          theme="vs-dark"
          value={code}
          onChange={(val) => onChangeCode(val || "")}
          options={{
            fontSize: 13.5,
            minimap: { enabled: false },
            automaticLayout: true,
            fontFamily: "JetBrains Mono, Menlo, monospace",
            lineNumbers: "on",
            scrollBeyondLastLine: false,
            tabSize: 2,
            padding: { top: 12 },
          }}
        />
      </div>

      {/* Evaluation Result & Terminal Console */}
      <div className="h-[220px] border-t border-slate-800 bg-slate-900/90 flex flex-col shrink-0">
        <div className="h-9 border-b border-slate-800/80 px-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <TermIcon className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-xs font-bold text-slate-300 font-mono">Output Terminal</span>
          </div>

          {/* Real-Time Evaluation Badge */}
          <div>
            {evalStatus === "pass" && (
              <span className="text-[10px] font-bold bg-emerald-950 text-emerald-300 border border-emerald-700/60 px-2 py-0.5 rounded flex items-center gap-1">
                <Check className="w-3 h-3 text-emerald-400" /> LULUS / OUTPUT SESUAI
              </span>
            )}
            {evalStatus === "fail" && (
              <span className="text-[10px] font-bold bg-rose-950 text-rose-300 border border-rose-700/60 px-2 py-0.5 rounded flex items-center gap-1">
                <XCircle className="w-3 h-3 text-rose-400" /> OUTPUT BELUM SESUAI
              </span>
            )}
          </div>
        </div>

        <pre className="flex-1 p-3.5 font-mono text-xs text-emerald-400 overflow-auto whitespace-pre-wrap leading-relaxed selection:bg-slate-800">
          {output || `// Klik tombol 'Jalankan Kode' atau tekan Ctrl + Enter untuk mengeksekusi.`}
        </pre>
      </div>
    </div>
  );
};