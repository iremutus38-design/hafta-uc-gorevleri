"use client"; // Bu bileşenin tarayıcıda (istemci tarafında) çalışacağını belirtir.

import { useState, useEffect } from "react"; // React'in durum yönetimi ve yan etki kancalarını içeri aktarır.

export default function PostsPage() {
  // Post listesini tutan state. Başlangıçta boş bir dizi.
  const [posts, setPosts] = useState<{ id: number; title: string }[]>([]);
  // Input alanına yazılan yeni başlığı tutan state.
  const [newTitle, setNewTitle] = useState("");
  // Veri yükleniyor durumunu kontrol eden state.
  const [loading, setLoading] = useState(true);

  // 1. GET İsteği: Sayfa ilk açıldığında çalışır.
  useEffect(() => {
    fetch("/api/posts") // API rotasına GET isteği atar.
      .then((res) => (res.ok ? res.json() : [])) // Yanıt başarılıysa JSON'a çevirir, değilse boş dizi döner.
      .then((data) => {
        setPosts(data); // API'den gelen veriyi state'e kaydeder.
        setLoading(false); // Yükleme tamamlandığı için loading'i kapatır.
      })
      .catch((err) => console.error("Veri çekme hatası:", err)); // Hata oluşursa konsola yazdırır.
  }, []); // [] boş bağımlılık dizisi sayesinde sadece sayfa yüklenince 1 kez çalışır.

  // 2. POST İsteği: Form gönderildiğinde yeni veri ekler.
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Sayfanın form gönderimiyle yenilenmesini engeller.
    if (!newTitle) return; // Eğer başlık boşsa işlem yapmaz.

    try {
      const res = await fetch("/api/posts", { // API'ye POST isteği atar.
        method: "POST", // HTTP metodunu POST olarak belirler.
        headers: { "Content-Type": "application/json" }, // Gönderilen verinin JSON formatında olduğunu belirtir.
        body: JSON.stringify({ title: newTitle }), // State'deki başlığı JSON stringine çevirip gövdeye ekler.
      });

      // Yanıt boş veya hatalı mı kontrolü
      if (!res.ok) {
        throw new Error("Sunucudan hatalı yanıt geldi.");
      }

      const result = await res.json(); // Sunucudan gelen yanıtı ayrıştırır.
      
      // Arayüzü güncelle
      if (result.data) {
        // Mevcut postlara yenisini ekleyerek listeyi günceller (Optimistic update benzeri).
        setPosts([...posts, { id: Math.random(), title: result.data.title }]);
        setNewTitle(""); // Input alanını temizler.
        alert("Başarıyla eklendi!"); // Kullanıcıya bilgi verir.
        console.log(result) // Yanıtı konsola yazdırır.
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

        {/* POST FORMU: Yeni veri girişi yapılan alan */}
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 mb-10">
          <label className="block text-sm font-medium text-gray-700 mb-2">Yeni İçerik Ekle</label>
          <div className="flex gap-3">
            <input
              type="text"
              value={newTitle} // Değeri state'den alır.
              onChange={(e) => setNewTitle(e.target.value)} // Yazıldıkça state'i günceller.
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

        {/* GET LİSTESİ: Verilerin listelendiği alan */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-800">Mevcut Kayıtlar (GET)</h2>
          {loading ? (
            <p className="text-gray-500 italic">Yükleniyor...</p> // Veri gelene kadar görünür.
          ) : (
            posts.map((post) => ( // Her bir post için bir div oluşturur.
              <div 
                key={post.id} // React için benzersiz anahtar.
                className="bg-white p-4 rounded-lg border-l-4 border-blue-500 shadow-sm flex justify-between items-center"
              >
                <span className="text-gray-700 font-medium">{post.title}</span>
                <span className="text-xs bg-gray-100 text-gray-500 px-2 py-1 rounded">
                    ID: {post.id.toString().slice(0, 5)} {/* ID'nin ilk 5 karakterini gösterir. */}
                </span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}