// app/api/posts/[id]/route.ts
import { NextResponse } from "next/server"; // Next.js'in standart yanıt bileşeni

// Sunucu tarafında (backend) geçici olarak tutulan örnek veri listesi
const dummyPosts = [
  { id: "1", title: "Next.js Öğreniyorum", content: "Route Handlers konusu çok zevkli!" },
  { id: "2", title: "API Standartları", content: "Web Standard Request/Response API öğreniyoruz." },
  { id: "3", title: "Dinamik Rotalar", content: "Klasör isimlerindeki köşeli parantezler sihirli!" },
];

// Belirli bir ID'ye göre veri getiren GET fonksiyonu
export async function GET(
  request: Request,
  // Next.js 15+ sürümünde params bir Promise olarak gelir, bu yüzden tip tanımlaması önemlidir
  { params }: { params: Promise<{ id: string }> } 
) {
  // YENİ KURAL: params bir Promise olduğu için içeriğine erişmeden önce await ile çözüyoruz
  const resolvedParams = await params;
  const id = resolvedParams.id; // URL'den gelen 'id' değerini alıyoruz (Örn: "1")

  // dummyPosts dizisi içinde, URL'den gelen ID ile eşleşen yazıyı arıyoruz
  const post = dummyPosts.find((p) => p.id === id);

  // Eğer yazı bulunduysa (eşleşme varsa)
  if (post) {
    return NextResponse.json({
      success: true,
      data: post, // Bulunan yazıyı JSON olarak gönder
    });
  } else {
    // Yazı bulunamadıysa 404 (Not Found) hatası ve mesaj döner
    return NextResponse.json(
      { success: false, message: "Üzgünüm, bu ID ile bir yazı bulamadık." },
      { status: 404 }
    );
  }
}