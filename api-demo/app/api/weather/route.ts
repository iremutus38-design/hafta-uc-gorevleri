// app/api/weather/route.ts
import { NextResponse } from "next/server";

export const revalidate = 60; 

export async function GET() {
  // Gerçek bir senaryoda burası bir dış API'ya (OpenWeather vb.) istek atar
  const currentTime = new Date().toLocaleTimeString();

  return NextResponse.json({
    city: "İstanbul",
    temp: "15°C",
    lastUpdated: currentTime,//Sunucudan çekilen saat bilgisi
    info: "Bu veri 10 saniye boyunca cache'den gelecektir. Sayfayı yenileseniz de 'lastUpdated' süresi değişmeyecektir."
  });
}
//Cachede kaydedip , npmrun dev dediğimizde saati sürekli güncel tutar geliştirici modundan dolayı; 
// npm run build edip npm run start dendiğinde geliştirici mod olmaz ve revalidate çalışır.
