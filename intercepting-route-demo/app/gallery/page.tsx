// 1. ADIM: Next.js'in Link bileşenini projeye dahil et
import Link from "next/link";

export default function GalleryPage() {
  return (
    <div style={{ padding: 40 }}> {/* Sayfa kenar boşluğu */}
      <h2>Galeri</h2>

      {/* 2. ADIM: Küçük harf 'link' yerine büyük harf 'Link' kullan.
         Böylece 'children' (yani içerideki metin) hatası almazsın.
      */}
      <Link href="/gallery/photo">
        Fotoğrafı Aç (Modal Olarak)
      </Link>
        
    </div>
  );
}