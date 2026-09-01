import { NextResponse } from "next/server";

// ID bahasa resmi standar Judge0 Open Engine
const JUDGE0_LANGUAGE_IDS: Record<string, number> = {
  c: 50,          // C (GCC 9.2.0)
  cpp: 54,        // C++ (GCC 9.2.0)
  java: 62,       // Java (OpenJDK 13.0.1)
  pascal: 67,     // Pascal (FPC 3.0.4)
  go: 60,         // Go (1.13.5)
  rust: 73,       // Rust (1.40.0)
  nasm64: 45,     // Assembly (NASM 2.14.02)
  "basic.net": 84 // Visual Basic.Net (vbnc 0.0.0.5943)
};

export async function POST(req: Request) {
  try {
    const { language, code } = await req.json();
    const languageId = JUDGE0_LANGUAGE_IDS[language];

    if (!languageId) {
      return NextResponse.json({
        run: { output: `Bahasa ${language} tidak didukung pada compiler remote.` }
      });
    }

    // Eksekusi kode synchronous via Judge0 Engine
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
      run: { output: output }
    });
  } catch (error) {
    return NextResponse.json(
      { run: { output: `Gagal terhubung ke engine: ${String(error)}` } },
      { status: 500 }
    );
  }
}