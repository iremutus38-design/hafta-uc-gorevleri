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
        <Link 
          key={mail.id} 
          href={`/inbox/${mail.id}`} // Buraya tıklandığında Intercepting Route devreye girer
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
//u dosya "sihrin" gerçekleştiği yerdir. (.) işareti, kullanıcı /inbox/1 linkine tıkladığında sayfayı terk etmeden o rotayı "yakalamasını" sağlar.