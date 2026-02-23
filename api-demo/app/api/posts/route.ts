import { NextResponse } from "next/server";

// 1. GET İsteği: Verileri döner
export async function GET() {
  const posts = [
    { id: 1, title: "Next.js API Handler" },
    { id: 2, title: "Web Standards" },
  ];

  return NextResponse.json(posts);
}

// 2. POST İsteği: Gelen veriyi okur ve onay döner
export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Veri gelip gelmediğini kontrol et (Hata almamak için)
    if (!body || !body.title) {
      return NextResponse.json({ error: "Başlık boş olamaz" }, { status: 400 });
    }

    console.log("Gelen Veri:", body);

    return NextResponse.json(
      { message: "Veri başarıyla alındı", data: body },
      { status: 201 }
    );
  } catch (error) {
    // Eğer JSON okunamazsa hata dön
    return NextResponse.json({ error: "Geçersiz veri formatı" }, { status: 400 });
  }
}