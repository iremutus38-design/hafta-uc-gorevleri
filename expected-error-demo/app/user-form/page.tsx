"use client"

import { useState } from "react"

export default function UserForm() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setMessage("")

    const res = await fetch("/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email }),
    })

    const data = await res.json()

    if (!res.ok) {
      setMessage(data.error)
    } else {
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
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div style={{ marginTop: "10px" }}>
          <input
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <button style={{ marginTop: "10px" }} type="submit">
          Gönder
        </button>
      </form>

      {message && (
        <p style={{ marginTop: "15px", color: "red" }}>
          {message}
        </p>
      )}
    </div>
  )
}