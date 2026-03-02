import Link from "next/link";

// Simüle edilmiş mail verileri
const MAILS = [
  { id: "1", title: "Haftalık Bülten", sender: "Bülten Co." },
  { id: "2", title: "Ödeme Onayı", sender: "Banka A.Ş." },
  { id: "3", title: "Yeni Giriş Denemesi", sender: "Güvenlik Ekibi" },
];

export default function ListPage() {
  return (
    <div className="divide-y">
      {MAILS.map((mail) => (
        //Kullanıcı liste içindeki herhangi bir maile tıkladığında bu kısım çalışır href etiketindeki id 1 e eşitlenir normalde 
        // app/id ye gider ama layout içindeki @modal klasörünü yakalar Tıklarsan: Modal çalışır. Yenilersen: Modal ölür, tam sayfa gelir. ve (..) işaretiyle id yerine ilgili içeriğin üstüne modal açılır.
        /* BURASI ÖNEMLİ: 
    1. Kullanıcı bu linke TIKLADIĞINDA (Soft Navigation), Next.js klasör yapısındaki 
       (..)[id] klasörünü görür ve sayfayı terk etmeden içeriği @modal slotuna "enjekte" eder.
    
    2. Eğer kullanıcı bu sayfayı YENİLERSE (F5) veya linki kopyalayıp yeni sekmeye açarsa, 
       intercepting (yakalama) çalışmaz; Next.js doğrudan app/[id]/page.tsx dosyasına gider 
       ve tam sayfa (Full Page) gösterir.
  */
        <Link 
          key={mail.id} 
          href={`${mail.id}`} // Buraya tıklandığında Intercepting Route devreye girer
          className="block p-4 hover:bg-blue-50 transition-colors group"
        >
          <div className="flex justify-between items-center">
            <span className="font-medium text-gray-700">{mail.sender}</span>
            <span className="text-xs text-gray-400">Şimdi</span>
          </div>
          <div className="text-sm text-gray-600 group-hover:text-blue-600">{mail.title}</div>
        </Link>
      ))}
    </div>
  );
}
