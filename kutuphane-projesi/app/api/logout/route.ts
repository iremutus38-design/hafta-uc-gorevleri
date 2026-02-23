// app/api/logout/route.ts
import { NextResponse } from "next/server";

export async function GET() {
  const response = NextResponse.json({ 
    message: "Çıkış yapıldı, üye kartınız iptal edildi." 
  });
  
  response.cookies.delete("user-session");
  
  return response;
}