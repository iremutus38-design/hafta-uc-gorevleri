export default function Loading() {
  return (
    <div style={{ padding: "20px" }}>
      <h2>Dashboard yükleniyor...</h2>
    </div>
  )
}
//İKullanıcı sayfaya girdiğinde loading.tsx anında belirir. Bu, kullanıcının "site çalışıyor" demesini sağlar.
//İlgili klasördeki page.tsx veya alt klasörler yüklenirken otomatik olarak gösterilir.