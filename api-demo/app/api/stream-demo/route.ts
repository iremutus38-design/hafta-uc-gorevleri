// app/api/stream-demo/route.ts
export async function GET() {
  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    async start(controller) {
      // Tarayıcıyı tetiklemek için her mesajın sonuna boşluk/dolgu ekliyoruz
      const padding = " ".repeat(1024); // 1KB dolgu

      controller.enqueue(encoder.encode("Islem basladi... (1/3)\n" + padding));
      await new Promise((r) => setTimeout(r, 1500));

      controller.enqueue(encoder.encode("Veriler analiz ediliyor... (2/3)\n" + padding));
      await new Promise((r) => setTimeout(r, 1500));

      controller.enqueue(encoder.encode("Islem tamamlandi! ✅" + padding));
      controller.close();
    },
  });

  return new Response(stream, {
    headers: { 
      "Content-Type": "text/plain; charset=utf-8",
      "Transfer-Encoding": "chunked" // Parçalı gönderimi tarayıcıya bildirir
    },
  });
}