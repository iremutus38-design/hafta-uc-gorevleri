"use client";

import { useState } from "react";

export default function DemoErrorPage() {

  const [name, setName] = useState("");
  const [error, setError] = useState("");

  // Beklenen hata → validation failure
  const handleSubmit = () => {
    if (name.length < 3) {
      setError("İsim en az 3 karakter olmalıdır");
      return;
    }

    setError("");
    alert("Form gönderildi");
  };

  // Beklenmeyen hata → throw exception
  const triggerCrash = () => {
    throw new Error("Beklenmeyen sistem hatası!");
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Demo Error Route</h2>

      <input
        placeholder="İsim gir"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <br /><br />

      <button onClick={handleSubmit}>
        Formu Gönder
      </button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <hr />

      <button onClick={triggerCrash}>
        Bilinçli Hata Üret
      </button>
    </div>
  );
}