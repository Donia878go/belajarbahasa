"use client";

import React, { useState } from "react";
import { DATABASE_BAHASA, LanguageSpec } from "@/data/languages";
import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { ColabEditorCell } from "@/components/ColabEditorCell";

export default function Home() {
  const [selectedLang, setSelectedLang] = useState<LanguageSpec>(DATABASE_BAHASA[0]);
  const [selectedModIndex, setSelectedModIndex] = useState(0);
  const [code, setCode] = useState(DATABASE_BAHASA[0].modules[0].code);
  const [output, setOutput] = useState("");
  const [debugLog, setDebugLog] = useState("Runtime Colab Environment: Ready (CPU: 2 Cores | RAM: 12GB)");
  const [activeTab, setActiveTab] = useState<"output" | "debug">("output");
  const [isLoading, setIsLoading] = useState(false);
  const [executionTime, setExecutionTime] = useState<string | null>(null);

  const handleLangChange = (lang: LanguageSpec) => {
    setSelectedLang(lang);
    setSelectedModIndex(0);
    setCode(lang.modules[0].code);
    setOutput("");
    setExecutionTime(null);
    setDebugLog(`Loaded kernel for ${lang.name} (${lang.year})`);
  };

  const handleModuleSelect = (index: number) => {
    setSelectedModIndex(index);
    setCode(selectedLang.modules[index].code);
    setOutput("");
    setExecutionTime(null);
  };

  const runCode = async () => {
    setIsLoading(true);
    setOutput("Executing cell in cloud sandbox...");
    const tStart = performance.now();

    try {
      const res = await fetch("/api/execute", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          language: selectedLang.id,
          code: code,
        }),
      });

      const data = await res.json();
      const tEnd = performance.now();
      setExecutionTime(`${((tEnd - tStart) / 1000).toFixed(2)}s`);
      setOutput(data.run?.output || "Cell execution completed.");
      setDebugLog(`[Kernel Response]: ${data.debug || "Status 200 OK"}`);
    } catch (err: any) {
      setOutput("[Kernel Crash]: Gagal menghubungi server eksekusi.");
      setDebugLog(`[Exception]: ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#faf8f5] text-[#2d2d2d] font-sans flex flex-col selection:bg-[#fae29c]">
      <Header
        languages={DATABASE_BAHASA}
        selectedLang={selectedLang}
        onSelectLang={handleLangChange}
      />

      <main className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-5 p-5 max-w-[1600px] w-full mx-auto overflow-hidden">
        <Sidebar
          selectedLang={selectedLang}
          selectedModIndex={selectedModIndex}
          onSelectModule={handleModuleSelect}
        />

        <ColabEditorCell
          selectedLang={selectedLang}
          currentMod={selectedLang.modules[selectedModIndex]}
          code={code}
          output={output}
          debugLog={debugLog}
          activeTab={activeTab}
          isLoading={isLoading}
          executionTime={executionTime}
          onChangeCode={setCode}
          onResetCode={() => setCode(selectedLang.modules[selectedModIndex].code)}
          onRunCode={runCode}
          onTabChange={setActiveTab}
          onClearOutput={() => {
            if (activeTab === "output") setOutput("");
            else setDebugLog("Kernel logs cleared.");
          }}
        />
      </main>
    </div>
  );
}