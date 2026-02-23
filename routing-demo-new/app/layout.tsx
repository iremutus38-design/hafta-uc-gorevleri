export default function RootLayout({
  children,
  panel1,
  panel2,
}: {
  children: React.ReactNode;
  panel1: React.ReactNode;
  panel2: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <main>{children}</main> 
        <section style={{ display: 'flex', gap: '20px' }}>
          <div>{panel1}</div>
          <div>{panel2}</div>
        </section>
      </body>
    </html>
  );}