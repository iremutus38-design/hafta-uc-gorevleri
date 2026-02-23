import Link from 'next/link';

export default function InboxListPage() {
  return (
    <div style={{ padding: 40 }}>
      <h2>Mesaj Listesi</h2>

      <ul>
        <li>
          {/* 1. 'a' yerine 'Link' kullanıyoruz (Sayfa yenilenmez).
              2. Klasör adındaki (.) kısmını URL'e yazmıyoruz.
          */}
          <Link href="/inbox/detail">
            Mesaj 1 Detay (Modal Olarak Açılır)
          </Link>
        </li>
      </ul>
    </div>
  );
}