import StatsPanel from "../dashboard/StatsPanel"
import RecentActivity from "../dashboard/RecentActivity"

export default function DashboardNoSuspense() {
  return (
    <div style={{ padding: "20px" }}>
      <h1>Dashboard (No Suspense)</h1>
      <RecentActivity />
      <StatsPanel />
    </div>
  )
}
//suspense olmadığı için iki sayfa da aynı anda yüklenir.Yüklenirlerken ekranda yine loading.tsx döner.