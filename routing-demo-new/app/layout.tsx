"use client"; // Bu satır şart

import { usePathname } from "next/navigation";

export default function RootLayout({
  children,
  panel1,
  panel2,
}: {
  children: React.ReactNode;
  panel1: React.ReactNode;
  panel2: React.ReactNode;
}) {
  const pathname = usePathname();
  
  // Eğer url "/dashboard" ile başlıyorsa isDashboard true olur
  const isDashboard = pathname.startsWith("/dashboard");

  return (
    <html lang="tr">
      <body>
        <main>
          {children} 

          {/* Sadece dashboard'da DEĞİLSEK panelleri göster */}
          {!isDashboard && (
            <div style={{ display: "flex", gap: "20px", marginTop: "20px" }}>
              <section style={{ flex: 1, border: "1px solid red", padding: "10px" }}>
                {panel1}
              </section>
              <section style={{ flex: 1, border: "1px solid blue", padding: "10px" }}>
                {panel2}
              </section>
            </div>
          )}
        </main>
      </body>
    </html>
  );
}