import Link from 'next/link';

export default function InboxPage() {
  return (
    <div style={{ padding: 40 }}>
      <h2>Inbox Ana Sayfa </h2>
      
      <div style={{ marginTop: '20px' }}>
        <Link href="/inbox/detail" style={{ color: 'blue', textDecoration: 'underline' }}>
          Mesaj Detayını Modal Olarak Aç
        </Link>
      </div>
    </div>
  );
}