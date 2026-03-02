"use client" // Bu dosyanın bir Client Component olduğunu belirtir (etkileşim için şart).

import { useState } from "react" // Form verilerini ve mesajları takip etmek için state kullanır.

export default function UserForm() {
  const [name, setName] = useState("") // İsim girdisini tutar.
  const [email, setEmail] = useState("") // Email girdisini tutar.
  const [message, setMessage] = useState("") // Sunucudan gelen hata veya başarı mesajını tutar.

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault() // Formun sayfayı yenilemesini engeller.
    setMessage("") // Her yeni gönderimde eski mesajı temizler.

    // Backend'deki /api/users rotasına POST isteği atar.
    const res = await fetch("/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email }), // Verileri JSON formatına çevirip gönderir.
    })

    const data = await res.json() // Sunucudan gelen yanıtı (data.error veya data.message) okur.
    console.log("Sunucudan gelen ham yanıt objesi (res):", res)
console.log("Sunucunun gönderdiği asıl veri (data):", data)

    if (!res.ok) {
      // res.ok (status 200 değilse) false döner, hata mesajını ekrana yansıtır.
      setMessage(data.error)
    } else {
      // İşlem başarılıysa başarı mesajını yansıtır.
      setMessage(data.message)
    }
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>Kullanıcı Oluştur</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            placeholder="İsim"
            value={name}
            onChange={(e) => setName(e.target.value)} // Kullanıcı yazdıkça state güncellenir.
          />
        </div>
        <div style={{ marginTop: "10px" }}>
          <input
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)} // Kullanıcı yazdıkça state güncellenir.
          />
        </div>
        <button style={{ marginTop: "10px" }} type="submit">Gönder</button>
      </form>

      {/* Mesaj varsa ekranda kırmızı renkte gösterilir. */}
      {message && (
        <p style={{ marginTop: "15px", color: "red" }}>
          {message}
        </p>
      )}
    </div>
  )
}