"use client";

import React, { useState, useEffect, useRef } from "react";
import Editor from "@monaco-editor/react";

declare global {
  interface Window {
    loadPyodide?: any;
    Babel?: any;
  }
}

const LANGUAGES = [
  {
    name: "Python (Pyodide WASM)",
    langKey: "python",
    editorLang: "python",
    defaultCode: `# Python berjalan 100% di browser via WebAssembly
def hitung_faktorial(n):
    if n <= 1:
        return 1
    return n * hitung_faktorial(n - 1)

angka = 5
print(f"Faktorial dari {angka} adalah: {hitung_faktorial(angka)}")
`
  },
  {
    name: "JavaScript (Browser Engine)",
    langKey: "javascript",
    editorLang: "javascript",
    defaultCode: `// JavaScript berjalan langsung di browser
const data = [10, 20, 30, 40];
const total = data.reduce((acc, curr) => acc + curr, 0);

console.log("Daftar Data:", data);
console.log("Total Penjumlahan:", total);
console.log("Rata-rata:", total / data.length);
`
  },
  {
    name: "TypeScript (In-Browser Transpiler)",
    langKey: "typescript",
    editorLang: "typescript",
    defaultCode: `// TypeScript ditranspile dan dijalankan langsung di browser
interface Mahasiswa {
  nama: string;
  jurusan: string;
  semester: number;
}

const mhs: Mahasiswa = {
  nama: "Doni",
  jurusan: "Teknik Informatika",
  semester: 4
};

console.log(\`Mahasiswa: \${mhs.nama} | Jurusan: \${mhs.jurusan} (Semester \${mhs.semester})\`);
`
  }
];

