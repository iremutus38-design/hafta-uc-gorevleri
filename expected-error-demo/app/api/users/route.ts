import { NextResponse } from "next/server" // Next.js'in standart yanıt formatını içe aktarır.

export async function POST(req: Request) { // HTTP POST isteklerini karşılayan asenkron fonksiyon.
  try {
    const body = await req.json() // Gelen isteğin gövdesindeki JSON verisini okur.
    const { name, email } = body // Veri içinden isim ve email alanlarını ayıklar.

    // DOĞRULAMA HATALARI (Validation)
    // İsim veya email boşsa kullanıcıya 400 (Hatalı İstek) hatası döner.
    if (!name || !email) {
      return NextResponse.json(
        { error: "Tüm alanları doldurmanız gerekiyor." },
        { status: 400 }
      )
    }

    // Email içinde '@' işareti yoksa geçerli kabul etmez.
    if (!email.includes("@")) {
      return NextResponse.json(
        { error: "Geçerli bir email adresi girin." },
        { status: 400 }
      )
    }

    // ❌ SİSTEM HATASI SİMÜLASYONU
    // Özel bir email adresi girildiğinde yapay bir çökme (hata) fırlatır.
    if (email === "error@test.com") {
      throw new Error("Database connection failed")
    }

    // ✅ BAŞARILI DURUM
    // Her şey yolundaysa 200 (Başarılı) koduyla mesaj döner.
    return NextResponse.json(
      { message: "Kullanıcı başarıyla oluşturuldu.JDAHFAHJFAFJ" },
      { status: 200 }
    )

  } catch (err) {
    // catch bloğu, yukarıdaki throw veya beklenmedik hataları yakalar.
    console.error("Server Error:", err) // Hatayı sunucu konsoluna (terminale) basar.

    // Kullanıcıya güvenliği bozmamak için teknik detay vermez, genel bir mesaj döner.
    return NextResponse.json(
      { error: "Sunucu hatası oluştu. Lütfen tekrar deneyin." },
      { status: 500 }
    )
  }
}