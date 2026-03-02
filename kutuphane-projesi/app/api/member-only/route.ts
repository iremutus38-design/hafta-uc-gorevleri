import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    secretMessage: "Tebrikler Üye! Nadir eserler odasındaki gizli koleksiyonu görüyorsunuz. 📚✨"
  });
}