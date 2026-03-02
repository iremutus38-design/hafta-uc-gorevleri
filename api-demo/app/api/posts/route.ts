import { NextResponse } from "next/server";

// 1. GET İsteği: Sayfa yüklendiğinde mevcut verileri döner
export async function GET() {
  const posts = [
    { id: 1, title: "Next.js 15 Öğreniyorum" },
    { id: 2, title: "API Route Yapısı" },
  ];

  return NextResponse.json(posts);
}

// 2. POST İsteği: Yeni veri gönderildiğinde çalışır
export async function POST(request: Request) {
  try {
    const body = await request.json();//frontend den backende gelen paket 

    // Başlık kontrolü
    if (!body || !body.title) {
      return NextResponse.json({ error: "Başlık boş olamaz" }, { status: 400 });
    }

    return NextResponse.json(
      { message: "Veri başarıyla alındı", data: body }, // Veri ile ilgili tüm bilgiler paket haline getiriliyor. 
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ error: "Geçersiz veri formatı" }, { status: 400 });
  }
}