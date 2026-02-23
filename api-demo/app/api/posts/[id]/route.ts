// app/api/posts/[id]/route.ts
import { NextResponse } from "next/server";

const dummyPosts = [
  { id: "1", title: "Next.js Öğreniyorum", content: "Route Handlers konusu çok zevkli!" },
  { id: "2", title: "API Standartları", content: "Web Standard Request/Response API öğreniyoruz." },
  { id: "3", title: "Dinamik Rotalar", content: "Klasör isimlerindeki köşeli parantezler sihirli!" },
];

export async function GET(
  request: Request,
  // Promise tipini buraya ekliyoruz
  { params }: { params: Promise<{ id: string }> } 
) {
  // YENİ KURAL: params bir Promise olduğu için await ile açıyoruz
  const resolvedParams = await params;
  const id = resolvedParams.id;

  const post = dummyPosts.find((p) => p.id === id);

  if (post) {
    return NextResponse.json({
      success: true,
      data: post,
    });
  } else {
    return NextResponse.json(
      { success: false, message: "Üzgünüm, bu ID ile bir yazı bulamadık." },
      { status: 404 }
    );
  }
}