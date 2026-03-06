import React from "react";
export default function InboxLayout({
  children, //Bu children app/inbox içindeki slotlar hariç tüm içeriği kapsar.
  list,     // @list klasöründeki içeriği temsil eden slot
  stats,    // @stats klasöründeki içeriği temsil eden slot
  modal,
}: {
  children: React.ReactNode;//childrenin getirdiği içeriğin veri tipini belirtir.Her veri tipi buna dahil olur.

  list: React.ReactNode;
  stats: React.ReactNode;   
  modal: React.ReactNode; 

}) {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">İşlem Merkezi</h1>
          <p className="text-gray-500">Paralel ve Intercepting Route Uygulaması</p>
        </header>

        {/* Sayfayı 12 birimlik sütunlara bölen grid yapısı */}
        <div className="grid grid-cols-12 gap-6">
          
          {/* Sol Panel: Mail listesinin render edildiği alan */}
          <section className="col-span-8 bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200">
            <div className="p-4 border-b bg-gray-50 font-semibold">Gelen Kutusu</div>
            {list} {/* @list/page.tsx buraya basılır */}
          </section>

          {/* Sağ Panel: İstatistiklerin render edildiği alan */}
          <aside className="col-span-4 space-y-6">
            <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-200">
              <div className="font-semibold mb-4 text-blue-600">Özet Bilgiler</div>
              {stats} {/* @stats/page.tsx buraya basılır */}
            </div>
          </aside>
        </div>

        {/* Modal açıldığında veya alt sayfalara gidildiğinde içerik burada belirir */}
       {children}
        {modal}
      </div>
    </div>
  );
}