export default function Home() {
  const [selectedLang, setSelectedLang] = useState(LANGUAGES[0]);
  const [code, setCode] = useState(LANGUAGES[0].defaultCode);
  const [output, setOutput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [pyodideReady, setPyodideReady] = useState(false);
  
  const pyodideRef = useRef<any>(null);

  // Inisialisasi runtime Pyodide & Babel di browser
  useEffect(() => {
    // 1. Load Pyodide untuk Python
    if (!window.loadPyodide) {
      const pyScript = document.createElement("script");
      pyScript.src = "https://cdn.jsdelivr.net/pyodide/v0.25.0/full/pyodide.js";
      pyScript.async = true;
      pyScript.onload = async () => {
        try {
          const pyodide = await window.loadPyodide({
            indexURL: "https://cdn.jsdelivr.net/pyodide/v0.25.0/full/"
          });
          pyodideRef.current = pyodide;
          setPyodideReady(true);
        } catch (err) {
          console.error("Gagal memuat Pyodide:", err);
        }
      };
      document.body.appendChild(pyScript);
    }

    // 2. Load Babel untuk TypeScript
    if (!window.Babel) {
      const babelScript = document.createElement("script");
      babelScript.src = "https://unpkg.com/@babel/standalone/babel.min.js";
      babelScript.async = true;
      document.body.appendChild(babelScript);
    }
  }, []);

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const lang = LANGUAGES.find((l) => l.langKey === e.target.value);
    if (lang) {
      setSelectedLang(lang);
      setCode(lang.defaultCode);
      setOutput("");
    }
  };

  const runCode = async () => {
    setIsLoading(true);
    setOutput("");

    // --- EKSEKUSI PYTHON ---
    if (selectedLang.langKey === "python") {
      if (!pyodideRef.current) {
        setOutput("⏳ Engine Python WebAssembly sedang disiapkan, silakan coba 2 detik lagi...");
        setIsLoading(false);
        return;
      }

      try {
        let stdoutLogs: string[] = [];
        pyodideRef.current.setStdout({
          batched: (msg: string) => stdoutLogs.push(msg)
        });

        await pyodideRef.current.runPythonAsync(code);
        setOutput(stdoutLogs.join("\n") || "Program selesai dieksekusi tanpa print output.");
      } catch (err: any) {
        setOutput(`❌ Error Python:\n${err.message}`);
      } finally {
        setIsLoading(false);
      }
    } 
    
    // --- EKSEKUSI JAVASCRIPT & TYPESCRIPT ---
    else if (selectedLang.langKey === "javascript" || selectedLang.langKey === "typescript") {
      let logs: string[] = [];
      const originalLog = console.log;

      try {
        console.log = (...args: any[]) => {
          logs.push(args.map(a => (typeof a === "object" ? JSON.stringify(a, null, 2) : String(a))).join(" "));
        };

        let executableCode = code;

        // Jika TypeScript, transpile dulu ke JS menggunakan Babel
        if (selectedLang.langKey === "typescript" && window.Babel) {
          executableCode = window.Babel.transform(code, {
            presets: ["typescript"]
          }).code;
        }

        const result = new Function(executableCode)();
        if (result !== undefined) {
          logs.push(`[Return value]: ${result}`);
        }

        setOutput(logs.join("\n") || "Program selesai dieksekusi tanpa output.");
      } catch (err: any) {
        setOutput(`❌ Error Eksekusi:\n${err.message}`);
      } finally {
        console.log = originalLog;
        setIsLoading(false);
      }
    }
  };

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      <header className="h-16 border-b border-slate-800 flex items-center justify-between px-6 bg-slate-900 shadow-md">
        <div className="flex items-center gap-3">
          <span className="text-xl font-extrabold bg-gradient-to-r from-blue-400 via-teal-300 to-emerald-400 bg-clip-text text-transparent">
            BelajarBahasa.io
          </span>
          <span className="text-xs bg-emerald-950/80 text-emerald-400 px-2.5 py-1 rounded-full border border-emerald-800 font-medium">
            100% In-Browser Engine
          </span>
        </div>

        <div className="flex items-center gap-3">
          <select
            className="bg-slate-800 text-slate-200 border border-slate-700 rounded-lg px-3 py-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
            value={selectedLang.langKey}
            onChange={handleLanguageChange}
          >
            {LANGUAGES.map((lang) => (
              <option key={lang.langKey} value={lang.langKey}>
                {lang.name}
              </option>
            ))}
          </select>

          <button
            onClick={runCode}
            disabled={isLoading || (selectedLang.langKey === "python" && !pyodideReady)}
            className="bg-emerald-600 hover:bg-emerald-500 active:scale-95 disabled:opacity-50 text-white font-semibold px-5 py-2 rounded-lg text-sm transition-all shadow-lg shadow-emerald-950 flex items-center gap-2 cursor-pointer"
          >
            {isLoading ? "Running..." : "▶ Jalankan Kode"}
          </button>
        </div>
      </header>

      <div className="flex-1 grid grid-cols-1 md:grid-cols-2">
        <div className="h-[50vh] md:h-[calc(100vh-4rem)] border-r border-slate-800">
          <Editor
            height="100%"
            language={selectedLang.editorLang}
            theme="vs-dark"
            value={code}
            onChange={(val) => setCode(val || "")}
            options={{
              fontSize: 14,
              minimap: { enabled: false },
              automaticLayout: true,
              scrollBeyondLastLine: false,
              tabSize: 2
            }}
          />
        </div>

        <div className="h-[50vh] md:h-[calc(100vh-4rem)] bg-slate-900 p-4 flex flex-col">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs uppercase tracking-wider text-slate-400 font-bold">
              Terminal Console Output
            </span>
            <button
              onClick={() => setOutput("")}
              className="text-xs text-slate-500 hover:text-slate-300 transition"
            >
              Bersihkan
            </button>
          </div>
          <pre className="flex-1 bg-black/60 p-4 rounded-xl font-mono text-sm overflow-auto text-emerald-400 border border-slate-800 whitespace-pre-wrap leading-relaxed shadow-inner">
            {output || "// Pilih bahasa dan tekan 'Jalankan Kode'"}
          </pre>
        </div>
      </div>
    </main>
  );
}