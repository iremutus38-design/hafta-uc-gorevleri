import Link from "next/link";

export default function Panel2() {
  return (
    <div>
      <h3>Panel 2 (Mavi)</h3>
      <Link href="/settings" style={{color: "blue", textDecoration: "underline"}}>
        Sadece bu paneli değiştir (Ayarlar'a git)
      </Link>
    </div>
  );
}