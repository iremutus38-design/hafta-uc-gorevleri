import { NextResponse } from "next/server";

export async function GET() {
  const response = NextResponse.json({
    message: "Giriş başarılı! Üye kartınız tarayıcıya tanımlandı.",
  });

  // Çerezi ekleyelim
  response.cookies.set({
    name: "user-session",
    value: "aktif_uye_123",
    httpOnly: true,
    path: "/",
    maxAge: 60 * 60, // 1 saat
  });

  return response;
}