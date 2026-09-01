import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { language, code } = await req.json();

    // Penamaan file sesuai kebutuhan compiler tiap bahasa
    let filename = "main.txt";
    if (language === "python") filename = "main.py";
    else if (language === "javascript") filename = "main.js";
    else if (language === "c") filename = "main.c";
    else if (language === "cpp") filename = "main.cpp";
    else if (language === "java") filename = "Main.java";
    else if (language === "pascal") filename = "main.pas";
    else if (language === "go") filename = "main.go";
    else if (language === "rust") filename = "main.rs";
    else if (language === "nasm64") filename = "main.asm";
    else if (language === "basic.net") filename = "main.vb";

    const response = await fetch("https://emkc.org/api/v2/piston/execute", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        language: language,
        version: "*",
        files: [
          {
            name: filename,
            content: code,
          },
        ],
      }),
    });

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { message: "Terjadi kesalahan pada server", error: String(error) },
      { status: 500 }
    );
  }
}