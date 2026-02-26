"use client";
import { useState } from "react";

export default function Panel1() {
  const [text, setText] = useState("");
  return (
    <div>
      <h3>Panel 1 (Kırmızı)</h3>
      <input 
        value={text} 
        onChange={(e) => setText(e.target.value)} 
        placeholder="Buraya bir şey yaz..." 
      />
      <p>Yazılan: {text}</p>
    </div>
  );
}