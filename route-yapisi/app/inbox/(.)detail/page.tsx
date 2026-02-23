"use client";

export default function DetailModal() {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.6)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <div style={{ background: "white", padding: 40 }}>
        <h2>Mesaj Detay Modal</h2>
        <a href="/inbox/list">Kapat</a>
      </div>
    </div>
  );
}