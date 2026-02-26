// app/api/stream-demo/route.ts

// GET isteği karşılayıcısı: Tarayıcıdan bu adrese girildiğinde çalışır.
export async function GET() {
  // Metinleri (string) bilgisayarın anlayacağı byte dizilerine çevirmek için bir yardımcı araç.
  const encoder = new TextEncoder();

  // 'ReadableStream' akış halindeki bir veri kaynağını temsil eder.
  const stream = new ReadableStream({
    // Akış başladığında yapılacak işlemleri tanımlayan fonksiyon.
    async start(controller) {
      const padding = " ".repeat(1024); // 1KB dolgu (Görünmez boşluklar)

      // ADIM 1: İşlemin başladığını bildiren mesajı kuyruğa (akışa) ekle.
      controller.enqueue(encoder.encode("Islem basladi... (1/3)\n" + padding));
      
      // 1.5 saniyelik yapay bir bekleme süresi oluştur (Sunucu bir işlem yapıyormuş gibi).
      await new Promise((r) => setTimeout(r, 1500));

      // ADIM 2: İkinci parçayı gönder.
      controller.enqueue(encoder.encode("Veriler analiz ediliyor... (2/3)\n" + padding));
      
      // Tekrar 1.5 saniye bekle.
      await new Promise((r) => setTimeout(r, 1500));

      // ADIM 3: Son mesajı gönder.
      controller.enqueue(encoder.encode("Islem tamamlandi! ✅" + padding));
      
      // Akışı kapat: Artık başka veri gelmeyeceğini bildirir.
      controller.close();
    },
  });

  // Hazırladığımız akışı (stream) bir HTTP yanıtı olarak döndür.
  return new Response(stream, {
    headers: { 
      // Yanıtın düz metin olduğunu ve karakter setini belirtir.
      "Content-Type": "text/plain; charset=utf-8",
      
      // KRİTİK BAŞLIK: Tarayıcıya verilerin tek seferde değil, 
      // parçalar halinde geleceğini söyler.
      "Transfer-Encoding": "chunked" 
    },
  });
}