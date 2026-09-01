import { NextResponse } from "next/server";

const JUDGE0_MAP: Record<string, number> = {
  python: 71,       // Python 3.8.1
  javascript: 63,   // Node.js 12.14.0
  typescript: 74,   // TypeScript 3.7.4
  c: 50,            // C (GCC 9.2.0)
  cpp: 54,          // C++ (GCC 9.2.0)
  java: 62,         // Java (OpenJDK 13.0.1)
  csharp: 51,       // C# (Mono 6.6.0.161)
  go: 60,           // Go (1.13.5)
  rust: 73,         // Rust (1.40.0)
  php: 68,          // PHP (7.4.1)
  ruby: 72,         // Ruby (2.7.0)
  cobol: 77,        // COBOL (GnuCOBOL 2.2)
  fortran: 59,      // Fortran (GFortran 9.2.0)
  pascal: 67,       // Pascal (FPC 3.0.4)
  "basic.net": 84,  // Visual Basic.Net (vbnc 0.0.0.5943)
  nasm64: 45,       // Assembly x86_64 (NASM 2.14.02)
};

export async function POST(req: Request) {
  try {
    const { language, code } = await req.json();
    const languageId = JUDGE0_MAP[language];

    if (!languageId) {
      return NextResponse.json({
        run: { output: `[Error] Engine kompilasi untuk bahasa '${language}' tidak tersedia.` },
        debug: `Engine key error: ${language}`
      });
    }

    const response = await fetch(
      "https://ce.judge0.com/submissions?wait=true&base64_encoded=false",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          source_code: code,
          language_id: languageId,
          stdin: ""
        })
      }
    );

    const data = await response.json();
    const stdout = data.stdout || "";
    const stderr = data.stderr || "";
    const compileOutput = data.compile_output || "";
    const output = stdout || stderr || compileOutput || (data.status?.description === "Accepted" ? "Program selesai tanpa output." : data.status?.description || "Eksekusi gagal.");

    return NextResponse.json({
      run: { output },
      debug: `Status: ${data.status?.description || "OK"} | Waktu Eksekusi: ${data.time || "0.01"}s | Memori: ${data.memory || 120} KB`
    });
  } catch (error) {
    return NextResponse.json(
      {
        run: { output: `[Network Error]: Gagal menghubungkan request ke compiler runtime.` },
        debug: String(error)
      },
      { status: 500 }
    );
  }
}