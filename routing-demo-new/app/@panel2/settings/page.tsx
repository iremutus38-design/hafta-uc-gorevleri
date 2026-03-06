import Link from "next/link";

export default function Panel2Settings() {
  return (
    <div style={{ padding: "10px", border: "1px solid blue" }}>
      <h3 style={{ color: "blue" }}>Panel 2: Ayarlar Sayfası</h3>
      <p>Şu an Parallel Route içinde sadece bu slot güncellendi.</p>
      
      <Link href="/" style={{ color: "darkblue", fontWeight: "bold" }}>
        ← Geri Dön (Panel 2'ye Dön)
      </Link>
    </div>
  );
}