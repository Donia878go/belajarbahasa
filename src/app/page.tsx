"use client";

import React, { useState } from "react";
import Editor from "@monaco-editor/react";

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
  pistonLang: string;
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
    pistonLang: "python",
    description: "Bahasa tingkat tinggi yang menekankan keterbacaan kode dengan sintaks yang bersih dan ekspresif. Sangat populer untuk Data Science, Web, dan Automasi.",
    features: ["Dynamic Typing", "Garbage Collected", "Multi-paradigma"],
    exercises: [
      {
        title: "1. Variabel & Aritmatika",
        description: "Hitung luas segitiga dengan alas 12 dan tinggi 8.",
        starterCode: `# Hitung luas segitiga (1/2 * alas * tinggi)\nalas = 12\ntinggi = 8\nluas = 0.5 * alas * tinggi\nprint(f"Luas segitiga: {luas}")`
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
    pistonLang: "javascript",
    description: "Bahasa pemrograman utama untuk web interaktif. Berjalan di browser dan server (Node.js).",
    features: ["Event-Driven", "Non-blocking I/O", "Prototype-based"],
    exercises: [
      {
        title: "1. Array & Perulangan",
        description: "Tampilkan setiap item array dengan awalan nomor urut.",
        starterCode: `const menu = ["Kopi", "Teh", "Roti Bakar"];\nmenu.forEach((item, index) => {\n  console.log(\`\${index + 1}. \${item}\`);\n});`
      },
      {
        title: "2. Manipulasi Objek",
        description: "Akses dan cetak data profil pengguna.",
        starterCode: `const user = {\n  nama: "Doni",\n  peran: "Developer",\n  aktif: true\n};\n\nconsole.log(\`Nama: \${user.nama} (\${user.peran})\`);`
      }
    ]
  },
  {
    id: "c",
    name: "C (ANSI C)",
    year: "1972",
    category: "Klasik & Retro",
    monacoLang: "c",
    pistonLang: "c",
    description: "Ibu dari banyak bahasa modern. Menawarkan performa maksimal dengan kontrol langsung ke memori komputer.",
    features: ["Manual Memory Management", "Static Typing", "Compiled Native"],
    exercises: [
      {
        title: "1. Program Halo Dunia C",
        description: "Cetak format data angka dan teks standar.",
        starterCode: `#include <stdio.h>\n\nint main() {\n    printf("Belajar Bahasa C Standar\\n");\n    int tahun = 1972;\n    printf("Dibuat oleh Dennis Ritchie tahun %d\\n", tahun);\n    return 0;\n}`
      }
    ]
  },
  {
    id: "cpp",
    name: "C++",
    year: "1985",
    category: "Modern",
    monacoLang: "cpp",
    pistonLang: "cpp",
    description: "Pengembangan dari bahasa C dengan dukungan Object-Oriented Programming (OOP) dan abstraksi modern berkecepatan tinggi.",
    features: ["OOP Support", "Template Metaprogramming", "High Performance"],
    exercises: [
      {
        title: "1. Vektor & Akumulasi",
        description: "Hitung total angka menggunakan std::vector.",
        starterCode: `#include <iostream>\n#include <vector>\n#include <numeric>\nusing namespace std;\n\nint main() {\n    vector<int> nilai = {10, 20, 30, 40};\n    int total = accumulate(nilai.begin(), nilai.end(), 0);\n    cout << "Total Nilai: " << total << endl;\n    return 0;\n}`
      }
    ]
  },
  {
    id: "pascal",
    name: "Pascal",
    year: "1970",
    category: "Klasik & Retro",
    monacoLang: "pascal",
    pistonLang: "pascal",
    description: "Bahasa prosedural yang dirancang oleh Niklaus Wirth untuk mengajarkan struktur pemrograman yang disiplin dan rapi.",
    features: ["Strongly Typed", "Structured Programming", "Keterbacaan Tinggi"],
    exercises: [
      {
        title: "1. Perulangan For Pascal",
        description: "Cetak deret angka terstruktur.",
        starterCode: `program DeretPascal;\nvar\n  i: integer;\nbegin\n  writeln('--- Deret Bilangan ---');\n  for i := 1 to 5 do\n    writeln('Langkah ke-', i);\nend.`
      }
    ]
  },
  {
    id: "nasm64",
    name: "Assembly (x86_64)",
    year: "1950s/Modern",
    category: "Klasik & Retro",
    monacoLang: "plaintext",
    pistonLang: "nasm64",
    description: "Bahasa tingkat sangat rendah (low-level) yang berkomunikasi langsung dengan register CPU komputer via syscall.",
    features: ["Direct Hardware Control", "No Abstraction", "Register-based"],
    exercises: [
      {
        title: "1. Syscall Write NASM",
        description: "Cetak string ke stdout menggunakan register rax, rdi, rsi, rdx.",
        starterCode: `section .data\n    msg db "Halo dari CPU Machine Level!", 0x0A\n    len equ $ - msg\n\nsection .text\n    global _start\n\n_start:\n    mov rax, 1\n    mov rdi, 1\n    mov rsi, msg\n    mov rdx, len\n    syscall\n\n    mov rax, 60\n    xor rdi, rdi\n    syscall`
      }
    ]
  },
  {
    id: "basic",
    name: "Basic (VB.NET)",
    year: "1964/1991",
    category: "Klasik & Retro",
    monacoLang: "vb",
    pistonLang: "basic.net",
    description: "Beginner's All-purpose Symbolic Instruction Code dirancang untuk kemudahan belajar logika dasar.",
    features: ["English-like Syntax", "Mudah Dipelajari"],
    exercises: [
      {
        title: "1. Modul Basic",
        description: "Tampilkan teks dan kalkulasi sederhana.",
        starterCode: `Imports System\n\nModule Program\n    Sub Main()\n        Console.WriteLine("Selamat Datang di Dunia BASIC")\n        Dim x As Integer = 50\n        Dim y As Integer = 25\n        Console.WriteLine("Hasil: " & (x + y))\n    End Sub\nEnd Module`
      }
    ]
  },
  {
    id: "java",
    name: "Java",
    year: "1995",
    category: "Modern",
    monacoLang: "java",
    pistonLang: "java",
    description: "Bahasa berorientasi objek murni dengan filosofi 'Write Once, Run Anywhere' di atas JVM.",
    features: ["Platform Independent (JVM)", "Strict OOP", "Enterprise Standard"],
    exercises: [
      {
        title: "1. Main Class & Loop",
        description: "Cetak angka genap menggunakan perulangan Java.",
        starterCode: `public class Main {\n    public static void main(String[] args) {\n        System.out.println("Deret Genap:");\n        for (int i = 2; i <= 10; i += 2) {\n            System.out.print(i + " ");\n        }\n        System.out.println();\n    }\n}`
      }
    ]
  },
  {
    id: "go",
    name: "Go (Golang)",
    year: "2009",
    category: "Modern",
    monacoLang: "go",
    pistonLang: "go",
    description: "Bahasa modern buatan Google yang fokus pada kesederhanaan, kompilasi cepat, dan konkurensi (Goroutine).",
    features: ["Built-in Concurrency", "Fast Compilation", "Minimalist"],
    exercises: [
      {
        title: "1. Struct & Slices",
        description: "Deklarasikan data item belanja.",
        starterCode: `package main\nimport "fmt"\n\nfunc main() {\n    items := []string{"Buku", "Pulpen", "Penggaris"}\n    fmt.Printf("Total inventaris: %d item\\n", len(items))\n    for _, item := range items {\n        fmt.Println("- " + item)\n    }\n}`
      }
    ]
  },
  {
    id: "rust",
    name: "Rust",
    year: "2015",
    category: "Modern",
    monacoLang: "rust",
    pistonLang: "rust",
    description: "Bahasa pemrograman sistem yang menjamin memory safety dan kebebasan thread tanpa menggunakan garbage collector.",
    features: ["Ownership & Borrowing", "Zero-cost Abstractions", "Memory Safe"],
    exercises: [
      {
        title: "1. Iterasi & Match",
        description: "Kalkulasi nilai faktorial sederhana.",
        starterCode: `fn main() {\n    let angka = 5;\n    let total: i32 = (1..=angka).product();\n    println!("Faktorial dari {} adalah {}", angka, total);\n}`
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
    setOutput("Executing code...");

    try {
      const res = await fetch("/api/execute", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          language: selectedLang.pistonLang,
          code: code
        })
      });

      const data = await res.json();
      if (data.run) {
        const out = data.run.stdout || data.run.stderr || data.run.output || "Program finished with no output.";
        setOutput(out);
      } else {
        setOutput(data.message || "Failed to execute.");
      }
    } catch {
      setOutput("Network Error: Gagal menghubungi server eksekusi.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#121212] text-[#e0e0e0] font-mono flex flex-col">
      {/* Top Header Classic */}
      <header className="h-14 border-b border-[#2c2c2c] px-6 flex items-center justify-between bg-[#181818]">
        <div className="flex items-center gap-3">
          <span className="text-base font-bold tracking-wider text-white">
            BELAJAR_BAHASA // v2.0
          </span>
          <span className="text-xs bg-[#242424] text-[#888] px-2 py-0.5 border border-[#333]">
            {DATABASE.length} Languages
          </span>
        </div>

        {/* Language Selector */}
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
            disabled={isLoading}
            className="bg-[#2e2e2e] hover:bg-[#3d3d3d] active:bg-[#444] disabled:opacity-50 text-[#fff] border border-[#444] px-4 py-1.5 text-xs font-semibold tracking-wide transition uppercase cursor-pointer"
          >
            {isLoading ? "[ Running... ]" : "[ ▶ Run Code ]"}
          </button>
        </div>
      </header>

      {/* Main 3-Column Layout */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 overflow-hidden">
        {/* Kolom 1: Informasi Bahasa & Menu Latihan (3 cols) */}
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

          {/* Menu Latihan Soal */}
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

        {/* Kolom 2: Monaco Editor (5 cols) */}
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

        {/* Kolom 3: Console Terminal Output (4 cols) */}
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
          <pre className="flex-1 p-4 font-mono text-xs text-[#cfcfcf] overflow-auto whitespace-pre-wrap leading-relaxed selection:bg-[#444]">
            {output || "// Output terminal akan tampil di sini..."}
          </pre>
        </div>
      </div>
    </div>
  );
}