import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { name, email } = body

    // ✅ EXPECTED ERRORS (Validation)

    if (!name || !email) {
      return NextResponse.json(
        { error: "Tüm alanları doldurmanız gerekiyor." },
        { status: 400 }
      )
    }

    if (!email.includes("@")) {
      return NextResponse.json(
        { error: "Geçerli bir email adresi girin." },
        { status: 400 }
      )
    }

    // ❌ Bilinçli sistem hatası simülasyonu
    if (email === "error@test.com") {
      throw new Error("Database connection failed")
    }

    // ✅ Başarılı durum
    return NextResponse.json(
      { message: "Kullanıcı başarıyla oluşturuldu." },
      { status: 200 }
    )

  } catch (err) {
    // Teknik hata loglanır
    console.error("Server Error:", err)

    // Kullanıcıya teknik detay verilmez
    return NextResponse.json(
      { error: "Sunucu hatası oluştu. Lütfen tekrar deneyin." },
      { status: 500 }
    )
  }
}