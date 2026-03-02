import Link from "next/link";
import { use } from "react";

export default function FullMailPage({ params }: { params: Promise<{ id: string }> }) {//id string olarak geldiğinde ben sana bildireceğim diyor paromise params a 
  const resolvedParams = use(params);

  return (
    <div className="min-h-screen bg-white p-12">
      <Link href="/inbox" className="text-blue-500 hover:underline mb-8 block">
        ← Listeye Geri Dön
      </Link>
      <h1 className="text-4xl font-extrabold mb-4">Mail #{resolvedParams.id} Detay Sayfası</h1>
      <div className="prose max-w-none border-t pt-8">
        <p>Bu, mailin doğrudan erişilen tam sayfa versiyonudur.</p>
      </div>
    </div>
  );
}