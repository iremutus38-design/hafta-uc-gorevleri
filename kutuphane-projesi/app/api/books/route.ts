import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json([
    { id: 1, title: "Sefiller", author: "Victor Hugo" },
    { id: 2, title: "Suç ve Ceza", author: "Dostoyevski" }
  ]);
}
//Ben tarayıcıda /api/books yazdığımda server bunun get isteği olduğunu anlar(tarayıcının varsayılan davranışı) ve bu fonksiyonu çalıştırır.Cevabı json formatına çevirip tarayıcıya gönderir. 