import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export default function middleware(request: NextRequest) {
  const url = request.nextUrl.pathname;

  // 1. GÜNLÜK HAYAT SENARYOSU: URL Güzelleştirme (Maskeleme)
  // Kullanıcı teknik bir yol olan '/api/books' yerine sadece '/kutuphane' yazsın istiyoruz.
  if (url === '/kutuphane') {
    console.log("🎨 Maskeleme Yapılıyor: /kutuphane -> /api/books");
    return NextResponse.rewrite(new URL('/api/books', request.url));
  }

  // 2. GÜVENLİK KONTROLÜ (Mevcut Mantığın)
  if (url.startsWith('/api/member-only')) {
    const session = request.cookies.get('user-session');

    if (!session) {
      return new NextResponse(
        JSON.stringify({ error: "Giris Engellendi: Üye değilsiniz!" }),
        { status: 403, headers: { 'content-type': 'application/json' } }
      );
    }
  }

  const response = NextResponse.next();

  // 3. İZLENEBİLİRLİK (Header Ekleme)
  response.headers.set('X-Library-Name', 'Gemini-Digital-Library');
  const requestId = Math.random().toString(36).substring(7);
  response.headers.set('X-Request-ID', `req-${requestId}`);

  return response;
}

// Matcher'a yeni '/kutuphane' yolumuzu eklemeyi unutma!
export const config = {
  matcher: ['/api/:path*', '/kutuphane'],
};