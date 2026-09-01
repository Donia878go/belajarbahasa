import { NextResponse } from "next/server";

// Pemetaan bahasa & file name untuk OneCompiler Engine
const LANGUAGE_CONFIG: Record<string, { language: string; fileName: string }> = {
  python: { language: "python", fileName: "main.py" },
  javascript: { language: "nodejs", fileName: "main.js" },
  c: { language: "c", fileName: "main.c" },
  cpp: { language: "cpp", fileName: "main.cpp" },
  java: { language: "java", fileName: "Main.java" },
  pascal: { language: "pascal", fileName: "main.pas" },
  go: { language: "go", fileName: "main.go" },
  rust: { language: "rust", fileName: "main.rs" },
  "basic.net": { language: "vb", fileName: "Main.vb" },
  nasm64: { language: "assembly", fileName: "main.asm" }
};

export async function POST(req: Request) {
  try {
    const { language, code } = await req.json();

    const config = LANGUAGE_CONFIG[language] || { language: "python", fileName: "main.py" };

    const response = await fetch("https://onecompiler.com/api/code/exec", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: config.language,
        title: config.language,
        version: "latest",
        mode: config.language,
        description: null,
        extension: config.fileName.split(".").pop(),
        language: config.language,
        files: [
          {
            name: config.fileName,
            content: code
          }
        ]
      })
    });

    const data = await response.json();

    const stdout = data.stdout || "";
    const stderr = data.stderr || data.exception || "";
    const output = stdout || stderr || (data.status === "success" ? "Program selesai tanpa output." : "Eksekusi gagal.");

    return NextResponse.json({
      run: {
        output: output,
        stdout: stdout,
        stderr: stderr
      }
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Terjadi kesalahan pada server eksekusi", error: String(error) },
      { status: 500 }
    );
  }
}