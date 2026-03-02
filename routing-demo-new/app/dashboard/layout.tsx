// app/dashboard/layout.tsx

export default function DashboardLayout({
  children, // Bu, app/dashboard/page.tsx içeriğini temsil eder.
}: {
  children: React.ReactNode;
}) {
  return (
    <section style={{ border: "2px solid #333", padding: "15px", borderRadius: "10px" }}>
      {/* Dashboard'a özel bir başlık veya alt menü buraya gelebilir */}
      <header>
        <h2 style={{ color: "#2c3e50" }}>📊 Dashboard Paneli</h2>
        <p>Buradaki içerik sadece /dashboard rotasında görünür.</p>
      </header>
      
      <hr />

      {/* Asıl sayfa içeriği (page.tsx) burada render edilir */}
      <main>
        {children}
      </main>
    </section>
  );
}