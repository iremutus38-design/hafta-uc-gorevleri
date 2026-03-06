import { NextResponse } from "next/server";

export async function GET() {
  const response = NextResponse.json({
    message: "Giriş başarılı! Üye kartınız tarayıcıya tanımlandı.",
  });

  // Çerezi ekleyelim Disk e kaydolur 
  response.cookies.set({
    name: "user-session",//key 
    value: "aktif_uye_123",// her kişi için özel olan ismi
    httpOnly: false,// tarayıcıda consol a document.cookie yazıp değeri görüntüleyebilirim.
    path: "/",//Bütünsel güvenlik sağlar. üretilen özel anahtar sitenin her yerinde kullanılabilir demek "/" root kök dizin anlamına gelir 
    maxAge: 60 * 60, // 1 saat
   
  });
  return response;
} 