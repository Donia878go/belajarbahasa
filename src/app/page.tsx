"use client";

import React, { useState, useEffect, useRef } from "react";
import Editor from "@monaco-editor/react";

declare global {
  interface Window {
    loadPyodide?: any;
    Babel?: any;
  }
}

interface Exercise {
  title: string;
  description: string;
  starterCode: string;
}

interface LanguageData {
  id: string;
  name: string;
  year: string;
  category: "Modern" | "Klasik & Retro";
  monacoLang: string;
  runner: "browser-py" | "browser-js" | "browser-ts" | "backend";
  description: string;
  features: string[];
  exercises: Exercise[];
}

const DATABASE: LanguageData[] = [
  {
    id: "python",
    name: "Python",
    year: "1991",
    category: "Modern",
    monacoLang: "python",
    runner: "browser-py",
    description: "Bahasa tingkat tinggi yang bersih dan ekspresif. Populer untuk Data Science, AI, dan Automasi. (Dijalankan via Pyodide WASM)",
    features: ["Dynamic Typing", "Garbage Collected", "Multi-paradigma"],
    exercises: [
      {
        title: "1. Variabel & Aritmatika",
        description: "Hitung luas segitiga dengan alas 12 dan tinggi 8.",
        starterCode: `alas = 12\ntinggi = 8\nluas = 0.5 * alas * tinggi\nprint(f"Luas segitiga: {luas}")`
      },
      {
        title: "2. Percabangan Kasir",
        description: "Buat aturan diskon untuk total belanja minimal 50.000.",
        starterCode: `total_belanja = 75000\ndiskon = 0\n\nif total_belanja >= 50000:\n    diskon = 10000\n\ntotal_bayar = total_belanja - diskon\nprint(f"Total Bayar: Rp{total_bayar}")`
      }
    ]
  },
  {
    id: "javascript",
    name: "JavaScript",
    year: "1995",
    category: "Modern",
    monacoLang: "javascript",
    runner: "browser-js",
    description: "Bahasa pemrograman utama web interaktif. Berjalan langsung di browser Anda.",
    features: ["Event-Driven", "Non-blocking I/O", "Dynamic"],
    exercises: [
      {
        title: "1. Array & Perulangan",
        description: "Tampilkan setiap item array dengan awalan nomor urut.",
        starterCode: `const menu = ["Kopi", "Teh", "Roti Bakar"];\nmenu.forEach((item, index) => {\n  console.log(\`\${index + 1}. \${item}\`);\n});`
      }
    ]
  },
  {
    id: "c",
    name: "C (ANSI C)",
    year: "1972",
    category: "Klasik & Retro",
    monacoLang: "c",
    runner: "backend",
    description: "Bahasa legendaris karya Dennis Ritchie yang menjadi dasar sistem operasi UNIX dan bahasa modern.",
    features: ["Direct Memory Access", "Pointers", "Fast Native"],
    exercises: [
      {
        title: "1. Program Halo Dunia C",
        description: "Format pencetakan standar di C.",
        starterCode: `#include <stdio.h>\n\nint main() {\n    printf("Halo dari Bahasa C Standar!\\n");\n    int tahun = 1972;\n    printf("Dibuat pada tahun %d\\n", tahun);\n    return 0;\n}`
      }
    ]
  },
  {
    id: "cpp",
    name: "C++",
    year: "1985",
    category: "Modern",
    monacoLang: "cpp",
    runner: "backend",
    description: "Ekstensi dari bahasa C dengan dukungan OOP, generic programming, dan performa tinggi.",
    features: ["OOP", "Templates", "High Performance"],
    exercises: [
      {
        title: "1. Standar I/O C++",
        description: "Mencetak teks menggunakan namespace std.",
        starterCode: `#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << "Selamat Datang di C++!" << endl;\n    return 0;\n}`
      }
    ]
  },
  {
    id: "pascal",
    name: "Pascal",
    year: "1970",
    category: "Klasik & Retro",
    monacoLang: "pascal",
    runner: "backend",
    description: "Bahasa pemrograman terstruktur era 70-90an yang sangat terkenal dalam pembelajaran akademis.",
    features: ["Strong Typing", "Structured", "Readable"],
    exercises: [
      {
        title: "1. Perulangan For Pascal",
        description: "Cetak deret angka terstruktur.",
        starterCode: `program DeretPascal;\nvar\n  i: integer;\nbegin\n  writeln('--- Deret Pascal ---');\n  for i := 1 to 5 do\n    writeln('Nomor: ', i);\nend.`
      }
    ]
  },
  {
    id: "java",
    name: "Java",
    year: "1995",
    category: "Modern",
    monacoLang: "java",
    runner: "backend",
    description: "Bahasa berorientasi objek murni yang berjalan di atas Java Virtual Machine (JVM).",
    features: ["Cross-Platform", "Strict OOP", "Robust"],
    exercises: [
      {
        title: "1. Kelas Utama Java",
        description: "Struktur standar main class Java.",
        starterCode: `public class Main {\n    public static void main(String[] args) {\n        System.out.println("Eksekusi Java Berhasil!");\n    }\n}`
      }
    ]
  },
  {
    id: "nasm64",
    name: "Assembly (x86_64)",
    year: "Retro",
    category: "Klasik & Retro",
    monacoLang: "plaintext",
    runner: "backend",
    description: "Bahasa instruksi tingkat register prosesor.",
    features: ["Low-Level", "Direct Hardware", "Syscalls"],
    exercises: [
      {
        title: "1. Syscall Write NASM",
        description: "Cetak string ke stdout.",
        starterCode: `section .data\n    msg db "Halo dari CPU Assembly!", 0xa\n    len equ $ - msg\n\nsection .text\n    global _start\n\n_start:\n    mov edx, len\n    mov ecx, msg\n    mov ebx, 1\n    mov eax, 4\n    int 0x80\n\n    mov eax, 1\n    int 0x80`
      }
    ]
  }
];

