"use client"

export default function Error({
  error,
  reset,
}: {
  error: Error
  reset: () => void
}) {
  return (
    <div style={{ padding: "20px" }}>
      <h2>Bir hata oluştu 😢</h2>
      <p>Bir şeyler ters gitti.</p>

      <button
        onClick={() => reset()}
        style={{ marginTop: "10px" }}
      >
        Tekrar Dene
      </button>
    </div>
  )
}