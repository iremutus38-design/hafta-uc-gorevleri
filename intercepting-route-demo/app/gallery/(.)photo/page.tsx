"use client";

export default function PhotoModal() {
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
        <h2>Fotoğraf Modal</h2>
        <a href="/gallery">Kapat</a>
      </div>
    </div>
  );
}