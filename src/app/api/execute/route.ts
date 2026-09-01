import { NextResponse } from "next/server";

// Pemetaan bahasa ke compiler Wandbox API (Gratis & Terbuka)
const COMPILER_MAP: Record<string, string> = {
  python: "cpython-head",
  javascript: "nodejs-head",
  c: "gcc-head-c",
  cpp: "gcc-head",
  java: "openjdk-head",
  pascal: "fpc-head",
  go: "go-head",
  rust: "rust-head",
  perl: "perl-head",
  ruby: "ruby-head",
  nasm64: "gcc-head", // via gcc assembly
  "basic.net": "mono-head"
};

export async function POST(req: Request) {
  try {
    const { language, code } = await req.json();

    const compiler = COMPILER_MAP[language] || "cpython-head";

    const response = await fetch("https://wandbox.org/api/compile.json", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        compiler: compiler,
        code: code,
      }),
    });

    const data = await response.json();

    // Format output terminal dari Wandbox
    const stdout = data.program_output || "";
    const stderr = data.compiler_error || data.program_error || "";
    const output = stdout || stderr || "Program selesai dieksekusi tanpa output.";

    return NextResponse.json({
      run: {
        output: output,
        stdout: stdout,
        stderr: stderr,
      },
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Terjadi kesalahan server eksekusi", error: String(error) },
      { status: 500 }
    );
  }
}