// app/api/weather/route.ts
import { NextResponse } from "next/server";

// Bu endpoint'in her 60 saniyede bir tazelenmesini zorunlu kılıyoruz
export const revalidate = 60; 

export async function GET() {
  // Gerçek bir senaryoda burası bir dış API'ya (OpenWeather vb.) istek atar
  const currentTime = new Date().toLocaleTimeString();

  return NextResponse.json({
    city: "İstanbul",
    temp: "15°C",
    lastUpdated: currentTime,
    info: "Bu veri 60 saniye boyunca cache'den gelecektir. Sayfayı yenileseniz de 'lastUpdated' süresi değişmeyecektir."
  });
}