export default function Home() {
  const [selectedLang, setSelectedLang] = useState<LanguageData>(DATABASE[0]);
  const [selectedExIndex, setSelectedExIndex] = useState(0);
  const [code, setCode] = useState(DATABASE[0].exercises[0].starterCode);
  const [output, setOutput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [pyodideReady, setPyodideReady] = useState(false);

  const pyodideRef = useRef<any>(null);

  // Inisialisasi Pyodide WASM untuk Python di browser
  useEffect(() => {
    if (!window.loadPyodide) {
      const script = document.createElement("script");
      script.src = "https://cdn.jsdelivr.net/pyodide/v0.25.0/full/pyodide.js";
      script.async = true;
      script.onload = async () => {
        try {
          const pyodide = await window.loadPyodide({
            indexURL: "https://cdn.jsdelivr.net/pyodide/v0.25.0/full/"
          });
          pyodideRef.current = pyodide;
          setPyodideReady(true);
        } catch (e) {
          console.error("Pyodide error:", e);
        }
      };
      document.body.appendChild(script);
    }
  }, []);

  const handleLangChange = (lang: LanguageData) => {
    setSelectedLang(lang);
    setSelectedExIndex(0);
    setCode(lang.exercises[0].starterCode);
    setOutput("");
  };

  const handleExerciseChange = (index: number) => {
    setSelectedExIndex(index);
    setCode(selectedLang.exercises[index].starterCode);
    setOutput("");
  };

  const runCode = async () => {
    setIsLoading(true);
    setOutput("Executing...");

    // 1. Eksekusi Python di Browser (Pyodide)
    if (selectedLang.runner === "browser-py") {
      if (!pyodideRef.current) {
        setOutput("⏳ Menyiapkan engine Python WASM di browser... Tunggu sebentar.");
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
      return;
    }

    // 2. Eksekusi JavaScript di Browser
    if (selectedLang.runner === "browser-js") {
      let logs: string[] = [];
      const originalLog = console.log;
      try {
        console.log = (...args: any[]) => {
          logs.push(args.map(a => (typeof a === "object" ? JSON.stringify(a) : String(a))).join(" "));
        };
        new Function(code)();
        setOutput(logs.join("\n") || "Program selesai dieksekusi.");
      } catch (err: any) {
        setOutput(`❌ Error JS:\n${err.message}`);
      } finally {
        console.log = originalLog;
        setIsLoading(false);
      }
      return;
    }

    // 3. Eksekusi Bahasa Lainnya via Judge0 Backend API
    try {
      const res = await fetch("/api/execute", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          language: selectedLang.id,
          code: code
        })
      });
      const data = await res.json();
      setOutput(data.run?.output || "Program selesai dieksekusi.");
    } catch {
      setOutput("❌ Gagal terhubung ke backend server.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#121212] text-[#e0e0e0] font-mono flex flex-col">
      <header className="h-14 border-b border-[#2c2c2c] px-6 flex items-center justify-between bg-[#181818]">
        <div className="flex items-center gap-3">
          <span className="text-base font-bold tracking-wider text-white">
            BELAJAR_BAHASA // v2.0
          </span>
          <span className="text-xs bg-[#242424] text-[#888] px-2 py-0.5 border border-[#333]">
            {DATABASE.length} Languages
          </span>
        </div>

        <div className="flex items-center gap-4">
          <select
            value={selectedLang.id}
            onChange={(e) => {
              const target = DATABASE.find((l) => l.id === e.target.value);
              if (target) handleLangChange(target);
            }}
            className="bg-[#242424] text-[#ddd] border border-[#3a3a3a] px-3 py-1.5 text-xs focus:outline-none focus:border-[#777] cursor-pointer"
          >
            <optgroup label="Modern">
              {DATABASE.filter(l => l.category === "Modern").map((lang) => (
                <option key={lang.id} value={lang.id}>{lang.name} ({lang.year})</option>
              ))}
            </optgroup>
            <optgroup label="Klasik & Retro">
              {DATABASE.filter(l => l.category === "Klasik & Retro").map((lang) => (
                <option key={lang.id} value={lang.id}>{lang.name} ({lang.year})</option>
              ))}
            </optgroup>
          </select>

          <button
            onClick={runCode}
            disabled={isLoading || (selectedLang.runner === "browser-py" && !pyodideReady)}
            className="bg-[#2e2e2e] hover:bg-[#3d3d3d] active:bg-[#444] disabled:opacity-50 text-[#fff] border border-[#444] px-4 py-1.5 text-xs font-semibold tracking-wide transition uppercase cursor-pointer"
          >
            {isLoading ? "[ Running... ]" : "[ ▶ Run Code ]"}
          </button>
        </div>
      </header>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 overflow-hidden">
        {/* Kolom Info & Modul */}
        <div className="lg:col-span-3 border-r border-[#2c2c2c] bg-[#161616] p-5 flex flex-col gap-6 overflow-y-auto">
          <div>
            <div className="flex items-center justify-between border-b border-[#2c2c2c] pb-2 mb-3">
              <h2 className="text-sm font-bold text-white uppercase">{selectedLang.name}</h2>
              <span className="text-[10px] text-[#888] border border-[#333] px-1.5 py-0.5">
                EST. {selectedLang.year}
              </span>
            </div>
            <p className="text-xs text-[#a0a0a0] leading-relaxed mb-3">
              {selectedLang.description}
            </p>
            <div className="flex flex-wrap gap-1.5">
              {selectedLang.features.map((feat, idx) => (
                <span key={idx} className="text-[10px] bg-[#222] text-[#888] px-2 py-0.5 border border-[#333]">
                  {feat}
                </span>
              ))}
            </div>
          </div>

          <div className="border-t border-[#2c2c2c] pt-4">
            <span className="text-[11px] font-bold text-[#888] uppercase tracking-wider block mb-3">
              Modul Latihan:
            </span>
            <div className="flex flex-col gap-2">
              {selectedLang.exercises.map((ex, idx) => (
                <button
                  key={idx}
                  onClick={() => handleExerciseChange(idx)}
                  className={`text-left text-xs p-2.5 border transition cursor-pointer ${
                    selectedExIndex === idx
                      ? "bg-[#252525] border-[#555] text-white"
                      : "bg-[#1c1c1c] border-[#2c2c2c] text-[#888] hover:border-[#444] hover:text-[#bbb]"
                  }`}
                >
                  <div className="font-semibold mb-1">{ex.title}</div>
                  <div className="text-[11px] text-[#777] line-clamp-2">{ex.description}</div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Kolom Editor */}
        <div className="lg:col-span-5 border-r border-[#2c2c2c] flex flex-col h-[50vh] lg:h-full bg-[#1e1e1e]">
          <div className="h-8 border-b border-[#2c2c2c] bg-[#181818] px-4 flex items-center justify-between text-[11px] text-[#777]">
            <span>EDITOR // {selectedLang.id.toUpperCase()}</span>
            <button
              onClick={() => setCode(selectedLang.exercises[selectedExIndex].starterCode)}
              className="hover:text-white transition cursor-pointer"
            >
              [ Reset Code ]
            </button>
          </div>
          <div className="flex-1">
            <Editor
              height="100%"
              language={selectedLang.monacoLang}
              theme="vs-dark"
              value={code}
              onChange={(val) => setCode(val || "")}
              options={{
                fontSize: 13,
                minimap: { enabled: false },
                automaticLayout: true,
                fontFamily: "monospace",
                lineNumbers: "on",
                renderLineHighlight: "all",
                scrollBeyondLastLine: false,
              }}
            />
          </div>
        </div>

        {/* Kolom Output Terminal */}
        <div className="lg:col-span-4 bg-[#141414] flex flex-col h-[40vh] lg:h-full">
          <div className="h-8 border-b border-[#2c2c2c] bg-[#181818] px-4 flex items-center justify-between text-[11px] text-[#777]">
            <span>TERMINAL_OUTPUT</span>
            <button
              onClick={() => setOutput("")}
              className="hover:text-white transition cursor-pointer"
            >
              [ Clear ]
            </button>
          </div>
          <pre className="flex-1 p-4 font-mono text-xs text-[#cfcfcf] overflow-auto whitespace-pre-wrap leading-relaxed">
            {output || "// Output terminal akan tampil di sini..."}
          </pre>
        </div>
      </div>
    </div>
  );
}