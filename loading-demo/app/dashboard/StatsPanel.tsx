export default async function StatsPanel() {
  await new Promise((resolve) => setTimeout(resolve, 4000)) 

  return (
    <div style={{ border: "1px solid #ccc", padding: "10px", marginTop: "20px" }}>
      <h3>📊 İstatistikler</h3>
      <p>Toplam Satış: 1200</p>
      <p>Yeni Kullanıcı: 85</p>
    </div>
  )
}

//async yapısı ve içindeki yapay gecikme ile bir API isteğini simüle ediyor.