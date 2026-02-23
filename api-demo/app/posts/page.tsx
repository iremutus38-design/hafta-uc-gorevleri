"use client";

import { useState, useEffect } from "react";

export default function PostsPage() {
  const [posts, setPosts] = useState<{ id: number; title: string }[]>([]);
  const [newTitle, setNewTitle] = useState("");
  const [loading, setLoading] = useState(true);

  // 1. GET İsteği: API'den verileri çek
  useEffect(() => {
    fetch("/api/posts")
      .then((res) => (res.ok ? res.json() : []))
      .then((data) => {
        setPosts(data);
        setLoading(false);
      })
      .catch((err) => console.error("Veri çekme hatası:", err));
  }, []);

  // 2. POST İsteği: Yeni veri ekle
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle) return;

    try {
      const res = await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: newTitle }),
      });

      // Yanıt boş veya hatalı mı kontrolü (Hata çözümün burası)
      if (!res.ok) {
        throw new Error("Sunucudan hatalı yanıt geldi.");
      }

      const result = await res.json();
      
      // Arayüzü güncelle
      if (result.data) {
        setPosts([...posts, { id: Math.random(), title: result.data.title }]);
        setNewTitle("");
        alert("Başarıyla eklendi!");
      }
    } catch (err) {
      console.error("Gönderim hatası:", err);
      alert("Bir hata oluştu. Lütfen tekrar deneyin.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8 font-sans">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">API Veri Akışı Paneli</h1>

        {/* POST FORMU */}
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 mb-10">
          <label className="block text-sm font-medium text-gray-700 mb-2">Yeni İçerik Ekle</label>
          <div className="flex gap-3">
            <input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="Başlık yazın..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-black"
            />
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Gönder (POST)
            </button>
          </div>
        </form>

        {/* GET LİSTESİ */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-800">Mevcut Kayıtlar (GET)</h2>
          {loading ? (
            <p className="text-gray-500 italic">Yükleniyor...</p>
          ) : (
            posts.map((post) => (
              <div 
                key={post.id} 
                className="bg-white p-4 rounded-lg border-l-4 border-blue-500 shadow-sm flex justify-between items-center"
              >
                <span className="text-gray-700 font-medium">{post.title}</span>
                <span className="text-xs bg-gray-100 text-gray-500 px-2 py-1 rounded">ID: {post.id.toString().slice(0, 5)}</span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}