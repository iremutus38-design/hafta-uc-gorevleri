export default function DashboardLayout({
  children,
  panel1,
  panel2
}: any) {

  return (
    <div style={{ display: "flex" }}>
      <div style={{ flex: 1 }}>{panel1}</div>
      <div style={{ flex: 1 }}>{children}</div>
      <div style={{ flex: 1 }}>{panel2}</div>
    </div>
  );
}