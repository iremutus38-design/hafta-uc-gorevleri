// proxy.ts (eski adıyla middleware.ts)
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// "middleware" yerine "proxy" veya "default" kullanıyoruz
export default function middleware(request: NextRequest) {
  const url = request.nextUrl.pathname;

  // Terminalde görmeyi çok istediğimiz o log
  console.log("🚀 Proxy Denetimi:", url);

  // Güvenlik Kontrolü: member-only rotası
  if (url.startsWith('/api/member-only')) {
    const session = request.cookies.get('user-session');

    if (!session) {
      return new NextResponse(
        JSON.stringify({ error: "Giris Engellendi: Kartiniz yok!" }),
        { status: 403, headers: { 'content-type': 'application/json' } }
      );
    }
  }

  // Güvenlik Header'larını ekleyelim
  const response = NextResponse.next();
  response.headers.set('X-Library-Name', 'Gemini-Digital-Library');
  response.headers.set('X-Safety-Check', 'Verified-By-Proxy');

  return response;
}

export const config = {
  matcher: '/api/:path*',
};