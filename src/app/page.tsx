"use client";

import React, { useState } from "react";
import Editor from "@monaco-editor/react";

const LANGUAGES = [
  // --- BAHASA MODERN & POPULER ---
  {
    name: "Python",
    langKey: "python",
    editorLang: "python",
    version: "3.10.0",
    category: "Modern",
    defaultCode: `# Python 3\ndef sapa(nama):\n    return f"Halo {nama}, selamat datang!"\n\nprint(sapa("Dunia"))\nprint("Hasil 10 + 25 =", 10 + 25)`
  },
  {
    name: "JavaScript (Node.js)",
    langKey: "javascript",
    editorLang: "javascript",
    version: "18.15.0",
    category: "Modern",
    defaultCode: `// JavaScript\nconst angka = [10, 20, 30, 40];\nconst total = angka.reduce((acc, curr) => acc + curr, 0);\nconsole.log("Total array:", total);`
  },
  {
    name: "TypeScript",
    langKey: "typescript",
    editorLang: "typescript",
    version: "5.0.3",
    category: "Modern",
    defaultCode: `// TypeScript\ninterface Produk {\n  nama: string;\n  harga: number;\n}\n\nconst item: Produk = { nama: "Buku Koding", harga: 50000 };\nconsole.log(\`Produk: \${item.nama} | Rp\${item.harga}\`);`
  },
  {
    name: "C++",
    langKey: "cpp",
    editorLang: "cpp",
    version: "10.2.0",
    category: "Modern",
    defaultCode: `#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << "Program C++ Berhasil Dieksekusi!" << endl;\n    return 0;\n}`
  },
  {
    name: "Java",
    langKey: "java",
    editorLang: "java",
    version: "15.0.2",
    category: "Modern",
    defaultCode: `public class Main {\n    public static void main(String[] args) {\n        System.out.println("Halo dari Java Virtual Machine!");\n    }\n}`
  },
  {
    name: "Go (Golang)",
    langKey: "go",
    editorLang: "go",
    version: "1.16.2",
    category: "Modern",
    defaultCode: `package main\nimport "fmt"\n\nfunc main() {\n    fmt.Println("Halo dari bahasa Go (Golang)!")\n}`
  },
  {
    name: "Rust",
    langKey: "rust",
    editorLang: "rust",
    version: "1.68.2",
    category: "Modern",
    defaultCode: `fn main() {\n    println!("Halo dari Rust! Aman dan cepat tanpa garbage collector.");\n}`
  },
  {
    name: "PHP",
    langKey: "php",
    editorLang: "php",
    version: "8.2.3",
    category: "Modern",
    defaultCode: `<?php\necho "Halo dari PHP Server Engine!\\n";\n$buah = ["Apel", "Jeruk", "Mangga"];\nprint_r($buah);`
  },
  {
    name: "Ruby",
    langKey: "ruby",
    editorLang: "ruby",
    version: "3.0.1",
    category: "Modern",
    defaultCode: `puts "Halo dari Ruby!"\n3.times { |i| puts "Iterasi ke-#{i + 1}" }`
  },

  // --- BAHASA ZAMAN 90-an, KLASIK & RETRO ---
  {
    name: "Assembly (NASM 64-bit)",
    langKey: "nasm64",
    editorLang: "plaintext",
    version: "2.15.5",
    category: "Klasik/Retro",
    defaultCode: `section .data\n    msg db "Halo dari Bahasa Tingkat Rendah (Assembly NASM x86_64)!", 0x0A\n    len equ $ - msg\n\nsection .text\n    global _start\n\n_start:\n    mov rax, 1          ; sys_write\n    mov rdi, 1          ; stdout\n    mov rsi, msg        ; buffer string\n    mov rdx, len        ; panjang string\n    syscall\n\n    mov rax, 60         ; sys_exit\n    xor rdi, rdi        ; status 0\n    syscall`
  },
  {
    name: "Visual Basic .NET (VB.NET / Basic)",
    langKey: "basic.net",
    editorLang: "vb",
    version: "5.0.201",
    category: "Klasik/Retro",
    defaultCode: `Imports System\n\nModule Program\n    Sub Main()\n        Console.WriteLine("Halo dari Visual Basic (VB)!")\n        Dim nama As String = "Programmer Retro"\n        Dim tahun As Integer = 1991\n        Console.WriteLine("Bahasa: " & nama & " sejak " & tahun)\n    End Sub\nEnd Module`
  },
  {
    name: "C (ANSI / C99)",
    langKey: "c",
    editorLang: "c",
    version: "10.2.0",
    category: "Klasik/Retro",
    defaultCode: `#include <stdio.h>\n\nint main() {\n    printf("Halo dari Bahasa C klasik!\\n");\n    int a = 1990;\n    printf("Tahun rilis ANSI C standar: %d\\n", a);\n    return 0;\n}`
  },
  {
    name: "Pascal (Free Pascal)",
    langKey: "pascal",
    editorLang: "pascal",
    version: "3.2.2",
    category: "Klasik/Retro",
    defaultCode: `program HaloDunia;\nvar\n  i: integer;\nbegin\n  writeln('Halo dari Bahasa Pascal era 90-an!');\n  for i := 1 to 3 do\n    writeln('Perulangan Pascal ke-', i);\nend.`
  },
  {
    name: "COBOL",
    langKey: "cobol",
    editorLang: "cobol",
    version: "3.1.2",
    category: "Klasik/Retro",
    defaultCode: `       IDENTIFICATION DIVISION.\n       PROGRAM-ID. HELLO-WORLD.\n       PROCEDURE DIVISION.\n           DISPLAY "HALO DARI BAHASA COBOL SISTEM MAINFRAME!".\n           STOP RUN.`
  },
  {
    name: "Fortran",
    langKey: "fortran",
    editorLang: "fortran",
    version: "10.2.0",
    category: "Klasik/Retro",
    defaultCode: `program halo\n  implicit none\n  print *, "Halo dari Fortran (Formula Translation)!"\n  print *, "Komputasi numerik: 2.0 ** 8.0 = ", 2.0 ** 8.0\nend program halo`
  },
  {
    name: "Perl",
    langKey: "perl",
    editorLang: "perl",
    version: "5.36.0",
    category: "Klasik/Retro",
    defaultCode: `#!/usr/bin/env perl\nuse strict;\nuse warnings;\n\nprint "Halo dari Perl (Raja Skrip Web era 90-an)!\\n";\nmy @tools = ('Regex', 'CGI', 'Data Parsing');\nprint "Kelebihan: " . join(', ', @tools) . "\\n";`
  },
  {
    name: "Common Lisp",
    langKey: "lisp",
    editorLang: "scheme",
    version: "2.1.2",
    category: "Klasik/Retro",
    defaultCode: `(format t "Halo dari Common Lisp!~%")\n(format t "Kalkulasi (+ 10 (* 5 4)): ~a~%" (+ 10 (* 5 4)))`
  },
  {
    name: "Prolog",
    langKey: "prolog",
    editorLang: "prolog",
    version: "8.2.4",
    category: "Klasik/Retro",
    defaultCode: `:- initialization(main).\nmain :- write('Halo dari Pemrograman Logika Prolog!'), nl, halt.`
  }
];

