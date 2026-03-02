// app/api/posts/[...slug]/route.ts
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string[] }> } // slug artık bir dizi (string[])
) {
  const resolvedParams = await params;
  const pathArray = resolvedParams.slug; // URL'deki tüm parçalar burada

  return NextResponse.json({
    message: "Catch-all çalıştı!",
    yakalananParcalar: pathArray,
    ozet: `Şu an ${pathArray.join(" > ")} yolundasınız.`
  });
}
export async function POST(request: Request) {
  const body = await request.json(); // Kullanıcıdan gelen veriyi oku
  
  return Response.json({
    message: "Yeni yazı başarıyla oluşturuldu (Mock)",
    receivedData: body,
    status: 201
  });
}