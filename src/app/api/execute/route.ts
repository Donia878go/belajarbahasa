import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { language, version, code } = await req.json();

    const response = await fetch("https://emkc.org/api/v2/piston/execute", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        language,
        version: version || "*",
        files: [{ name: "main", content: code }]
      })
    });

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { message: "Gagal terhubung ke engine eksekusi", error: String(error) },
      { status: 500 }
    );
  }
}