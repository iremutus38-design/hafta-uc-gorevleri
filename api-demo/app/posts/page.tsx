"use client"; 
import { useState, useEffect } from "react"; 
export default function PostsPage() {
  const [posts, setPosts] = useState<{ id: number; title: string }[]>([]);
  //useState bir hafıza gibi düşünülebilir. setPost useState sayesinde değerleri posts a atabilir 
  const [newTitle, setNewTitle] = useState("");//yazılan metnin geçici hafızası
  const [loading, setLoading] = useState(true);//Başta true dönerek verilerin gelmesini bekler

 
  useEffect(() => {
    fetch("/api/posts") //api/posts/route.ts dosyasındaki GET fonksiyonuna git listeyi iste der.
      .then((res) => (res.ok ? res.json() : [])) //Sunucu cevabı başarılı mı başarılıysa gönderdiği veriyi json formatına çevir 
      .then((data) => {//ve data içine koy
        setPosts(data); //datayı setPosts içine at direkt posts a atamazsın çünkü veri güncelleneceğinden haberi olmaz reactın
        setLoading(false); //veri yüklendiğinde loading değişkenini false yapar.
      })
      .catch((err) => console.error("Veri çekme hatası:", err)); 
  }, []); //Sondaki boş köşeli parantezle birlikte ilk açıldığında çalış diyoruz. Eklemeseydik sayfa her açıldığında çalışırdı sürekli api çekerdi
  
  const handleSubmit = async (e: React.FormEvent) => {
    //Kullanıcı butona bastığı andan, ekranda yeni postun göründüğü anı yöneten fonksiyon
    e.preventDefault(); //Tarayıcının sayfayı yenilemesini engeller. yapılan her değişiklik sonucu sayfa refresh olur sürekli onu engeller
    if (!newTitle) return; // eğer metin kutusu boşa çık


    try { //try-catch güvenlik katmanı hata çıkarsa yakala demek
      const res = await fetch("/api/posts", { //await işlem bitene kadar bekle demek, fetch ise paketin gideceği adres
        method: "POST", 
        headers: { "Content-Type": "application/json" }, //paketin özelliğine dair etiket mesela json formatı bu der gibi
        body: JSON.stringify({ title: newTitle }), // başlığı obje içine koyarız objeyi de metin formatına çeviririz
      });

      
      if (!res.ok) { // İşlem başarısız mı
        throw new Error("Sunucudan hatalı yanıt geldi."); // throw ile hatayı dışarı fırlatıp haber ederiz.
      }

      const koli = await res.json(); //Backendden frontend e gelen paket
      //Karmaşık ilk gelen cevap verisini al ve js objesine dönüştür. koliye at
      //koli, Post ile gönderdiğim veririnin sunucu tarafından damgalanmış ıd gibi verilerin eklenmiş hali
     
      if (koli.data) {
        
        const yeniListe = ([...posts, { id: Math.random(), title: koli.data.title }]);
        //Üç nokta liste içindeki eski verilerin korunmasını sağlar. 
        // yeni bir dizi açıp içine eski verileri ekleyip yeni veriyi de en sona ekliyor.
        setPosts(yeniListe)
        setNewTitle(""); 
        alert("Başarıyla eklendi!"); 
        console.log(koli)
        console.log(yeniListe)
        

      }
    } 
    catch (err) {
      console.error("Gönderim hatası:", err);
      alert("Bir hata oluştu. Lütfen tekrar deneyin.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8 font-sans">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">API Veri Akışı Paneli</h1>

        
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
                <span className="text-xs bg-gray-100 text-gray-500 px-2 py-1 rounded">
                    ID: {post.id.toString().slice(0, 5)} 
                </span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}