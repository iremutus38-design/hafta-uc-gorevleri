"use client";

import { useEffect } from "react";

export default function Error({ error, reset }: any) {

  useEffect(() => {
    console.error("Route Segment Error:", error.message);
  }, [error]);

  return (
    <div style={{ padding: 20 }}>
      <h2>Bir hata oluştu</h2>

      <p>Sistem hatası meydana geldi.</p>

      <button onClick={() => reset()}>
        Tekrar dene
      </button>

      <br /><br />

      <a href="/">Güvenli geri dön</a>
    </div>
  );
}