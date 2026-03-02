"use client";
import { useRouter } from "next/navigation";
import { use } from "react";

export default function MailInterceptModal({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const resolvedParams = use(params); // Promise'i açmak için 'use' kullanıyoruz

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-8 relative animate-in fade-in zoom-in duration-200">
        <div className="flex justify-between items-start mb-6">
          <h2 className="text-2xl font-bold">Mail Detayı #{resolvedParams.id}</h2>
          <button 
            onClick={() => router.back()}
            className="text-gray-400 hover:text-gray-600 text-2xl"
          >
            &times;
          </button>
        </div>
        <div className="p-6 bg-yellow-50 border border-yellow-100 rounded-lg text-yellow-800 mb-4">
          <strong>Önemli:</strong> Bu bir <em>Intercepted Route</em> örneğidir. 
          Sayfayı yenilerseniz tam sayfa görünüme geçer.
        </div>
        <p className="text-gray-600 leading-relaxed">
          Bu içerik modal içinde gösteriliyor. Liste hala arkada duruyor.
        </p>
      </div>
    </div>
  );
}