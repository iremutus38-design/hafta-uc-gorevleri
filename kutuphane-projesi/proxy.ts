// proxy.ts (eski adıyla middleware.ts)
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// "middleware" yerine "proxy" veya "default" kullanıyoruz
export default function middleware(request: NextRequest) {
  const url = request.nextUrl.pathname;

  // Terminalde görmeyi çok istediğimiz o log
  console.log("🚀 Proxy Denetimi:", url);

//Çerez okuma
  if (url.startsWith('/api/member-only')) {
    const session = request.cookies.get('user-session');

    if (!session) {
      return new NextResponse(
        JSON.stringify({ error: "Giris Engellendi: Kartiniz yok!" }),
        { status: 403, headers: { 'content-type': 'application/json' } }
      );
    }
  }

const response = NextResponse.next();

  // 5.4. Response Header'a Özel Değerler Ekleme
  // Projenin adını ekliyoruz
  response.headers.set('X-Library-Name', 'Gemini-Digital-Library');
  
  // Her istek için benzersiz bir ID oluşturuyoruz (Ödevde istenen örnek)
  const requestId = Math.random().toString(36).substring(7);
  response.headers.set('X-Request-ID', `req-${requestId}`);

  // Güvenlik için region (bölge) bilgisi ekleyelim
  response.headers.set('X-App-Region', 'TR-Ankara');

  return response;
}

export const config = {
  matcher: '/api/:path*',
};