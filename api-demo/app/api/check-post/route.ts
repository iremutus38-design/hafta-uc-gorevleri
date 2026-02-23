// app/api/check-post/route.ts
import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  // 1. URL'den 'id' parametresini oku
  const id = request.nextUrl.searchParams.get("id");

  // 2. KOŞUL: Eğer id yoksa yönlendir
  if (!id) {
    redirect("/posts"); 
  }

  // 3. EĞER BURAYA GELİNDİYSE: Koşul sağlanmamış (yani ID girilmiş) demektir.
  // Burada gerçek bir veritabanı sorgusu yaptığını hayal et.
  return NextResponse.json({ 
    status: "Success", 
    message: `ID girildi, veri çekiliyor...`,
    data: {
      requestedId: id,
      content: `ID'si ${id} olan içeriğin detayları burada yer alıyor.`,
      timestamp: new Date().toISOString()
    }
  });
}