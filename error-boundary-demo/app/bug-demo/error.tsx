"use client" // Hata arayüzü kullanıcı etkileşimi (buton tıklama) gerektirdiği için Client Component olmalıdır.

export default function Error({
  error, // Oluşan hatanın detaylarını içeren nesne.
  reset, // Hatayı temizleyip sayfayı yeniden render etmeye çalışan fonksiyon.
}: {
  error: Error
  reset: () => void
}) {
  return (
    <div style={{ padding: "20px" }}>
      <h2>Bir hata oluştu 😢</h2>
      <p>Bir şeyler ters gitti.</p>

      {/* 🔄 Kullanıcı bu butona bastığında Next.js sayfayı tekrar yüklemeyi dener. */}
      <button
        onClick={() => reset()}
        style={{ marginTop: "10px" }}
      >
        Tekrar Dene
      </button>
    </div>
  )
}