export default function Home() {
  const [selectedLang, setSelectedLang] = useState(LANGUAGES[0]);
  const [code, setCode] = useState(LANGUAGES[0].defaultCode);
  const [output, setOutput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

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
    setOutput("⏳ Mengirim kode ke Piston Engine & mengeksekusi...");

    try {
      const res = await fetch("https://emkc.org/api/v2/piston/execute", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          language: selectedLang.langKey,
          version: selectedLang.version,
          files: [{ content: code }]
        })
      });

      const data = await res.json();
      if (data.run) {
        setOutput(data.run.output || "Program selesai dieksekusi tanpa pesan output.");
      } else {
        setOutput("❌ Gagal mengeksekusi kode. Layanan sedang sibuk atau respons tidak valid.");
      }
    } catch {
      setOutput("❌ Terjadi kesalahan jaringan saat mengeksekusi kode.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* Header Bar */}
      <header className="h-16 border-b border-slate-800 flex items-center justify-between px-6 bg-slate-900 shadow-md">
        <div className="flex items-center gap-3">
          <span className="text-xl font-extrabold bg-gradient-to-r from-blue-400 via-teal-300 to-emerald-400 bg-clip-text text-transparent">
            BelajarBahasa.io
          </span>
          <span className="text-xs bg-slate-800 text-slate-300 px-2.5 py-1 rounded-full border border-slate-700">
            {LANGUAGES.length} Bahasa Pemrograman
          </span>
        </div>

        <div className="flex items-center gap-3">
          <select
            className="bg-slate-800 text-slate-200 border border-slate-700 rounded-lg px-3 py-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
            value={selectedLang.langKey}
            onChange={handleLanguageChange}
          >
            <optgroup label="Bahasa Modern">
              {LANGUAGES.filter((l) => l.category === "Modern").map((lang) => (
                <option key={lang.langKey} value={lang.langKey}>
                  {lang.name}
                </option>
              ))}
            </optgroup>
            <optgroup label="Bahasa 90-an & Klasik Retro">
              {LANGUAGES.filter((l) => l.category === "Klasik/Retro").map((lang) => (
                <option key={lang.langKey} value={lang.langKey}>
                  {lang.name}
                </option>
              ))}
            </optgroup>
          </select>

          <button
            onClick={runCode}
            disabled={isLoading}
            className="bg-emerald-600 hover:bg-emerald-500 active:scale-95 disabled:opacity-50 text-white font-semibold px-5 py-2 rounded-lg text-sm transition-all shadow-lg shadow-emerald-950 flex items-center gap-2"
          >
            {isLoading ? "Running..." : "▶ Jalankan Kode"}
          </button>
        </div>
      </header>

      {/* Editor & Console Grid */}
      <div className="flex-1 grid grid-cols-1 md:grid-cols-2">
        {/* Editor Box */}
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

        {/* Output Console */}
        <div className="h-[50vh] md:h-[calc(100vh-4rem)] bg-slate-900 p-4 flex flex-col">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs uppercase tracking-wider text-slate-400 font-bold">
              Console Terminal Output ({selectedLang.name})
            </span>
            <button
              onClick={() => setOutput("")}
              className="text-xs text-slate-500 hover:text-slate-300 transition"
            >
              Bersihkan
            </button>
          </div>
          <pre className="flex-1 bg-black/60 p-4 rounded-xl font-mono text-sm overflow-auto text-emerald-400 border border-slate-800 whitespace-pre-wrap leading-relaxed shadow-inner">
            {output || `// Pilih bahasa "${selectedLang.name}" dan klik tombol "Jalankan Kode" di atas.`}
          </pre>
        </div>
      </div>
    </main>
  );
}