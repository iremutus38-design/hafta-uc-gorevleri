// app/middleware.ts (veya root'taki middleware.ts)

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export default function middleware(request: NextRequest) {
  // Gelen isteğin yolunu (path) al (Örn: /kutuphane)
  const url = request.nextUrl.pathname;

  // --- 1. MASKELEME ---
  if (url === '/kutuphane') {
    // Kullanıcı /kutuphane dese de ona /api/books içeriğini ver. Maskeleme yaparak kullanıcı dostu ve güvenli urller verir.
    return NextResponse.rewrite(new URL('/api/books', request.url));
    //rewrite maskeleme anlamına gelir.
  }

  // --- 2. GÜVENLİK ---
  if (url.startsWith('/api/member-only')) {
    //startsWith kullanarak, bu yol ile başlayan her yeri tek bir hamleyle koruma altına almış oluyorsun.
    // Tarayıcıdaki çerezleri oku
    const session = request.cookies.get('user-session');

    // Eğer oturum çerezi yoksa girişi burada kes!
    if (!session) {
      return new NextResponse(
        JSON.stringify({ error: "Giris Engellendi: Üye değilsiniz!" }),
        { status: 403, headers: { 'content-type': 'application/json' } }
      );
    }
  }

  // Yoluna devam etmesine izin ver
  const response = NextResponse.next();
  //Kullanıcıya gidecek olan sonuç nesnesidir.

  // --- 3. HEADER EKLEME ---
  // Cevaba (Response) özel bilgiler ekle
  response.headers.set('X-Library-Name', 'Digital-Library');
  const requestId = Math.random().toString(36).substring(7);
  response.headers.set('X-Request-ID', `req-${requestId}`);

  return response;
}

// Hangi yollarda bu middleware çalışsın?
export const config = {
  matcher: ['/api/:path*', '/kutuphane'], // api altındaki her şey ve kutuphane yolu
};